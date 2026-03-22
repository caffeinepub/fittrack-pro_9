import { motion } from "motion/react";
import { MuscleGroup } from "../hooks/useQueries";

const muscleGroupData: {
  group: MuscleGroup;
  label: string;
  icon: string;
  count: number;
  color: string;
}[] = [
  {
    group: MuscleGroup.chest,
    label: "Chest",
    icon: "💪",
    count: 24,
    color: "#e74c3c",
  },
  {
    group: MuscleGroup.back,
    label: "Back",
    icon: "🔙",
    count: 32,
    color: "#3498db",
  },
  {
    group: MuscleGroup.legs,
    label: "Legs",
    icon: "🦵",
    count: 28,
    color: "#27ae60",
  },
  {
    group: MuscleGroup.arms,
    label: "Arms",
    icon: "💪",
    count: 20,
    color: "#f39c12",
  },
  {
    group: MuscleGroup.core,
    label: "Core",
    icon: "⚡",
    count: 18,
    color: "#9b59b6",
  },
  {
    group: MuscleGroup.shoulders,
    label: "Shoulders",
    icon: "🏋️",
    count: 16,
    color: "#1abc9c",
  },
];

interface MuscleGroupsProps {
  selected: MuscleGroup | null;
  onSelect: (group: MuscleGroup | null) => void;
}

export function MuscleGroups({ selected, onSelect }: MuscleGroupsProps) {
  return (
    <section id="exercises" className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Muscle Groups</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {muscleGroupData.map((item, i) => (
          <motion.button
            key={item.group}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() =>
              onSelect(selected === item.group ? null : item.group)
            }
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              selected === item.group
                ? "border-teal bg-teal/10 shadow-md"
                : "border-border bg-card hover:border-teal/50 hover:shadow-card"
            }`}
            data-ocid="exercises.tab"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${item.color}20` }}
            >
              {item.icon}
            </div>
            <span className="text-xs font-semibold text-foreground text-center">
              {item.label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {item.count} exercises
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
