
import { Check, Droplet, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Check className="h-8 w-8" />,
    title: "100% Sustainable",
    description: "Discover the essence of responsible fish farming with our sustainable, delicious products.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <Droplet className="h-8 w-8" />,
    title: "Fresh Fish",
    description: "Indulge in the pinnacle of freshness with our impeccably fresh fish.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Working Together",
    description: "Ability to work with other farmers to achieve more with a shared dedication to eco-conscious farming practices.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Excellent Customer Experience",
    description: "We're dedicated to crafting a seamless and delightful customer experience from farm to table.",
    color: "bg-red-100 text-red-600",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-aqua-950">Why Choose Us</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-700">
            Choose Kamuthanga Farm for a taste of elite freshness, where sustainability meets excellence in every bite.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={cn("rounded-full p-4 mr-4", feature.color)}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-aqua-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
