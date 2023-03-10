---
pcx_content_type: how-to
title: Deploy a Honojs site
---

# Deploy a Honojs site

[Hono](https://honojs.dev/) is a small, simple, and ultrafast web framework for Cloudflare Pages and Workers, Deno, and Bun. In this guide, you will create a new Honojs application and deploy it using Cloudflare Pages.

## Create a new project

Create a new project by running the following commands in your terminal:

```sh
$ mkdir my-hono-app
$ cd my-hono-app
$ npm init -y

# Make sure Hono is installed
$ npm install hono

# Install the required dependencies
# ESBuild is needed to bundle the hono app code
# npm-run-all enables us to run multiple npm commands at once 
$ npm install --save-dev wrangler esbuild npm-run-all 
```

Open your project and create a `src/server.js` file. Add the following content to your file:

```javascript
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (ctx) => ctx.text('Hello world, this is Hono!!'))

export default app
```

If you want to serve static files like CSS, image or JavaScript files, you will need to add the following to your `src/server.js` file:

```javascript
app.get('/public/*', async (ctx) => {
    return await ctx.env.ASSETS.fetch(ctx.req)
})
```

This will cause all the files in the `pub` folder within `dist` to be served in your application.

Open your `package.json` file and update the `scripts` section:

```json
    "scripts": {
        "dev": "run-p dev:*",
        "dev:wrangler": "wrangler pages dev dist --live-reload",
        "dev:esbuild": "esbuild --bundle src/server.js --format=esm --watch --outfile=dist/_worker.js",
        "build": "esbuild --bundle src/server.js --format=esm --outfile=dist/_worker.js",
        "deploy": "wrangler pages publish dist"
    },
```

Here `npm-run-all` enables you to use a single command `npm run dev` to run `npm run dev:wrangler` and `npm run dev:esbuild` together simultaneously in watch mode.

## Run in local dev

Start your dev workflow by running:

```shell
$ npm run dev
```

You should be able to review your generated web application at `http://localhost:8788`.

{{<render file="_tutorials-before-you-start.md">}}

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/<yourgithubusername>/my-hono-app
$ git branch -M main
$ git push -u origin main
```

## Deploy with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value         |
| -------------------- | ------------- |
| Production branch    | `main`        |
| Build command        | `npm run dev` |
| Build directory      | `dist`        |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `my-hono-app`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Honojs site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Honojs site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
