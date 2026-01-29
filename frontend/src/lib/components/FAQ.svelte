<!--
 Copyright 2025 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import config from "$lib/config";
  import { IssueTemplate, DiscussionCategory } from "$lib/github";
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
        > to get information about the protein. If the protein is found in our database,
        you will be automatically redirected to its detailed entry. If the protein
        exists in UniProt but not TMVisDB, a link to its UniProt entry will be displayed.
        If the protein is not available in our database, TMbed did not predict a
        membrane topology or the structure was not available in AlphaFoldDB. In case
        the protein cannot be found at all, an error message will be shown.
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
      there can be discrepancies in the exact boundary positions. In this cases we
      rely on user discretion to pick annotations that best match the expectations
      for the transmembrane protein. However we want to highlight that the exact
      position of the transmembrane element is often not reliable, not even for experimental
      annotations, as lipids are not usually part of the structure [<a
        class="anchor"
        href="https://doi.org/10.1093/bioinformatics/bti121">1</a
      >, <a class="anchor" href="https://doi.org/10.1093/nar/gkr703">2</a>].
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
      with care and the structure of the relevant protein examined manually. We
      generally assume proteins with both a helix and a beta-barrel TMbed
      prediction to be erroneous although we could not find evidence
      biologically preventing this configuration.
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

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">What data does {config.APP_NAME} collect?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        {config.APP_NAME} collects minimal usage data to improve our service:
      </p>
      <ul class="list-inside list-disc">
        <li>Anonymous usage statistics</li>
        <li>Search queries for service improvement</li>
        <li>Error reports for bug fixing</li>
      </ul>
      <p class="mt-2">
        We do not collect personal information or share data with third parties.
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">Can I download the data or access it programmatically?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        Yes! {config.APP_NAME} allows you to
        <a class="anchor" href="https://zenodo.org/records/14186950"
          >download a slightly minified version of the backend database</a
        >
        and access it through
        <a class="anchor" href="https://zenodo.org/records/14186950">Zenodo</a>.
        If you have specific needs, please
        <a
          class="anchor"
          href={config.GITHUB_LINKS.getDiscussionsUrl(DiscussionCategory.QA)}
        >
          start a discussion on our GitHub repository</a
        >.
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">What file formats are available for download?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        {config.APP_NAME} provides two download formats for protein annotations:
      </p>
      <ul class="list-inside list-disc">
        <li>
          <strong>CSV format</strong>: A comma-separated values file containing
          annotation regions with columns for UniProt ID, source database,
          label, start position, end position, description, and length. This
          format is ideal for data analysis and spreadsheet applications.
        </li>
        <li>
          <strong>.3lines format</strong>: A TMbed Format 4 style file
          containing the protein sequence and topology annotations in a
          three-line format. This format is compatible with TMbed tools and
          provides per-residue annotation information. See the next FAQ section
          for detailed format information.
        </li>
      </ul>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">What is the .3lines format?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        The .3lines format follows the <a
          class="anchor"
          href="https://github.com/BernhoferM/TMbed?tab=readme-ov-file#prediction-output"
          >TMbed Format 4</a
        >
        for TMbed predictions and
        <a
          class="anchor"
          href="https://github.com/BernhoferM/TMbed?tab=readme-ov-file#prediction-output"
          >TMbed Format 2</a
        > specification for all other sources and contains three lines per annotation
        source:
      </p>
      <ol class="list-inside list-decimal">
        <li>
          <strong>Header line</strong>
          <pre
            class="pre font-bold">&gt;&#123;uniprot_accession&#125;|&#123;uniprot_id&#125; - &#123;source_name&#125;</pre>
        </li>
        <li>
          <strong>Sequence line</strong>: The protein amino acid sequence
        </li>
        <li>
          <strong>Topology line</strong>: A string of annotation symbols, one
          per residue, indicating the transmembrane topology
        </li>
      </ol>
      <p class="mt-2">Example:</p>
      <pre
        class="overflow-x-auto rounded bg-surface-200 p-2 text-sm dark:bg-surface-800">
>A0A4Q4MGP0|A0A4Q4MGP0_9PLEO - UniProtKB
MSSNGLTETTLRGTAIGLMVVTTAMVFARAILRSDQKKSIQWDEIWLIVGYMLFMAITGVYINKTSLLFRLLAVEEGRLAPYPSVSKDGFNAQKTFFFTSPGLWLTLWSIKFSLLAFYKRIMVGVKLYLTLWWVVLAYCVLTLVLSIMLHITACGSSPSSWFVENGCGADNVRKSLISFWEGFAVDLSTDLMIMLLPIGIIRNLQIPLARKIQIGGLFALGIFVIIASIVRVIQVGATTGASNTTPSLTWLALWSIIESSVAIMVGCGPGLYRKAKAVYSNTPVHAYNSRGYIKTTADRRPETKGNADDEYGFPMKTMSIDIAARVSRGDSEEELVSQEINGKIRVTRSVVVSHKSE
...........HHHHHHHHHHHHHHHHHHHHH...........HHHHHHHHHHHHHHHHHHH.................................HHHHHHHHHHHHHHHHHHHHHHH...........HHHHHHHHHHHHHHHHHHHHHH...............................HHHHHHHHHHHHHHHHHHHH...........HHHHHHHHHHHHHHHHHHHH...................HHHHHHHHHHHHHHHHHHHH.....................................................................................
>A0A4Q4MGP0|A0A4Q4MGP0_9PLEO - TMbed
MSSNGLTETTLRGTAIGLMVVTTAMVFARAILRSDQKKSIQWDEIWLIVGYMLFMAITGVYINKTSLLFRLLAVEEGRLAPYPSVSKDGFNAQKTFFFTSPGLWLTLWSIKFSLLAFYKRIMVGVKLYLTLWWVVLAYCVLTLVLSIMLHITACGSSPSSWFVENGCGADNVRKSLISFWEGFAVDLSTDLMIMLLPIGIIRNLQIPLARKIQIGGLFALGIFVIIASIVRVIQVGATTGASNTTPSLTWLALWSIIESSVAIMVGCGPGLYRKAKAVYSNTPVHAYNSRGYIKTTADRRPETKGNADDEYGFPMKTMSIDIAARVSRGDSEEELVSQEINGKIRVTRSVVVSHKSE
ooooooooooohhhhhhhhhhhhhhhhhhhhhiiiiiiiiiHHHHHHHHHHHHHHHHHHHHHHoooooooooooooooooooooooooooooooohhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiHHHHHHHHHHHHHHHHHHHHHHHooooooooooooooooooooooooohhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiHHHHHHHHHHHHHHHHHHHHHHHHooooooooooooooohhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
      </pre>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">What is the CSV format?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        The CSV format provides a structured, tabular representation of
        annotation data that is easy to import into spreadsheet applications,
        databases, or data analysis tools.
      </p>
      <p class="mt-2">
        Each row in the CSV file represents a single annotation region and
        contains the following columns:
      </p>
      <ul class="list-inside list-disc">
        <li>
          <strong>uniprot_id</strong>: The UniProt accession identifier for the
          protein
        </li>
        <li>
          <strong>source</strong>: The source database name (e.g., TMbed, TopDB,
          Membranome, UniProtKB, TMAlphaFold)
        </li>
        <li>
          <strong>label</strong>: The annotation label from the source database
          (e.g., H, B, S, i, o, X, M, AH, BS)
        </li>
        <li>
          <strong>start</strong>: The starting position of the annotation region
          (1-indexed)
        </li>
        <li>
          <strong>end</strong>: The ending position of the annotation region
          (1-indexed, inclusive)
        </li>
        <li>
          <strong>description</strong>: A human-readable description of the
          annotation label
        </li>
        <li>
          <strong>length</strong>: The length of the annotation region in amino
          acids
        </li>
      </ul>
      <p class="mt-2">Example:</p>
      <pre
        class="overflow-x-auto rounded bg-surface-200 p-2 text-sm dark:bg-surface-800">
uniprot_id,source,label,start,end,description,length
A0A4Q4MGP0,uniprot,AH,12,32,Alpha-Helix,21
A0A4Q4MGP0,uniprot,AH,44,62,Alpha-Helix,19
A0A4Q4MGP0,uniprot,AH,96,118,Alpha-Helix,23
A0A4Q4MGP0,uniprot,AH,130,151,Alpha-Helix,22
A0A4Q4MGP0,uniprot,AH,183,202,Alpha-Helix,20
A0A4Q4MGP0,uniprot,AH,214,233,Alpha-Helix,20
A0A4Q4MGP0,uniprot,AH,253,272,Alpha-Helix,20
A0A4Q4MGP0,tmbed,o,1,11,Outside,11
A0A4Q4MGP0,tmbed,h,12,32,Alpha-helix (OUT-->IN),21
A0A4Q4MGP0,tmbed,i,33,41,Inside,9
A0A4Q4MGP0,tmbed,H,42,63,Alpha-helix (IN-->OUT),22
A0A4Q4MGP0,tmbed,o,64,95,Outside,32
A0A4Q4MGP0,tmbed,h,96,118,Alpha-helix (OUT-->IN),23
A0A4Q4MGP0,tmbed,i,119,128,Inside,10
      </pre>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">What do the annotation symbols mean?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        The unified TMbed format uses the following symbols to represent
        transmembrane topology annotations:
      </p>
      <ul class="list-inside list-disc">
        <li>
          <strong>B</strong>: Transmembrane beta strand (IN→OUT direction)
        </li>
        <li>
          <strong>b</strong>: Transmembrane beta strand (OUT→IN direction)
        </li>
        <li>
          <strong>H</strong>: Transmembrane alpha helix (IN→OUT direction)
        </li>
        <li>
          <strong>h</strong>: Transmembrane alpha helix (OUT→IN direction)
        </li>
        <li><strong>S</strong>: Signal peptide</li>
        <li>
          <strong>i</strong>: Non-transmembrane region, inside (cytoplasmic
          side)
        </li>
        <li>
          <strong>o</strong>: Non-transmembrane region, outside (extracellular
          side)
        </li>
        <li>
          <strong>.</strong>: Non-membrane / unannotated region
        </li>
      </ul>
      <p class="mt-2">
        TMbed provides directional information (H/h, B/b) indicating the
        orientation of transmembrane segments. Other annotation sources are
        mapped to this unified format, which may result in some information loss
        (e.g., directionality) for sources that don't provide this level of
        detail.
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">How are annotations from different databases mapped?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        To ensure consistency across different annotation sources, labels from
        various databases are mapped to the unified TMbed format. The following
        mappings are applied:
      </p>
      <ul class="list-inside list-disc">
        <li>
          <strong>TopDB</strong>: X→S (Signal peptide), M→H (Membrane, assumed
          alpha-helix), I→i (Inside), O→o (Outside)
        </li>
        <li>
          <strong>Membranome</strong>: AH→H (Alpha-helix), I→i (Inside), O→o
          (Outside)
        </li>
        <li>
          <strong>UniProtKB</strong>: AH→H (Alpha-Helix), BS→B (Beta-Sheet)
        </li>
        <li>
          <strong>TMAlphaFold</strong>: AH→H (Alpha-Helix), BS→B (Beta-Sheet)
        </li>
        <li>
          <strong>TMbed</strong>: Already in unified format, no mapping needed
        </li>
      </ul>
      <p class="mt-2">
        <strong>Important limitations:</strong> Some databases don't distinguish
        between alpha-helical and beta-strand transmembrane regions (e.g., TopDB's
        'M' label), so they are mapped to the most common type (alpha-helix). Additionally,
        most sources don't provide directional information, so uppercase symbols
        (H, B) are used by default. To avoid information loss, separate entries are
        generated for each annotation source in the .3lines format, allowing you
        to compare annotations directly.
      </p>
    </svelte:fragment>
  </AccordionItem>

  <AccordionItem>
    <svelte:fragment slot="summary">
      <h3 class="h3">Experiencing technical issues?</h3>
    </svelte:fragment>
    <svelte:fragment slot="content">
      <p>
        If you experience any technical issues while using {config.APP_NAME},
        you can:
      </p>
      <ul class="list-inside list-disc">
        <li>Clear your browser cache and reload the page</li>
        <li>Try a different web browser</li>
        <li>
          Report the issue on our <a
            class="anchor"
            href={config.GITHUB_LINKS.getNewIssueUrl({
              template: IssueTemplate.BUG,
            })}>GitHub repository</a
          >
        </li>
      </ul>
    </svelte:fragment>
  </AccordionItem>
</Accordion>
