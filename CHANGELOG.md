# CHANGELOG


## v1.6.2 (2025-02-07)

### Bug Fixes

- **frontend**: Improve FAQ and search explanation
  ([`1e629e0`](https://github.com/t03i/TMVisDB/commit/1e629e0a14e95fe69244af08b9b43499126e79b4))

### Chores

- **frontend**: Update frontend dependennciescies and devDependencies
  ([#20](https://github.com/t03i/TMVisDB/pull/20),
  [`9eb9083`](https://github.com/t03i/TMVisDB/commit/9eb90833d6d92042a77ba056e143fc0e99ace078))

* chore: update deps

* style: improve frontpage styling


## v1.6.1 (2025-01-29)

### Bug Fixes

- Add missing h3 in FAQ
  ([`4862757`](https://github.com/t03i/TMVisDB/commit/4862757a9c84bf14d906e3b94819d902a9263c63))


## v1.6.0 (2025-01-29)

### Features

- Add FAQ section
  ([`a3ccbd2`](https://github.com/t03i/TMVisDB/commit/a3ccbd2009134de49bc331063fe3dabdac4ac216))


## v1.5.0 (2025-01-29)

### Features

- Add GO word cloud on detail page
  ([`46bcb44`](https://github.com/t03i/TMVisDB/commit/46bcb44850380d3275c5c37f2b8f876fd4056074))

* style: fix page alignment

* feat: add go term retrieval

* feat: add go term word cloud

* feat: add wordcloud display

* style: add text-styling to svg

* refactor: prevent single letter words

* refactor: improve text

* style: better font scaling

* feat: add GO loading state


## v1.4.5 (2025-01-29)

### Bug Fixes

- Add topdb signal peptide
  ([`195b0b0`](https://github.com/t03i/TMVisDB/commit/195b0b05fdf64f0ed9e87a223a92f62329d00ee8))


## v1.4.4 (2025-01-28)

### Bug Fixes

- Count filter was not handled correctly
  ([`aab0d3e`](https://github.com/t03i/TMVisDB/commit/aab0d3e7706b7ca2331958fb213bcd95d58ce79a))

### Code Style

- Uniprot detail and prediction ([#15](https://github.com/t03i/TMVisDB/pull/15),
  [`3c6c868`](https://github.com/t03i/TMVisDB/commit/3c6c868927a8ee7b28b43fcc969c6e1abbe52c9c))

### Continuous Integration

- Force psr install
  ([`b38d67c`](https://github.com/t03i/TMVisDB/commit/b38d67c66dd775c513e200ffedc229d793edfd63))

- More robust building by checking for psr
  ([`88cc110`](https://github.com/t03i/TMVisDB/commit/88cc11082d0bdc067079365a223fc051aa3bca35))


## v1.4.3 (2024-11-29)

### Bug Fixes

- **frontend**: Fix initial theme incorrectly rendered on detail pages;
  ([`dee1ce2`](https://github.com/t03i/TMVisDB/commit/dee1ce22d88d373e995f755c5be928b69af93a59))

Issue was caused by skeleton UI not handling modeSwitches on SSR. Cf: -
  https://github.com/skeletonlabs/skeleton/issues/2598#issuecomment-2070622735 -
  https://github.com/skeletonlabs/skeleton/issues/905#issuecomment-1445231511

### Build System

- **frontend**: Update dependencies
  ([`221786b`](https://github.com/t03i/TMVisDB/commit/221786bdd86d59069428dd1731769428d66d67e0))


## v1.4.2 (2024-11-28)

### Bug Fixes

- **frontend**: Add app version
  ([`1f5af77`](https://github.com/t03i/TMVisDB/commit/1f5af77ced0b944b4e5c119857638a20dc06bf93))

- **frontend**: Catch issue with structureState race condition
  ([`0f5099e`](https://github.com/t03i/TMVisDB/commit/0f5099ee9e55f6e62e125595dc94a5fae0c11946))

### Code Style

- **frontend**: Improve error display for filter problems
  ([`5ab7740`](https://github.com/t03i/TMVisDB/commit/5ab7740679d89fcedd5ebc06f84adc80876fce5c))

### Refactoring

- **frontend**: Add db search time display
  ([`3eaddcd`](https://github.com/t03i/TMVisDB/commit/3eaddcd63f1a7f5bdde2bb49d474367681099cab))

- **frontend**: Change to use dev version in development
  ([`1fdf201`](https://github.com/t03i/TMVisDB/commit/1fdf201861ee35b630a64acf4df0bb61cad6660f))


## v1.4.1 (2024-11-28)

### Bug Fixes

- **frontend**: Restore 25 as more sane default
  ([`f09842f`](https://github.com/t03i/TMVisDB/commit/f09842fe3884e8c7f20f40bd2a0c28051dc46f73))


## v1.4.0 (2024-11-28)

### Bug Fixes

- Fix page 0, one confusion
  ([`3998946`](https://github.com/t03i/TMVisDB/commit/399894605189db8ae5fcbab6c91b56075dfd3aa0))

- Sentry variable name
  ([`2b6941c`](https://github.com/t03i/TMVisDB/commit/2b6941c7210335b8ea97510bd22836d57b73bbe3))

- **backend**: Fix invalid clade validation
  ([`3a61ba8`](https://github.com/t03i/TMVisDB/commit/3a61ba863a1057278c5f508fdff44a8e96c2fb6e))

- **backend**: Fix unclassified not being processable
  ([`1023e59`](https://github.com/t03i/TMVisDB/commit/1023e59cc46a7fce65d7c5c47ff8ed9c7e8dd9b2))

- **backend**: Resolve issue with sqlalchemy new orm API
  ([`68138c1`](https://github.com/t03i/TMVisDB/commit/68138c160d4243c81956ab6713cad66e7cf3c06a))

- **frontend**: Forward pagination
  ([`03f219e`](https://github.com/t03i/TMVisDB/commit/03f219e89f65bf6c3378a2dc66b6a5f413532070))

- **frontend**: Go back now uses correct logic
  ([`c2877f8`](https://github.com/t03i/TMVisDB/commit/c2877f8f94e60d871de109df790897b480c6c7da))

- **frontend**: Reset Kingdom filter to all if otherwise invalid
  ([`6e88fd0`](https://github.com/t03i/TMVisDB/commit/6e88fd099d2ebaf80d8b20bc0ee34f64aa4e7733))

### Build System

- Fix prettier
  ([`b153957`](https://github.com/t03i/TMVisDB/commit/b153957e9f705d7e6566aca20c7b928916a19ba9))

### Code Style

- **frontend**: Remove pagination artifact for random
  ([`a5ddca4`](https://github.com/t03i/TMVisDB/commit/a5ddca4ac0aafa6286be7f5447c28b055ecede5d))

### Documentation

- Document search is only for page
  ([`a58044f`](https://github.com/t03i/TMVisDB/commit/a58044fbe54c9bf43b119af676dbe98ed3fbd348))

### Features

- Add query transfomer to allow passing in a queryClient
  ([`0e38fc0`](https://github.com/t03i/TMVisDB/commit/0e38fc06e2b867933e1a45feed4c9d7acbecfad0))

- **backend**: Add more efficient count
  ([`05e5d96`](https://github.com/t03i/TMVisDB/commit/05e5d96539153cf24c05b86a0a50d0bc8c925b49))

- **backend**: Implement cursor based pagination
  ([`e9fbe34`](https://github.com/t03i/TMVisDB/commit/e9fbe3496bd5250ec8f7aa9456bdb82578956a5f))

- **frontend**: Implement pagination display
  ([`a2aa857`](https://github.com/t03i/TMVisDB/commit/a2aa85760b9ffd367fb961a1fe40678b55f28301))

### Refactoring

- Create wrapper to allow passing query keys
  ([`a2ce413`](https://github.com/t03i/TMVisDB/commit/a2ce413980ab9ff04e1a703122c9313d2c0cd3bd))

- Dataquery setup for client use
  ([`37b63f4`](https://github.com/t03i/TMVisDB/commit/37b63f4d6b065e3027d69382dbf1d951b2c9f06b))

- Improve query store usage
  ([`d1a4ae4`](https://github.com/t03i/TMVisDB/commit/d1a4ae44c5d381c73ab7ad8c574d80df8b8f6fa3))

- Integrate count into api and improve file structure
  ([`a36ffac`](https://github.com/t03i/TMVisDB/commit/a36ffac291ee80754b7682469fca9d8c642b4ee1))

- Remove debug logging
  ([`7f4b5d0`](https://github.com/t03i/TMVisDB/commit/7f4b5d081f2c0f61cf7b45a1ac54e1cd1cdcda99))

- **backend**: Remove obsolete sorting
  ([`887d52c`](https://github.com/t03i/TMVisDB/commit/887d52c21dfae2891261b510764a49a6af39c809))

- **backend**: Remove query sorting by id.
  ([`6acdc53`](https://github.com/t03i/TMVisDB/commit/6acdc5349f9ca5a23d52c436fc85daab1a420b79))

Sorting by id slows the query down too much. In theory it should be ifine to not sort if for an auto
  incrementing key

- **frontend**: Add cursor based pagination
  ([`e7dc5ad`](https://github.com/t03i/TMVisDB/commit/e7dc5adbb9a58a87b82f3f9eed92ec22a54586b0))

- **frontend**: Add data-based row count
  ([`4a8defa`](https://github.com/t03i/TMVisDB/commit/4a8defa582aa6550a9113f57f6fa71864ef8f0d6))

- **frontend**: Improve table rendering
  ([`eccfd36`](https://github.com/t03i/TMVisDB/commit/eccfd36b71a3d58d60faa04ed0b04475a48f84e0))

- **frontend**: Move pagination to top-level
  ([`6f2c755`](https://github.com/t03i/TMVisDB/commit/6f2c755602a0b01fb477b6f4e89e64b1912182ef))

- **frontend**: Regenerate client
  ([`91d0e90`](https://github.com/t03i/TMVisDB/commit/91d0e90c2f88df0240fb3ec36ddcc577f520dd5f))

- **frontend**: Remove dataloader component for store implementation
  ([`11419d1`](https://github.com/t03i/TMVisDB/commit/11419d12743b2f27f533004239e5fb539d065c4c))

- **frontend**: Switch to wrapper queries with queryClient
  ([`db5da1d`](https://github.com/t03i/TMVisDB/commit/db5da1d063c152943d0501fff611995c7e2ef997))

- **frontend**: Up page size to 50
  ([`483062f`](https://github.com/t03i/TMVisDB/commit/483062f09592d1c464915a56d8d4604b19871626))


## v1.3.3 (2024-11-24)

### Bug Fixes

- Update citation to latest biorxiv
  ([`19a8685`](https://github.com/t03i/TMVisDB/commit/19a86857bab013e97e7955ec0a0d092165b6a9da))


## v1.3.2 (2024-11-21)

### Bug Fixes

- **frontend**: Hotfix remove debug info
  ([`4d88b9a`](https://github.com/t03i/TMVisDB/commit/4d88b9a011e271dd881d3b80aa7f5383d5798024))


## v1.3.1 (2024-11-21)

### Bug Fixes

- **frontend**: Fix build missing variable
  ([`67b41d0`](https://github.com/t03i/TMVisDB/commit/67b41d0c131ee8deeacd8a00cb0bc55cc448061e))


## v1.3.0 (2024-11-21)

### Features

- **frontend**: Add sentry frontend logging
  ([`e4c5b81`](https://github.com/t03i/TMVisDB/commit/e4c5b81454491dd9abf1554d43e5c794d9cd1aa1))

* chore: update dependencies

* build: upload sentry sourcemaps

* build: add sentry build options

* build: add sentry config

* fix(frontend): improve sidebar navigation

* build(frontend): add svelte version

* feat(frontend): configure sentry logging

* fix(frontend): remove integration for server

* build(frontend): update orval version

* fix(backend): only allow GET

This is supposed to block more malicious requests

* chore(backend): default value for traces

* build(frontend): add variable sentry sampling rate

* refactor(frontend): improve sentry initialization

* fix(frontend): adjust hight which now works again

* fix(frontend): remove sentry sveltekit due to bug

https://github.com/getsentry/sentry-javascript/issues/8291

* refactor(frontend): add expected handle error method

* feat(frontend): add breadcrumbs to sentry

Merges: #11


## v1.2.3 (2024-11-20)

### Bug Fixes

- **frontend**: More graceful handling for TMAlphaFold
  ([#10](https://github.com/t03i/TMVisDB/pull/10),
  [`50ff091`](https://github.com/t03i/TMVisDB/commit/50ff0913cef9a1cb3e0ee5a179cda01d9c5f9206))

### Build System

- Fix sentry version name
  ([`5221942`](https://github.com/t03i/TMVisDB/commit/5221942296039d7839a5e995a1bf2c621b09e852))

### Documentation

- Add DB section
  ([`7328764`](https://github.com/t03i/TMVisDB/commit/73287640f080bd548ace2985301c226ed69c1f42))

- Add db-scheme
  ([`2ccfebd`](https://github.com/t03i/TMVisDB/commit/2ccfebd2b466db3137421e4177b2b194a711f711))

- Add legend
  ([`26e707b`](https://github.com/t03i/TMVisDB/commit/26e707b0103bb7cb41db3ece745c66a3a9f4b200))

- Change legend entity to comments
  ([`22785ed`](https://github.com/t03i/TMVisDB/commit/22785ed21dd83234532750de4ce7c9de0bf72653))

- Move db scheme to separate folder
  ([`24b3f10`](https://github.com/t03i/TMVisDB/commit/24b3f10781fb768689ff294f790ff982f0e73a2c))


## v1.2.2 (2024-11-14)

### Bug Fixes

- **frontend**: Add missing label for beta-sheet uniprot
  ([`452ab5e`](https://github.com/t03i/TMVisDB/commit/452ab5e2788bf37cc128e0b8ab53d2b8977b70f2))


## v1.2.1 (2024-11-13)

### Bug Fixes

- Update environment for tagging
  ([`2e5e57b`](https://github.com/t03i/TMVisDB/commit/2e5e57b929f8613509ce05c549f2769254002d92))

### Build System

- Fix sentry release version not found issue
  ([`9328a97`](https://github.com/t03i/TMVisDB/commit/9328a97e77098df7d707cd30a12e053a2cd45d6f))

- Restructure tagging to improve releasing.
  ([`1537c76`](https://github.com/t03i/TMVisDB/commit/1537c7680fccd3c2555d2ea40c6850b57443e92e))

Now tagging happens first and only then triggers the release.


## v1.2.0 (2024-11-13)

### Code Style

- Change pLDDT view name
  ([`16b1413`](https://github.com/t03i/TMVisDB/commit/16b14136a5b72fdb9d823fac231f8cb128a73c25))

### Features

- **frontend**: Add annotation tooltip
  ([`cc536d8`](https://github.com/t03i/TMVisDB/commit/cc536d8f56adde54d1645dfaf05193472e276514))

- **frontend**: Add pLDDT view
  ([`23e0d01`](https://github.com/t03i/TMVisDB/commit/23e0d01655c43099c588a416a0b6ca2258eb5a8a))


## v1.1.1 (2024-11-13)

### Bug Fixes

- Add DB tooltip again
  ([`59fce0f`](https://github.com/t03i/TMVisDB/commit/59fce0f502113201423ea4825c420d7aadd441cc))

### Build System

- Add watchtower notification settings
  ([`c3a5585`](https://github.com/t03i/TMVisDB/commit/c3a5585218e09eea2e2673b674aa35ab1def32a4))

### Chores

- **backend**: Ignore CORSErrors for Sentry
  ([`45483f1`](https://github.com/t03i/TMVisDB/commit/45483f18bb5b14876c5a8b5df5a15612f9ff4504))

### Code Style

- Change name to beta barrel
  ([`b6a1516`](https://github.com/t03i/TMVisDB/commit/b6a15162f6244fc873b48c883db02ee21831587f))

- Change theme to blue based
  ([`ca76161`](https://github.com/t03i/TMVisDB/commit/ca761610131349096f4fc305da7965f9a02420d0))

- **frontend**: Remove uniprot accession link
  ([`12b15da`](https://github.com/t03i/TMVisDB/commit/12b15da37d04940bc7ab76464bda812612dbf7ee))

- **frontend**: Switch to transparent svg
  ([`154be51`](https://github.com/t03i/TMVisDB/commit/154be513fd6a061753965b4e5bc147ac098757b7))


## v1.1.0 (2024-11-11)


## v1.0.10 (2024-11-11)

### Build System

- Remove erroneous network name
  ([`b54c42b`](https://github.com/t03i/TMVisDB/commit/b54c42b7db665422bce672347b5155340b23656a))

### Features

- Add log-level
  ([`c78c125`](https://github.com/t03i/TMVisDB/commit/c78c125e16012dd30f0be0b8e6eea0355cc3e428))


## v1.0.9 (2024-11-11)

### Bug Fixes

- **backend**: Move data to root
  ([`53ae367`](https://github.com/t03i/TMVisDB/commit/53ae367bd388905e27461720ff8ad54b55bbe64b))

- **backend**: Remove shell wrapping
  ([`3e42296`](https://github.com/t03i/TMVisDB/commit/3e42296e518b55519f83f4bb8baf1ab09a8e079e))


## v1.0.8 (2024-11-11)


## v1.0.7 (2024-11-11)

### Bug Fixes

- Hotfix wrong path
  ([`b7da4e1`](https://github.com/t03i/TMVisDB/commit/b7da4e10e5cb1d1db19ae30ea6d164684c4ee66c))

- Update build deps
  ([`2cc1bc4`](https://github.com/t03i/TMVisDB/commit/2cc1bc45696e870711f1d49e49f0f7350318e6b9))


## v1.0.6 (2024-11-11)

### Bug Fixes

- **backend**: Hotfix for compose issues
  ([`4e38ce0`](https://github.com/t03i/TMVisDB/commit/4e38ce06da461a04f58240b935814f0d732bc4a9))


## v1.0.5 (2024-11-11)

### Bug Fixes

- Update production config
  ([`60fe3ea`](https://github.com/t03i/TMVisDB/commit/60fe3ea58184a46bd47ba9882da449cdbbbdc863))


## v1.0.4 (2024-11-11)

### Bug Fixes

- **backend**: Add data path
  ([`fba9486`](https://github.com/t03i/TMVisDB/commit/fba9486f276c95db2ca2a47aa716d6be97ee4ee0))


## v1.0.3 (2024-11-11)

### Bug Fixes

- **backend**: Force data directory
  ([`86bb193`](https://github.com/t03i/TMVisDB/commit/86bb1931327c4833d334044a684a992859e04f71))


## v1.0.2 (2024-11-10)

### Bug Fixes

- Improve sentry integration ([#5](https://github.com/t03i/TMVisDB/pull/5),
  [`0f21dda`](https://github.com/t03i/TMVisDB/commit/0f21dda1691ae317983052ae1160a9a302863420))

### Build System

- Add production compose override ([#4](https://github.com/t03i/TMVisDB/pull/4),
  [`2021bcb`](https://github.com/t03i/TMVisDB/commit/2021bcb934d97beaa0f4fa7eb3c2b76328364712))

- Add ssh deploy key
  ([`b686213`](https://github.com/t03i/TMVisDB/commit/b686213acbd7684efe0cfd0bb47f7d7c316cfa1e))

- Change script name
  ([`72f772a`](https://github.com/t03i/TMVisDB/commit/72f772a11568c3e445330cb526bdbf980881453c))

- Fix command true issue
  ([`1d69749`](https://github.com/t03i/TMVisDB/commit/1d6974901f3f16d288cd04f95b3ae8c12e59ffa7))

- Fix push
  ([`0895411`](https://github.com/t03i/TMVisDB/commit/08954119a0f0c903f43976ad6740151e6dfb3e64))

- Improve psr error logging
  ([`210553b`](https://github.com/t03i/TMVisDB/commit/210553b44df727c931ef8085c720fd6d5959e944))

- Update to manual push
  ([`f593325`](https://github.com/t03i/TMVisDB/commit/f5933255f91b91b19a1da1da0e413afa06c23178))


## v1.0.1 (2024-11-10)

### Bug Fixes

- Better check for release
  ([`7394634`](https://github.com/t03i/TMVisDB/commit/73946342f95a2d461c87edd6789d750f18e9bd3f))

### Build System

- Add checkout to allow CHANGELOG.md
  ([`0a4b651`](https://github.com/t03i/TMVisDB/commit/0a4b651f3106c05d58ebd7460160fa4c64d32228))

- Add cloudflare deployment
  ([`dfbce74`](https://github.com/t03i/TMVisDB/commit/dfbce7467ab85fc1fd16530e95307c6fd6916610))

- Add conditional noop
  ([`4289bda`](https://github.com/t03i/TMVisDB/commit/4289bda5a713a4b0ed075d4a0033dd6a5e11090f))

- Add debug info
  ([`102a019`](https://github.com/t03i/TMVisDB/commit/102a019f89207b80ec569802b1e91aaedb82342e))

- Add deployment url
  ([`f48ab80`](https://github.com/t03i/TMVisDB/commit/f48ab80308faf5097410efb8c760d29b5fe35720))

- Add environment
  ([`da98c72`](https://github.com/t03i/TMVisDB/commit/da98c72d268b1673cba0b5bef0b369e77f8d8e4d))

- Add hacky variable
  ([`30e8748`](https://github.com/t03i/TMVisDB/commit/30e8748d23172b67e77390bd1bd7dde42ab3cf32))

- Add login
  ([`8990dd0`](https://github.com/t03i/TMVisDB/commit/8990dd05d3c6e8e06e69d34dfbfbc4cbc5d95945))

- Add more debug output
  ([`532a1f6`](https://github.com/t03i/TMVisDB/commit/532a1f65e9c44e63d2cf88803790b61fa6def591))

- Add name to release workflow
  ([`a81c32c`](https://github.com/t03i/TMVisDB/commit/a81c32cc1bcd35e7df9f2b77cee45c4464f36cbb))

- Add proper tagging flags
  ([`3adf5dd`](https://github.com/t03i/TMVisDB/commit/3adf5dd2af7ffc25198a43eb2017ee2913684a99))

- Add release debug output
  ([`b9e886b`](https://github.com/t03i/TMVisDB/commit/b9e886bf8b94af182ac9bb00158c09d0feb6ed3a))

- Add release needed script
  ([`eea1a56`](https://github.com/t03i/TMVisDB/commit/eea1a56ad6ef4f1faf408540ff6c5c9385070e2e))

- Add tagging step
  ([`959d6a5`](https://github.com/t03i/TMVisDB/commit/959d6a57dd857477bc7081c8edd3ddea9fa5d747))

- Better tar structure
  ([`0160e71`](https://github.com/t03i/TMVisDB/commit/0160e7105ee9326966fa973ca34b651ada710577))

- Change back to json
  ([`b35299d`](https://github.com/t03i/TMVisDB/commit/b35299dd0f7276e28942e68ad7103942d832d3f5))

- Change retagging to script
  ([`f20cbb2`](https://github.com/t03i/TMVisDB/commit/f20cbb2dfde57b436ddcc6a0e3c45ef34bbdf930))

- Change tar location
  ([`cc6f788`](https://github.com/t03i/TMVisDB/commit/cc6f788f353bc0d86c0c8eefe874b620489d1e21))

- Change to variables from environment
  ([`d527d53`](https://github.com/t03i/TMVisDB/commit/d527d53fd4e16cef0659ad275a3c714f32977146))

- Fix action not found
  ([`9f2446f`](https://github.com/t03i/TMVisDB/commit/9f2446ffdc0bc90ee5e20bd3098d97f9871dd8b3))

- Fix archiving
  ([`4dd1187`](https://github.com/t03i/TMVisDB/commit/4dd11876200a80b92f35d014baed8142f7aa278e))

- Fix command
  ([`33632fc`](https://github.com/t03i/TMVisDB/commit/33632fcbaf19cb6c73e6466f880a389c794e723d))

- Fix credentials
  ([`b7d9da8`](https://github.com/t03i/TMVisDB/commit/b7d9da8029821346ac7d0f735cbde58ec44637ee))

- Fix job name
  ([`79347c0`](https://github.com/t03i/TMVisDB/commit/79347c02adaff711362b76494e6839d4a85ad2dc))

- Fix missing blank
  ([`a24e108`](https://github.com/t03i/TMVisDB/commit/a24e108c99d590d4fec343123aab0819aa279245))

- Fix noop position
  ([`e2f73f4`](https://github.com/t03i/TMVisDB/commit/e2f73f4539d6a1536964e7a8409bb308a3d62d7b))

- Fix order
  ([`f6af125`](https://github.com/t03i/TMVisDB/commit/f6af12521e097f1b7eca770c9aa3f5290574ed09))

- Fix psr config
  ([`970df97`](https://github.com/t03i/TMVisDB/commit/970df97fcd5b85119f313ac4c53e617f217f6923))

- Fix step name
  ([`1fa2d46`](https://github.com/t03i/TMVisDB/commit/1fa2d46598a5cd501aa03cc3d909d5bf8520843d))

- Fix syntax
  ([`aa00374`](https://github.com/t03i/TMVisDB/commit/aa003743aa9768fdd15f27ba046448fb22fed1c9))

- Fix tag shell escape
  ([`ddfc72e`](https://github.com/t03i/TMVisDB/commit/ddfc72e588d949a35a62a131d48d3f85b765dc6e))

- Improve login
  ([`f21e684`](https://github.com/t03i/TMVisDB/commit/f21e6846ee6b6089322aa362894b4b86764f2a55))

- Improve psr caching
  ([`260f966`](https://github.com/t03i/TMVisDB/commit/260f96668faff4164837d4d239a4a91469abe006))

- Move docker release past github
  ([`e6cf474`](https://github.com/t03i/TMVisDB/commit/e6cf474b56e4b6aad99d21671f1948ba464c461d))

- Redirect stderr
  ([`069ea31`](https://github.com/t03i/TMVisDB/commit/069ea3122d5525cf9f7cc2b22aa9bb111f5ab439))

- Remove debug output
  ([`f5c0e25`](https://github.com/t03i/TMVisDB/commit/f5c0e25910ccdbf1adf1ba5ad962951a9c25cdd1))

- Tar frontend artifacts
  ([`f7408e1`](https://github.com/t03i/TMVisDB/commit/f7408e13c0b66b53553db3adf4c0af669eb54ee9))

- Update artifact path
  ([`e5a70e1`](https://github.com/t03i/TMVisDB/commit/e5a70e1e94564100810b91a4b79af0392c19cf79))

- Update build path
  ([`cfd8155`](https://github.com/t03i/TMVisDB/commit/cfd8155f33f112c3331a0a608040238575cafd99))

- Update CHANGELOG path
  ([`195b489`](https://github.com/t03i/TMVisDB/commit/195b4896e1cf8d315ec19766a96896414d947a57))

- Update docker release to matrix strategy
  ([`ce35494`](https://github.com/t03i/TMVisDB/commit/ce3549410d7fa2796423c4b1c04aa927d953799c))

- Update frontend caching
  ([`79111b6`](https://github.com/t03i/TMVisDB/commit/79111b66a4a0a8962e90603bcbe540cbab56862d))

- Update uv tool dir
  ([`e6e15cd`](https://github.com/t03i/TMVisDB/commit/e6e15cd93797cb3b838985caa2f6d590e24767f6))


## v1.0.0 (2024-11-08)

### Bug Fixes

- Add database error message
  ([`ae3e226`](https://github.com/t03i/TMVisDB/commit/ae3e226f88a7758117f34ef0c9142389b2801c19))

- Change name to comps
  ([`a8d576f`](https://github.com/t03i/TMVisDB/commit/a8d576fa4163d8ae9e3e3a597db51d476dc79fb8))

https://stackoverflow.com/a/77157818

- Change paths
  ([`3c30a8e`](https://github.com/t03i/TMVisDB/commit/3c30a8e9fa9632821539d9ec2ab42d0738d203a1))

- Correct error handling for missing db connection
  ([`2727e51`](https://github.com/t03i/TMVisDB/commit/2727e519f1a4351a5e4213fc7c0fe5188c9d101c))

- Image name
  ([`c27a3d3`](https://github.com/t03i/TMVisDB/commit/c27a3d36fc16bd3156c6e3a92f39e04c094e6ad2))

- Path
  ([`5e03492`](https://github.com/t03i/TMVisDB/commit/5e034920adaa41341039557dc7df9c6412180d3a))

- Path update
  ([`91a7a7e`](https://github.com/t03i/TMVisDB/commit/91a7a7eb2eb0077f5d7c9ce877e0db24cc1baf92))

- Paths
  ([`4d5fe11`](https://github.com/t03i/TMVisDB/commit/4d5fe11517d097c13d5a3937c37944fee029404f))

- Residue highlighting
  ([`6d73582`](https://github.com/t03i/TMVisDB/commit/6d73582903c8a670be558d9d5820a9695d379bf2))

- Trigger viewer ready event correctly
  ([`f2ff578`](https://github.com/t03i/TMVisDB/commit/f2ff578e96fd37ff7b2df8cd96ed43c4976c665a))

- Update more paths
  ([`aeb6f51`](https://github.com/t03i/TMVisDB/commit/aeb6f51a2eaf7450990c9be56bec71af5a666272))

- **(frontend)**: Correct TMvisDB header
  ([`0ff2208`](https://github.com/t03i/TMVisDB/commit/0ff220859c05d703b200756242c2a00c00d26c16))

- **backend**: Fix linting issues
  ([`8d39ac7`](https://github.com/t03i/TMVisDB/commit/8d39ac772c1fa9c2aed537cd0f99fe91e175d0ab))

- **build**: Remove obsolete variable
  ([`df6492b`](https://github.com/t03i/TMVisDB/commit/df6492b0b769e852fa255c040cb7fe28b2e663d5))

- **frontend**: Add missing titles
  ([`baedff4`](https://github.com/t03i/TMVisDB/commit/baedff4d2cca50c133d90381c95fb316cd61d323))

- **frontend**: Correct issue templates
  ([`fa6f96a`](https://github.com/t03i/TMVisDB/commit/fa6f96a3d1d1d313e6e54fbd771b4d0e679f2b7a))

- **frontend**: Css var name generation
  ([`7e68cdc`](https://github.com/t03i/TMVisDB/commit/7e68cdc4ea945854d5890b76384715bac13427a2))

- **frontend**: Fix obsolete logging and functions
  ([`e39e171`](https://github.com/t03i/TMVisDB/commit/e39e1713fe39791726c97aabb9ea30c65baacfdb))

- **frontend**: Remove import bugs
  ([`6d9aad4`](https://github.com/t03i/TMVisDB/commit/6d9aad472af703b60ab4734bfb8582ee37f581aa))

- **frontend**: Resolve some ts issues
  ([`ddaa765`](https://github.com/t03i/TMVisDB/commit/ddaa7653e092ab6ac561616eaf9125db59911ab2))

- **frontend**: Update z-index to proper tailwind value
  ([`6eea305`](https://github.com/t03i/TMVisDB/commit/6eea3054a8d16bb5f2aa5954a801f38dc14c0162))

### Build System

- Add multi-root workspace
  ([`7d45ad9`](https://github.com/t03i/TMVisDB/commit/7d45ad9340e4e6e0e1e6bc797ada3ef5bb795ea1))

- Change image name
  ([`c4e9c92`](https://github.com/t03i/TMVisDB/commit/c4e9c923171692e82867b50e0d8f71a66a277bc8))

- Create automatic release pipeline
  ([`1fa874b`](https://github.com/t03i/TMVisDB/commit/1fa874b83757fce3de4075bb7f4cf61057f54ca5))

- Document markdown fix
  ([`2d8db23`](https://github.com/t03i/TMVisDB/commit/2d8db238521dd4d0743c5f3bd97f761601ef5a86))

- Fix build
  ([`6c0ff5e`](https://github.com/t03i/TMVisDB/commit/6c0ff5e1ba098be113bd9f44b1560dd5619f6864))

- Fix cli issue
  ([`70e6974`](https://github.com/t03i/TMVisDB/commit/70e6974e698100500ef36fe598f5937fc64c84b9))

- Fix commands
  ([`50071da`](https://github.com/t03i/TMVisDB/commit/50071da01699336e7a8c2a716d8c174108ca8689))

- Fix docker login
  ([`1246e2b`](https://github.com/t03i/TMVisDB/commit/1246e2b908c3b63b9a03325120d6f8defabcd3b8))

- Fix frontend docker building
  ([`1d9c6eb`](https://github.com/t03i/TMVisDB/commit/1d9c6ebfef55480808914179148418b6a7e1cd34))

- Fix no release being made
  ([`6082f47`](https://github.com/t03i/TMVisDB/commit/6082f478e098ebcf30e089c956593265dab79c56))

- Fix retagging
  ([`9d7dc69`](https://github.com/t03i/TMVisDB/commit/9d7dc69355a4f5afc6bc3d6c1fa7a24f84962627))

- Fix tags
  ([`4588d24`](https://github.com/t03i/TMVisDB/commit/4588d245a918f6543fab8095406ddc400ce9c5b8))

- Improve markdown linting
  ([`4dfc21f`](https://github.com/t03i/TMVisDB/commit/4dfc21f5101517608b4ea0656b256ce35e1c31c5))

- **backend**: Move to caddy proxy
  ([`599f011`](https://github.com/t03i/TMVisDB/commit/599f01189c1e0a23a05e64237b9c1816425686a6))

- **frontend**: Add frontend docker
  ([`457087e`](https://github.com/t03i/TMVisDB/commit/457087e8da68ca4fe196bac836c0d51d0be4f314))

- **frontend**: Add frontend docker
  ([`3afec3d`](https://github.com/t03i/TMVisDB/commit/3afec3d069e8873d01dce5b9419b0bc35d78bff5))

- **frontend**: Add package manager
  ([`76592bf`](https://github.com/t03i/TMVisDB/commit/76592bfae29ddfa4f668c4fa4ed695f45730e98d))

- **frontend**: Improve layer caching
  ([`3925cd1`](https://github.com/t03i/TMVisDB/commit/3925cd1af117ac6033a56bffd6bab4e976f17586))

- **frontend**: Remove svelte-query-devtools
  ([`01bd48b`](https://github.com/t03i/TMVisDB/commit/01bd48b80084dd4aaa2a06645218dd3f27fa60c8))

Removed query tools from production

- **frontend**: Update dependencies
  ([`73437a0`](https://github.com/t03i/TMVisDB/commit/73437a0fa7b3b280200f1f1346e9e69e58ab8129))

- **frontend**: Update docker compose to work locally
  ([`061044d`](https://github.com/t03i/TMVisDB/commit/061044da2c180076c943301d77ac2cdc4bb58e78))

### Chores

- Add analyze to db migrations
  ([`58b07ad`](https://github.com/t03i/TMVisDB/commit/58b07ad45381383feede5f09ff9b1822c571ef6a))

- Add initial alembic migration
  ([`06797b5`](https://github.com/t03i/TMVisDB/commit/06797b57a9d4085a6ac493d2df60c61302d7621a))

- Add sqlmodel to mako template
  ([`34574ce`](https://github.com/t03i/TMVisDB/commit/34574ced6d77512b95f947287f40b525a952cb4d))

- Fix db migration to work with sqlite
  ([`2f2fe88`](https://github.com/t03i/TMVisDB/commit/2f2fe8836327469d9a441865913386f1816c5cf8))

- Fix missing import in alembic file
  ([`278f6e9`](https://github.com/t03i/TMVisDB/commit/278f6e9c45a0798bd0b987f8fa6fc6ebf9e71741))

- Rename scripts folder to be more understandable
  ([`8269a0f`](https://github.com/t03i/TMVisDB/commit/8269a0fb9ad298d47d9684b47b669bcd966cb17e))

### Continuous Integration

- Add production environment to frontend builder
  ([`be3daef`](https://github.com/t03i/TMVisDB/commit/be3daef6a5cfda44cbb4da4c8b413be12c5ca240))

- Add semantic release basics
  ([`02432f6`](https://github.com/t03i/TMVisDB/commit/02432f65cb7b5a2852456525f5f080b43eb07acc))

- Fix variables
  ([`90bab8f`](https://github.com/t03i/TMVisDB/commit/90bab8f2482011b1fcb21c4eccbc270ac9644d9c))

- Remove .env file
  ([`f37beda`](https://github.com/t03i/TMVisDB/commit/f37beda08fb6396812c146c74138e0ed87e3e355))

- Temporarily force docker build
  ([`49ea4bf`](https://github.com/t03i/TMVisDB/commit/49ea4bf31552334d7fe69f2f85b8aa74c3105412))

- **frontend**: Add basic docker workflow
  ([`99db8dd`](https://github.com/t03i/TMVisDB/commit/99db8ddb6dedb2b3c76c19d89561cb35d3be86b1))

### Documentation

- Add basic README and LICENSE
  ([`46d74e5`](https://github.com/t03i/TMVisDB/commit/46d74e537be37d94b270994b9b5e014bfaf0d40a))

- Add CoC
  ([`b224706`](https://github.com/t03i/TMVisDB/commit/b224706d8a166fa868552de5b6034e0ae3556bc5))

- Add cSpell words
  ([`1d49c32`](https://github.com/t03i/TMVisDB/commit/1d49c32d3ea047e53417001eef8729ad990eca9e))

- Add file attachment tip
  ([`f040814`](https://github.com/t03i/TMVisDB/commit/f040814d219b6a1a3df5be7d8b89ca806332595d))

- Add issue templates
  ([`9e96b21`](https://github.com/t03i/TMVisDB/commit/9e96b21591fa074a58fd1e47fa3a1595ebfbb48e))

- Add logo to readme
  ([`7567d66`](https://github.com/t03i/TMVisDB/commit/7567d66536c8a18c92623fa2f97e3b8ca6b7154a))

- Add structure image
  ([`910d91e`](https://github.com/t03i/TMVisDB/commit/910d91eab1641bebb6965ff5b3a6f7e3dd2c079a))

- Add todo for future config fix
  ([`f2547e6`](https://github.com/t03i/TMVisDB/commit/f2547e68186c17362f2e9fd16044cd51669025ed))

- Change logo color
  ([`c8e29c3`](https://github.com/t03i/TMVisDB/commit/c8e29c32402508994782467eed4aefb0de8a9016))

- Correct coloring for sheets
  ([`0f440db`](https://github.com/t03i/TMVisDB/commit/0f440dbd245c952224c5580a41ed4e4cdae0184d))

- Fix CoC linting
  ([`3a8fa4b`](https://github.com/t03i/TMVisDB/commit/3a8fa4be561d1b3f20cf74698a6467935852c14d))

- Fix non-working formatting
  ([`16aa527`](https://github.com/t03i/TMVisDB/commit/16aa527ee471dce0869a4455f0aee4901cc255ce))

- Fix title
  ([`618685e`](https://github.com/t03i/TMVisDB/commit/618685e6fc97853f47f472f1afea83faa9861ff5))

- Ignore DOI names
  ([`9abc1c3`](https://github.com/t03i/TMVisDB/commit/9abc1c3bdb18ef2c9e654541700d0f602be677f1))

- Remove explicit name from pages
  ([`ea7e208`](https://github.com/t03i/TMVisDB/commit/ea7e2088d7a3eafa443c40aa389173bd086f4681))

- Update resource links
  ([`79c4a66`](https://github.com/t03i/TMVisDB/commit/79c4a6689217c984a70164af09948d8e7eda9cc9))

- **frontend**: Remove hardcoded name from landing page
  ([`a1f85ef`](https://github.com/t03i/TMVisDB/commit/a1f85ef165ed1c913ef39a67f50146f2119b72e9))

### Features

- Add favicon and page titles
  ([`6174c12`](https://github.com/t03i/TMVisDB/commit/6174c12ab912cdc3a68cb669c5c65841fd9d7942))

- **frontend**: Add better GitHub support links
  ([`2cc41e2`](https://github.com/t03i/TMVisDB/commit/2cc41e25364b1a2aaa1fb44a04d0fcee850ee8aa))

- **frontend**: Add bug label
  ([`3dd5365`](https://github.com/t03i/TMVisDB/commit/3dd536535a225bf6b9c45702dc18cc68c2934528))

- **frontend**: Add custom privacy notice
  ([`f0d5b39`](https://github.com/t03i/TMVisDB/commit/f0d5b39aa0640e25368dcffe26760bf15cf38d08))

- **frontend**: Add maintenance mode
  ([`1931e71`](https://github.com/t03i/TMVisDB/commit/1931e71867c8a3a4aaae11a31f305e875da5fd3c))

- **frontend**: Add overview image
  ([`d3afe3c`](https://github.com/t03i/TMVisDB/commit/d3afe3cdb1441473e216f5ae0b7adc45c21a157a))

- **frontend**: Add reference component
  ([`0c496a6`](https://github.com/t03i/TMVisDB/commit/0c496a62c88b0b847d59cd781aca735c76057147))

- **frontend**: Add reference component and citation page
  ([`b0b1118`](https://github.com/t03i/TMVisDB/commit/b0b111844e58d175da4e3bfbcd6a4df741bd998e))

- **frontend**: Add structure color visualization ([#3](https://github.com/t03i/TMVisDB/pull/3),
  [`0d6eddd`](https://github.com/t03i/TMVisDB/commit/0d6eddd0231dcd393ddf7e3452476102ed659e95))

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

* Dependency update

- **frontend**: Improve maintenance styling
  ([`f583fb8`](https://github.com/t03i/TMVisDB/commit/f583fb854fb1cbae7ad9ba5292aba325b638ce35))

- **frontent**: Add missing lables for entity issues
  ([`f076932`](https://github.com/t03i/TMVisDB/commit/f076932809af89202a4809ea6b7fb9e081eabf98))

### Performance Improvements

- Change ro config to be more compatible with alembic
  ([`8df1ee9`](https://github.com/t03i/TMVisDB/commit/8df1ee929d777001afd34fb9d3faddf6e1d96e10))

- Set db to read only mode
  ([`20e6d8e`](https://github.com/t03i/TMVisDB/commit/20e6d8eed3941d2e9d712da8767db19932c98b2a))

- Update cache size
  ([`8d83e17`](https://github.com/t03i/TMVisDB/commit/8d83e1783143baa68bef90e0447afc1991f684bc))

- **frontend**: Dynamically load citation plugin to avoid large bundle
  ([`b08f285`](https://github.com/t03i/TMVisDB/commit/b08f285c46d3a3d0f2eb65d2fa0602a2c79e6744))

### Refactoring

- **frontend**: Improve layout maintainability
  ([`1e67048`](https://github.com/t03i/TMVisDB/commit/1e670487ab56b310b663dac0487f560a742173b8))

- **frontend**: Remove maintenance message
  ([`a2f422a`](https://github.com/t03i/TMVisDB/commit/a2f422ad4bb2e6fada3d01da809d10029d7f35ec))

- **frontend**: Unify icons
  ([`4a73095`](https://github.com/t03i/TMVisDB/commit/4a7309590117e649c7b33951a1df4221807eb3c7))
