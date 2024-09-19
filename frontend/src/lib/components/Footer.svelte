<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script>
  import "iconify-icon";
  import logo from "$lib/assets/logo_sq_light.svg";
</script>

<footer class="bg-surface-100-800-token font-small pt-4 mt-20">
  <div class="container mx-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center md:justify-items-start"
    >
      <div class="text-center md:col-span-1">
        <a href="https://rostlab.org">
          <img src={logo} class="mx-auto object-none h-44" alt="Rostlab Logo" />
        </a>
      </div>

      <div>
        <h5 class="h5 mb-4">Links</h5>
        <ul class="space-y-2">
          <li><a href="/imprint" class="anchor">Impressum</a></li>
          <li><a href="/legal" class="anchor">ToS & Privacy Policy</a></li>
          <li><a href="/cite" class="anchor">Cite</a></li>
        </ul>
      </div>

      <div>
        <h5 class="h5 mb-4">Services</h5>
        <ul class="space-y-2">
          <li><a href="/glossary" class="anchor">Glossary</a></li>
          <li>
            <a href="https://github.com/sokrypton/ColabFold" class="anchor"
              >Colab Fold</a
            >
          </li>
          <li>
            <a href="https://alphafold.ebi.ac.uk/" class="anchor"
              >AlphaFold2 DB</a
            >
          </li>
          <li>
            <a href="https://www.uniprot.org/" class="anchor">UniprotKB</a>
          </li>
        </ul>
      </div>

      <div>
        <h5 class="h5 mb-4">Follow Us</h5>
        <div class="flex space-x-4">
          <a href="https://x.com/rostlab" class="btn btn-sm variant-soft"
            ><iconify-icon icon="line-md:twitter-x"></iconify-icon></a
          >
          <a
            href="https://www.youtube.com/rostlab"
            class="btn btn-sm variant-soft"
            ><iconify-icon icon="line-md:youtube"></iconify-icon></a
          >
          <a href="https://github.com/Rostlab" class="btn btn-sm variant-soft"
            ><iconify-icon icon="line-md:github"></iconify-icon></a
          >
          <a
            href="https://linkedin.com/company/rostlab"
            class="btn btn-sm variant-soft"
            ><iconify-icon icon="line-md:linkedin"></iconify-icon></a
          >
          <a href="https://rostlab.org" class="btn btn-sm variant-soft"
            ><iconify-icon icon="line-md:home"></iconify-icon></a
          >
        </div>
      </div>
    </div>
  </div>

  <div class="text-center py-3 mt-8">
    © {new Date().getFullYear()} Copyright:
    <a href="https://rostlab.org" class="anchor">Rostlab</a>
  </div>
</footer>
