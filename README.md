# Saikat Ghosh — Java Developer

A responsive, lightweight portfolio with tactile artwork, slow CSS aurora motion, and clear recruiter navigation.

Live: https://saikat-ghosh-in.github.io/portfolio/

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

## Deploy to GitHub Pages

```sh
npm run deploy
```

This builds the current files and pushes only the generated website to the `gh-pages` branch of `origin`. It removes stale published files, skips unchanged deployments and uses an ordinary push. Your source branch and working files stay in place. Commit and push source edits to `main` separately to save them on GitHub.

Git must already be signed in with write access (Git Credential Manager or SSH), with `user.name` and `user.email` configured. Authentication or push failures exit unsuccessfully. No tokens are stored by the script. To use a different remote:

```sh
npm run deploy -- --remote https://github.com/saikat-ghosh-in/portfolio.git
```

Repository Settings → Pages must use **Deploy from a branch**, **gh-pages**, **/(root)**. GitHub's Pages build may take a few minutes after a push.

## Design and performance

Java Developer positioning reflects professional backend experience; JavaScript and React are personal-project skills. All critical assets are local, with no framework runtime, remote fonts, WebGL or loading screen. Native project disclosures work without JavaScript. Motion respects reduced-motion preferences and does not follow the cursor. The initial-load target is under three seconds; network and device conditions affect actual timing.
