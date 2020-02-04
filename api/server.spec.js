const request = require('supertest');

const db = require('../database/dbConfig.js');

const server = require('./server.js');

describe('server', function() {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('return 200 ok', function() {
            return request(server).get('/').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('return JSON', function() {
            return request(server).get('/').then(res=>{
                expect(res.type).toMatch(/json/i);
            })
        })

        it('return "Its alive!"', function() {
            return request(server).get('/').then(res=>{
                expect(res.text).toEqual("It's alive!");
            })
        })
    })

    describe('GET /api/auth', function() {
        it('return 200 ok', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('return JSON', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.type).toMatch(/json/i);
            })
        })

        it('return "Its alive!"', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.text).toEqual("This is the auth route");
            })
        })
    })
    describe('POST /api/auth/register', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('return 201', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('return username', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.body.username).toEqual('TestRegister')
                })
        })
    })
    let cookies;
    let token;
    describe('POST /api/auth/login', function() {
        it('return 201 ok', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('return token, cookie, user data', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.body.username).toEqual('TestRegister')
                    expect(res.body.token).toBeDefined()
                    token = res.body.token
                    expect(res.headers).toHaveProperty("set-cookie");
                    cookies = res.headers["set-cookie"].pop().split(";")[0];
                    console.log('cookies:', cookies)
                    console.log('token:', token)
                })
        })
    })
    describe('GET /api/admins', function() {
        it('return 200 ok', function() {
            return request(server)
                .get('/api/admins')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('return list of users', function() {
            return request(server)
                .get('/api/admins')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    console.log('return list of users:', res.body)
                })
        })
    })

    describe('GET /api/socialWorkers', function() {
        it('return 200', function() {
            return request(server)
                .get('/api/socialWorkers')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('return list of social workers', function() {
            return request(server)
                .get('/api/socialWorkers')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    
                })
        })
    }) 
    describe('GET /api/students', function() {
        it('return 200', function() {
            return request(server)
                .get('/api/students')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('return list of students', function() {
            return request(server)
                .get('/api/students')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    
                })
        })
    })        
})