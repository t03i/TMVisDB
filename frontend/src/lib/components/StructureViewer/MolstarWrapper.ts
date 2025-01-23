// Copyright 2025 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0
import type {
  HighlightState,
  SelectionState,
  StructureSelectionQuery,
} from "$lib/stores/StructureMarksStore";

import type { RGB } from "$lib/utils";

import { isEmptyLoci, Loci } from "molstar/lib/mol-model/loci";
import { StructureElement } from "molstar/lib/mol-model/structure";
import { Structure } from "molstar/lib/mol-model/structure/structure";
import type { StructureComponentRef } from "molstar/lib/mol-plugin-state/manager/structure/hierarchy-state";
import type { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import { StateTransforms } from "molstar/lib/mol-plugin-state/transforms";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import {
  StateBuilder,
  StateObjectCell,
  StateSelection,
  StateTransform,
} from "molstar/lib/mol-state";
import { Transparency } from "molstar/lib/mol-theme/transparency";

type TransparencyEachReprCallback = (
  update: StateBuilder.Root,
  repr: StateObjectCell<
    PluginStateObject.Molecule.Structure.Representation3D,
    StateTransform<
      typeof StateTransforms.Representation.StructureRepresentation3D
    >
  >,
  transparency?: StateObjectCell<
    any,
    StateTransform<
      typeof StateTransforms.Representation.TransparencyStructureRepresentation3DFromBundle
    >
  >,
) => Promise<void>;
const TransparencyManagerTag = "transparency-controls";

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

    const plugin = this.plugin;
    if (!plugin) {
      console.warn("No transparency plugin found");
      return;
    }

    const pLDDT = 70;
    const transparency = 1;

    const assemblyRef =
      this.plugin.managers.structure.hierarchy.current.structures[0].cell
        .transform.ref;
    const structure =
      plugin.managers.structure.hierarchy.current?.refs.get(assemblyRef);
    if (!structure) {
      console.warn("No structure found");
      return;
    }

    return plugin.dataTransaction(
      async (ctx: any) => {
        const loci = this.viewer.viewerInstance.getLociByPLDDT(pLDDT);
        await this.setStructureTransparency(
          plugin,
          structure.components,
          transparency,
          loci,
        );
      },
      { canUndo: "Apply Transparency" },
    );
  }

  private getFilteredBundle(
    layers: Transparency.BundleLayer[],
    structureRef: Structure,
  ) {
    const transparency = Transparency.ofBundle(layers, structureRef.root);
    const merged = Transparency.merge(transparency);
    return Transparency.filter(
      merged,
      structureRef,
    ) as Transparency<StructureElement.Loci>;
  }

  private async updateRepresentations(
    plugin: PluginContext,
    components: StructureComponentRef[],
    callback: TransparencyEachReprCallback,
  ) {
    const state = plugin.state.data;
    const update = state.build();

    for (const c of components) {
      for (const r of c.representations) {
        const transparency = state.select(
          StateSelection.Generators.ofTransformer(
            StateTransforms.Representation
              .TransparencyStructureRepresentation3DFromBundle,
            r.cell.transform.ref,
          ).withTag(TransparencyManagerTag),
        );

        await callback(update, r.cell, transparency[0]);
      }
    }

    update.commit();
  }

  private async setStructureTransparency(
    plugin: PluginContext,
    components: StructureComponentRef[],
    value: number,
    loci: StructureElement.Loci,
  ) {
    await this.updateRepresentations(
      plugin,
      components,
      async (update, repr, transparencyCell) => {
        const structure = repr.obj!.data.sourceData;
        if (Loci.isEmpty(loci) || isEmptyLoci(loci)) {
          return;
        }

        const layer = {
          bundle: StructureElement.Bundle.fromLoci(loci),
          value,
        };

        if (transparencyCell) {
          const bundleLayers = [
            ...transparencyCell.params!.values.layers,
            layer,
          ];
          const filtered = this.getFilteredBundle(bundleLayers, structure);
          update.to(transparencyCell).update(Transparency.toBundle(filtered));
        } else {
          const parentRef = repr.transform.ref;
          const parentNode = plugin.state.data.tree.transforms.get(parentRef);
          if (!parentNode) {
            throw new Error(`Parent node ${parentRef} not found in state tree`);
          }

          // Create the transparency transform params
          const filtered = this.getFilteredBundle([layer], structure);
          const transparencyRef = `transparency-${parentRef}`;
          const params = {
            ...Transparency.toBundle(filtered),
            parent: parentRef,
          };
          update
            .to(parentRef)
            .apply(
              StateTransforms.Representation
                .TransparencyStructureRepresentation3DFromBundle,
              params,
              {
                tags: TransparencyManagerTag,
                ref: transparencyRef,
              },
            );
        }
      },
    );
  }

  private async clearTransparency(
    plugin: PluginContext,
    components: StructureComponentRef[],
  ) {
    await this.updateRepresentations(
      plugin,
      components,
      async (update, repr, transparencyCell) => {
        if (transparencyCell) {
          update.delete(transparencyCell.transform.ref);
        }
      },
    );
  }
}
