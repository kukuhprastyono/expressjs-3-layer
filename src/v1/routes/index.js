/* eslint-disable import/extensions */
import express from 'express';
import { WorkoutRoutes } from './workoutRoutes.js';

const expressRouter = express.Router();

expressRouter.use('/workouts', WorkoutRoutes);

export default expressRouter;
