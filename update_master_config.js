var yaml = require('js-yaml');
var fs = require('fs');

var mcpDir = '/var/lib/origin/openshift.local.config';
var mcpJSFile = mcpDir + '/mcp.js';
var mcpCSSFile = mcpDir + '/mcp.css';
var configFile = process.argv.slice(-1)[0];
var yamlFile = yaml.safeLoad(fs.readFileSync(configFile));


// Enable extension development
yamlFile.assetConfig.extensionDevelopment = true;

// Add mcp js files
yamlFile.assetConfig.extensionScripts = yamlFile.assetConfig.extensionScripts || [];
if (yamlFile.assetConfig.extensionScripts.indexOf(mcpJSFile) < 0) {
  yamlFile.assetConfig.extensionScripts.push(mcpJSFile);
}

// Add mcp css files
yamlFile.assetConfig.extensionStylesheets = yamlFile.assetConfig.extensionStylesheets || [];
if (yamlFile.assetConfig.extensionStylesheets.indexOf(mcpCSSFile) < 0) {
  yamlFile.assetConfig.extensionStylesheets.push(mcpCSSFile);
}

// write file
fs.writeFileSync(configFile, yaml.safeDump(yamlFile));