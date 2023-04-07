## WoW Trade

## Template

https://github.com/shaunchander/astro-pwa-starter


## 📦 Dependencies

Here is a list of core dependencies that astro-pwa-starter relies on in case you need to extend the starter/look into more documentation:

| Package                                                                               | Purpose                                                                                               |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`@astrojs/sitemap` ](<[https://](https://www.npmjs.com/package/@astrojs/sitemap)>)   | Generates an accessible sitemap for Astro websites.                                                   |
| [`@astrojs/tailwind` ](<[https://](https://www.npmjs.com/package/@astrojs/tailwind)>) | Automatically sets up TailwindCSS.                                                                    |
| [`astro-compress` ](<[https://](https://www.npmjs.com/package/astro-compress)>)       | Compresses all static assets into minified files.                                                     |
| [`astro-seo` ](<[https://](https://www.npmjs.com/package/astro-seo)>)                 | Provides a helpful component for configuring SEO.                                                     |
| [`vite-plugin-pwa` ](<[https://](https://www.npmjs.com/package/vite-plugin-pwa)>)     | Configures a service-worker for offline-accessability and generates a webmanifest for PWA compliance. |

## 🤖 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `pnpm install`          | Installs dependencies                              |
| `pnpm run dev`          | Starts local dev server at `localhost:3000`        |
| `pnpm run build`        | Build your production site to `./dist/`            |
| `pnpm run preview`      | Preview your build locally, before deploying       |
| `pnpm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `pnpm run astro --help` | Get help using the Astro CLI                       |


### Understanding the project structure

First, and foremost, is the project structure, in other words, how the files are laid out in the project. The starter follows a very similar convention to the one seen [in Astro's own documentation](<[https://](https://docs.astro.build/en/core-concepts/project-structure/)>). However, we've made some changes:

1. Every static asset should be placed inside `/src/assets/` instead of the public folder, there are two subfolders (`/img` and `/svg`) to distinguish between images and graphics.
2. Use the `/utils` to include any helper scripts or configuration files like GraphQL clients or TypeScript types.
3. The `src/components/globals` folder contains three premade global components: the site header, footer, and layout (we'll talk about the layout in a bit).

Most of where you'll work is directly inside `/src`. If you're curious to know what **every** file and directory in the starter does, checkout the documentation after reading this guide.

---

### Creating pages

When you create a new page, place it inside the `/src/pages/` directory and make sure it's a `.astro` file. Then, import the `<Layout />` component as such:

```html
---
import { Layout } from "@globals"
---

<Layout title="Home Page"> // ... </Layout>
```

You'll notice we imported the component from `@globals`, we'll talk about that later.

The `<Layout />` global component is responsible for rendering your website's `<header />`, `<main />`, and `<footer />` tags. Not only that, it also injects page-specific SEO such as a page title and description. Refer to the documentation on `<Layout />` to see what props you can pass to it.

Make sure to always include a layout component on every page!

---

### Creating components

Place new components inside the `/src/components` directory.

We **highly recommend** for you to follow a directory-based approach when creating new components. That is, create a new directory inside of `/src/components` such as `/src/components/HelloWorld`, then place your component logic inside. The structure should look like this:

```
components
└── HelloWorld
    ├── HelloWorld.astro
    └── index.ts
```

You'll notice we also threw in a `index.ts` file. This is where you should export the component as a **named export**:

```ts
// index.ts

export { default as HelloWorld } from "./HelloWorld.astro"
```

Doing a directory-based approach and named export is good for two reasons:

1. It compartamentalizes **all** component logic into discrete folders (including styles or extra scripts)
2. It prevents you from accidently renaming a component later on in the project (named exports help with naming consistency).

When you want to use `<HelloWorld />`, you can import it using our handy-dandy import aliases:

```ts
import { HelloWorld } from "@partials/HelloWorld"
```

Again, we'll talk about import aliasing in more detail in a bit!

---

### Working with images and SVGs

We mentioned it briefly before but there exists a `/src/assets` directory where you're supposed to throw in your images and SVGs. This directoy actually has two subdirectories that look like this:

```
assets
  img
  svg
    icons
```

It's straightforward but just to make it clear:

- Add all your .png, .jpeg, .avif, .webp, etc. into the `img` directory
- Add all your SVGs into the `svg` directory or `svg/icons` directory depending on if it's an icon or regular graphic.

You can then reference your static assets using an import alias like so:

```
import MyAwesomeImage from "@img/my-awesome-image.png"
import SVGBackground from "@svg/svg-background.svg"
import SomeIcon from "@icon/some-icon.svg
```

Again we will talk about import aliases in more detail soon!

---

### Configuring the default SEO

astro-pwa-starter ships with an SEO configuration file to setup defaults for your website!

You'll find it inside the `/utils` folder (note, we put it there because it's a configuration file!). It's called `seoConfig.ts` and it exports two very important objects:

- seoConfig
- manifest

`seoConfig` is used in the `<Layout />` component to set **default SEO** values. These include values like a site-wide description, site-wide thumbnail, etc. If you pass props to `<Layout />` then those will **overwrite** the default SEO values.

`manifest` is used to generate your website manifest file, which is important for PWA-compliance.

There are helpful comments within `seoConfig.ts` that will guide you when configuring and customizing the file.

Make sure you fully customize every recommended field to take full advantage of astro-pwa-starter's built-in SEO optimization!

**Don't forget to also** customize the color themes present in `<Layout />` and `browserconfig.xml`!

If you want to learn more about `seoConfig.ts`, checkout the documentation after finishing this guide.

---

### Customizing SEO for a page

We briefly mentioned it before but the global `<Layout />` component also handles your page's SEO. You can pass it different, SEO-based props like `title`, `description`, or `image` to set the page's title, description, and OpenGraph Thumbnail:

```html
---
import { Layout } from "@globals"
---

<Layout title="Home Page" description="Welcome to my website's homepage!">
	// ...
</Layout>
```

If you're working with an error page like `404.astro`, then you can pass a `disableIndexing` prop to completely remove the page from crawlers:

```html
---
import { Layout } from "@globals"
---

<Layout title="Not Found" disableIndexing="{true}"></Layout>
```

---

### Using a custom favicon

We recommend using a service like [Favycon](https://favycon.vercel.app/) to generate your website's favicons (this is what we used). Make sure you have a 512x512 maskable icon before generating your favicons!

After generation, you can directly paste your favicons straight into `/public/favicons`. Make sure to overwrite/replace all favicons in the directory. Afterwards, you'll be up and running with your own custom favicon.

syncore-astro-starter is already pre-configured to pull favicons from `/public/favicons`, so as long as you used Favycon/have the exact same favicons we had originally then the starter will be able to automatically pull and inject your favicons in the final build.

---

### Import aliases

Finally, import aliases.

One the best features of astro-pwa-starter is its extensive list of import aliases.

For those unfamiliar with import aliases, they make working with components and external assets much easier. Instead of having to directly reference an asset like such:

```ts
import { MyComponent } from "../../partials/MyComponent"
import SomeImage from "../../assets/img/some-image.png"
```

You instead can do something more streamlined:

```ts
import { MyComponent } from "@partials/MyComponent"
import SomeImage from "@img/some-image.png"
```

The best part about this is that **you can use an import alias at any level in your website** and still be able to access the asset you're trying to reach. No more `../../../../` hell.

For quick reference, here's a list of all import aliases available to you:

| Alias          | Purpose                             | Example                                                 |
| -------------- | ----------------------------------- | ------------------------------------------------------- |
| `@globals`     | Fetch global components             | `import { Layout } from "@globals`                      |
| `@component/*` | Fetch regular components            | `import { PriceTable } from "@component/PriceTable`     |
| `@util/*`      | Import utilities                    | `import { seoConfig, manifest } from "@util/seoConfig"` |
| `@img/*`       | Imports images                      | `import MyImage from "@img/my-image.png"`               |
| `@svg/*`       | Imports SVGs                        | `import MySVG from "@svg/my-svg.svg`                    |
| `@icon/*`      | Imports SVG icons from `/svg/icons` | `import MyIcon from "@icon/my-icon.svg`                 |
| `@style/*`     | Fetches stylesheets                 | `import "@style/tailwind.css"`                          |

## 📖 Documentation

This documentation looks at astro-pwa-starter from a top-down perspective, providing insight into every directory and file available in the base starter.

### File structure

The base project structure looks like this:

```
.vscode
public
├── favicons
├── browserconfig.xml
├── humans.txt
└── robots.txt
src
├── assets
│   ├── img
│   └── svg
│       └── icons
├── components
│   └── global
│       ├── Footer
│       │   ├── Footer.astro
│       │   └── index.ts
│       ├── Header
│       │   ├── Header.astro
│       │   └── index.ts
│       └── Layout
│           ├── index.ts
│           └── Layout.astro
├── pages
│   └── index.astro
├── styles
│   └── tailwind.css
└── env.d.ts
utils
└── seoConfig.ts
.editorconfig
.env
.eslintrc.js
.gitignore
.npmrc
.prettierignore
.prettierrc.js
astro.config.ts
package.json
README.md
tailwind.config.js
tsconfig.json
```

---
