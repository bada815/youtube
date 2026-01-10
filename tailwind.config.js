/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                yt: '#FF0000',
                dark: '#0f0f0f',
                card: '#1e1e1e',
                darkBg: '#0f0f0f',
                darkCard: '#1e1e1e'
            }
        },
    },
    plugins: [],
}
