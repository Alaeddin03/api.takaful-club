const bcrypt = require("bcrypt")

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    console.log(password, hashedPassword)
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

function isAuthorized(currentRole, authorizedRoles) {
    return authorizedRoles.includes(currentRole);
}

module.exports = {
    emptyOrRows,
    hashPassword,
    comparePassword,
    isAuthorized
}