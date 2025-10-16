import { Download, Briefcase, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Resume = () => {
  const highlights = [
    {
      icon: Briefcase,
      title: "Professional Experience",
      items: [
        "Business Analyst Intern - TechCorp Solutions (Summer 2024)",
        "Market Research Associate - Growth Ventures (2023)",
      ],
    },
    {
      icon: Award,
      title: "Key Achievements",
      items: [
        "Dean's List - Academic Excellence Award (2023, 2024)",
        "Winner - MBA Case Competition on Digital Transformation",
        "Published Research on Supply Chain Analytics",
      ],
    },
    {
      icon: BookOpen,
      title: "Core Skills",
      items: [
        "Business Strategy & Analysis",
        "Data Analytics (Python, Excel, Tableau)",
        "Financial Modeling & Forecasting",
        "Project Management & Leadership",
      ],
    },
  ];

  return (
    <section id="resume" className="section-container">
      <h2 className="section-title">Online Resume</h2>
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-lg text-muted-foreground mb-6">
            Download my complete CV to learn more about my experience, skills, and achievements.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="mr-2" size={20} />
            Download CV
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((section, index) => (
            <Card
              key={index}
              className="portfolio-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <section.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-muted-foreground flex items-start"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
