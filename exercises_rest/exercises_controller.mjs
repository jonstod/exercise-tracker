import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body.
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        })
});


/**
 * Retrive all logged exercises.
 */
app.get('/exercises', (req, res) => {
    let filters = req.query;
    exercises.findExercises(filters, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    let _id = {_id: req.params._id};
    let update = req.body;

    exercises.updateExercise(_id, update)
        .then(exercise => {
            res.send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the path parameter.
 */
app.delete('/exercises/:_id', (req, res) => {
    let _id = {_id: req.params._id};

    exercises.deleteExercise(_id)
        .then(deletedCount => {
            if (deletedCount === 0) {
                throw error;
            }
            else {
                res.status(204).json(exercises);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});