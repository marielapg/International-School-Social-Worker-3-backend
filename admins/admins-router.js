const router = require('express').Router();

const Admins = require('../admins/admins-model.js');

router.get('/', (req, res) => {
  Admins.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Admins.findById(id)
  .then(admin => {
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Cannot find admin with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failure to get Admins' });
  });
});

router.get('/:id/students', (req, res) => {
  const { id } = req.params;
  Admins.findStudents(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: `Cannot find students for admin: ${id}` })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failure to Admins' });
  });
});


router.post('/:id/students', (req, res) => {
  const studentData = req.body;
  const { id } = req.params; 

  Admins.findById(id)
  .then(admin => {
    if (admin) {
      Admins.addStudent(studentData, id)
      .then(student => {
        res.status(201).json(student);
      })
    } else {
      res.status(404).json({ message: 'Cannot find admin with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failure, create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Admins.findById(id)
  .then(admin => {
    if (admin) {
      Admins.update(changes, id)
      .then(() => {
        res.status(201).json({ message: `Admin ${id} updated`});
      });
    } else {
      res.status(404).json({ message: 'Cannot find admin with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failure update admin' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Admins.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(201).json({ message: `Admin ${id} deleted` });
    } else {
      res.status(404).json({ message: 'Cannot find admin with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failure to delete admin' });
  });
});

module.exports = router;