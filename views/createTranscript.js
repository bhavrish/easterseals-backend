const fs = require('fs');               // Node.js file system module
const PDFDocument = require('pdfkit');  // pdfkit module

// uses completed_courses object to create a new PDF file and save it to path
function createTranscript(student_details, path) {
    let options = {
        size: 'LETTER',
    };

    const doc = new PDFDocument(options);
    generateHeader(doc, student_details);

    // horizontal line
    doc.moveTo(60, 190)
    .lineTo(doc.page.width - 60, 190)
    .stroke();

    generateUserCourseTable(doc, student_details);

    doc.pipe(fs.createWriteStream(path));   // write to PDF file
    // doc.pipe(res);                           // HTTP response
    doc.end();                              // finalize the PDF and end the stream
}

// method to generate transcript header
function generateHeader(doc, student_details) {
    doc.fontSize(14);
    doc.font('views/Poppins/Poppins-Regular.ttf');
    doc.text("Courses Completed Transcript", 380, 30, {lineBreak: false});

    doc.fontSize(12);
    doc.moveDown();
    doc.image('views/transcript logo.png', 50, 80, {scale: 0.75});
    doc.text("NAME ", 390, 150); // coordinates X, Y
    doc.font('views/Poppins/Poppins-Light.ttf');
    doc.text(student_details.name, 430, 150, {lineBreak: false});
}

function generateTableRow(doc, y_position, course_title, completion_date) {
    doc
        .fontSize(12)
        .font('views/Poppins/Poppins-Regular.ttf')
        .text(course_title, 65, y_position)
        .text(completion_date, doc.page.width - 65, y_position);
}   

function generateUserCourseTable(doc, student_details) {
    generateTableRow(doc, 215, "COURSE TITLE", "COMPLETION DATE");
}

module.exports = {  
    createTranscript
};   // export main function