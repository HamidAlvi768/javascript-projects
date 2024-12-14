const fs = require('fs');
const path = require('path');

// List of project directories
const projectDirs = [
    '1-colorChanger',
    '2-BMICalculator',
    '3-DigitalClock',
    '4-GuessTheNumber',
    '5-keyboard',
    '6-unlimitedColors',
    '7-scroll',
    '8-typer',
    '9-mouseCircle',
    '10-emoji',
    '11-textEditor',
    '12-randomImage',
    '13-jokes',
    '14-cats',
    '15-crudDom',
    '16-debounce'
];

// Function to update HTML files
function updateHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add navbar CSS link if not present
    if (!content.includes('navbar.css')) {
        content = content.replace(
            '</head>',
            '    <link rel="stylesheet" href="../shared/navbar.css">\n</head>'
        );
    }
    
    // Add navbar JS script if not present
    if (!content.includes('navbar.js')) {
        content = content.replace(
            '</body>',
            '    <script src="../shared/navbar.js"></script>\n</body>'
        );
    }
    
    // Remove any existing nav elements
    content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

// Process each project directory
projectDirs.forEach(dir => {
    const indexPath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        updateHtmlFile(indexPath);
    }
});

console.log('All project files have been updated!'); 