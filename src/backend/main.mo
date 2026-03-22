import Text "mo:core/Text";
import Int "mo:core/Int";
import Order "mo:core/Order";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type MuscleGroup = {
    #chest;
    #back;
    #core;
    #arms;
    #legs;
    #shoulders;
  };

  type ExerciseType = {
    #compound;
    #isolation;
    #cardio;
  };

  type Exercise = {
    name : Text;
    muscleGroup : MuscleGroup;
    exerciseType : ExerciseType;
    description : Text;
    difficulty : Nat8;
  };

  type WorkoutPlan = {
    name : Text;
    description : Text;
    difficulty : Nat8;
    duration : Nat;
    exerciseIds : [Nat];
  };

  type Set = {
    reps : Nat;
    weight : Nat;
  };

  module Set {
    public func compare(set1 : Set, set2 : Set) : Order.Order {
      switch (Nat.compare(set1.reps, set2.reps)) {
        case (#equal) { Nat.compare(set1.weight, set2.weight) };
        case (order) { order };
      };
    };
  };

  type ExerciseEntry = {
    exerciseId : Nat;
    sets : [Set];
  };

  module ExerciseEntry {
    public func compare(entry1 : ExerciseEntry, entry2 : ExerciseEntry) : Order.Order {
      switch (Nat.compare(entry1.exerciseId, entry2.exerciseId)) {
        case (#equal) { entry1.sets.sort().compare(entry2.sets.sort()) };
        case (order) { order };
      };
    };
  };

  type WorkoutLog = {
    date : Time.Time;
    exercises : [ExerciseEntry];
  };

  type DaySummary = {
    date : Time.Time;
    workoutCount : Nat;
    totalVolume : Nat;
  };

  module DaySummary {
    public func compare(summary1 : DaySummary, summary2 : DaySummary) : Order.Order {
      Int.compare(summary1.date, summary2.date);
    };
  };

  type WeeklySummary = {
    days : [DaySummary];
  };

  module Exercise {
    public func compare(exercise1 : Exercise, exercise2 : Exercise) : Order.Order {
      switch (Text.compare(exercise1.name, exercise2.name)) {
        case (#equal) { Nat8.compare(exercise1.difficulty, exercise2.difficulty) };
        case (order) { order };
      };
    };

    public func compareByMuscleGroup(exercise1 : Exercise, exercise2 : Exercise) : Order.Order {
      switch (compareMuscleGroup(exercise1.muscleGroup, exercise2.muscleGroup)) {
        case (#equal) { compareByType(exercise1, exercise2) };
        case (order) { order };
      };
    };

    func compareMuscleGroup(group1 : MuscleGroup, group2 : MuscleGroup) : Order.Order {
      switch (group1, group2) {
        case (#chest, #chest) { #equal };
        case (#chest, _) { #less };
        case (#back, #back) { #equal };
        case (#back, #chest) { #greater };
        case (#back, _) { #less };
        case (#core, #core) { #equal };
        case (#core, #shoulders) { #less };
        case (#core, _) { #greater };
        case (#arms, #arms) { #equal };
        case (#arms, #back) { #greater };
        case (#arms, #chest) { #greater };
        case (#arms, _) { #less };
        case (#legs, #legs) { #equal };
        case (#legs, #shoulders) { #less };
        case (#legs, _) { #greater };
        case (#shoulders, #shoulders) { #equal };
        case (#shoulders, _) { #greater };
      };
    };

    func compareByType(exercise1 : Exercise, exercise2 : Exercise) : Order.Order {
      switch (compareType(exercise1.exerciseType, exercise2.exerciseType)) {
        case (#equal) { Nat8.compare(exercise1.difficulty, exercise2.difficulty) };
        case (order) { order };
      };
    };

    func compareType(type1 : ExerciseType, type2 : ExerciseType) : Order.Order {
      switch (type1, type2) {
        case (#compound, #compound) { #equal };
        case (#compound, _) { #less };
        case (#isolation, #isolation) { #equal };
        case (#isolation, #cardio) { #less };
        case (#isolation, _) { #greater };
        case (#cardio, #cardio) { #equal };
        case (#cardio, _) { #greater };
      };
    };
  };

  let sampleExercises = [
    {
      name = "Bench Press";
      muscleGroup = #chest;
      exerciseType = #compound;
      description = "Classic chest exercise using a barbell";
      difficulty = 3;
    },
    {
      name = "Pull Ups";
      muscleGroup = #back;
      exerciseType = #compound;
      description = "Upper body exercise targeting back and biceps";
      difficulty = 4;
    },
    {
      name = "Squats";
      muscleGroup = #legs;
      exerciseType = #compound;
      description = "Leg exercise with barbell or bodyweight";
      difficulty = 3;
    },
    {
      name = "Bicep Curls";
      muscleGroup = #arms;
      exerciseType = #isolation;
      description = "Isolated exercise for biceps";
      difficulty = 2;
    },
    {
      name = "Plank";
      muscleGroup = #core;
      exerciseType = #isolation;
      description = "Core stability exercise";
      difficulty = 3;
    },
    {
      name = "Shoulder Press";
      muscleGroup = #shoulders;
      exerciseType = #compound;
      description = "Shoulder exercise using dumbbells or barbell";
      difficulty = 3;
    },
    {
      name = "Lunges";
      muscleGroup = #legs;
      exerciseType = #compound;
      description = "Leg exercise focusing on quadriceps and glutes";
      difficulty = 2;
    },
    {
      name = "Tricep Extensions";
      muscleGroup = #arms;
      exerciseType = #isolation;
      description = "Tricep isolation exercise";
      difficulty = 2;
    },
    {
      name = "Deadlifts";
      muscleGroup = #back;
      exerciseType = #compound;
      description = "Full body exercise focused on lower back and hamstrings";
      difficulty = 4;
    },
    {
      name = "Sit Ups";
      muscleGroup = #core;
      exerciseType = #isolation;
      description = "Abdominal exercise targeting core muscles";
      difficulty = 2;
    },
  ];

  let sampleWorkoutPlans = [
    {
      name = "Full Body Blast";
      description = "Comprehensive workout targeting all muscle groups";
      difficulty = 3;
      duration = 45;
      exerciseIds = [0, 1, 2, 3, 4, 5];
    },
    {
      name = "Strength Training";
      description = "Workout focused on building strength and muscle mass";
      difficulty = 4;
      duration = 60;
      exerciseIds = [0, 1, 2, 5, 8];
    },
    {
      name = "Cardio Core Mix";
      description = "Combination of cardiovascular and core exercises";
      difficulty = 2;
      duration = 30;
      exerciseIds = [4, 5, 6, 9];
    },
  ];

  let exercises = Map.empty<Nat, Exercise>();
  let workoutPlans = Map.empty<Nat, WorkoutPlan>();
  let workoutLogs = Map.empty<Principal, [WorkoutLog]>();

  for ((i, exercise) in sampleExercises.enumerate()) {
    exercises.add(
      i,
      {
        name = exercise.name;
        muscleGroup = exercise.muscleGroup;
        exerciseType = exercise.exerciseType;
        description = exercise.description;
        difficulty = exercise.difficulty.toNat8();
      },
    );
  };

  for ((i, plan) in sampleWorkoutPlans.enumerate()) {
    workoutPlans.add(
      i,
      {
        name = plan.name;
        description = plan.description;
        difficulty = plan.difficulty.toNat8();
        duration = plan.duration;
        exerciseIds = plan.exerciseIds;
      },
    );
  };

  public shared ({ caller }) func logWorkout(date : Time.Time, exercises : [ExerciseEntry]) : async () {
    if (exercises.size() == 0) {
      Runtime.trap("Workout must contain at least one exercise");
    };
    let newWorkout : WorkoutLog = {
      date;
      exercises;
    };
    let userLogs = switch (workoutLogs.get(caller)) {
      case (null) { [] };
      case (?logs) { logs };
    };

    let updatedLogs = List.fromArray<WorkoutLog>(userLogs);
    updatedLogs.add(newWorkout);
    workoutLogs.add(caller, updatedLogs.toArray());
  };

  public query ({ caller }) func getExercises() : async [Exercise] {
    exercises.values().toArray().sort();
  };

  public query ({ caller }) func getWorkoutPlans() : async [WorkoutPlan] {
    workoutPlans.values().toArray();
  };

  public query ({ caller }) func getWorkoutPlanById(id : Nat) : async WorkoutPlan {
    switch (workoutPlans.get(id)) {
      case (?plan) { plan };
      case (null) { Runtime.trap("Workout plan not found") };
    };
  };

  public query ({ caller }) func getWorkoutLogs() : async [WorkoutLog] {
    switch (workoutLogs.get(caller)) {
      case (null) { Runtime.trap("No workout logs found") };
      case (?logs) { logs };
    };
  };

  public query ({ caller }) func getExercisesByMuscleGroup(muscleGroup : MuscleGroup) : async [Exercise] {
    exercises.values().toArray().filter(
      func(exercise) {
        exercise.muscleGroup == muscleGroup;
      }
    ).sort();
  };

  public query ({ caller }) func searchExercises(searchTerm : Text) : async [Exercise] {
    let term = searchTerm.toLower();
    exercises.values().toArray().filter(
      func(exercise) {
        exercise.name.toLower().contains(#text term) or exercise.description.toLower().contains(#text term);
      }
    ).sort();
  };

  public query ({ caller }) func getWeeklyProgress(weekStart : Time.Time) : async WeeklySummary {
    let weekInNanos = 604800000000000;
    let dayInNanos = 86400000000000;

    let summaries = List.empty<DaySummary>();

    var i = 0;
    while (i < 7) {
      let dayStart = weekStart + (i * dayInNanos);
      let dayEnd = dayStart + dayInNanos;

      var workoutCount = 0;
      var totalVolume = 0;
      let userLogs = switch (workoutLogs.get(caller)) {
        case (null) { [] };
        case (?logs) { logs };
      };

      for (log in userLogs.values()) {
        if (log.date >= dayStart and log.date < dayEnd) {
          workoutCount += 1;
          for (exercise in log.exercises.values()) {
            for (set in exercise.sets.values()) {
              totalVolume += set.reps * set.weight;
            };
          };
        };
      };

      summaries.add({
        date = dayStart;
        workoutCount;
        totalVolume;
      });

      i += 1;
    };

    { days = summaries.toArray().sort() };
  };
};
