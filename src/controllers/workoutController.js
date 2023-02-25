import * as workoutService from '../services/workoutService.js';

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();
  res.send({ status: 'OK', data: allWorkouts });
};
const getOneWorkout = (req, res) => {
  const workout = workoutService.getOneWorkout();
  res.send('Get an existing workout');
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
  const upadatedWorkout = workoutService.updateOneWorkout();
  res.send('Update an existing workout');
};
const deleteOneWorkout = (req, res) => {
  workoutService.deleteOneWorkout();
  res.send('delete an existing workout');
};

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
