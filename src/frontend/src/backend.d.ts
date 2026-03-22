import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Exercise {
    difficulty: number;
    name: string;
    description: string;
    exerciseType: ExerciseType;
    muscleGroup: MuscleGroup;
}
export interface WorkoutPlan {
    duration: bigint;
    exerciseIds: Array<bigint>;
    difficulty: number;
    name: string;
    description: string;
}
export interface WorkoutLog {
    date: Time;
    exercises: Array<ExerciseEntry>;
}
export interface WeeklySummary {
    days: Array<DaySummary>;
}
export type Time = bigint;
export interface ExerciseEntry {
    exerciseId: bigint;
    sets: Array<Set_>;
}
export interface DaySummary {
    totalVolume: bigint;
    date: Time;
    workoutCount: bigint;
}
export interface Set_ {
    weight: bigint;
    reps: bigint;
}
export enum ExerciseType {
    compound = "compound",
    isolation = "isolation",
    cardio = "cardio"
}
export enum MuscleGroup {
    shoulders = "shoulders",
    arms = "arms",
    back = "back",
    core = "core",
    chest = "chest",
    legs = "legs"
}
export interface backendInterface {
    getExercises(): Promise<Array<Exercise>>;
    getExercisesByMuscleGroup(muscleGroup: MuscleGroup): Promise<Array<Exercise>>;
    getWeeklyProgress(weekStart: Time): Promise<WeeklySummary>;
    getWorkoutLogs(): Promise<Array<WorkoutLog>>;
    getWorkoutPlanById(id: bigint): Promise<WorkoutPlan>;
    getWorkoutPlans(): Promise<Array<WorkoutPlan>>;
    logWorkout(date: Time, exercises: Array<ExerciseEntry>): Promise<void>;
    searchExercises(searchTerm: string): Promise<Array<Exercise>>;
}
