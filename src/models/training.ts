import { WorkoutPlan } from './workout_plan';
import { ExercisePlan } from './exercise_plan';

export interface Training {
    id: string;
    name: string;
    workoutPlan?: WorkoutPlan;
    exercises: Array<ExercisePlan>;
    startDate: Date;
    endDate?: Date;
}
