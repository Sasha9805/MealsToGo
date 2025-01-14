// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ["expo"],
	ignorePatterns: ["/dist/*"],
	rules: {
		quotes: [2, "double", { avoidEscape: true }],
	},
};
