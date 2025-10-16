import { Lightbulb, Users, Settings } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const About = () => {
  const traits = [
    {
      icon: Lightbulb,
      title: "Analytical Thinker",
      description: "Loves solving complex business problems with data.",
    },
    {
      icon: Users,
      title: "Collaborative Leader",
      description: "Believes in teamwork and cross-functional impact.",
    },
    {
      icon: Settings,
      title: "Tech-Savvy Innovator",
      description: "Passionate about digital transformation and analytics tools.",
    },
  ];

  return (
    <section id="about" className="section-container bg-muted/30">
      <h2 className="section-title">About Me</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl ring-4 ring-secondary/20 animate-fade-in">
            <img
              src={profileImage}
              alt="Gocool Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left animate-slide-in">
            <p className="text-lg leading-relaxed mb-4">
              I'm an MBA student specializing in <strong>Business Analytics, Strategy, and Leadership</strong>. 
              With a passion for transforming data into actionable insights, I thrive on solving real-world 
              business challenges through analytical thinking and strategic frameworks.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              My academic journey has equipped me with a robust understanding of operations management, 
              market analysis, and digital transformation. I believe in leveraging technology and data 
              to drive business excellence and sustainable growth.
            </p>
            <p className="text-lg leading-relaxed">
              Beyond academics, I'm committed to continuous learning and staying at the forefront of 
              business innovation. I'm eager to contribute to organizations that value data-driven 
              decision-making and strategic thinking.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="portfolio-card text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <trait.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{trait.title}</h3>
              <p className="text-muted-foreground">{trait.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
