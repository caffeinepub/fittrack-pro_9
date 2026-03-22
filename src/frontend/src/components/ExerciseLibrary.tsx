import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  MuscleGroup,
  useGetExercisesByMuscleGroup,
  useSearchExercises,
} from "../hooks/useQueries";
import type { Exercise } from "../hooks/useQueries";

const difficultyLabel = (d: number) =>
  d <= 2 ? "Beginner" : d <= 3 ? "Intermediate" : "Advanced";

const difficultyColor = (d: number) =>
  d <= 2
    ? "bg-green-100 text-green-700"
    : d <= 3
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

const muscleGroupColor: Record<string, string> = {
  chest: "bg-red-100 text-red-600",
  back: "bg-blue-100 text-blue-600",
  legs: "bg-green-100 text-green-600",
  arms: "bg-orange-100 text-orange-600",
  core: "bg-purple-100 text-purple-600",
  shoulders: "bg-teal-100 text-teal-600",
};

const STATIC_EXERCISES: Exercise[] = [
  {
    name: "Bench Press",
    muscleGroup: MuscleGroup.chest,
    exerciseType: "compound" as any,
    difficulty: 3,
    description:
      "Classic compound push exercise targeting the pectorals, anterior deltoids, and triceps.",
  },
  {
    name: "Pull-Ups",
    muscleGroup: MuscleGroup.back,
    exerciseType: "compound" as any,
    difficulty: 4,
    description:
      "Upper body pulling movement that builds back width and bicep strength.",
  },
  {
    name: "Barbell Squat",
    muscleGroup: MuscleGroup.legs,
    exerciseType: "compound" as any,
    difficulty: 4,
    description:
      "King of leg exercises. Builds quad, hamstring, and glute strength simultaneously.",
  },
  {
    name: "Overhead Press",
    muscleGroup: MuscleGroup.shoulders,
    exerciseType: "compound" as any,
    difficulty: 3,
    description:
      "Vertical push movement for shoulder strength and upper body stability.",
  },
  {
    name: "Bicep Curl",
    muscleGroup: MuscleGroup.arms,
    exerciseType: "isolation" as any,
    difficulty: 2,
    description: "Isolation exercise for developing bicep peak and arm size.",
  },
  {
    name: "Plank",
    muscleGroup: MuscleGroup.core,
    exerciseType: "isolation" as any,
    difficulty: 2,
    description:
      "Isometric core exercise that builds endurance and stability throughout the midsection.",
  },
  {
    name: "Deadlift",
    muscleGroup: MuscleGroup.back,
    exerciseType: "compound" as any,
    difficulty: 5,
    description:
      "Full body compound pull targeting the posterior chain from glutes to upper back.",
  },
  {
    name: "Lunges",
    muscleGroup: MuscleGroup.legs,
    exerciseType: "compound" as any,
    difficulty: 2,
    description:
      "Unilateral leg movement for quad and glute development with balance improvement.",
  },
];

const SKELETON_KEYS = ["sk-ex-1", "sk-ex-2", "sk-ex-3", "sk-ex-4"];

interface ExerciseLibraryProps {
  filterGroup: MuscleGroup | null;
}

export function ExerciseLibrary({ filterGroup }: ExerciseLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;

  const { data: searchResults, isLoading: searchLoading } =
    useSearchExercises(searchQuery);
  const { data: filteredResults, isLoading: filterLoading } =
    useGetExercisesByMuscleGroup(filterGroup);

  const isLoading = searchLoading || filterLoading;

  let exercises: Exercise[] = [];
  if (searchQuery.trim()) {
    exercises = searchResults ?? STATIC_EXERCISES;
  } else if (filterGroup) {
    exercises =
      filteredResults ??
      STATIC_EXERCISES.filter((e) => e.muscleGroup === filterGroup);
  } else {
    exercises = searchResults ?? STATIC_EXERCISES;
  }

  const paged = exercises.slice(0, (page + 1) * PAGE_SIZE);
  const hasMore = exercises.length > paged.length;

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  }, []);

  const handleAddToWorkout = (ex: Exercise) => {
    toast.success(`${ex.name} added to workout!`);
  };

  return (
    <section id="progress" className="mb-8">
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg font-bold">
              Exercise Library
            </CardTitle>
            <div className="flex items-center gap-2">
              {filterGroup && (
                <Badge className="bg-teal/20 text-teal border-teal/30 capitalize">
                  <Filter className="w-3 h-3 mr-1" />
                  {filterGroup}
                </Badge>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9 w-48 sm:w-64 h-9"
                  data-ocid="exercises.search_input"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3" data-ocid="exercises.loading_state">
              {SKELETON_KEYS.map((k) => (
                <Skeleton key={k} className="h-16 rounded-lg" />
              ))}
            </div>
          ) : exercises.length === 0 ? (
            <div
              className="p-8 text-center text-muted-foreground"
              data-ocid="exercises.empty_state"
            >
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No exercises found for this search.</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {paged.map((ex, i) => (
                  <motion.div
                    key={ex.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 px-4 sm:px-6 py-3 hover:bg-secondary/50 transition-colors"
                    data-ocid={`exercises.item.${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-navy font-bold text-xs">
                        {ex.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-semibold text-sm text-foreground">
                          {ex.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-1.5 py-0 h-4 capitalize ${muscleGroupColor[ex.muscleGroup] ?? ""}`}
                        >
                          {ex.muscleGroup}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-1.5 py-0 h-4 capitalize ${difficultyColor(ex.difficulty)}`}
                        >
                          {difficultyLabel(ex.difficulty)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 capitalize"
                        >
                          {ex.exerciseType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {ex.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-teal text-teal hover:bg-teal hover:text-white transition-colors text-xs h-7 px-2 flex-shrink-0"
                      onClick={() => handleAddToWorkout(ex)}
                      data-ocid={`exercises.item.${i + 1}`}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </motion.div>
                ))}
              </div>
              {hasMore && (
                <div className="p-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() => setPage((p) => p + 1)}
                    data-ocid="exercises.pagination_next"
                  >
                    Load More ({exercises.length - paged.length} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
