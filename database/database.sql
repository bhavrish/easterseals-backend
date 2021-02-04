CREATE DATABASE easterseals;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    password TEXT,
    phone_num VARCHAR(15),
    date_of_birth DATE,
    race VARCHAR(20),
    gender VARCHAR(20),
    address VARCHAR(50),
    employemnt_status VARCHAR(15),
    military_affiliated BOOLEAN,
    military_affiliation VARCHAR(30),
    military_start_date DATE,
    military_end_date DATE,
    last_rank VARCHAR(20),
    milirary_speciality VARCHAR(20),
    household_size INTEGER,
    income FLOAT,
    current_course VARCHAR(20),
    completed_courses VARCHAR(40),
    referral_source VARCHAR(40),
    resources VARCHAR(50)
);
CREATE TABLE courses_content(
    id SERIAL PRIMARY KEY,
    courseName VARCHAR(40),
    pageTitle TEXT,
    pageNumber INTEGER,
    pageType TEXT,
    content TEXT,
    choices TEXT,
    correctAnswer INTEGER
);
CREATE TABLE courses_grades(
    id INTEGER PRIMARY KEY,
    FOREIGN KEY(id) REFERENCES users(id),
    coverLetter_current_page INTEGER DEFAULT 1,
    elevatorPitch_current_page INTEGER DEFAULT 1,
    emails_current_page INTEGER DEFAULT 1,
    establishingSchedule_current_page INTEGER DEFAULT 1,
    interviewPreparation_current_page INTEGER DEFAULT 1,
    personalMotivation_current_page INTEGER DEFAULT 1,
    selfAssessment_current_page INTEGER DEFAULT 1,
    transferableSkills_current_page INTEGER DEFAULT 1,
    typesOfInterviews_current_page INTEGER DEFAULT 1
);