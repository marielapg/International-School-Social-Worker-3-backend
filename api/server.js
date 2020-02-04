const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const confirmToken = require('../middleware/token.js')
 const authRouter = require('../auth/auth-router.js');
 const adminsRouter = require('../admins/admins-router.js');
const socialWorkersRouter = require('../socialWorkers/socialWorkers-router.js');
const studentsRouter = require('../students/students-router.js');


 const server = express();

 server.use(express.json());
server.use(helmet());
server.use(cors());

 server.use('/api/auth', authRouter);
server.use('/api/admins', confirmToken, adminsRouter);
server.use('/api/socialWorkers', confirmToken, socialWorkersRouter);
server.use('/api/students', confirmToken, studentsRouter);

 server.get('/', (req, res) => {
   res.status(200).json({message: 'Ready to start working'})
 })

 module.exports = server;