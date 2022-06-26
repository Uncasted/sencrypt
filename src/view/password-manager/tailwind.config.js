/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/*.jsx", "./src/**/*.jsx"],
    theme: {
        extend: {
            colors: {
                "black-1": "#1a1a1a"
            }
        },
    },
    plugins: [require('daisyui')],
}
