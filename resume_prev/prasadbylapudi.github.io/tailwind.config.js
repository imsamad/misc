/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', './src/**/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {},
			colors: {
				dark: 'rgb(3 7 18 / 1)',
				primary: '#34D399'
			},
			fontFamily: {
				montserrat: ['Montserrat'],
				inter: ['Inter'],
				'roboto-mono': ['Roboto Mono'],
				'jetbrains-mono': ['JetBrains Mono']
			}
		}
	},
	plugins: []
};
