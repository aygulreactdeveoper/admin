/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html", // Scan all HTML files in the root and subdirectories
    "./src/**/*.{js,jsx,ts,tsx,vue}", // Scan JS, JSX, TS, TSX, Vue files in the src folder
    // Add other paths as needed, e.g., if you have components in other folders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

