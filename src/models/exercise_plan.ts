import { Exercise } from './exercise';

export interface ExercisePlanConfig {
    sets: number;
    repetitions: number;
    weight: number;
    start_date: Date;
}

export interface ExercisePlan {
    exercise: Exercise;
    currentExerciseConfig: ExercisePlanConfig;
    historyExerciseConfig: Array<ExercisePlanConfig>;
}
