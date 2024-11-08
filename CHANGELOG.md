# CHANGELOG


## v1.0.0 (2024-11-08)

### Breaking

* feat(frontend)!: add structure color visualization  (#3)

* Add plugin check to readiness

* Add annotation tracks

* Refactor color handling for annotations

* Add color pattern selector

* Remove polling

* Add options for improved highlighting

* Decouple event handling from highlighting logic

* Remove manual Background State

* Add selection colors

* Fix typing

* Add annotation color theming for structure

* Fiddle with z-scores of canvas

* Move to store based selection

* Fix add highlight on load

General improvements to event handling for viewer loading

* Dependency update ([`0d6eddd`](https://github.com/t03i/TMVisDB/commit/0d6eddd0231dcd393ddf7e3452476102ed659e95))

### Build System

* build: fix cli issue ([`70e6974`](https://github.com/t03i/TMVisDB/commit/70e6974e698100500ef36fe598f5937fc64c84b9))

* build: fix build ([`6c0ff5e`](https://github.com/t03i/TMVisDB/commit/6c0ff5e1ba098be113bd9f44b1560dd5619f6864))

* build: fix no release being made ([`6082f47`](https://github.com/t03i/TMVisDB/commit/6082f478e098ebcf30e089c956593265dab79c56))

* build: fix docker login ([`1246e2b`](https://github.com/t03i/TMVisDB/commit/1246e2b908c3b63b9a03325120d6f8defabcd3b8))

* build: fix retagging ([`9d7dc69`](https://github.com/t03i/TMVisDB/commit/9d7dc69355a4f5afc6bc3d6c1fa7a24f84962627))

* build: fix frontend docker building ([`1d9c6eb`](https://github.com/t03i/TMVisDB/commit/1d9c6ebfef55480808914179148418b6a7e1cd34))

* build: change image name ([`c4e9c92`](https://github.com/t03i/TMVisDB/commit/c4e9c923171692e82867b50e0d8f71a66a277bc8))

* build: fix tags ([`4588d24`](https://github.com/t03i/TMVisDB/commit/4588d245a918f6543fab8095406ddc400ce9c5b8))

* build: create automatic release pipeline ([`1fa874b`](https://github.com/t03i/TMVisDB/commit/1fa874b83757fce3de4075bb7f4cf61057f54ca5))

* build(frontend): improve layer caching ([`3925cd1`](https://github.com/t03i/TMVisDB/commit/3925cd1af117ac6033a56bffd6bab4e976f17586))

* build(frontend): update docker compose to work locally ([`061044d`](https://github.com/t03i/TMVisDB/commit/061044da2c180076c943301d77ac2cdc4bb58e78))

* build(frontend): add frontend docker ([`457087e`](https://github.com/t03i/TMVisDB/commit/457087e8da68ca4fe196bac836c0d51d0be4f314))

* build(frontend): add frontend docker ([`3afec3d`](https://github.com/t03i/TMVisDB/commit/3afec3d069e8873d01dce5b9419b0bc35d78bff5))

* build(frontend): update dependencies ([`73437a0`](https://github.com/t03i/TMVisDB/commit/73437a0fa7b3b280200f1f1346e9e69e58ab8129))

* build(frontend): add package manager ([`76592bf`](https://github.com/t03i/TMVisDB/commit/76592bfae29ddfa4f668c4fa4ed695f45730e98d))

* build(backend): move to caddy proxy ([`599f011`](https://github.com/t03i/TMVisDB/commit/599f01189c1e0a23a05e64237b9c1816425686a6))

* build: document markdown fix ([`2d8db23`](https://github.com/t03i/TMVisDB/commit/2d8db238521dd4d0743c5f3bd97f761601ef5a86))

* build: improve markdown linting ([`4dfc21f`](https://github.com/t03i/TMVisDB/commit/4dfc21f5101517608b4ea0656b256ce35e1c31c5))

* build: add multi-root workspace ([`7d45ad9`](https://github.com/t03i/TMVisDB/commit/7d45ad9340e4e6e0e1e6bc797ada3ef5bb795ea1))

* build(frontend): remove svelte-query-devtools

Removed query tools from production ([`01bd48b`](https://github.com/t03i/TMVisDB/commit/01bd48b80084dd4aaa2a06645218dd3f27fa60c8))

### Chores

* chore: fix missing import in alembic file ([`278f6e9`](https://github.com/t03i/TMVisDB/commit/278f6e9c45a0798bd0b987f8fa6fc6ebf9e71741))

* chore: add analyze to db migrations ([`58b07ad`](https://github.com/t03i/TMVisDB/commit/58b07ad45381383feede5f09ff9b1822c571ef6a))

* chore: fix db migration to work with sqlite ([`2f2fe88`](https://github.com/t03i/TMVisDB/commit/2f2fe8836327469d9a441865913386f1816c5cf8))

* chore: add initial alembic migration ([`06797b5`](https://github.com/t03i/TMVisDB/commit/06797b57a9d4085a6ac493d2df60c61302d7621a))

* chore: add sqlmodel to mako template ([`34574ce`](https://github.com/t03i/TMVisDB/commit/34574ced6d77512b95f947287f40b525a952cb4d))

* chore: rename scripts folder to be more understandable ([`8269a0f`](https://github.com/t03i/TMVisDB/commit/8269a0fb9ad298d47d9684b47b669bcd966cb17e))

### Continuous Integration

* ci: add semantic release basics ([`02432f6`](https://github.com/t03i/TMVisDB/commit/02432f65cb7b5a2852456525f5f080b43eb07acc))

* ci: fix variables ([`90bab8f`](https://github.com/t03i/TMVisDB/commit/90bab8f2482011b1fcb21c4eccbc270ac9644d9c))

* ci: temporarily force docker build ([`49ea4bf`](https://github.com/t03i/TMVisDB/commit/49ea4bf31552334d7fe69f2f85b8aa74c3105412))

* ci: add production environment to frontend builder ([`be3daef`](https://github.com/t03i/TMVisDB/commit/be3daef6a5cfda44cbb4da4c8b413be12c5ca240))

* ci(frontend): add basic docker workflow ([`99db8dd`](https://github.com/t03i/TMVisDB/commit/99db8ddb6dedb2b3c76c19d89561cb35d3be86b1))

* ci: remove .env file ([`f37beda`](https://github.com/t03i/TMVisDB/commit/f37beda08fb6396812c146c74138e0ed87e3e355))

### Documentation

* docs: correct coloring for sheets ([`0f440db`](https://github.com/t03i/TMVisDB/commit/0f440dbd245c952224c5580a41ed4e4cdae0184d))

* docs: fix non-working formatting ([`16aa527`](https://github.com/t03i/TMVisDB/commit/16aa527ee471dce0869a4455f0aee4901cc255ce))

* docs: add structure image ([`910d91e`](https://github.com/t03i/TMVisDB/commit/910d91eab1641bebb6965ff5b3a6f7e3dd2c079a))

* docs: fix title ([`618685e`](https://github.com/t03i/TMVisDB/commit/618685e6fc97853f47f472f1afea83faa9861ff5))

* docs: change logo color ([`c8e29c3`](https://github.com/t03i/TMVisDB/commit/c8e29c32402508994782467eed4aefb0de8a9016))

* docs: add logo to readme ([`7567d66`](https://github.com/t03i/TMVisDB/commit/7567d66536c8a18c92623fa2f97e3b8ca6b7154a))

* docs: ignore DOI names ([`9abc1c3`](https://github.com/t03i/TMVisDB/commit/9abc1c3bdb18ef2c9e654541700d0f602be677f1))

* docs: update resource links ([`79c4a66`](https://github.com/t03i/TMVisDB/commit/79c4a6689217c984a70164af09948d8e7eda9cc9))

* docs: add basic README and LICENSE ([`46d74e5`](https://github.com/t03i/TMVisDB/commit/46d74e537be37d94b270994b9b5e014bfaf0d40a))

* docs(frontend): remove hardcoded name from landing page ([`a1f85ef`](https://github.com/t03i/TMVisDB/commit/a1f85ef165ed1c913ef39a67f50146f2119b72e9))

* docs: fix CoC linting ([`3a8fa4b`](https://github.com/t03i/TMVisDB/commit/3a8fa4be561d1b3f20cf74698a6467935852c14d))

* docs: remove explicit name from pages ([`ea7e208`](https://github.com/t03i/TMVisDB/commit/ea7e2088d7a3eafa443c40aa389173bd086f4681))

* docs: add cSpell words ([`1d49c32`](https://github.com/t03i/TMVisDB/commit/1d49c32d3ea047e53417001eef8729ad990eca9e))

* docs: add file attachment tip ([`f040814`](https://github.com/t03i/TMVisDB/commit/f040814d219b6a1a3df5be7d8b89ca806332595d))

* docs: add issue templates ([`9e96b21`](https://github.com/t03i/TMVisDB/commit/9e96b21591fa074a58fd1e47fa3a1595ebfbb48e))

* docs: add CoC ([`b224706`](https://github.com/t03i/TMVisDB/commit/b224706d8a166fa868552de5b6034e0ae3556bc5))

* docs: Add todo for future config fix ([`f2547e6`](https://github.com/t03i/TMVisDB/commit/f2547e68186c17362f2e9fd16044cd51669025ed))

### Features

* feat(frontend): add overview image ([`d3afe3c`](https://github.com/t03i/TMVisDB/commit/d3afe3cdb1441473e216f5ae0b7adc45c21a157a))

* feat(frontend): add reference component and citation page ([`b0b1118`](https://github.com/t03i/TMVisDB/commit/b0b111844e58d175da4e3bfbcd6a4df741bd998e))

* feat(frontend): add reference component ([`0c496a6`](https://github.com/t03i/TMVisDB/commit/0c496a62c88b0b847d59cd781aca735c76057147))

* feat(frontend): add custom privacy notice ([`f0d5b39`](https://github.com/t03i/TMVisDB/commit/f0d5b39aa0640e25368dcffe26760bf15cf38d08))

* feat(frontend): improve maintenance styling ([`f583fb8`](https://github.com/t03i/TMVisDB/commit/f583fb854fb1cbae7ad9ba5292aba325b638ce35))

* feat(frontend): add bug label ([`3dd5365`](https://github.com/t03i/TMVisDB/commit/3dd536535a225bf6b9c45702dc18cc68c2934528))

* feat(frontent): add missing lables for entity issues ([`f076932`](https://github.com/t03i/TMVisDB/commit/f076932809af89202a4809ea6b7fb9e081eabf98))

* feat(frontend): add better GitHub support links ([`2cc41e2`](https://github.com/t03i/TMVisDB/commit/2cc41e25364b1a2aaa1fb44a04d0fcee850ee8aa))

* feat(frontend): add maintenance mode ([`1931e71`](https://github.com/t03i/TMVisDB/commit/1931e71867c8a3a4aaae11a31f305e875da5fd3c))

* feat: add favicon and page titles ([`6174c12`](https://github.com/t03i/TMVisDB/commit/6174c12ab912cdc3a68cb669c5c65841fd9d7942))

### Fixes

* fix(frontend): resolve some ts issues ([`ddaa765`](https://github.com/t03i/TMVisDB/commit/ddaa7653e092ab6ac561616eaf9125db59911ab2))

* fix(build): Remove obsolete variable ([`df6492b`](https://github.com/t03i/TMVisDB/commit/df6492b0b769e852fa255c040cb7fe28b2e663d5))

* fix: image name ([`c27a3d3`](https://github.com/t03i/TMVisDB/commit/c27a3d36fc16bd3156c6e3a92f39e04c094e6ad2))

* fix(frontend): update z-index to proper tailwind value ([`6eea305`](https://github.com/t03i/TMVisDB/commit/6eea3054a8d16bb5f2aa5954a801f38dc14c0162))

* fix(frontend): css var name generation ([`7e68cdc`](https://github.com/t03i/TMVisDB/commit/7e68cdc4ea945854d5890b76384715bac13427a2))

* fix(backend): fix linting issues ([`8d39ac7`](https://github.com/t03i/TMVisDB/commit/8d39ac772c1fa9c2aed537cd0f99fe91e175d0ab))

* fix(frontend): fix obsolete logging and functions ([`e39e171`](https://github.com/t03i/TMVisDB/commit/e39e1713fe39791726c97aabb9ea30c65baacfdb))

* fix(frontend): remove import bugs ([`6d9aad4`](https://github.com/t03i/TMVisDB/commit/6d9aad472af703b60ab4734bfb8582ee37f581aa))

* fix(frontend): add missing titles ([`baedff4`](https://github.com/t03i/TMVisDB/commit/baedff4d2cca50c133d90381c95fb316cd61d323))

* fix(frontend): correct issue templates ([`fa6f96a`](https://github.com/t03i/TMVisDB/commit/fa6f96a3d1d1d313e6e54fbd771b4d0e679f2b7a))

* fix((frontend)): correct TMvisDB header ([`0ff2208`](https://github.com/t03i/TMVisDB/commit/0ff220859c05d703b200756242c2a00c00d26c16))

* fix: correct error handling for missing db connection ([`2727e51`](https://github.com/t03i/TMVisDB/commit/2727e519f1a4351a5e4213fc7c0fe5188c9d101c))

* fix: add database error message ([`ae3e226`](https://github.com/t03i/TMVisDB/commit/ae3e226f88a7758117f34ef0c9142389b2801c19))

* fix: path update ([`91a7a7e`](https://github.com/t03i/TMVisDB/commit/91a7a7eb2eb0077f5d7c9ce877e0db24cc1baf92))

* fix: change paths ([`3c30a8e`](https://github.com/t03i/TMVisDB/commit/3c30a8e9fa9632821539d9ec2ab42d0738d203a1))

* fix: update more paths ([`aeb6f51`](https://github.com/t03i/TMVisDB/commit/aeb6f51a2eaf7450990c9be56bec71af5a666272))

* fix: path ([`5e03492`](https://github.com/t03i/TMVisDB/commit/5e034920adaa41341039557dc7df9c6412180d3a))

* fix: paths ([`4d5fe11`](https://github.com/t03i/TMVisDB/commit/4d5fe11517d097c13d5a3937c37944fee029404f))

* fix: change name to comps

https://stackoverflow.com/a/77157818 ([`a8d576f`](https://github.com/t03i/TMVisDB/commit/a8d576fa4163d8ae9e3e3a597db51d476dc79fb8))

* fix: residue highlighting ([`6d73582`](https://github.com/t03i/TMVisDB/commit/6d73582903c8a670be558d9d5820a9695d379bf2))

* fix: trigger viewer ready event correctly ([`f2ff578`](https://github.com/t03i/TMVisDB/commit/f2ff578e96fd37ff7b2df8cd96ed43c4976c665a))

### Performance Improvements

* perf(frontend): dynamically load citation plugin to avoid large bundle ([`b08f285`](https://github.com/t03i/TMVisDB/commit/b08f285c46d3a3d0f2eb65d2fa0602a2c79e6744))

* perf: Change ro config to be more compatible with alembic ([`8df1ee9`](https://github.com/t03i/TMVisDB/commit/8df1ee929d777001afd34fb9d3faddf6e1d96e10))

* perf: update cache size ([`8d83e17`](https://github.com/t03i/TMVisDB/commit/8d83e1783143baa68bef90e0447afc1991f684bc))

* perf: set db to read only mode ([`20e6d8e`](https://github.com/t03i/TMVisDB/commit/20e6d8eed3941d2e9d712da8767db19932c98b2a))

### Refactoring

* refactor(frontend): remove maintenance message ([`a2f422a`](https://github.com/t03i/TMVisDB/commit/a2f422ad4bb2e6fada3d01da809d10029d7f35ec))

* refactor(frontend): unify icons ([`4a73095`](https://github.com/t03i/TMVisDB/commit/4a7309590117e649c7b33951a1df4221807eb3c7))

* refactor(frontend): improve layout maintainability ([`1e67048`](https://github.com/t03i/TMVisDB/commit/1e670487ab56b310b663dac0487f560a742173b8))

### Unknown

* Add plugin check to readiness ([`691237d`](https://github.com/t03i/TMVisDB/commit/691237dc72b94a269d4e26b59037783079f7b8d8))

* Add cookie consent banner ([`1716bbd`](https://github.com/t03i/TMVisDB/commit/1716bbd84e0bece8f3d1b7278bdcc4171cdfdced))

* patch: add .env ([`2462244`](https://github.com/t03i/TMVisDB/commit/24622444be6f18d619b85f0d74739993b28fe4ee))

* Add alembic ([`2a3e017`](https://github.com/t03i/TMVisDB/commit/2a3e01787bd60a6109b493e30a1ac00e21a1ec1a))

* Update Sqlite pragmas ([`a8ea2b6`](https://github.com/t03i/TMVisDB/commit/a8ea2b6a017272eeedbfa1304bddf73ff5811bbd))

* Tailwindcss lint ([`bf929b5`](https://github.com/t03i/TMVisDB/commit/bf929b5275455804e0d5bca89559101bdb78eafd))

* Fix prettier ([`2fba0fc`](https://github.com/t03i/TMVisDB/commit/2fba0fcf0482e4a7952a328ba09cbc1b58721591))

* Add cloudflare platform requirements

https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/ ([`d28cf61`](https://github.com/t03i/TMVisDB/commit/d28cf61e85eea46e5354a7d4fba6b6b08a2d7d04))

* Add postinstall

https://github.com/sveltejs/kit/issues/7028 ([`a5e0004`](https://github.com/t03i/TMVisDB/commit/a5e0004cb901821d7316f782c70f06533534d0f1))

* Add cloudflare worker package ([`1790bd9`](https://github.com/t03i/TMVisDB/commit/1790bd93a755f3627f4945327cb1b490559b7d85))

* Update config for cloudflare ([`24f0ca2`](https://github.com/t03i/TMVisDB/commit/24f0ca22d001c25b034dbce2e2c2e1f0f23d9bd6))

* Update path description for action ([`5a08329`](https://github.com/t03i/TMVisDB/commit/5a08329f15ebd44d94c2f36f639620fc3126af53))

* Rename action ([`242b321`](https://github.com/t03i/TMVisDB/commit/242b321b5692edcb596241c2e41ba265bbf139af))

* Fix json ([`8b084f3`](https://github.com/t03i/TMVisDB/commit/8b084f36ce0a6b63f8a578397fba1be2548ad408))

* Fix logo coloring ([`4d29b42`](https://github.com/t03i/TMVisDB/commit/4d29b424be184f6fe75eef15cfee8f459a3afcce))

* Update image building and remove deploy ([`9b138d9`](https://github.com/t03i/TMVisDB/commit/9b138d918d2755baf0e128e1f3050f4c73b206b4))

* Version Bump ([`82b3571`](https://github.com/t03i/TMVisDB/commit/82b35714c98150fe631f6abcd0d08f906afef2bd))

* Add docker build options ([`3e153c6`](https://github.com/t03i/TMVisDB/commit/3e153c64c7b3f0385bc923d6485a02f47bcfa38a))

* Add rudimentary event handling ([`8fe4fa1`](https://github.com/t03i/TMVisDB/commit/8fe4fa1af5f5621b64bfd5108222a467bd526c57))

* Add Random indication ([`4a089bd`](https://github.com/t03i/TMVisDB/commit/4a089bd22bb937350062218510a6bc56277c7bc8))

* Fix minor bug ([`2e04462`](https://github.com/t03i/TMVisDB/commit/2e04462cab702403cb5cae0b088c524ce829814c))

* Add search functionality ([`799fa7f`](https://github.com/t03i/TMVisDB/commit/799fa7fb1942438ef8d48588191c1f4ec0203be2))

* Fix issue ([`7b66810`](https://github.com/t03i/TMVisDB/commit/7b66810da2192e79c8ccad1e6376cce13b0522a7))

* Make loading more consistent and filtering more efficient ([`b972c4b`](https://github.com/t03i/TMVisDB/commit/b972c4bff13b4565109513e4663bc117d4616474))

* Change highlighting ([`2fc9242`](https://github.com/t03i/TMVisDB/commit/2fc9242e0fc454bd5635b963e12cd75aff359b25))

* Update client ([`b8e4e33`](https://github.com/t03i/TMVisDB/commit/b8e4e33f328635ac803ba33eff084fca2fb75a45))

* Fix issue with dataMutator ([`ba7b19e`](https://github.com/t03i/TMVisDB/commit/ba7b19ee659c1ec9ee2376584be27f50904ba7c5))

* Add repsone model ([`adcf176`](https://github.com/t03i/TMVisDB/commit/adcf176e83a19056d529508509cb7d4c50bf1ed4))

* More efficient info display ([`5c96380`](https://github.com/t03i/TMVisDB/commit/5c96380c750d97c9d3c5817063a158520f121cd6))

* Update hook to run on python changes ([`d444857`](https://github.com/t03i/TMVisDB/commit/d444857fc81b3e25b04fe074ada15bb307b9e220))

* Add search route ([`1242d85`](https://github.com/t03i/TMVisDB/commit/1242d8593c7f790499e1a3d7d1a52341f43f0ef9))

* Fix pre-commit ([`24de415`](https://github.com/t03i/TMVisDB/commit/24de41545fd24fe7cf6a20fbb657555585943262))

* Add Search component ([`33e6e2f`](https://github.com/t03i/TMVisDB/commit/33e6e2fb7257b8b110a9c59cd2cc5d652e200097))

* Update layout ([`58cfb26`](https://github.com/t03i/TMVisDB/commit/58cfb264a3743fd753415014fe6f13379a98ae1d))

* Add purgecss ([`5e3c68a`](https://github.com/t03i/TMVisDB/commit/5e3c68aeb35d8835383857c5a7f7ebeadbc4a70c))

* Rename status Emoji ([`b116082`](https://github.com/t03i/TMVisDB/commit/b116082a542feb27076a25757ffe5b247bde6227))

* Add FeatureViewer Loading component ([`e0fe979`](https://github.com/t03i/TMVisDB/commit/e0fe9791c16e6b7abaab71f46e86e9f74e431132))

* Add about page ([`a22267b`](https://github.com/t03i/TMVisDB/commit/a22267b35d16903f1f0f89014d3693e8ac2a30ba))

* Minor Fix ([`dbe3c74`](https://github.com/t03i/TMVisDB/commit/dbe3c74ef3d3b159857e01171a36b8b9120c9139))

* Implement CSV download ([`d123b51`](https://github.com/t03i/TMVisDB/commit/d123b51cabc5137679cde8e73a75771fbff33323))

* Add Icons ([`f485ccb`](https://github.com/t03i/TMVisDB/commit/f485ccb5ffa69bfee82ea268e0c007737e225995))

* Add dynamic color scheme ([`1c79436`](https://github.com/t03i/TMVisDB/commit/1c794362eea326626cc0034faa789be635c406f6))

* Fix display issue ([`3d1cc85`](https://github.com/t03i/TMVisDB/commit/3d1cc856d6aa9470b5909770b62a383fc9306ac0))

* Switch to legend json ([`a0b215b`](https://github.com/t03i/TMVisDB/commit/a0b215be7ee53e3682f31e5205537a3706beb362))

* Mini UI adjustment ([`750e4f0`](https://github.com/t03i/TMVisDB/commit/750e4f04c629cc7dd17e39c695b91d6b63fe8cb8))

* Legend to shard json ([`2becd06`](https://github.com/t03i/TMVisDB/commit/2becd062a29ff4137abc9a7fbd18dc382987d721))

* Change layouting to be more mobile friendly ([`3a14e13`](https://github.com/t03i/TMVisDB/commit/3a14e134243fc107188541db62ea041423a64122))

* Add app rail ([`f5a8c95`](https://github.com/t03i/TMVisDB/commit/f5a8c95793b6a7ea8321af17e4405d55b80dcdd6))

* Add rudimentary tooltip ([`a4248af`](https://github.com/t03i/TMVisDB/commit/a4248af3bd1fc4f17f4c7ca05be47ebd088161b2))

* Fix labels ([`960c8ae`](https://github.com/t03i/TMVisDB/commit/960c8ae045cea4fdc18eb48714a826309ca19637))

* Add Todo ([`28f466d`](https://github.com/t03i/TMVisDB/commit/28f466d3f08a1432471e878a66b7ef23fca42740))

* Fix Annotation Store ([`8b4d4df`](https://github.com/t03i/TMVisDB/commit/8b4d4dfb48289ee83a359b20a3da131c8f465d5a))

* Restructure to StructureStore creation ([`91328a2`](https://github.com/t03i/TMVisDB/commit/91328a263eebf608e3caf441d73f63bc467d1aef))

* Change to outside heading ([`da15212`](https://github.com/t03i/TMVisDB/commit/da152122b8fe51d238c763d18e23ebe79e22bed6))

* Fix wrapping ([`1135631`](https://github.com/t03i/TMVisDB/commit/1135631e76b366765ade0a3d72c9067c64850b4a))

* Apply basic theming to feature viewer ([`baf20c6`](https://github.com/t03i/TMVisDB/commit/baf20c67b8eec9b6e98ce15a560dac6953a23a86))

* Update packages ([`6a5a71b`](https://github.com/t03i/TMVisDB/commit/6a5a71bb31aa17ab0b612ae4fea1b4add2e240ae))

* Add working track display ([`d35663c`](https://github.com/t03i/TMVisDB/commit/d35663c9db4f0d11f1b1b73a3e261fa81c4357e4))

* Change to non-ssr ([`bde1bb3`](https://github.com/t03i/TMVisDB/commit/bde1bb32c5396fd66354f810185af8c418c65dcb))

* Add comment ([`5420491`](https://github.com/t03i/TMVisDB/commit/5420491da7999cf7707f265c090ed2f0759c044e))

* Add nightingale components ([`f3865bc`](https://github.com/t03i/TMVisDB/commit/f3865bc4679f6da0f6868e2e6935c024c0e00316))

* Fix Annotation Loading ([`ebf7d44`](https://github.com/t03i/TMVisDB/commit/ebf7d441ca1ef10d9f85603b1d735c092ba9f9ac))

* Fix imports ([`45e99f0`](https://github.com/t03i/TMVisDB/commit/45e99f05b3625872748b639b06cf2d65ad48730f))

* Fix remaining data issue ([`51bdc31`](https://github.com/t03i/TMVisDB/commit/51bdc316519a620921c292cc91681680ba5df879))

* Fix typing ([`593b8e5`](https://github.com/t03i/TMVisDB/commit/593b8e5f379993356f00830d3b7e9ca84054bfef))

* Update Mutator ([`ae2fbd1`](https://github.com/t03i/TMVisDB/commit/ae2fbd1f73baabfde93d01bc388e622c757bf028))

* Refactor ReferencesComponent ([`e2ea162`](https://github.com/t03i/TMVisDB/commit/e2ea1627969f900ec24fa99b3db987233232a7d7))

* Improve AnnotationLoader ([`374a432`](https://github.com/t03i/TMVisDB/commit/374a432ea76de941f8713273ab495603bfc48326))

* Fix type annotations ([`9c0c42d`](https://github.com/t03i/TMVisDB/commit/9c0c42d80bc257f4d7c83cec0401ace501febc83))

* Fix API access ([`f9de319`](https://github.com/t03i/TMVisDB/commit/f9de3190fbfc72e55508696b26e3873a2e511aef))

* Update client ([`817cbe8`](https://github.com/t03i/TMVisDB/commit/817cbe8610563bd02231023559a4502294bf0093))

* Add consistency to returned data ([`b29b730`](https://github.com/t03i/TMVisDB/commit/b29b730fdeec1c810f6e1cf1af9141f5013c0b75))

* Fix alignment issues ([`48e16cd`](https://github.com/t03i/TMVisDB/commit/48e16cda1f318e7f1de13885ec35f00237eb7964))

* Add loading view ([`14831a9`](https://github.com/t03i/TMVisDB/commit/14831a9381c7bb18ec3ff4e45fddcef1615e2f05))

* Restructure FilterForm ([`b599058`](https://github.com/t03i/TMVisDB/commit/b599058f0aa45f0112e2d9c45ba6a3374fcf80f5))

* Fix Detail view ([`5d02000`](https://github.com/t03i/TMVisDB/commit/5d02000d8a65b12b3e146ea5b8aef43e90585bc7))

* Restructure to use annotations loader ([`015e595`](https://github.com/t03i/TMVisDB/commit/015e595fd6a4236f0628a4823fff718550f3aa03))

* Fux formatting to be mobile friendly ([`15815d9`](https://github.com/t03i/TMVisDB/commit/15815d9b1dc012dac4891a3593d01c15d7033a12))

* Remove loading from component ([`7daeb13`](https://github.com/t03i/TMVisDB/commit/7daeb13d05cc60ab9a71b1658ddcfb010a23063e))

* Add protein Detail view ([`33244f7`](https://github.com/t03i/TMVisDB/commit/33244f770376a1340b29a6b0be2736e647c1ce4c))

* Change name to table ([`4bc1921`](https://github.com/t03i/TMVisDB/commit/4bc1921b90a305a10f6b16c63d64d6db4e476ce9))

* Add individual id method ([`dc9942a`](https://github.com/t03i/TMVisDB/commit/dc9942a19aa01afdf431fed59d4bb099c1871792))

* Add Structure Viewer Component ([`db79eb7`](https://github.com/t03i/TMVisDB/commit/db79eb726fc68737753e17634f39458dba418553))

* Add pdbe Molstar ([`cf33759`](https://github.com/t03i/TMVisDB/commit/cf33759ce7b7591a0e2518bc9155e1bfcbe9cdfa))

* Highlight active page button ([`3df6d93`](https://github.com/t03i/TMVisDB/commit/3df6d93e3253c599cafae55f4381abce7ded2b88))

* Enable Situational Button activation ([`745a1a7`](https://github.com/t03i/TMVisDB/commit/745a1a7b6981e322c99afd493473802d50386711))

* Fix pagination ([`cb5fa16`](https://github.com/t03i/TMVisDB/commit/cb5fa16ca264a56c8dd9d3701402d99bf0a4f8c7))

* Implement independent pagination ([`e00fb63`](https://github.com/t03i/TMVisDB/commit/e00fb632abd367a014516425d1b8a298da00e00a))

* Mark TODOs done ([`fd52c08`](https://github.com/t03i/TMVisDB/commit/fd52c08bc0ccec1e1f78655c385454c67fc74387))

* Fix loading issues ([`d845d80`](https://github.com/t03i/TMVisDB/commit/d845d80e733729beed60b679fbe36fccead91919))

* Change name again ([`96380b6`](https://github.com/t03i/TMVisDB/commit/96380b6121ab9a50377ab0273b80e3fbc2f974c8))

* change client name ([`c432486`](https://github.com/t03i/TMVisDB/commit/c4324866f261d9731f57de39020e8a35394de3a1))

* Add new Types to Client ([`1f0499e`](https://github.com/t03i/TMVisDB/commit/1f0499e575937e3037adb63a37c589112817e92e))

* Fix issues ([`9775153`](https://github.com/t03i/TMVisDB/commit/97751538fe1d31b7cb39829a03961978624e1440))

* Adjusted API to use generated enums ([`fec2f9b`](https://github.com/t03i/TMVisDB/commit/fec2f9bccc670e9dc89f55f448c7c1fd2af3b995))

* Remove unnecessary shared link ([`5a2d349`](https://github.com/t03i/TMVisDB/commit/5a2d349190641560d39e5f7ac3614a1d01d1cbc0))

* Add hooks and auto generated enums ([`f7889e6`](https://github.com/t03i/TMVisDB/commit/f7889e602b2b00af7cf23974d0f75eb926879c97))

* Update Filter Form ([`e381322`](https://github.com/t03i/TMVisDB/commit/e381322126bdce8f3d01feccc8fdfd828542f97a))

* Add loading animation ([`4af1301`](https://github.com/t03i/TMVisDB/commit/4af130157a641124f96939f18ce39da34d1f0420))

* Fix issues ([`513bead`](https://github.com/t03i/TMVisDB/commit/513bead030a289950c1448e3b80c62154515c128))

* Add working Boolean filter ([`b451193`](https://github.com/t03i/TMVisDB/commit/b4511936d3d27f3db87daba2c518e303a3b6de64))

* Add additional Info to table ([`65d547a`](https://github.com/t03i/TMVisDB/commit/65d547a3551fe1398715b58ac6b0d1eecb7bb6dc))

* Add scaffold for details ([`f64710c`](https://github.com/t03i/TMVisDB/commit/f64710ceb23f457245578d384ffa4f49f720c846))

* Rudimentary Protein Table ([`da940b4`](https://github.com/t03i/TMVisDB/commit/da940b44f0c55810ce98b8c97fe4b2d280208186))

* Add Protein compatible DataTable ([`da328d9`](https://github.com/t03i/TMVisDB/commit/da328d981492756048cdc0a95dfa9b4bcd4b6bb2))

* Update API filed to be more telling ([`a93089f`](https://github.com/t03i/TMVisDB/commit/a93089ff1324e3f454ea4de48f5694ff5b082918))

* Uodate page ([`64d1a98`](https://github.com/t03i/TMVisDB/commit/64d1a988f8590b2f877bc71a8b1783746e41e07c))

* Copy Table implementation template ([`f14bfe2`](https://github.com/t03i/TMVisDB/commit/f14bfe277ec722f45108aba7fff1f9772420f0c3))

* Remove unnecessary prop ([`0ae1442`](https://github.com/t03i/TMVisDB/commit/0ae1442dd92583083a3ea95b6bee012d63c654aa))

* Refactor DataLoader ([`948ac7d`](https://github.com/t03i/TMVisDB/commit/948ac7d4dad08c663ed68a53df4e735dffb352bb))

* Remove garbage ([`7687141`](https://github.com/t03i/TMVisDB/commit/76871412e7f2470ef210657f9e46b2951c0f61e1))

* Add rudimentary dataloader ([`2eda388`](https://github.com/t03i/TMVisDB/commit/2eda38874238dfdf736dd1dfbd969d1c5762b2d0))

* Add Tailwind forms plugin ([`894bd5a`](https://github.com/t03i/TMVisDB/commit/894bd5ada2d01f5e9254e566b4396e400c24790f))

* Proper search filter ([`d80fb5b`](https://github.com/t03i/TMVisDB/commit/d80fb5b9c621d4a327e926a6dbc40d2f4c3e3736))

* Update client ([`903cfa5`](https://github.com/t03i/TMVisDB/commit/903cfa5e8fa30125b25a8abd1ae4de25f0ce829e))

* Change Path to be consistent ([`6e0914c`](https://github.com/t03i/TMVisDB/commit/6e0914c62996b6fcd1ddbba2f681e85f31c97d34))

* Update Form styling ([`f552474`](https://github.com/t03i/TMVisDB/commit/f5524749add5a6ad05e0718384be5bcde4fa30c6))

* Improve validation error handling ([`efad556`](https://github.com/t03i/TMVisDB/commit/efad556a74130bc51dbf7a400a2df373fa42ae1a))

* Move shared better location ([`61bad84`](https://github.com/t03i/TMVisDB/commit/61bad8422407d0d501c6b90667fded18f97c2639))

* Refactor API for dynamic taxonomies ([`eb6b9ab`](https://github.com/t03i/TMVisDB/commit/eb6b9abb0e4aa3444e26736526f3da6d37a849d4))

* Add taxonomy preloading ([`d2e9c58`](https://github.com/t03i/TMVisDB/commit/d2e9c58585643f1114b7d8ac10d4356ce60b56cb))

* Restructure build for shared data ([`c998a22`](https://github.com/t03i/TMVisDB/commit/c998a228c554ac197270599cec7a8cb1475d3d78))

* Improve filter form ([`b8736f3`](https://github.com/t03i/TMVisDB/commit/b8736f35f911175669524896fefda5481b5236b4))

* Change to docker - url ([`eacdfd7`](https://github.com/t03i/TMVisDB/commit/eacdfd7173b7f7aa9f8d13de0252d2a03c242d70))

* Fix non-working initialData ([`1c9a4e0`](https://github.com/t03i/TMVisDB/commit/1c9a4e083f977d695464d36bec89ab897af3eaf8))

* Clean deps ([`cc14df5`](https://github.com/t03i/TMVisDB/commit/cc14df5f129d45f2e7f2335faa6c3100b220b686))

* Update API Ir; ([`2db190b`](https://github.com/t03i/TMVisDB/commit/2db190b916b6c41eaa7d43007b5ba65c449a6709))

* Update client dependencies ([`a2ad9af`](https://github.com/t03i/TMVisDB/commit/a2ad9af00080bad72f0eddc97c4f6af9d7a41f96))

* Exclude auto generated code from pre-commit ([`54aa19d`](https://github.com/t03i/TMVisDB/commit/54aa19d09ec8c9d313c6b417aae0951a0ddc5370))

* Update client ([`96b8f0f`](https://github.com/t03i/TMVisDB/commit/96b8f0fa5847edb369c5721cd9ac9ad404f6819a))

* Start Frontend API impementation ([`2883351`](https://github.com/t03i/TMVisDB/commit/28833517e9b6e505d2e6c61bdcf80f0d94281602))

* Update env variables ([`dc628c3`](https://github.com/t03i/TMVisDB/commit/dc628c3b292d65545105cdeb2a39c448de2ae43b))

* Add count to API ([`4e8ac5f`](https://github.com/t03i/TMVisDB/commit/4e8ac5f141dacdbe609f73fdde5cc65e3183a001))

* Add Header ([`dd5a1b4`](https://github.com/t03i/TMVisDB/commit/dd5a1b461559173e763ec8d743436769f476dc64))

* Add client ([`e993095`](https://github.com/t03i/TMVisDB/commit/e99309545aca3777c01e991afe6772532ab7a566))

* Fix path ([`8429580`](https://github.com/t03i/TMVisDB/commit/84295804b3b677147416adf8a2f2016b8270308c))

* Remove bullshit ([`2de14be`](https://github.com/t03i/TMVisDB/commit/2de14bea832134334e8c1588f8c973e32e906147))

* Add lambdaPP footer ([`5c3dcab`](https://github.com/t03i/TMVisDB/commit/5c3dcab08339ef6d9abe0128cf6caf811207e4a4))

* Make error more type-safe ([`4fba909`](https://github.com/t03i/TMVisDB/commit/4fba90939746eaaf6b1caba3e01837b592184a50))

* Add error page ([`989dd36`](https://github.com/t03i/TMVisDB/commit/989dd36e3270887ba20cf681102f83cbafd953de))

* Switch back to svelte kit for better support ([`eb7f935`](https://github.com/t03i/TMVisDB/commit/eb7f935632bf6b24c6d4eb1193b30963ab64672e))

* Add Svelte-spa-router template ([`acb2248`](https://github.com/t03i/TMVisDB/commit/acb2248307915a909aaeb9f38dc55f4d168ad60a))

* Add svelte query ([`cf43a89`](https://github.com/t03i/TMVisDB/commit/cf43a8916a00aef8a087796692979144ca9eb220))

* Add client definition ([`d2ee838`](https://github.com/t03i/TMVisDB/commit/d2ee83872cb631529d942975454217515a7ad22a))

* Add shellscript ([`f89d04f`](https://github.com/t03i/TMVisDB/commit/f89d04fe543ae997e541d211456d7d4a5bfc7f4c))

* Update to shellscript that automates folder location ([`a3134d7`](https://github.com/t03i/TMVisDB/commit/a3134d7c60768d2624ba4174d0bd796b6f843991))

* Ignore build output ([`614f70c`](https://github.com/t03i/TMVisDB/commit/614f70c029a5a2720f1b223e5267a0160058787d))

* Add client generation ([`3c7a8ae`](https://github.com/t03i/TMVisDB/commit/3c7a8aea8ed42e3ade41b8226f44892c10dab817))

* Fix Docker dev setup ([`e86741f`](https://github.com/t03i/TMVisDB/commit/e86741f08da01a5295e07d291ca03b58d1c4794c))

* Remove playwright ([`8263cba`](https://github.com/t03i/TMVisDB/commit/8263cbae0db2282ef89cb5f3b289ab45e955c69d))

* Fix after pre-commit ([`e6d9994`](https://github.com/t03i/TMVisDB/commit/e6d99945f84ed1c5478ebba040329707c3fe9116))

* Add github workflow from fastapi tutorial ([`d71fdb7`](https://github.com/t03i/TMVisDB/commit/d71fdb71e585a7992606c64f6f003f385b044148))

* Add pre-commit ([`892a378`](https://github.com/t03i/TMVisDB/commit/892a3789f16211c4ed8666083ca2b7c767400e10))

* Add frontend skeleton ([`4201e31`](https://github.com/t03i/TMVisDB/commit/4201e3106696b4e03ece1fb145665df4cf9ca9cd))

* Add offset possibility ([`35165a5`](https://github.com/t03i/TMVisDB/commit/35165a5d02eff14202969bf4d4c0786dccee3cee))

* Finish DB API ([`4cc3cec`](https://github.com/t03i/TMVisDB/commit/4cc3cec56d6815ef47de1b93ade2b2e188e5e287))

* Change name to definitions ([`fe448fb`](https://github.com/t03i/TMVisDB/commit/fe448fb860fb39cff824da28c515edad09c600e5))

* Fix initial API ([`a005762`](https://github.com/t03i/TMVisDB/commit/a0057624b357498901ec2781dc135a9a16654047))

* Add initial docker ([`47cd04f`](https://github.com/t03i/TMVisDB/commit/47cd04f8f2b193d6307389f6e5218356ead85e25))

* Change to app layout ([`f3db2dc`](https://github.com/t03i/TMVisDB/commit/f3db2dc58f22b203e4331c1ac918881c24d1488e))

* Remove obsolete field selection ([`3b71fa1`](https://github.com/t03i/TMVisDB/commit/3b71fa156a7b11d484db7aabbe3026873fc8171d))

* Add inheritance for limited information sharing.

https://sqlmodel.tiangolo.com/tutorial/fastapi/multiple-models/#multiple-models-with-inheritance ([`16c7a0c`](https://github.com/t03i/TMVisDB/commit/16c7a0c0f83bbc26ebdacc49fce42573d166bf2c))

* Initial DB interface ([`bbd756e`](https://github.com/t03i/TMVisDB/commit/bbd756ed02e3ecfb64f6613c3fe261f93988517d))
