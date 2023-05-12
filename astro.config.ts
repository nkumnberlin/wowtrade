import { defineConfig } from "astro/config" // Astro integration imports

import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import { VitePWA } from "vite-plugin-pwa" // Helper imports

import { manifest, seoConfig } from "./utils/seoConfig"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel/serverless"
import { AstroIntegration } from "astro"
import { initializeDatabase, killConnection } from "./src/api/services/database" // https://astro.build/config

// https://astro.build/config
export default defineConfig({
	site: seoConfig.baseURL,
	experimental: {
		assets: true
	},
	output: "server",
	server: {
		port: 3005
	},
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
				path: "./tailwind.config.js"
			}
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
