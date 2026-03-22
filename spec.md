# FitTrack Pro

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full workout app with exercise library, muscle group categories, workout tracker, and progress chart
- Exercise library: name, muscle group, type (compound/isolation), sets/reps/weight
- Muscle group categories: Chest, Back, Legs, Arms, Core, Shoulders
- Featured workouts with exercise lists
- Workout logging: log sets, reps, weight per exercise
- Progress chart: weekly workout data (line chart)
- Dashboard with search, muscle groups, featured workouts, tracker, exercise library
- Navigation: Dashboard, Exercises, Workouts, Tracking, Progress

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Store exercises, workouts, workout logs, progress data in Motoko
2. Backend APIs: getExercises, getWorkouts, logWorkout, getProgress, searchExercises
3. Frontend: Full dashboard with all sections from design preview
4. Charts: Weekly progress line chart using recharts
5. Exercise library table with add-to-workout action
6. Current workout tracker with sets/reps/weight input
