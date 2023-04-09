const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Light colors
				'primary-light': '#f5f5f5', // 100
				'secondary-light': '#a3a3a3', // 400
				'ternary-light': '#f6f7f8',

				// Dark colors
				'primary-dark': '#262626', // 800
				'secondary-dark': '#525252', // 600
				'ternary-dark': '#1E3851',

				// Extended v3 color
				gray: colors.neutral,
			},
			container: {
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '5rem',
					xl: '6rem',
					'2xl': '8rem',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};