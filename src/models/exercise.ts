export enum ExerciseType {
    CARDIO,
    MUSCLE,
}

export enum ExerciseBodyType {
    UPPER,
    LOWER,
}

export interface Exercise {
    id: string;
    name: string;
    exerciseType: ExerciseType;
    bodyType: ExerciseBodyType;
}
