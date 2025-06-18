const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

/**
 * Reads an image file and converts it to a Base64 Data URI.
 * @param {string} filePath - Path to the image file.
 * @returns {string} The Data URI for the image.
 */
async function getImageDataUri(filePath) {
    const image = await fs.readFile(filePath);
    const base64Image = image.toString('base64');
    const mimeType = path.extname(filePath).substring(1); // e.g., 'png'
    return `data:image/${mimeType};base64,${base64Image}`;
}


async function createPdf(jsonPath, outputPath) {
    console.log(`Starting PDF generation for ${jsonPath}...`);

    try {
        // --- 1. Read Data, Template, and Logo ---
        const logoPath = path.join(__dirname, 'logo.png');

        const [jsonDataString, templateHtml, logoDataUri] = await Promise.all([
            fs.readFile(jsonPath, 'utf8'),
            fs.readFile(path.join(__dirname, 'template.html'), 'utf8'),
            getImageDataUri(logoPath) // Read and convert the logo
        ]);

        const data = JSON.parse(jsonDataString);
        // Add the logo data to our main data object
        data.logoImage = logoDataUri;

        console.log("Successfully read JSON, template, and logo.");

        // --- 2. Compile the Template ---
        const template = handlebars.compile(templateHtml);
        const finalHtml = template(data);
        console.log("Successfully compiled HTML with data.");

        // --- 3. Launch Puppeteer and Generate PDF ---
        console.log("Launching headless browser...");
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setContent(finalHtml, { waitUntil: 'networkidle0' });
        console.log("Page content set in Puppeteer.");

        // --- 4. Generate the PDF ---
        console.log(`Generating PDF, saving to ${outputPath}...`);
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div style="font-size:1px;"></div>',
            footerTemplate: '<div style="font-size:1px;"></div>',
            margin: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in'
            }
        });
        
        console.log("PDF successfully generated!");

        // --- 5. Clean Up ---
        await browser.close();
        console.log("Browser closed.");

    } catch (error) {
        // Add a specific check for file not found errors on the logo
        if (error.code === 'ENOENT' && error.path.includes('logo.png')) {
             console.error("\nERROR: Could not find 'logo.png'. Please make sure the logo file exists in the same directory as the script.\n");
        } else {
            console.error("An error occurred during PDF generation:", error);
        }
    }
}

// --- Main Execution ---
const jsonInputFile = path.join(__dirname, 'survey.json');
const pdfOutputFile = path.join(__dirname, 'Survey-Report-v2.pdf');

createPdf(jsonInputFile, pdfOutputFile);
