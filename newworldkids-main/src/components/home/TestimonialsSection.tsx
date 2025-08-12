
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "This program opened my eyes to the world of blockchain. Now I'm teaching my parents about decentralized finance!",
    author: "Sophia, 13",
    role: "Student",
    avatar: "/avatars/sophia.jpg"
  },
  {
    id: 2,
    content: "My son was struggling with technology concepts until he joined New World Kids. The interactive learning approach has made all the difference.",
    author: "Michael P.",
    role: "Parent",
    avatar: "/avatars/michael.jpg"
  },
  {
    id: 3,
    content: "We've sponsored three classes through this platform, and the impact reports allow us to see exactly how our contributions help kids learn.",
    author: "Jessica T.",
    role: "Corporate Sponsor",
    avatar: "/avatars/jessica.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_60%,rgba(137,137,222,0.1),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-lg mb-3">
            <Sparkles className="h-5 w-5 text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Success Stories</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Hear From Our Community
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real stories from students, parents, and sponsors who are part of our educational ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="glass-effect border-0 p-6 hover-lift">
              <div className="relative">
                <div className="text-xl text-white/80 italic mb-6">
                  "{testimonial.content}"
                </div>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback className="bg-[#F2FF44]/20 text-[#F2FF44]">
                      {testimonial.author.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-white">{testimonial.author}</div>
                    <div className="text-xs text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
