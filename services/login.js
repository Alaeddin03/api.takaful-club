const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function login(username, password) {

    if (username === 'admin' && await helper.comparePassword(password, config.admin.password)) {
        return { 
            role: 'admin' 
        }
    } 

    const rows = await db.query(
        `SELECT *
        FROM drivers
        WHERE username = ?`,
        [
            username
        ]
    );

    const accounts = helper.emptyOrRows(rows);

    if (accounts.length === 0) {
        return { 
            message: "Error: username not found" 
        }
    }

    if (accounts.length > 1) {
        return { 
            message: "Error: multiple accounts with same username" 
        }
    }

    if (await helper.comparePassword(password, accounts[0].password)) {
        return { 
            role: "driver", 
            account: accounts[0] 
        }
    }

    return {
        message: "Error: incorrect password"
    }
}

module.exports = {
    login
}