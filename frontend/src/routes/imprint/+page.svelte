<script>
  import config from "$lib/config";
</script>

<svelte:head>
  <title>{config.APP_NAME} Imprint</title>
</svelte:head>

<div class="flex w-full justify-center">
  <div class="mx-2 w-full max-w-3xl gap-4 md:w-1/2">
    <h2 class="h2 my-6 text-center">Imprint</h2>

    <div class="space-y-6">
      <section>
        <h3 class="h3 mb-2">Address</h3>
        <p class="pl-4">
          I12 - Department for Bioinformatics and Computational Biology <br />
          School of Computation, Information and Technology <br />
          Boltzmannstraße 3 <br />
          85748 Garching <br />
          Germany
        </p>
      </section>

      <section>
        <h3 class="h3 mb-2">Authorized representative</h3>
        <p class="pl-4">
          Technical University of Munich is a statutory body under public law
          (Art. 11 Abs. 1 BayHSchG). It is legally represented by the President,
          Prof. Dr. Thomas F. Hofmann.
        </p>
      </section>

      <section>
        <h3 class="h3 mb-2">Supervisory Authority</h3>
        <p class="pl-4">
          Bavarian State Ministry of Science and the Arts (Bayerisches
          Staatsministerium für Wissenschaft und Kunst)
        </p>
      </section>

      <section>
        <h3 class="h3 mb-2">VAT ID</h3>
        <p class="pl-4">DE811193231 (§27a UStG)</p>
      </section>

      <section>
        <h3 class="h3 mb-2">Responsible for Content</h3>
        <p class="pl-4">
          Prof. Dr. Burkhard Rost <br />
          Boltzmannstraße 3 <br />
          85748 Garching <br />
          assistant. (at) .rostlab.org <br />
          Tel: +49 (89) 289-17811 <br />
          Fax: +49 (89) 289-19414
        </p>
      </section>

      <section>
        <h3 class="h3 mb-2">Implementation</h3>
        <p class="pl-4">
          {config.APP_NAME} was implemented by the RostLab using Svelte, SvelteKit,
          and FastAPI. The used Database relies on SQLite. Technical details, assistance
          and open issues can be found on
          <a href={config.GITHUB_URL} class="anchor">GitHub</a>.
        </p>
      </section>

      <section>
        <h3 class="h3 mb-2">Legal disclaimer</h3>
        <p class="pl-4">
          In spite of regularly monitoring the linked resources with great care,
          we do not accept any responsibility for the content of external links.
          The operators of these websites are solely responsible for their
          content.
        </p>
      </section>
    </div>
  </div>
</div>
