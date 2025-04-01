
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const stats = [
  { id: 1, value: 90, label: "Fish survival rate", suffix: "%" },
  { id: 2, value: 90, label: "Support of the local economy", suffix: "%" },
  { id: 3, value: 66, label: "Reduction in fish maturity rates", suffix: "%" },
  { id: 4, value: 100, label: "Organic Foods", suffix: "%" },
];

// Counter animation component
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-aqua-950 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aC0ydjJoMnYtMnptLTQgOGgydi0yLTJoLTJ2MmgydjJ6bTAgMGgtMnYyaDJ2LTJ6bTAtNnYyaDJWMzJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            Kamuthanga in Numbers
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: stat.id * 0.1 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
