const convert = require('xml-js');
const xmlFormat = require('xml-formatter');

// Your XML data
let xmlString = `
<scriptsonly app="Spark Labs Workspace, https://snap.berkeley.edu" version="2"><script x="16" y="12.333333333333343"><block s="forward"><l>10</l></block><block s="turn"><l>15</l></block><block s="turnLeft"><l>15</l></block><block s="setHeading"><l>180</l></block><block s="doFaceTowards"><l><option>center</option></l></block><block s="gotoXY"><l>0</l><l>0</l></block><block s="doGlide"><l>1</l><l>0</l><l>0</l></block><block s="bounceOffEdge"></block></script></scriptsonly>
`;

// Convert XML to JSON
let json = convert.xml2js(xmlString, {compact: true, spaces: 4});

// Convert JSON to plain text
let plainText = JSON.stringify(json);

// Now you can convert plain text back to XML
let xml = xmlFormat(plainText);
