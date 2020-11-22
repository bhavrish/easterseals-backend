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
    completed_courses VARCHAR(40)
);

CREATE TABLE courses_content(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    content TEXT
);

CREATE TABLE courses_grades(
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(id) REFERENCES users(id),
    course_A FLOAT,
    course_B FLOAT,
    course_C FLOAT
);