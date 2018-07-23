module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jasmine": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 6,
		"ecmaFeatures": {
			"modules": true,
			"experimentalObjectRestSpread": true
		}
	},
	"globals": {
		"Component": true,
		"wx": true,
		"pathCombine": true,
		"PubSub": true,
		"Component": true,
		"wx": true,
		"getCurrentPages": true,
		"Page": true,
		"getApp": true,
		"require": true,
		"TF": true,
		"requirejs": true
	},
	"rules": {
		// "indent": [
		//     "error",
		//     2
		// ],
		"space-unary-ops": 2,
		"no-else-return": 1,
		"spaced-comment": ["error", "always", { "markers": ["/"] }],
		// "linebreak-style": [
		//     "error",
		//     "windows"
		// ],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-alert": "off",
		"no-console": "off",
		"no-var": "off",
		"lines-between-class-members": ["error", "always"],
		"func-style": ["error", "declaration"],
		"no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 1 }],
	}
};