import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  useGetExercises,
  useGetWeeklyProgress,
  useLogWorkout,
} from "../hooks/useQueries";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WorkoutEntry {
  exerciseId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}

export function WorkoutTracker() {
  const { data: weekly } = useGetWeeklyProgress();
  const { data: exercises } = useGetExercises();
  const { mutate: logWorkout, isPending } = useLogWorkout();

  const [entries, setEntries] = useState<WorkoutEntry[]>([
    {
      exerciseId: 0,
      exerciseName: "Bench Press",
      sets: 3,
      reps: 10,
      weight: 80,
    },
  ]);
  const [selectedExercise, setSelectedExercise] = useState("");

  const chartData = DAYS.map((day, i) => {
    const daySummary = weekly?.days[i];
    return {
      day,
      volume: daySummary
        ? Number(daySummary.totalVolume)
        : Math.floor(Math.random() * 8000) + 2000,
      workouts: daySummary
        ? Number(daySummary.workoutCount)
        : Math.floor(Math.random() * 3),
    };
  });

  const handleAddExercise = () => {
    if (!selectedExercise.trim()) return;
    const ex = exercises?.find((e) => e.name === selectedExercise);
    setEntries((prev) => [
      ...prev,
      {
        exerciseId: ex ? exercises!.indexOf(ex) : prev.length,
        exerciseName: selectedExercise,
        sets: 3,
        reps: 10,
        weight: 0,
      },
    ]);
    setSelectedExercise("");
  };

  const handleUpdateEntry = (
    idx: number,
    field: keyof WorkoutEntry,
    value: string | number,
  ) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e)),
    );
  };

  const handleRemoveEntry = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveWorkout = () => {
    if (entries.length === 0) {
      toast.error("Add at least one exercise");
      return;
    }
    const exerciseEntries = entries.map((e) => ({
      exerciseId: BigInt(e.exerciseId),
      sets: Array.from({ length: e.sets }, () => ({
        reps: BigInt(e.reps),
        weight: BigInt(Math.round(e.weight)),
      })),
    }));
    logWorkout(
      {
        date: BigInt(Date.now()) * BigInt(1_000_000),
        exercises: exerciseEntries,
      },
      {
        onSuccess: () => toast.success("Workout logged successfully!"),
        onError: () => toast.error("Failed to log workout"),
      },
    );
  };

  return (
    <section id="tracking" className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">
        My Workout Tracker
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">
                Weekly Progress
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Total volume lifted this week (kg)
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 5, bottom: 0, left: -10 }}
                >
                  <defs>
                    <linearGradient
                      id="volumeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#20C7C7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#20C7C7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value} kg`, "Volume"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#20C7C7"
                    strokeWidth={2.5}
                    fill="url(#volumeGradient)"
                    dot={{
                      r: 4,
                      fill: "#20C7C7",
                      strokeWidth: 2,
                      stroke: "white",
                    }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-2 px-1">
                {chartData.map((d) => (
                  <div key={d.day} className="text-center">
                    <div className="text-[10px] text-muted-foreground">
                      {d.workouts} sets
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Workout Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-card h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">
                Current Workout
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Add exercises and log your sets
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  id="exercise-name-input"
                  placeholder="Exercise name..."
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddExercise()}
                  className="text-sm h-8"
                  list="exercise-list"
                  data-ocid="tracking.input"
                />
                {exercises && (
                  <datalist id="exercise-list">
                    {exercises.map((ex) => (
                      <option key={ex.name} value={ex.name} />
                    ))}
                  </datalist>
                )}
                <Button
                  size="sm"
                  type="button"
                  className="bg-teal hover:bg-teal-dark text-white h-8 px-3"
                  onClick={handleAddExercise}
                  data-ocid="tracking.secondary_button"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {entries.length === 0 && (
                  <div
                    className="text-center py-6 text-muted-foreground text-sm"
                    data-ocid="tracking.empty_state"
                  >
                    No exercises added yet
                  </div>
                )}
                {entries.map((entry, i) => (
                  <div
                    key={entry.exerciseName}
                    className="p-2 rounded-lg bg-secondary border border-border"
                    data-ocid={`tracking.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-foreground truncate max-w-[100px]">
                        {entry.exerciseName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEntry(i)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        data-ocid={`tracking.delete_button.${i + 1}`}
                        aria-label={`Remove ${entry.exerciseName}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="flex-1">
                        <label
                          htmlFor={`sets-${i}`}
                          className="text-[9px] text-muted-foreground uppercase tracking-wide"
                        >
                          Sets
                        </label>
                        <Input
                          id={`sets-${i}`}
                          type="number"
                          value={entry.sets}
                          onChange={(e) =>
                            handleUpdateEntry(i, "sets", Number(e.target.value))
                          }
                          className="h-6 text-xs px-1.5 text-center"
                          min={1}
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={`reps-${i}`}
                          className="text-[9px] text-muted-foreground uppercase tracking-wide"
                        >
                          Reps
                        </label>
                        <Input
                          id={`reps-${i}`}
                          type="number"
                          value={entry.reps}
                          onChange={(e) =>
                            handleUpdateEntry(i, "reps", Number(e.target.value))
                          }
                          className="h-6 text-xs px-1.5 text-center"
                          min={1}
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={`weight-${i}`}
                          className="text-[9px] text-muted-foreground uppercase tracking-wide"
                        >
                          kg
                        </label>
                        <Input
                          id={`weight-${i}`}
                          type="number"
                          value={entry.weight}
                          onChange={(e) =>
                            handleUpdateEntry(
                              i,
                              "weight",
                              Number(e.target.value),
                            )
                          }
                          className="h-6 text-xs px-1.5 text-center"
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-navy hover:bg-navy-dark text-white font-semibold text-sm"
                onClick={handleSaveWorkout}
                disabled={isPending}
                data-ocid="tracking.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Workout
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
