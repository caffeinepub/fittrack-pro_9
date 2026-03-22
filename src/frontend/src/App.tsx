import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ExerciseLibrary } from "./components/ExerciseLibrary";
import { FeaturedWorkouts } from "./components/FeaturedWorkouts";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MuscleGroups } from "./components/MuscleGroups";
import { Navbar } from "./components/Navbar";
import { WorkoutTracker } from "./components/WorkoutTracker";
import type { MuscleGroup } from "./hooks/useQueries";

export default function App() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<MuscleGroup | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />
      <Navbar />
      <HeroSection />

      <main className="flex-1">
        {/* Dashboard section */}
        <section
          id="dashboard"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-extrabold text-foreground">
                Dashboard
              </h1>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Global Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises, workouts..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10 h-11 text-sm bg-card border-border"
                data-ocid="dashboard.search_input"
              />
            </div>

            {/* Muscle Groups */}
            <MuscleGroups
              selected={selectedMuscleGroup}
              onSelect={setSelectedMuscleGroup}
            />

            {/* Featured Workouts */}
            <FeaturedWorkouts />

            {/* Workout Tracker */}
            <WorkoutTracker />

            {/* Exercise Library */}
            <ExerciseLibrary filterGroup={selectedMuscleGroup} />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
