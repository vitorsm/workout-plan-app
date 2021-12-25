import { ExercisePlan } from './exercise_plan';

export interface WorkoutPlan {
    id: string;
    name: string;
    exercises: Array<ExercisePlan>
    startDate?: Date;
    endDate?: Date;
}
