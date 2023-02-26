import * as workoutService from '../services/workoutService.js';

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();
  res.send({ status: 'OK', data: allWorkouts });
};
const getOneWorkout = (req, res) => {
  const {
    params: {
      workoutId,
    },
  } = req;
  if (!workoutId) {
    return;
  }
  const workout = workoutService.getOneWorkout(workoutId);
  res.send({ status: 'OK', data: workout });
};
const createNewWorkout = (req, res) => {
  const {
    body: {
      name, mode, equipment, exercises, trainerTips,
    },
  } = req;
  if (
    !name || !mode || !equipment || !exercises || !trainerTips
  ) {
    return;
  }

  const newWorkout = {
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  };

  const createdWorkout = workoutService.createNewWorkout(newWorkout);
  res.status(201).send({ status: 'OK', data: createdWorkout });
};
const updateOneWorkout = (req, res) => {
  const {
    body,
    params: {
      workoutId,
    },
  } = req;

  if (!workoutId) {
    return;
  }

  const upadatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.send({ status: 'OK', data: upadatedWorkout });
};
const deleteOneWorkout = (req, res) => {
  const {
    params: {
      workoutId,
    },
  } = req;
  if (!workoutId) {
    return;
  }
  workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({ status: 'OK' });
};

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
