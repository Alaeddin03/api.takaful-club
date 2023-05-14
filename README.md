## To run:
```
npm run start
```

### reference link:

https://blog.logrocket.com/build-rest-api-node-express-mysql/


## APIs to-do:

- [x] get all programs
- [x] get current programs
- [x] get a program by id
- [x] create program
- [x] edit ..
- [x] delete ..
- [ ] get student in a program
- [ ] assign driver to program and neighborhood
- [x] student register in a program
- [x] get all neighborhoods
- [x] create neighborhood
- [x] delete neighborhood
- [x] get all driver accounts
- [x] create a driver account
- [x] update ..
- [x] delete ..
- [x] login
- [ ] get driver's list of students
- [x] static files (get + post)



## List of APIs:

-------------(1)-------------

GET request

/programs/getAll

return: JsonResponse

{

	[
		{programObject},
		{programObject},
		…
	]
}


-------------(2)-------------

POST request

/programs/create 

request body:

{

	program: programObject
}

return:
if there is an error:
	JsonResponse:

	
{

    error: errorMessage
}


-------------(3)-------------

POST request

/programs/edit

same as 2

-------------(4)-------------

POST request

/programs/delete

same as 2

-------------(5)-------------

POST request

/programs/{id}/students

request body:

{

	role: role
}

return: JSON response

{

    program: programObject,
    students: [
        studentObject,
        studentObject,
        …
    ]
}

-------------(6)-------------

GET request

/programs/{id}

return: JSON response

{

    program: programObject
}
 

-------------(7)-------------

POST request

/programs/assign

request body:
{

    programId: id,
    driverId: id,
    neighborhood: neighborhood
}

return:
if there is an error:
	JsonResponse:

	{
		error: errorMessage
	}


-------------(8)-------------

POST request

/programs/{id}/register

request body:

{

    programId: id,
    student: studentObject
}

return:
if there is an error:
    JsonResponse:

    {
        error: errorMessage
    }


-------------(9)-------------

POST request

/driver/create

request body:

{

    driver: driverObject
}

return:
if there is an error:
    JsonResponse:

    {
        error: errorMessage
    }

-------------(10)-------------

delete is similar to create (9)

-------------(11)-------------


POST request

/login

request body:

{

    username: username,
    password: password
}

return: JsonResponse:

{

    role: role
}


-------------(12)-------------

POST request

/driver/{id}/students

request body:

{

    role: role,
    driverId: id
}

return: JsonResponse:

{

    program: programObject,
    students: [
        studentObject,
        studentObject,
        …
    ]
}



## Structure of objects mentioned above


driverObject = {

    id,
    name,
    phone,
    busNumber,
    neighborhood,
    username,
    password
}

studentObject = {

    id,
    name,
    nationality,
    phone,
    age,
    neighborhood,
    programIDs,
    notes
}

programObject = {

    id,
	title,
	description,
	dateTime,
	registrationDateTime,
	limit,
	image
}

note: role could be stored in local storage and it is either admin or driver. (preferably encrypted)

