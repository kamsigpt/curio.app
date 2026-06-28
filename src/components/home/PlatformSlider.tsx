import udemyLogo from "@/assets/platforms/udemy_logo-removebg-preview.png";
import courseraLogo from "@/assets/platforms/coursera_logo_1-removebg-preview.png";
import skillshareLogo from "@/assets/platforms/skillshare_logo-removebg-preview.png";
import linkedinLogo from "@/assets/platforms/linkedin-learning-logo-clipart-rz5ja-removebg-preview.png";

const platforms = [
  { name: "Udemy", src: udemyLogo },
  { name: "Coursera", src: courseraLogo },
  { name: "Skillshare", src: skillshareLogo },
  { name: "LinkedIn Learning", src: linkedinLogo },
];

export function PlatformSlider() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-display text-lg font-bold text-ink">
          Courses from the <span className="text-[#10CDB2]">Best</span> Learning Platforms
        </h2>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 sm:gap-8"
            style={{
              animation: "slide 25s linear infinite",
            }}
          >
            {[...platforms, ...platforms].map((p, i) => (
              <img
                key={`${p.name}-${i}`}
                src={p.src}
                alt={p.name}
                className="h-20 w-72 shrink-0 object-contain sm:h-24 sm:w-80"
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
