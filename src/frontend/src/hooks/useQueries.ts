import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Exercise,
  ExerciseEntry,
  WeeklySummary,
  WorkoutLog,
  WorkoutPlan,
} from "../backend";
import { MuscleGroup } from "../backend";
import { useActor } from "./useActor";

export type { Exercise, WorkoutPlan, WorkoutLog, WeeklySummary, ExerciseEntry };
export { MuscleGroup };

export function useGetExercises() {
  const { actor, isFetching } = useActor();
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExercises();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchExercises(query: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Exercise[]>({
    queryKey: ["exercises", "search", query],
    queryFn: async () => {
      if (!actor) return [];
      if (!query.trim()) return actor.getExercises();
      return actor.searchExercises(query);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetExercisesByMuscleGroup(group: MuscleGroup | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Exercise[]>({
    queryKey: ["exercises", "muscle", group],
    queryFn: async () => {
      if (!actor) return [];
      if (!group) return actor.getExercises();
      return actor.getExercisesByMuscleGroup(group);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWorkoutPlans() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkoutPlan[]>({
    queryKey: ["workoutPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkoutPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWorkoutLogs() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkoutLog[]>({
    queryKey: ["workoutLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkoutLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWeeklyProgress() {
  const { actor, isFetching } = useActor();
  const weekStart =
    BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000) * BigInt(1_000_000);
  return useQuery<WeeklySummary>({
    queryKey: ["weeklyProgress"],
    queryFn: async () => {
      if (!actor) return { days: [] };
      return actor.getWeeklyProgress(weekStart);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogWorkout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      date,
      exercises,
    }: { date: bigint; exercises: ExerciseEntry[] }) => {
      if (!actor) throw new Error("No actor");
      return actor.logWorkout(date, exercises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workoutLogs"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyProgress"] });
    },
  });
}
