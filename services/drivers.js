const db = require('./db');
const helper = require('../helper');


async function getDrivers({condition}) {
    console.log('condition', condition)
    const whereString = condition ? `WHERE ${condition}` : '';
    console.log('whereString', whereString)
    const rows = await db.query(
        `SELECT id, name, phone, busNumber, busLimit, username 
        FROM drivers
        ${whereString}`
    );
    const drivers = helper.emptyOrRows(rows);

    return {
        drivers
    }
}


async function createDriver(driver) {

    const hashedPassword = await helper.hashPassword(driver.password);

    const result = await db.query(
        `INSERT INTO drivers (name, phone, busNumber, busLimit, username, password)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            driver.name,
            driver.phone,
            driver.busNumber,
            driver.busLimit,
            driver.username,
            hashedPassword
        ]
    );

    let message = 'Error in creating driver';

    if (result.affectedRows) {
        message = 'Driver created successfully';
    }

    return { message };
}


async function updateDriver(id, driver) {

    let setString = '';
    let values = [];
    for (let key in driver) {
        setString += `${key} = ?, `;
        if (key === 'password') {
            driver[key] = await helper.hashPassword(driver[key]);
        }
        values.push(driver[key]);
    }
    setString = setString.slice(0, -2);

    const result = await db.query(
        `UPDATE drivers
      SET ${setString}
      WHERE id=${id}`,
        [...values]
    );

    let message = 'Error in updating driver';

    if (result.affectedRows) {
        message = 'Driver updated successfully';
    }

    return { message };
}


async function deleteDriver(id) {
    const result = await db.query(
        `DELETE FROM drivers WHERE id=${id}`
    );

    let message = 'Error in deleting driver account';

    if (result.affectedRows) {
        message = 'Driver deleted successfully';
    }

    return { message };
}

// async function getDriversStudents(id) {
//     const rows = await db.query(
//         `SELECT studentId
//       FROM programsStudents
//       WHERE driverId = ${id}`
//     );

//     const students = helper.emptyOrRows(rows);

//     const returnedStudents = [];

//     students.forEach(
//         async (student) => {
//             const studentRows = await db.query(
//                 `SELECT id, name, phone, age, nationality, gender, notes
//           FROM students
//           WHERE id = ${student.studentId}`
//             );
//             const studentRow = helper.emptyOrRows(studentRows);
//             returnedStudents.push(studentRow);
//         }
//     )

//     return {
//         returnedStudents
//     };
// }

// async function assignDriver(programid, neighborhoodid, driverid) {
//     const result = await db.query(
//         `SELECT FROM drivers busLimit WHERE id=${id}`
//     );
//     const result1 = await db.query(
//         `UPDATE programsStudent 
//         SET driverId = IFNULL(driverId, 'driverId${driverid}')
//         WHERE programId=${programid}, neighborhoodId=${neighborhoodid};`
//     );


//     let message = 'Error in assigning driver to program and neighborhood';

//     if (result.affectedRows) {
//         message = 'assigned driver to program and neighborhood successfully';
//     }

//     return { message };

// }


module.exports = {
    getDrivers,
    createDriver,
    updateDriver,
    deleteDriver
    // getDriversStudents,
    // assignDriver
}