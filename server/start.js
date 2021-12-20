require("@babel/register")({
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
});

// Import the rest of our application.
module.exports = require("./app.js");
