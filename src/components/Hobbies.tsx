import { Camera, Plane, Book, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Hobbies = () => {
  const hobbies = [
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments and perspectives through the lens.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Plane,
      title: "Travel",
      description: "Exploring new cultures and broadening horizons.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Book,
      title: "Reading Business Books",
      description: "Continuous learning from thought leaders and innovators.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Trophy,
      title: "Cricket",
      description: "Team sports, strategy, and competitive spirit.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="hobbies" className="section-container bg-muted/30">
      <h2 className="section-title">Beyond Work</h2>
      
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Beyond business and analytics, I believe in maintaining a well-rounded lifestyle 
        that fuels creativity and personal growth.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {hobbies.map((hobby, index) => (
          <Card
            key={index}
            className="portfolio-card group cursor-pointer overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${hobby.gradient} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <hobby.icon className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-2">{hobby.title}</h3>
              <p className="text-sm text-muted-foreground">{hobby.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
