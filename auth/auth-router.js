const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Admins = require('../admins/admins-model.js');
const socialWorkers = require('../socialWorkers/socialWorkers-model.js');
const signToken = require('../middleware/signToken.js');


router.get('/', (req, res) =>{
  res.send("Auth route success");
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  if (user.type === 'admin'){
    Admins.add(user)
      .then(saved => {
        const token = signToken(saved);
        req.loggedIn = true;
        req.email = user.email;
        const payload = {...saved, token: token}
        res.status(201).json(payload);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
    });
  } else if (user.type === 'socialWorkers'){
    socialWorkers.add(user)
      .then(saved => {
        const token = signToken(saved);
        req.loggedIn = true;
        req.email = user.email;
        const payload = {...saved, token: token}
        res.status(201).json(payload);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
    });
  } else {
    return res.status(400).json({ message: 'Invalid user' })
  }


});

router.post('/login', (req, res) => {
  let { email, password } = req.body;
  Admins.findBy({email})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        req.loggedIn = true;
        req.email = user.email;
        const payload = {...user, token: token}
        res.status(201).json(payload);
      } else {        
        // If email not found in admins, search socialWorkers:
        socialWorkers.findBy({email})
          .first()
          .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
              const token = signToken(user);
              req.loggedIn = true;
              req.email = user.email;
              const payload = {...user, token: token}
              res.status(201).json(payload);
            } else {        
              res.status(401).json({ message: 'Invalid email or password' });
            }
          })
          .catch(error => {
            console.log(error)
            res.status(500).json(error);
        });
        // res.status(404).json({ message: 'Unable to find email' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

// router.get('/logout', (req, res, next) => {
//   req.destroy((err) => {
//       if (err) {
//           next(err)
//       } else {
//           res.json( { message: 'User is logged out'} )
//       }
//   })
// })

module.exports = router;
