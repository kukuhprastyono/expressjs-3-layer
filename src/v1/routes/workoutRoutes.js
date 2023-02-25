/* eslint-disable import/prefer-default-export */
import express from 'express';
import {
  createNewWorkout, deleteOneWorkout, getAllWorkouts, getOneWorkout, updateOneWorkout,
} from '../../controllers/workoutController.js';

const router = express.Router();

router.get('/', getAllWorkouts);

router.get('/:workoutId', getOneWorkout);

router.post('/', createNewWorkout);

router.patch('/:workoutId', updateOneWorkout);

router.delete('/:workoutId', deleteOneWorkout);
export { router as WorkoutRoutes };
