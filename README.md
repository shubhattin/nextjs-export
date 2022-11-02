## Nextjs _Export_ for **_i18n_**

Nextjs does not supports **static export** for **_i18n_**. So this is a simple tool for doing static HTML Export for such projects.

```
npm install --save-dev nextjs-export
or
yarn install --prod nextjs-export
or
pnpm install -D nextjs-export
```

Now you can call this this throug command `npx nextjs-export` (in the root directory of nextjs). You should add this in `package.json` in the `scripts`

```json
"scripts": {
    "export": "npx nextjs-export"
}
```

To ignore a file or a folder in the `public` folder from being copied to `out` make `.export_ignores` in `public` folder. So these files will not be copied to `out` folder.

```
icon.ico
test.png
```
