# Saikat Ghosh — Java Developer

A responsive, lightweight portfolio with tactile artwork, slow CSS aurora motion, and clear recruiter navigation.

Live: https://saikat-ghosh-portfolio.pages.dev/

## Develop

Requires Node.js 22+ and Git. No npm dependencies are needed.

```sh
git clone https://github.com/saikat-ghosh-in/portfolio.git
cd portfolio
npm run dev
```

Open http://127.0.0.1:4173. Edit the static source in `dist/`.

## Build and verify

```sh
npm test
npm run build
```

The build validates internal links, local assets, image dimensions and transfer budgets, then copies the website to `build/` with `.nojekyll`. Build output is ignored by Git. Tests exercise deployment with a local bare Git repository.

## Deploy to Cloudflare Pages

```sh
npm run deploy
```

This builds the current files and pushes only the generated website to the `deploy` branch of `origin`. The connected Cloudflare Pages project automatically publishes that branch. It removes stale published files, skips unchanged deployments and uses an ordinary push. Your source branch and working files stay in place. Commit and push source edits to `main` separately to save them on GitHub.

Git must already be signed in with write access (Git Credential Manager or SSH), with `user.name` and `user.email` configured. Authentication or push failures exit unsuccessfully. No tokens are stored by the script. To use a different remote:

```sh
npm run deploy -- --remote https://github.com/saikat-ghosh-in/portfolio.git
```

Cloudflare Pages connects to this repository with production branch **deploy**, framework preset **None**, build command **exit 0**, and build output directory **.** (the branch root). Automatic preview branch deployments are disabled. The deployment branch already contains the built static website. A successful Git push starts publication; Cloudflare's deployment status confirms when it is live.

The source remains on `main`; only `deploy` is published. GitHub Pages is retired and its `gh-pages` branch is no longer used. No Cloudflare API token or paid service is needed for this Git integration.

## Design and performance

Java Developer positioning reflects professional backend experience; JavaScript and React are personal-project skills. All critical assets are local, with no framework runtime, remote fonts, WebGL or loading screen. Native project disclosures work without JavaScript. Motion respects reduced-motion preferences and does not follow the cursor. The initial-load target is under three seconds; network and device conditions affect actual timing.
