// Copyright 2025 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0
import type {
  HighlightState,
  SelectionState,
  StructureSelectionQuery,
} from "$lib/stores/StructureMarksStore";

import type { RGB } from "$lib/utils";

export class MolstarWrapper {
  private viewer: any;
  private ready: boolean = false;
  private readyCallbacks: (() => void)[] = [];

  constructor(viewerElement: any) {
    this.viewer = viewerElement;
    this.initializeWhenReady();
  }

  private initializeWhenReady() {
    if (this.viewer?.viewerInstance) {
      this.viewer.viewerInstance.events.loadComplete.subscribe(
        (success: boolean) => {
          if (success) {
            this.ready = true;
            this.readyCallbacks.forEach((cb) => cb());
            this.readyCallbacks = [];
          }
        },
      );
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
    //await this.applyTransparency(70, 0.3);
  }
}
