/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{astro,html,jsx,tsx,svelte,vue,js,ts}",
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		extend: {
			screens: {
				sm: "400px"
			},
			keyframes: {
				rotateUp: {
					"0%": { transform: "rotate(0.0deg)" },
					"10%": { transform: "rotate(18deg)" },
					"20%": { transform: "rotate(36deg)" },
					"30%": { transform: "rotate(54deg)" },
					"40%": { transform: "rotate(72deg)" },
					"50%": { transform: "rotate(90deg)" },
					"100%": { transform: "rotate(180deg)" }
				},
				rotateDown: {
					"0%": { transform: "rotate(-90.0deg)" },
					"20%": { transform: "rotate(-72deg)" },
					"30%": { transform: "rotate(-54deg)" },
					"40%": { transform: "rotate(-36deg)" },
					"50%": { transform: "rotate(-18deg)" },
					"100%": { transform: "rotate(-0deg)" }
				}
			},
			animation: {
				rotateDown: "rotateDown 0.5s linear forwards",
				rotateUp: "rotateUp 0.5s linear forwards"
			}
		}
	},
	plugins: [require("flowbite/plugin")]
}
