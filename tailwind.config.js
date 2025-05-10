/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx}"],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                "gradient-x": "gradient-x 8s ease infinite",
            },
            keyframes: {
                "gradient-x": {
                    "0%, 100%": {
                        backgroundPosition: "0% 50%",
                    },
                    "50%": {
                        backgroundPosition: "100% 50%",
                    },
                },
            },
            backgroundSize: {
                "size-200": "200% 200%",
            },
        },
    },
    plugins: [],
};
