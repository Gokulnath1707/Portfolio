import { Award, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Certificates = () => {
  const academicCerts = [
    {
      title: "MBA - Business Analytics",
      institution: "Premier Business School",
      date: "Expected 2025",
    },
    {
      title: "Bachelor of Business Administration",
      institution: "University Name",
      date: "2022",
    },
    {
      title: "Business Strategy Certification",
      institution: "Strategic Management Institute",
      date: "2023",
    },
  ];

  const otherCerts = [
    {
      title: "Data Analytics Professional Certificate",
      institution: "Google",
      date: "2024",
    },
    {
      title: "Financial Modeling & Valuation",
      institution: "Coursera",
      date: "2023",
    },
    {
      title: "Digital Marketing Specialization",
      institution: "LinkedIn Learning",
      date: "2023",
    },
    {
      title: "Supply Chain Management",
      institution: "MIT Professional Education",
      date: "2024",
    },
  ];

  return (
    <section id="certificates" className="section-container bg-muted/30">
      <h2 className="section-title">Certificates</h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Academic Certificates */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="text-primary" size={28} />
            <h3 className="text-2xl font-bold">Academic Certificates</h3>
          </div>
          <div className="space-y-4">
            {academicCerts.map((cert, index) => (
              <Card
                key={index}
                className="portfolio-card border-l-4 border-l-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg mb-1">{cert.title}</h4>
                  <p className="text-muted-foreground text-sm mb-1">
                    {cert.institution}
                  </p>
                  <p className="text-secondary text-sm font-medium">{cert.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Certificates */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-secondary" size={28} />
            <h3 className="text-2xl font-bold">Professional Certificates</h3>
          </div>
          <div className="space-y-4">
            {otherCerts.map((cert, index) => (
              <Card
                key={index}
                className="portfolio-card border-l-4 border-l-secondary"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg mb-1">{cert.title}</h4>
                  <p className="text-muted-foreground text-sm mb-1">
                    {cert.institution}
                  </p>
                  <p className="text-secondary text-sm font-medium">{cert.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
