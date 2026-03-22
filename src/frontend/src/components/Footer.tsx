import { Dumbbell, Github, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: ["Dashboard", "Exercises", "Workouts", "Progress"],
  },
  {
    title: "Support",
    links: ["Help Center", "Community", "Contact", "Status"],
  },
  { title: "Company", links: ["About", "Blog", "Careers", "Privacy"] },
];

const socialIcons = [
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Github, label: "GitHub" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg">FitPulse</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your complete fitness companion. Track workouts, monitor progress,
              and achieve your goals.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialIcons.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal transition-colors"
                  data-ocid="nav.link"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-sm mb-3 text-gray-200">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-teal text-sm transition-colors"
                      data-ocid="nav.link"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            &copy; {year} FitPulse. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
