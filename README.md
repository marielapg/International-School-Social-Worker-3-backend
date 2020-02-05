# International-School-Social-Worker-3-buildweek


The base URL for this project is: https://intl-school-social-worker.herokuapp.com/


## International School Social Worker is a website that will help allow administrators and social workers insert students data. 

## Authentication

https://intl-school-social-worker.herokuapp.com/api


## Registration:
POST "/auth/register"

```
    {
        
        "first_name": string (required),
        "last_name": string (required),
        "email": string (required),
        "password": string (required),
        "type": string ('admin' or 'socialWorker' - required)
    }
```

Response Body:
```
    {
        "id": integer (required),
        "first_name": string (required),
        "last_name": string (required),
        "email": string (required),
        "phone": string (required),
        "organization": string (required),
        "token": string (required)
    }
  
```
## Login
POST "/auth/login"

Request Body:
```
    {
        "email": string (required),
        "password": string (required),
    }
```

Response Body:
```
    {
        "id": integer,
        "first_name": string,
        "last_name": string,
        "email": string (required),
        "password": string (required),
        "phone": string,
        "organization": string,
        "token": string
    }
```


## Admins
 
 ## Create Student:
 POST to ``` https://intl-school-social-worker.herokuapp.com/api/admins/:id/students```
 id is the admin's user id.

 Request Body:
 ```
    {
        "first_name": string,
        "last_name": "string,
        "grade": "First",
        "address": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": true/false,
        "expiration_date": string,
        "birth_certificate": true/false,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
    }
 ```

 Response Body:
 ```
    {
        "id": (student id)
        "first_name": string,
        "last_name": "string,
        "grade": "First",
        "address": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": true/false,
        "expiration_date": string,
        "birth_certificate": true/false,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
        "admin_id": (admin id)
    }
```
## Students
## Get List of students:
GET to ```https://intl-school-social-worker.herokuapp.com/api/students```


Response Body:
```
[
    {
        "id": 1,
        "first_name": string,
        "last_name": string,
        "grade": string,
        "address": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": 0,
        "expiration_date": string,
        "birth_certificate": 0,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
        "admin_id": 1
    },
    {
        "id": 2,
        "first_name": string,
        "last_name": string,
        "grade": string,
        "address": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": 0,
        "expiration_date": string,
        "birth_certificate": 0,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
        "admin_id": 2
    },
    {
        "id": 3,
        "first_name": string,
        "last_name": string,
        "grade": string,
        "address": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": 0,
        "expiration_date": string,
        "birth_certificate": 0,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
        "admin_id": 3
    }
]
```

 
## Social Workers
## Get List of Social Workers:
GET to ```https://intl-school-social-worker.herokuapp.com/api/socialWorkers```


Response Body:
```
[
    {
        "id": 1,
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
        "organization": string
    },
    {
        "id": 2,
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
        "organization": string
    },
    {
        "id": 3,
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
        "organization": string
    }
 ]
``` 
