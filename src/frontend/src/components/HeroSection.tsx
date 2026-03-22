import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-navy min-h-[600px] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, #071e2e 0%, #0B2A3F 50%, #0F3550 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #20C7C7, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #20C7C7, transparent)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-teal text-teal" />
                ))}
              </div>
              <span className="text-sm text-gray-300">
                Trusted by 50k+ athletes
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Train Smarter,
              <br />
              <span className="text-teal">Get Stronger</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
              Track your workouts, visualize progress, and hit your fitness
              goals with FitPulse — your complete workout companion.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-teal hover:bg-teal-dark text-white font-bold px-6 text-base"
                onClick={() =>
                  document
                    .getElementById("dashboard")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.primary_button"
              >
                Get Started For Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-medium px-6 text-base bg-transparent"
                data-ocid="hero.secondary_button"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Demo
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm">
              {[
                { label: "Exercises", value: "500+" },
                { label: "Workouts", value: "200+" },
                { label: "Members", value: "50k+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-teal">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: athlete photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ maxHeight: "500px" }}
            >
              <img
                src="/assets/generated/hero-athlete.dim_800x900.jpg"
                alt="FitPulse athlete training"
                className="w-full h-full object-cover object-top"
                style={{ maxHeight: "500px" }}
              />
              {/* Overlay gradient to blend */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, #0B2A3F 0%, transparent 30%, transparent 70%, #0B2A3F 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
