const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const personModel = require('../mongo');
router.get('/persons', async (req, res) => {
  const findPersons = await personModel.find();
  res.status(200).json(findPersons);
});
router.post('/persons', async (req, res, next) => {
  const data = req.body;
  // const id = Math.max(...global.persons.map((x) => x.id)) + 1;
  try {
    // if (!data?.name || !data?.number) {
    //   return res.status(400).json({ error: 'The name or number is missing' });
    // }
    // const findByName = await personModel.find({ name: data.name });
    // if (Array.isArray(findByName) && findByName.length > 0) {
    //   return res.status(400).json({ error: 'name must be unique' });
    // }
    const model = new personModel({
      ...data,
    });
    const saved = await model.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});
router.put('/persons/:id', async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      return res.status(404).json('Phonebook not found');
    }
    if (!data?.name || !data?.number) {
      return res.status(400).json({ error: 'The name or number is missing' });
    }
    const findPhonebook = await personModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!findPhonebook) {
      return res.status(404).json('Phonebook not found');
    }
    res.status(200).json(findPhonebook);
  } catch (error) {
    next(error);
  }
});

router.get('/persons/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      return res.status(404).json('Phonebook not found');
    }
    const findPhonebook = await personModel.findById(id);
    if (!findPhonebook) {
      return res.status(404).json('Phonebook not found');
    }

    res.status(200).json(findPhonebook);
  } catch (error) {
    next(error);
  }
});

router.delete('/persons/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      return res.status(404).json('Phonebook not found');
    }
    const findPhonebook = await personModel.findByIdAndRemove(id);
    if (!findPhonebook) {
      return res.status(404).json('Phonebook not found');
    }
    res.status(200).json(findPhonebook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
