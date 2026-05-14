import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function ForestBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#0f2e1a] via-[#1a472a] to-[#0a2312]">
      {/* Sun/Moon Glow */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-100/10 rounded-full blur-[80px]"></div>
      
      {/* Distant Mountains / Hills */}
      <svg className="absolute bottom-0 w-full h-auto text-[#10341b] opacity-60" viewBox="0 0 1440 320" preserveAspectRatio="none">
         <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      {/* Midground Hills */}
      <svg className="absolute bottom-0 w-full h-auto text-[#0c2815] opacity-80" viewBox="0 0 1440 250" preserveAspectRatio="none">
         <path fill="currentColor" d="M0,96L60,117.3C120,139,240,181,360,181.3C480,181,600,139,720,112C840,85,960,75,1080,85.3C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>

      {/* Abstract Pine Trees (Triangles) */}
      <div className="absolute bottom-0 left-[5%] w-0 h-0 border-l-[40px] border-r-[40px] border-b-[180px] border-transparent border-b-[#081e0f] opacity-80"></div>
      <div className="absolute bottom-0 left-[15%] w-0 h-0 border-l-[30px] border-r-[30px] border-b-[130px] border-transparent border-b-[#0c2a15] opacity-90"></div>
      <div className="absolute bottom-0 left-[40%] w-0 h-0 border-l-[50px] border-r-[50px] border-b-[220px] border-transparent border-b-[#05170a] opacity-70"></div>
      <div className="absolute bottom-0 left-[60%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[100px] border-transparent border-b-[#081d0e] opacity-85"></div>
      <div className="absolute bottom-0 right-[25%] w-0 h-0 border-l-[45px] border-r-[45px] border-b-[190px] border-transparent border-b-[#06180c] opacity-80"></div>
      <div className="absolute bottom-0 right-[5%] w-0 h-0 border-l-[35px] border-r-[35px] border-b-[150px] border-transparent border-b-[#051409] opacity-90"></div>

      {/* Fireflies */}
      {mounted && [...Array(20)].map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 4 + 4;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full blur-[1px]"
            initial={{ 
              left: `${left}%`, 
              top: `${top}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: [0, -40, 20, -20],
              x: [0, 30, -20, 10],
              opacity: [0, 0.8, 0.2, 0],
              scale: [0, 1.5, 0.8, 0]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )
      })}
      
      {/* Front mist / fog */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0a2312] to-transparent opacity-80"></div>
    </div>
  );
}
