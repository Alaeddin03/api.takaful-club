const db = require('./db');
const helper = require('../helper');

async function getProgramsStudents(condition) {
    console.log('condition', condition)
    const whereString = condition ? `WHERE ${condition}` : '';
    const rows = await db.query(
        `SELECT *
        FROM programsStudents
        ${whereString}`
    );
    const students = helper.emptyOrRows(rows);

    return {
        students
    }
}

// async function getProgramsStudentByProgramId(programId) {
//     const rows = await db.query(
//         `SELECT *
//         FROM programsStudents
//         WHERE programId = ${programId}`
//     );
//     const programStudent = helper.emptyOrRows(rows);
//     return {
//         programStudent
//     };
// }

async function getProgramsStudentById(programId, studentId) {
    const rows = await db.query(
        `SELECT *
        FROM programsStudents
        WHERE programId = ${programId} AND studentId = ${studentId}`
    );
    const programStudent = helper.emptyOrRows(rows);
    return {
        programStudent
    };
}


async function createProgramsStudent(programId, studentId, neighborhoodId) {

    const result = await db.query(
        `INSERT INTO programsStudents (programId , studentId , neighborhoodId) 
        VALUES (?, ?, ?)`,
        [
            programId,
            studentId,
            neighborhoodId
        ]
    );

    let message = 'Error in registering student';

    if (result.affectedRows) {
        message = 'student registered successfully';
    }

    return { message };
}


async function editDriverForProgramsStudent(programId, studentId, driverId) {

    const result = await db.query(
        `UPDATE programsStudents 
        SET driverId = IFNULL(driverId, ${driverId})
        WHERE programId = ${programId} AND studentId = '${studentId}';`
    );

    let message = 'Error in editing driver in programsStudents';

    if (result.affectedRows) {
        message = 'programsStudents updated successfully';
    }

    return { message };
}


async function getProgramsStudentByNeighborhood(programId, neighborhoodId) {

    const rows = await db.query(
        `SELECT studentId
        FROM programsStudents
        WHERE programId = ${programId} AND neighborhoodId = ${neighborhoodId} AND driverId IS NULL`
    );

    console.log('rows', rows)

    const students = helper.emptyOrRows(rows);
    
    return {
        students
    };
}


async function deleteProgramStudent(programId, studentId) {
    const result = await db.query(
        `DELETE FROM programsStudents WHERE programId=${programId} AND studentId=${studentId}`
    );

    let message = 'Error in deleting programStudent';

    if (result.affectedRows) {
        message = 'programStudent deleted successfully';
    }

    return { message };
}


async function deleteProgramStudentForProgram(programId) {
    const result = await db.query(
        `DELETE FROM programsStudents WHERE programId=${programId}`
    );

    let message = 'Error in deleting programStudent';

    if (result.affectedRows) {
        message = 'programStudent deleted successfully';
    }

    return { message };
}




module.exports = {
    getProgramsStudents,
    // getProgramsStudentByProgramId,
    getProgramsStudentById,
    createProgramsStudent,
    editDriverForProgramsStudent,
    getProgramsStudentByNeighborhood,
    deleteProgramStudent,
    deleteProgramStudentForProgram
}
