import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Package, Smartphone } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      icon: BarChart3,
      title: "Ryanair Case Analysis",
      description: "Comprehensive business strategy analysis of Europe's leading low-cost carrier, examining competitive positioning and operational efficiency.",
      tags: ["Strategy", "Market Analysis", "Aviation"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Package,
      title: "Supply Chain Optimization",
      description: "EOQ modeling and process mapping to optimize inventory management and reduce operational costs in manufacturing.",
      tags: ["Analytics", "Operations", "Optimization"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Smartphone,
      title: "Samsung Foldable Smartphones",
      description: "Technology marketing strategy analysis for foldable devices, exploring market positioning and consumer adoption patterns.",
      tags: ["Marketing", "Technology", "Innovation"],
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">Projects</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="portfolio-card overflow-hidden border-0 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
            <CardContent className="p-6">
              <div className={`w-14 h-14 mb-4 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <project.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
