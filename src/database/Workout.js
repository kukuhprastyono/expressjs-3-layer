import {default as DB} from './db.json' assert { type: "json" }
import {saveToDatabase} from './utils.js'
const getAllWorkouts = () => DB.workouts;

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
  if (isAlreadyAdded){
    return
  }
  DB.workouts.push(newWorkout)
  saveToDatabase(DB) 
  return newWorkout
}
export {
  getAllWorkouts,
  createNewWorkout
};
