module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': 'npm run \"lint\" --cache --fix',
  'src/**/*.{js,jsx,ts,tsx,css,scss,md}': 'prettier --write --ignore-unknown',
};
