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
    doc.end();                              // finalize the PDF and end the stream
}

// method to generate transcript header
function generateHeader(doc, student_details) {
    doc.fontSize(14);
    doc.font('src/transcript_helper/fonts/Poppins-Regular.ttf');
    doc.text("Courses Completed Transcript", 380, 25, { lineBreak: false });

    doc.fontSize(12);
    doc.moveDown();
    doc.image('src/transcript_helper/transcript logo.png', 60, 80, { scale: 0.75 });
    doc.text("NAME ", 390, 150); // coordinates X, Y
    doc.font('src/transcript_helper/fonts/Poppins-Light.ttf');
    doc.text(student_details.name, 430, 150, { lineBreak: false });
}

function generateTableRow(doc, y_position, course_title, completion_date) {
    doc
        .fontSize(12)
        .font('src/transcript_helper/fonts/Poppins-Regular.ttf')
        .text(course_title, 70, y_position)
        .text(completion_date, 410, y_position);
}

function generateUserCourseTable(doc, student_details) {
    // header row
    const header_y_position = 215;
    generateTableRow(doc, header_y_position, "COURSE TITLE", "COMPLETION DATE");
    generateTableRow(doc, header_y_position + 10, " ", " ");

    // retrieve user's completed courses
    const completed_courses = student_details.completed_courses;

    for (let i = 0; i < completed_courses.length; i++) {
        const this_course_title = completed_courses[i].course_name;
        const this_course_date = formatDate(completed_courses[i].date_completed);

        const this_y_position = (header_y_position + 10) + (i + 1) * 30;

        generateTableRow(doc, this_y_position, this_course_title, this_course_date);

    }
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return month + " / " + day + " / " + year;
}

function formatDatePath(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return month + "-" + day + "-" + year;
}
module.exports = {
    createTranscript,
    formatDatePath
};   // export main function