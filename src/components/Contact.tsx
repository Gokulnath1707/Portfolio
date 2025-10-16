import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="section-container bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 animate-fade-in">Let's Connect</h2>
        <p className="text-xl mb-4 text-white/90 italic animate-fade-in">
          "Let's connect and create business impact."
        </p>
        <p className="text-lg mb-12 text-white/80 animate-fade-in">
          I'm always open to discussing new opportunities, collaborations, or simply 
          connecting with fellow professionals. Feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base rounded-full shadow-lg group"
            asChild
          >
            <a href="mailto:gocool@mba.edu" className="flex items-center">
              <Mail className="mr-2" size={20} />
              gocool@mba.edu
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-base rounded-full group"
            asChild
          >
            <a href="https://linkedin.com/in/gocool" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Linkedin className="mr-2" size={20} />
              LinkedIn Profile
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
