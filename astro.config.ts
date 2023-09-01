import { defineConfig } from "astro/config" // Astro integration imports

import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import { VitePWA } from "vite-plugin-pwa" // Helper imports

import { manifest, seoConfig } from "@util/seoConfig"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	site: seoConfig.baseURL,
	output: "server",
	server: {
		port: 3005
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
			configFile: "./tailwind.config.js"
		}),
		sitemap(),
		compress(),
		react()
	],
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
					globDirectory: "dist",
					globPatterns: [
						"**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}"
					],
					navigateFallback: null
				}
			})
		]
	},
	adapter: vercel()
})
