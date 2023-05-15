const db = require('./db');
const helper = require('../helper');

async function getNeighborhoods() {
    const rows = await db.query(
        `SELECT * 
      FROM neighborhood`
    );
    const neighborhood = helper.emptyOrRows(rows);

    return {
        neighborhood
    }
}


async function getNeighborhoodById(id) {
    const rows = await db.query(
        `SELECT name
        FROM neighborhood
        WHERE id = ${id}`
    );
    const neighborhood = helper.emptyOrRows(rows);
    return neighborhood;
}


async function createNeighborhood(neighborhood) {

    const result = await db.query(
        `INSERT INTO neighborhood (id, name, sequence)
        VALUES (?, ?, ?)`,
        [
            neighborhood.id,
            neighborhood.name,
            neighborhood.sequence
        ]
    );

    let message = 'Error in creating neighborhood';

    if (result.affectedRows) {
        message = 'neighborhood created successfully';
    }

    return { message };
}


async function deleteNeighborhood(id) {
    const result = await db.query(
        `DELETE FROM neighborhood WHERE id=${id}`
    );

    let message = 'Error in deleting neighborhood';

    if (result.affectedRows) {
        message = 'Neighborhood deleted successfully';
    }

    return { message };
}


module.exports = {
    getNeighborhoods,
    getNeighborhoodById,
    createNeighborhood,
    deleteNeighborhood
}