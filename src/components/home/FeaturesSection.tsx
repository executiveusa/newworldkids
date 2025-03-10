
import { 
  Brain, 
  LineChart, 
  Users, 
  Wallet 
} from "lucide-react";

const features = [
  {
    name: 'AI Learning Assistance',
    description: 'Personalized AI tutors help kids learn Web3 concepts at their own pace.',
    icon: Brain
  },
  {
    name: 'Impact Tracking',
    description: 'Real-time blockchain analytics to monitor the impact of educational initiatives.',
    icon: LineChart
  },
  {
    name: 'Community Projects',
    description: 'Join forces with other kids to create meaningful blockchain projects.',
    icon: Users
  },
  {
    name: 'Web3 Fundamentals',
    description: 'Learn about cryptocurrencies, NFTs, and blockchain technology safely.',
    icon: Wallet
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">
            Empowering Features
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Everything you need to start learning about Web3 technology
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div 
              key={feature.name}
              className="relative glass-effect p-6 rounded-2xl hover-lift"
            >
              <div className="inline-flex items-center justify-center p-2 bg-[#F2FF44]/10 rounded-lg mb-5">
                <feature.icon className="h-6 w-6 text-[#F2FF44]" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-sm text-white/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
