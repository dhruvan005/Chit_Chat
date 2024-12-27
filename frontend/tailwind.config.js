module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
      colors: {
        hoverBlack : '#202122'
       }
    },
    plugins: [
      require('daisyui'),
    ],
  }