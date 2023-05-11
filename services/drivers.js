const db = require('./db');
const helper = require('../helper');


async function getDrivers() {
    const rows = await db.query(
        `SELECT id, name, phone, busNumber, busLimit, neighborhoodId, username 
        FROM drivers`
    );
    const drivers = helper.emptyOrRows(rows);

    return {
        drivers
    }
}


async function createDriver(driver) {

    const hashedPassword = await helper.hashPassword(driver.password);

    const result = await db.query(
        `INSERT INTO drivers (name, phone, busNumber, busLimit, neighborhoodId, username, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            driver.name,
            driver.phone,
            driver.busNumber,
            driver.busLimit,
            driver.neighborhoodId,
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


module.exports = {
    getDrivers,
    createDriver,
    updateDriver,
    deleteDriver
}