import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Clock, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useGetWorkoutPlans } from "../hooks/useQueries";

const fallbackWorkouts = [
  {
    name: "Power Upper Body",
    description:
      "Build serious strength in your chest, back, and shoulders with compound movements.",
    duration: BigInt(45),
    difficulty: 4,
    img: "/assets/generated/workout-chest.dim_400x250.jpg",
  },
  {
    name: "HIIT Cardio Blast",
    description:
      "High-intensity interval training to torch calories and improve cardiovascular fitness.",
    duration: BigInt(30),
    difficulty: 5,
    img: "/assets/generated/workout-hiit.dim_400x250.jpg",
  },
  {
    name: "Core & Stability",
    description:
      "Strengthen your core muscles for better posture, balance, and injury prevention.",
    duration: BigInt(35),
    difficulty: 3,
    img: "/assets/generated/workout-core.dim_400x250.jpg",
  },
];

const workoutImages = [
  "/assets/generated/workout-chest.dim_400x250.jpg",
  "/assets/generated/workout-hiit.dim_400x250.jpg",
  "/assets/generated/workout-core.dim_400x250.jpg",
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3"];

export function FeaturedWorkouts() {
  const { data: plans, isLoading } = useGetWorkoutPlans();

  const displayPlans = (
    plans && plans.length > 0 ? plans.slice(0, 3) : fallbackWorkouts
  ).map((p, i) => ({ ...p, img: workoutImages[i % workoutImages.length] }));

  return (
    <section id="workouts" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Featured Workouts</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-teal hover:text-teal-dark"
          data-ocid="workouts.secondary_button"
        >
          See All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-ocid="workouts.list"
      >
        {isLoading
          ? SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-72 rounded-xl" />
            ))
          : displayPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-lg transition-shadow"
                data-ocid={`workouts.item.${i + 1}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={plan.img}
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-navy text-white text-xs">
                      <Flame className="w-3 h-3 mr-1" />
                      {plan.difficulty}/5
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{plan.duration.toString()} min</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-teal hover:bg-teal-dark text-white text-xs px-3 h-7"
                      data-ocid={`workouts.item.${i + 1}`}
                    >
                      View Workout
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </section>
  );
}
