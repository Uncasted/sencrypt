/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/*.jsx", "./src/**/*.jsx"],
    theme: {
        extend: {
            colors: {
                "black-1": "#1a1a1a"
            },
            boxShadow: {
                "total": "0 0 10px 5px rgba(0, 0, 0, 0.1)"
            }
        },
    },
    plugins: [require('daisyui')],
}
