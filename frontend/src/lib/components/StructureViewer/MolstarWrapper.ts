// Copyright 2025 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0
import type {
  HighlightState,
  SelectionState,
  StructureSelectionQuery,
} from "$lib/stores/StructureMarksStore";

import type { RGB } from "$lib/utils";

import { isEmptyLoci, Loci } from "molstar/lib/mol-model/loci";
import {
  QueryContext,
  StructureElement,
  StructureSelection,
} from "molstar/lib/mol-model/structure";
import { Structure } from "molstar/lib/mol-model/structure/structure";
import { StateTransforms } from "molstar/lib/mol-plugin-state/transforms";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";
import { compile } from "molstar/lib/mol-script/runtime/query/compiler";
import { StateSelection } from "molstar/lib/mol-state";
import { Transparency } from "molstar/lib/mol-theme/transparency";

export class MolstarWrapper {
  private viewer: any;
  private ready: boolean = false;
  private readyCallbacks: (() => void)[] = [];

  constructor(viewerElement: any) {
    this.viewer = viewerElement;
    this.initializeWhenReady();
  }

  private setReady() {
    this.ready = true;
    this.readyCallbacks.forEach((cb) => cb());
    this.readyCallbacks = [];
  }

  private initializeWhenReady() {
    const setupLoadCompleteListener = () => {
      this.viewer.viewerInstance.events.loadComplete.subscribe(
        (success: boolean) => {
          if (success) {
            this.setReady();
          }
        },
      );
    };

    if (this.viewer?.viewerInstance) {
      setupLoadCompleteListener();
    } else {
      // Create MutationObserver to watch for viewerInstance
      const observer = new MutationObserver(() => {
        if (this.viewer?.viewerInstance) {
          setupLoadCompleteListener();
          observer.disconnect();
        }
      });

      // Observe the viewer element for changes
      observer.observe(this.viewer, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    }
  }

  async whenReady(): Promise<void> {
    if (this.ready) return Promise.resolve();
    return new Promise((resolve) => this.readyCallbacks.push(resolve));
  }

  get plugin() {
    return this.viewer?.viewerInstance?.plugin;
  }

  get canvas() {
    return this.viewer?.viewerInstance?.canvas;
  }

  getBackgroundColor(): RGB {
    const parentElement = this.viewer?.parentElement;
    let bgColor = "rgb(255, 255, 255)";

    if (parentElement) {
      const computedStyle = getComputedStyle(parentElement);
      bgColor = computedStyle.backgroundColor;

      if (
        !bgColor ||
        bgColor === "transparent" ||
        bgColor === "rgba(0, 0, 0, 0)"
      ) {
        bgColor = getComputedStyle(document.body).backgroundColor;
      }
    }

    const rgbValues = bgColor.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
    return {
      r: rgbValues[0],
      g: rgbValues[1],
      b: rgbValues[2],
    };
  }

  async updateBackground() {
    await this.whenReady();
    if (this.canvas) {
      this.canvas.setBgColor(this.getBackgroundColor());
    }
  }

  async select(
    residues: StructureSelectionQuery[],
    color?: RGB | null,
    nonSelectedColor?: RGB | null,
    structureId?: string,
    structureNumber?: number,
    keepColors?: boolean,
    keepRepresentations?: boolean,
  ) {
    await this.whenReady();
    await this.viewer.viewerInstance.visual.select({
      data: residues,
      color,
      nonSelectedColor,
      structureId,
      structureNumber,
      keepColors,
      keepRepresentations,
    });
    await this.viewer.viewerInstance.visual.tooltips({ data: residues });
  }

  async highlight(
    residues: StructureSelectionQuery[],
    color?: RGB | null,
    focus?: boolean,
    structureId?: string,
    structureNumber?: number,
  ) {
    await this.whenReady();
    return await this.viewer.viewerInstance.visual.highlight({
      data: residues,
      color,
      focus,
      structureId,
      structureNumber,
    });
  }

  async clearHighlight() {
    await this.whenReady();
    return await this.viewer.viewerInstance.visual.clearHighlight();
  }

  async clearSelection(
    keepColors: boolean = false,
    keepRepresentations: boolean = true,
  ) {
    await this.whenReady();
    await this.viewer.viewerInstance.visual.clearSelection({
      keepColors,
      keepRepresentations,
    });
    await this.viewer.viewerInstance.visual.clearTooltips();
  }

  async updateSelectionState(state: SelectionState | null) {
    await this.whenReady();
    if (!state) {
      await this.clearSelection();
      return;
    }
    const {
      residues,
      color,
      nonSelectedColor,
      structureId,
      structureNumber,
      keepColors,
      keepRepresentations,
    } = state;

    await this.select(
      residues,
      color,
      nonSelectedColor,
      structureId,
      structureNumber,
      keepColors,
      keepRepresentations,
    );
    await this.applyConfidenceVisualization();
  }

  async updateHighlightState(state: HighlightState | null) {
    await this.whenReady();
    if (!state) {
      await this.clearHighlight();
      return;
    }

    const { residues, color, focus, structureId, structureNumber } = state;
    await this.highlight(residues, color, focus, structureId, structureNumber);
  }

  async applyConfidenceVisualization() {
    await this.whenReady();
    await this.setTransparency(70);
  }

  private getLociByPLDDT(
    score: number,
    contextData: Structure,
  ): StructureElement.Loci {
    const queryExp = MS.struct.modifier.union([
      MS.struct.modifier.wholeResidues([
        MS.struct.modifier.union([
          MS.struct.generator.atomGroups({
            "chain-test": MS.core.rel.eq([
              MS.ammp("objectPrimitive"),
              "atomistic",
            ]),
            "residue-test": MS.core.rel.lte([
              MS.struct.atomProperty.macromolecular.B_iso_or_equiv(),
              score,
            ]),
          }),
        ]),
      ]),
    ]);

    const query = compile<StructureSelection>(queryExp);
    const sel = query(new QueryContext(contextData));
    return StructureSelection.toLociWithSourceUnits(sel);
  }

  private getFilteredBundle(
    layers: Transparency.BundleLayer[],
    structure: Structure,
  ) {
    const transparency = Transparency.ofBundle(layers, structure.root);
    const merged = Transparency.merge(transparency);
    return Transparency.filter(
      merged,
      structure,
    ) as Transparency<StructureElement.Loci>;
  }

  async setTransparency(score: number, transparencyValue: number = 0.5) {
    await this.whenReady();
    if (!this.plugin) return;

    // Wait for structure to be fully loaded and processed
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add small delay

    const hierarchy = this.plugin.managers.structure.hierarchy;
    const current = hierarchy.current;

    if (!current?.structures?.[0]?.cell?.obj?.data) {
      console.warn("No structure data available for transparency");
      return;
    }

    const structure = current.structures[0];
    const loci = this.getLociByPLDDT(score, structure.cell.obj.data);
    if (isEmptyLoci(loci)) {
      console.warn("No matching loci found for transparency");
      return;
    }

    await this.plugin.dataTransaction(
      async () => {
        await this.setStructureTransparency(
          structure.components,
          transparencyValue,
          loci,
        );
      },
      { canUndo: "Apply Transparency" },
    );
  }

  private async setStructureTransparency(
    components: any[],
    value: number,
    loci: StructureElement.Loci,
  ) {
    if (!components?.length) {
      console.warn("No components found for transparency");
      return;
    }

    const state = this.plugin.state.data;
    const update = state.build();

    for (const c of components) {
      if (!c?.representations?.length) continue;

      for (const r of c.representations) {
        if (!r?.cell?.obj?.data?.sourceData) continue;

        const structure = r.cell.obj.data.sourceData;
        if (Loci.isEmpty(loci) || isEmptyLoci(loci)) continue;

        const reprRef = r.cell.transform.ref;
        const transparency = state.select(
          StateSelection.Generators.ofTransformer(
            StateTransforms.Representation
              .TransparencyStructureRepresentation3DFromBundle,
            reprRef,
          ).withTag("transparency-controls"),
        )[0];

        const layer = {
          bundle: StructureElement.Bundle.fromLoci(loci),
          value,
        };

        try {
          if (transparency) {
            const bundleLayers = [...transparency.params!.values.layers, layer];
            const filtered = this.getFilteredBundle(bundleLayers, structure);
            update.to(transparency).update(Transparency.toBundle(filtered));
          } else {
            const filtered = this.getFilteredBundle([layer], structure);
            update
              .to(reprRef)
              .apply(
                StateTransforms.Representation
                  .TransparencyStructureRepresentation3DFromBundle,
                Transparency.toBundle(filtered),
                { tags: ["transparency-controls"] },
              );
          }
        } catch (error) {
          console.error("Error applying transparency:", error);
        }
      }
    }

    return update.commit({ doNotUpdateCurrent: true });
  }

  async clearTransparency() {
    await this.whenReady();
    if (!this.plugin) return;

    const structure =
      this.viewer.viewerInstance.plugin.managers.structure.hierarchy.current
        ?.structures[0];
    if (!structure) return;

    const state = this.plugin.state.data;
    const update = state.build();

    for (const c of structure.components) {
      for (const r of c.representations) {
        const transparency = state.select(
          StateSelection.Generators.ofTransformer(
            StateTransforms.Representation
              .TransparencyStructureRepresentation3DFromBundle,
            r.cell.transform.ref,
          ).withTag("transparency-controls"),
        )[0];

        if (transparency) {
          update.delete(transparency.transform.ref);
        }
      }
    }

    await update.commit({ doNotUpdateCurrent: true });
  }
}
