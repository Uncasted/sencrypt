/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/*.jsx", "./src/**/*.jsx"],
    theme: {
        extend: {
            colors: {
                "black-0": "#0e0f10",
                "black-1": "#1a1a1a",
                "gray-1": "#393e41",
                "gray-2": "#5a6267",
                "dark-blue-0": "#001f33",
                "dark-blue-1": "#001e30",
                "dark-blue-2": "#00273e",
                "dark-blue-3": "#002237",
                "dark-blue-4": "#003455",
                "dark-blue-5": "#123B56",
                "dark-blue-6": "#0D2A3D",
                "blue-0": "#0080CD",
                "blue-1": "#099cea",
                "blue-2": "#088dd4",
                "blue-3": "#074c77",
                "light-blue-1": "#7f9aa8"
            },
            boxShadow: {
                "total": "0 0 10px 5px rgba(0, 0, 0, 0.1)"
            }
        },
    },
    plugins: [require('daisyui')],
}
