<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script>
  import "iconify-icon";
  import logo from "$lib/assets/logo_sq_light.svg";
  import config from "$lib/config";
</script>

<footer class="bg-surface-100-800-token py-8 mt-20">
  <div class="container mx-auto px-4">
    <div
      class="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-8"
    >
      <div
        class="w-full max-w-[200px] md:max-w-none flex justify-center md:justify-start"
      >
        <a href="https://rostlab.org" class="inline-block">
          <img
            src={logo}
            class="h-32 md:h-44 object-contain"
            alt="Rostlab Logo"
          />
        </a>
      </div>
      <div class="w-full max-w-[200px] md:max-w-none">
        <h3 class="h3 mb-4">Links</h3>
        <ul class="space-y-1">
          <li><a href="/imprint" class="anchor">Imprint</a></li>
          <li><a href="/cite" class="anchor">Cite</a></li>
          <li><a href={config.GITHUB_URL} class="anchor">GitHub</a></li>
        </ul>
      </div>
      <div class="w-full max-w-[200px] md:max-w-none">
        <h3 class="h3 mb-4">Services</h3>
        <ul class="space-y-1">
          <li>
            <a href="https://alphafold.ebi.ac.uk/" class="anchor"
              >AlphaFold DB</a
            >
          </li>
          <li>
            <a href="https://membranome.org/" class="anchor">Membranome</a>
          </li>
          <li>
            <a href="https://tmalphafold.ttk.hu/" class="anchor">TMAlphaFold</a>
          </li>
          <li>
            <a href="https://github.com/BernhoferM/TMbed" class="anchor"
              >TMbed</a
            >
          </li>
          <li>
            <a href="http://topdb.enzim.hu/" class="anchor">TopDB</a>
          </li>
          <li>
            <a href="https://www.uniprot.org/" class="anchor">UniprotKB</a>
          </li>
        </ul>
      </div>
      <div class="w-full max-w-[200px] md:max-w-none">
        <h3 class="h3 mb-4">Follow Us</h3>
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

<style>
  iconify-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
  }
</style>
