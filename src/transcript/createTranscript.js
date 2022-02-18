const fs = require('fs');               // Node.js file system module
const PDFDocument = require('pdfkit');  // pdfkit module

// uses completed_courses object to create a new PDF file and save it to path
function createTranscript(completed_courses, path) {
    let options = {
        size: 'LETTER'
    };

    const doc = new PDFDocument();
}