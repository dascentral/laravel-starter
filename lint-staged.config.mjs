export default {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,css,md,mdx}': ['prettier --write'],
  '*.php': ['./vendor/bin/pint --dirty'],
};
