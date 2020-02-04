
const router = require('express').Router();

const socialWorkers = require('../socialWorkers/socialWorkers-model.js');

router.get('/', (req, res) => {
  socialWorkers.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  socialWorkers.findById(id)
  .then(socialWorker => {
    if (socialWorker) {
      res.json(socialWorker);
    } else {
      res.status(404).json({ message: 'Cannot find social worker with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failure to get social workers' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  socialWorkers.findById(id)
  .then(socialWorker => {
    if (socialWorker) {
      socialWorkers.update(changes, id)
      .then(() => {
        res.status(201).json({ message: `social worker ${id} is updated`});
      });
    } else {
      res.status(404).json({ message: 'Cannot find social worker with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failure to update social worker' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  socialWorkers.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(201).json({ message: `social worker ${id} is deleted` });
    } else {
      res.status(404).json({ message: 'Cannot find social worker with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failure to delete social worker' });
  });
});

module.exports = router;