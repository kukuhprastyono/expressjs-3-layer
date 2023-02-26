import {default as DB} from './db.json' assert { type: "json" }
import {saveToDatabase} from './utils.js'

const getAllWorkouts = () => DB.workouts;

const getOneWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId)
  if(!workout){
    return
  }
  return workout
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
  if (isAlreadyAdded){
    return
  }
  DB.workouts.push(newWorkout)
  saveToDatabase(DB) 
  return newWorkout
}

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex((workout)=> workout.id === workoutId)
  if(indexForUpdate === -1){
    return
  }

  const upadatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedId: new Date().toLocaleString('en-US', {timeZone: 'UTC'})
  }
  DB.workouts[indexForUpdate] = upadatedWorkout
  saveToDatabase(DB)
  return upadatedWorkout
}

const deleteOneWorkout = (workoutId) => {
  const indexForDeletation = DB.workouts.findIndex((workout) => workout.id === workoutId)
  if(indexForDeletation === -1){
    return
  }
  console.log(indexForDeletation)
  DB.workouts.splice(indexForDeletation, 1)
  saveToDatabase(DB)
}

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
};
