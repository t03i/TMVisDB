<!--
 Copyright 2025 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import config from "$lib/config";
</script>

<Accordion>
  <AccordionItem open>
    <svelte:fragment slot="summary">
      <h3 class="h3">How to browse {config.APP_NAME}?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        To browse the predicted transmembrane proteins in {config.APP_NAME} via a
        table, you can show a random selection or use the following filters:
      </p>
      <ul class="list-inside list-disc">
        <li>Transmembrane topology (alpha-helix, beta-strand)</li>
        <li>Include/Exclude sequences with predicted signal peptides</li>
        <li>Taxonomy (UniProt Organism Identifier, Domain, Kingdom)</li>
        <li>Protein length</li>
      </ul>
      <p class="mt-2 text-sm italic">
        Note: We follow the general length restrictions of AlphaFold DB: a
        minimum of 16 amino acids for all organisms, and a maximum of 1,280
        amino acids for all organisms except SwissProt (2,700 amino acids) and
        human (no restrictions).
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">How to visualize predictions?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        Single proteins of {config.APP_NAME} can be selected for 3D-visualization
        of per-residue transmembrane topology annotation. You can either select a
        protein from
        <a class="anchor" href="filter/"
          >the table you generated while browsing {config.APP_NAME}</a
        >, or you can
        <a class="anchor" href="/search">directly enter a UniProt Identifier</a
        >. We then show the available information for the selected protein,
        including the structure retrieved from AlphaFoldDB, UniprotKB
        information, and possibly available information from TMAlphaFold, TopDB,
        or Membranome, alongside the Membrane prediction from TMbed.
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">How to search for a protein?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        You can directly enter a UniProt Identifier or Protein Name <a
          class="anchor"
          href="/search">in the search bar</a
        > to get information about the protein if available. If the protein is not
        available in our database, TMbed did not predict a membrane topology or the
        structure was not available in AlphaFoldDB.
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">How to deal with position discrepancies?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      We use the following sources for our annotations:
      <ul class="list-inside list-disc">
        <li>UniProtKB</li>
        <li>TMAlphaFold</li>
        <li>TopDB</li>
        <li>Membranome</li>
        <li>TMbed</li>
      </ul>
      While they often agree on the general location of the transmembrane elements,
      there can be discrepancies in the exact position of the transmembrane helices.
      In this cases we rely on user discretion to pick annotations that best match
      the structure but want to highlight that the exact position of the transmembrane
      element is not reliable.
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">How to handle conflicting annotations?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      In some cases, the annotations from different sources can be conflicting;
      e.g., annotations of an alpha-helix and a beta-barrel. In these cases, we
      suggest to rely on helix annotations as the experimental annotations are
      more widespread and machine-learning methods can often predict them more
      reliably. However, we want to stress that these cases should be handled
      with care and the structure of the relevant protein examined manually.
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">How to cite {config.APP_NAME}?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      If you want to cite a specific parts of {config.APP_NAME}, please check
      the
      <a class="anchor" href="/cite">cite page</a> for more information.
    </svelte:fragment>
  </AccordionItem>
</Accordion>
