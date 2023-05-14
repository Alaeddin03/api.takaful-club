const db = require('./db');
const helper = require('../helper');

async function getStudents(condition) {
    const whereString = condition ? `WHERE ${condition}` : '';
    const rows = await db.query(
        `SELECT id, name, phone, age, nationality, gender, notes
        FROM students
        ${whereString}`
    );
    const students = helper.emptyOrRows(rows);
    return {
        students
    }
}


async function getStudentById(id) {
    const rows = await db.query(
        `SELECT *
        FROM students
        WHERE id = ${id}`
    );
    const student = helper.emptyOrRows(rows);
    return {
        student
    };
}


async function createStudent(student) {

    let columnString = '';
    let valueString = '';
    let values = [];
    for (let key in student) {
        columnString += `${key}, `;
        valueString += `?, `;
        values.push(student[key]);
    }
    columnString = columnString.slice(0, -2);
    valueString = valueString.slice(0, -2);

    const result = await db.query(
        `INSERT INTO students (${columnString}) 
    VALUES (${valueString})`,
        [
            ...values
        ]
    );

    let message = 'Error in creating student';

    if (result.affectedRows) {
        message = 'student created successfully';
    }

    return { message };
}


async function editStudent(id, student) {

    let setString = '';
    let values = [];
    for (let key in student) {
        setString += `${key} = ?, `;
        values.push(student[key]);
    }
    setString = setString.slice(0, -2);

    const result = await db.query(
        `UPDATE students 
    SET ${setString} 
    WHERE id=${id}`,
        [...values]
    );

    let message = 'Error in updating students';

    if (result.affectedRows) {
        message = 'students updated successfully';
    }

    return { message };
}


async function deleteStudent(id) {
    const result = await db.query(
        `DELETE FROM students WHERE id=${id}`
    );

    let message = 'Error in deleting student';

    if (result.affectedRows) {
        message = 'students deleted successfully';
    }

    return { message };
}




module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    editStudent,
    deleteStudent
}
