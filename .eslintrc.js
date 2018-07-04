module.exports = {
    "extends": "airbnb",
    "env": {
      "mocha": true
    },
    "rules": {
      "no-unused-vars": [
        "error",
        { "varsIgnorePattern": "should|expect" },
      ],
      "allowNamedFunctions": true
    }
};