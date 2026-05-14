import { motion } from 'motion/react';

interface MosquitoProps {
  state: 'idle' | 'flying' | 'happy' | 'popping' | 'popped';
}

export default function Mosquito({ state }: MosquitoProps) {
  if (state === 'popped') return null;

  const containerVariants = {
    idle: { y: 0, rotate: 0 },
    flying: { 
      y: [0, -15, 0], 
      rotate: 0,
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
    },
    happy: { 
      y: [0, -10, 0], 
      rotate: 0, 
      transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" } 
    },
    popping: { 
      y: 60, // Cae muerto
      rotate: 180, // Queda boca arriba
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.8 } 
    }
  };

  return (
    <motion.div 
      animate={state} 
      variants={containerVariants}
      className="relative w-40 h-40 flex items-center justify-center drop-shadow-xl z-20 pointer-events-none"
    >
      {/* Efecto de golpe/choque (Popping) */}
      {state === 'popping' && (
         <motion.div 
            className="absolute inset-0 bg-red-400 rounded-full blur-md -z-10"
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.4 }}
         />
      )}

      {/* SVG del Personaje: Mosquito Volador */}
      <svg viewBox="0 0 100 100" className="w-full h-full p-2">
        {/* Patas Traseras */}
        {state === 'popping' ? (
          <path d="M 40 70 L 35 85 M 60 70 L 65 85" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        ) : (
          <path d="M 40 70 L 25 85 M 60 70 L 75 85" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        )}

        {/* Patas Delanteras (aplaudiendo en happy) */}
        {state === 'happy' ? (
          <g>
            <motion.line 
               x1="40" y1="60" x2="48" y2="65"
               stroke="#111" strokeWidth="2.5" strokeLinecap="round"
               animate={{ x2: [30, 48, 30], y2: [60, 65, 60] }} 
               transition={{ repeat: Infinity, duration: 0.3 }} 
            />
            <motion.line 
               x1="60" y1="60" x2="52" y2="65"
               stroke="#111" strokeWidth="2.5" strokeLinecap="round"
               animate={{ x2: [70, 52, 70], y2: [60, 65, 60] }} 
               transition={{ repeat: Infinity, duration: 0.3 }} 
            />
          </g>
        ) : state === 'popping' ? (
          <path d="M 40 60 L 30 50 M 60 60 L 70 50" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        ) : (
          <path d="M 40 60 L 20 70 M 60 60 L 80 70" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        )}
        
        {/* Cuerpo */}
        <ellipse cx="50" cy="55" rx="16" ry="25" fill="#3f3f46" /> {/* slate-700 */}
        <ellipse cx="50" cy="35" rx="12" ry="12" fill="#27272a" /> {/* slate-800 */}

        {/* Ojos base */}
        <circle cx="43" cy="30" r="4.5" fill="white" />
        <circle cx="57" cy="30" r="4.5" fill="white" />
        
        {state === 'popping' ? (
          // Ojos en X cuando pierde (revienta / muerto)
          <g stroke="black" strokeWidth="1.5" strokeLinecap="round">
            <line x1="41" y1="28" x2="45" y2="32" />
            <line x1="45" y1="28" x2="41" y2="32" />
            <line x1="55" y1="28" x2="59" y2="32" />
            <line x1="59" y1="28" x2="55" y2="32" />
            {/* Lengua de muerto */}
            <path d="M 50 35 Q 52 42 47 43" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : state === 'happy' ? (
          // Ojos felices cerrados (^^)
          <g stroke="black" strokeWidth="2" strokeLinecap="round" fill="none">
            <path d="M 40 31 Q 43 27 46 31" />
            <path d="M 54 31 Q 57 27 60 31" />
          </g>
        ) : (
          // Pupilas normales
          <g>
            <circle cx="43" cy="30" r="2" fill="black" />
            <circle cx="57" cy="30" r="2" fill="black" />
          </g>
        )}

        {/* Pico estilete (Probóscide) */}
        {/* Desaparece si se revienta o doblado */}
        {state === 'popping' ? (
           <path d="M 50 23 L 50 15 L 45 10" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
           <line x1="50" y1="23" x2="50" y2="0" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Alas */}
        {state === 'flying' || state === 'happy' ? (
            <g>
              <motion.ellipse cx="30" cy="45" rx="20" ry="10" fill="#a5f3fc" opacity="0.9" stroke="#fff" strokeWidth="1"
                animate={{ rotate: [-30, 30, -30], originX: "20px", originY: "45px" }} 
                transition={{ repeat: Infinity, duration: 0.05 }} />
              <motion.ellipse cx="70" cy="45" rx="20" ry="10" fill="#a5f3fc" opacity="0.9" stroke="#fff" strokeWidth="1"
                animate={{ rotate: [30, -30, 30], originX: "70px", originY: "45px" }} 
                transition={{ repeat: Infinity, duration: 0.05 }} />
            </g>
        ) : (
            <g opacity={state === 'popping' ? 0.3 : 1}>
              <ellipse cx="30" cy="45" rx="20" ry="10" fill="#a5f3fc" opacity="0.9" stroke="#fff" strokeWidth="1" transform="rotate(-20 30 45)" />
              <ellipse cx="70" cy="45" rx="20" ry="10" fill="#a5f3fc" opacity="0.9" stroke="#fff" strokeWidth="1" transform="rotate(20 70 45)" />
            </g>
        )}
        
        {/* Sonrojo cuando acierta */}
        {state === 'happy' && (
          <g opacity="0.6">
            <circle cx="39" cy="35" r="3" fill="#ff7675" />
            <circle cx="61" cy="35" r="3" fill="#ff7675" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
