<div class="container mx-auto space-y-6 p-4">
  <h1 class="h1">About TMvisDB</h1>

  <p>
    <strong>TMvisDB</strong> provides per-residue transmembrane topology
    annotations for proteins predicted as transmembrane proteins from the
    <a href="https://doi.org/10.1093/nar/gkab1061" class="anchor"
      >AlphaFold DB</a
    >. The annotations are predicted with
    <a href="https://doi.org/10.1186/s12859-022-04873-x" class="anchor">TMbed</a
    >, and are visualized by overlaying them with AlphaFold 2 structures.
  </p>

  <div>
    <h2 class="h3">How to browse TMvisDB:</h2>
    <p>
      To browse the predicted transmembrane proteins in TMvisDB via a table, you
      can show a random selection or use the following filters:
    </p>
    <ul class="list-inside list-disc">
      <li>Transmembrane topology (alpha-helix, beta-strand)</li>
      <li>Include/Exclude sequences with predicted signal peptides</li>
      <li>Taxonomy (UniProt Organism Identifier, Domain, Kingdom)</li>
      <li>Protein length</li>
    </ul>
    <p class="mt-2 text-sm italic">
      Note: We follow the general length restrictions of AlphaFold DB: a minimum
      of 16 amino acids for all organisms, and a maximum of 1,280 amino acids
      for all organisms except SwissProt (2,700 amino acids) and human (no
      restrictions).
    </p>
  </div>

  <div>
    <h2 class="h3">How to visualize predicted transmembrane proteins:</h2>
    <p>
      Single proteins of TMvisDB can be selected for 3D-visualization of
      per-residue transmembrane topology annotation. You can either select a
      protein from the table you generated while browsing TMvisDB, or you can
      directly enter a UniProt Identifier. The AlphaFold 2 structures of a
      protein are then shown with the corresponding color code of the predicted
      topology. You may also select the pLDDT score of AlphaFold 2 as a color
      code.
    </p>
  </div>

  <div class="flex space-x-4">
    <a type="button" class="variant-filled-primary btn" href="filter">
      Start Browsing
    </a>
    <a type="button" class="variant-filled-secondary btn" href="/search">
      Search Protein
    </a>
  </div>
</div>
