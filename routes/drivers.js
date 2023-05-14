const express = require('express');
const router = express.Router();
const drivers = require('../services/drivers');
const programsStudents = require('../services/programsStudents');
const students = require('../services/students');


// GET all drivers
router.get('/', async function (req, res, next) {
    try {
        res.json(await drivers.getDrivers());
    } catch (err) {
        console.error(`Error while getting all drivers `, err.message);
        next(err);
    }
});


// POST (create) driver
router.post('/', async function (req, res, next) {
    try {
        res.json(await drivers.createDriver(req.body.driver));
    } catch (err) {
        console.error(`Error while creating driver `, err.message);
        next(err);
    }
});


// PUT (edit) driver
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await drivers.updateDriver(req.params.id, req.body.driver));
    } catch (err) {
        console.error(`Error while updating driver`, err.message);
        next(err);
    }
});


// DELETE driver
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await drivers.deleteDriver(req.params.id));
    } catch (err) {
        console.error(`Error while deleting driver account`, err.message);
        next(err);
    }
});


// assign driver to program (with its helping functions)

async function getDriverToAssign(id) {
    let driver = [];
    try {
        driver = await drivers.getDrivers({ condition: `id = ${id}` })
        console.log('driver', driver)
    } catch (err) {
        console.error('Error while getting driver')
    }
    return driver
}

async function getDriverStudents(programId, neighborhoodId) {
    let driverStudents = [];
    try {
        driverStudents = await programsStudents.getProgramsStudentByNeighborhood(programId, neighborhoodId);
    } catch (err) {
        console.error('Error while getting students')
    }
    return driverStudents
}

async function getDriverStudentsInfo(driverStudents) {

    const maleStudents = []
    const femaleStudents = []

    for await (const student of driverStudents) {

        try {
            const maleStudent = await students.getStudents({ condition: `gender = 'male' AND id = ${student.studentId}` })
            maleStudents.push(maleStudent['students'][0])
        } catch (err) {
            console.error('Error while getting male students', err.message)
        }
        try {
            const femaleStudent = await students.getStudents({ condition: `gender = 'female' AND id = ${student.studentId}` })
            femaleStudents.push(femaleStudent['students'][0])
        } catch (err) {
            console.error('Error while getting female students', err.message)
        }
    }

    const selectedStudents = await selectStudents(maleStudents.filter(maleStudent => maleStudent !== undefined), femaleStudents.filter(femaleStudent => femaleStudent !== undefined));

    return selectedStudents
}

async function selectStudents(maleStudents, femaleStudents) {

    let selectedStudents = []

    if (maleStudents.length === 0) {
        selectedStudents = femaleStudents
    } else if (femaleStudents.length === 0) {
        selectedStudents = maleStudents
    } else {
        selectedStudents = maleStudents.length >= femaleStudents.length ? maleStudents : femaleStudents
    }

    return selectedStudents
}

router.post('/:id/assign', async function (req, res, next) {

    const driver = await getDriverToAssign(req.params.id);

    const driverStudents = await getDriverStudents(req.body.programId, req.body.neighborhoodId);

    const selectedStudents = await getDriverStudentsInfo(driverStudents.students);

    let studentsToAssign = []

    if (selectedStudents.length > driver.busLimit) {
        for (let i = 0; i < driver.busLimit; i++) {
            studentsToAssign.push(selectedStudents[i])
        }
    } else {
        studentsToAssign = selectedStudents
    }

    studentsToAssign.forEach(async student => {
        try {
            await programsStudents.editDriverForProgramsStudent(req.body.programId, student.id, req.params.id)
        } catch (err) {
            console.error('Error while updating programsStudent', err.message)
        }
    })

    res.json({ message: 'Students assigned successfully' })

});


async function getStudentsInfo(studentsToRetrieve) {

    let studentInfo = []

    for await (const student of studentsToRetrieve) {
        try {
            studentInfo.push(await students.getStudentById(student.studentId));
        } catch (err) {
            console.error('Error while getting student info', err.message)
        }
    }

    return studentInfo;
}


// get students for a driver
router.post('/:id/students', async function (req, res, next) {

    let studentsToRetrieve = []
    try {
        studentsToRetrieve = (await programsStudents.getProgramsStudents(`driverId = ${req.params.id}`));
    } catch (err) {
        console.error(`Error while getting students for a driver`, err.message);
        next(err);
    }

    const studentData = await getStudentsInfo(studentsToRetrieve.students)

    res.json(studentData)

});

module.exports = router;