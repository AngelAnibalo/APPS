import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, User, GraduationCap, Users, Trophy, RotateCcw, AlertTriangle, BookOpen, Clock } from 'lucide-react';
import Mosquito from './components/Mosquito';
import ForestBackground from './components/ForestBackground';
import { questions } from './data';

type ScreenState = 'login' | 'reading' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('login');
  const [name, setName] = useState('');
  const [ficha, setFicha] = useState('');

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const [mosquitoState, setMosquitoState] = useState<'flying' | 'happy' | 'popping' | 'idle' | 'popped'>('flying');
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(720); // 12 minutes in seconds

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (screen === 'quiz' && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (screen === 'quiz' && timeLeft <= 0) {
      setScreen('result');
    }
    return () => clearInterval(timerId);
  }, [screen, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startReading = (e: React.FormEvent) => {
    e.preventDefault();
    if(name && ficha) setScreen('reading');
  }

  const startQuiz = () => {
    setScreen('quiz');
    setMosquitoState('flying');
    setFeedbackText(null);
    setCurrentQIndex(0);
    setScore(0);
    setTimeLeft(720);
  }

  const restart = () => {
    setScreen('login');
    setName('');
    setFicha('');
  }

  const handleAnswer = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedOption(index);

    const isCorrect = index === questions[currentQIndex].correctIndex;

    if (isCorrect) {
      setMosquitoState('happy');
      setFeedbackText('felicitaciones eres un genio');
      setScore(s => s + 1);
    } else {
      setMosquitoState('popping');
      setFeedbackText('debes mejorar');
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
         setCurrentQIndex(currentQIndex + 1);
         setMosquitoState('flying');
         setFeedbackText(null);
         setSelectedOption(null);
         setIsAnimating(false);
      } else {
         setScreen('result');
         setIsAnimating(false);
         setSelectedOption(null);
      }
    }, 2800);
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center text-gray-800">
      <ForestBackground />
      
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        {/* Header */}
        <header className="w-full bg-[#1b4326]/80 backdrop-blur-md text-white border-b border-white/10 p-4 shadow-lg sticky top-0 z-20">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-bold flex items-center gap-2 drop-shadow-md">
              <GraduationCap /> SENA Marketing Digital
            </h1>
            {name && (
              <div className="text-xs md:text-sm border border-white/40 px-3 py-1 rounded-full bg-white/10 hidden md:block backdrop-blur-sm">
                {name} | Ficha: {ficha}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 flex flex-col mt-4 md:mt-8 z-10">
        <AnimatePresence mode="wait">
          
          {/* LOGIN SCREEN */}
          {screen === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="w-full h-full flex items-center justify-center pt-10"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto text-center border-t-8 border-[#39A900]">
                <BookOpen className="w-16 h-16 text-[#39A900] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">MiPyME Popayán</h2>
                <p className="text-gray-500 mb-8">Misión: Salvar la empresa textil utilizando Marketing Digital Estratégico.</p>
                <form onSubmit={startReading} className="space-y-4">
                  <input 
                    required type="text" placeholder="Ingresa tu Nombre" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#39A900] focus:ring-2 focus:ring-[#39A900]" 
                    value={name} onChange={e => setName(e.target.value)} 
                  />
                  <input 
                    required type="text" placeholder="Número de Ficha" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#39A900] focus:ring-2 focus:ring-[#39A900]" 
                    value={ficha} onChange={e => setFicha(e.target.value)} 
                  />
                  <button type="submit" className="w-full bg-[#39A900] hover:bg-[#2A7C00] text-white font-bold py-3 rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                    Comenzar Aventura <Play className="w-5 h-5" fill="currentColor"/>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* READING / THINK-PAIR-SHARE SCREEN */}
          {screen === 'reading' && (
            <motion.div 
              key="reading"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto w-full pb-10"
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">El Reto del Mosquito Volador</h2>
                
                <div className="mb-8 p-6 bg-blue-50 text-blue-900 rounded-xl relative overflow-hidden">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 relative z-10"><AlertTriangle /> Contexto de la Empresa</h3>
                  <p className="mb-3 relative z-10">
                    La empresa <strong>"Tejidos Popayán"</strong> produce ruanas de altísima calidad. Sin embargo, llevan años perdiendo ventas porque no están en Internet. 
                  </p>
                  <p className="relative z-10">
                    Carecen de un plan estratégico: no saben a quién vender (Target), no tienen identidad (Branding) ni evalúan sus resultados (KPIs). 
                  </p>
                  {/* Decorative background element */}
                  <AlertTriangle className="absolute -right-4 -top-4 w-32 h-32 text-blue-100 opacity-50 z-0" />
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-5 text-[#39A900]">Metodología: Think-Pair-Share</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                     <div className="bg-gray-50 border-t-4 border-gray-400 p-4 rounded-xl shadow-sm">
                       <h4 className="font-bold flex items-center gap-2 mb-2"><User /> 1. Think (Piensa)</h4>
                       <p className="text-sm text-gray-600">Analiza qué conceptos del marketing solucionarían la crisis de ventas de la textilera.</p>
                     </div>
                     <div className="bg-blue-50 border-t-4 border-blue-400 p-4 rounded-xl shadow-sm">
                       <h4 className="font-bold flex items-center gap-2 mb-2"><Users /> 2. Pair (Comenta)</h4>
                       <p className="text-sm text-gray-600">Si estás en aula, discute con un compañero cómo estructurar su página web y redes sociales.</p>
                     </div>
                     <div className="bg-green-50 border-t-4 border-[#39A900] p-4 rounded-xl shadow-sm">
                       <h4 className="font-bold flex items-center gap-2 mb-2"><Trophy className="text-[#39A900]" /> 3. Share (Aplica)</h4>
                       <p className="text-sm text-gray-600">A continuación, responde las preguntas interactivas para consolidar lo aprendido.</p>
                     </div>
                  </div>
                </div>

                <div className="flex justify-end">
                   <button onClick={startQuiz} className="bg-[#39A900] hover:bg-[#2A7C00] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
                     Iniciar Reto Interactivo <ArrowRight />
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* QUIZ SCREEN */}
          {screen === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full"
            >
              <div className="w-full flex justify-between items-center mb-8 text-gray-500 font-bold">
                <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm md:text-base">Pregunta {currentQIndex + 1} de {questions.length}</span>
                <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm md:text-base flex items-center gap-2">
                   <Clock className="w-4 h-4 text-blue-500" />
                   <span className={timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}>{formatTime(timeLeft)}</span>
                </span>
                <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm md:text-base text-[#39A900]">Aciertos: {score}</span>
              </div>

              {/* Contenedor del Mosquito volador */}
              <div className="relative mb-12 flex flex-col items-center h-56 justify-end w-full">
                 <AnimatePresence>
                    {feedbackText && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.5, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0 }}
                         transition={{ type: "spring", bounce: 0.5 }}
                         className={`absolute top-0 px-6 py-3 rounded-2xl shadow-xl font-bold text-xl md:text-2xl whitespace-nowrap z-30 border-4
                            ${mosquitoState === 'happy' ? 'bg-[#39A900] text-white border-green-200' : 'bg-red-500 text-white border-red-200'}
                         `}
                       >
                         {feedbackText}
                         <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 border-[12px] border-transparent 
                            ${mosquitoState === 'happy' ? 'border-t-[#39A900]' : 'border-t-red-500'}
                         `} style={{ borderBottomWidth: 0 }} />
                       </motion.div>
                    )}
                 </AnimatePresence>

                 <Mosquito state={mosquitoState} />
                 {/* Shadow for Mosquito */}
                 <div className="w-20 h-2 bg-black/10 rounded-full mt-4 blur-sm" />
              </div>

              {/* Tarjeta de Pregunta */}
              <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
                   {questions[currentQIndex].question}
                </h2>
                
                <div className="grid gap-4">
                  {questions[currentQIndex].options.map((opt, i) => {
                     let statusClasses = 'hover:border-[#39A900] hover:bg-gray-50 bg-white border-gray-200 text-gray-700';
                     
                     if (isAnimating) {
                        if (i === selectedOption) {
                           statusClasses = i === questions[currentQIndex].correctIndex 
                             ? 'bg-[#39A900]/10 border-[#39A900] text-[#39A900] font-bold' 
                             : 'bg-red-100 border-red-500 text-red-700 font-bold';
                        } else if (i === questions[currentQIndex].correctIndex) {
                           // Show the correct answer if they missed
                           statusClasses = 'bg-[#39A900]/10 border-[#39A900] text-[#39A900] opacity-50';
                        } else {
                           statusClasses = 'bg-white border-gray-200 opacity-50';
                        }
                     }

                     return (
                       <button
                          key={i}
                          disabled={isAnimating}
                          onClick={() => handleAnswer(i)}
                          className={`p-4 rounded-xl text-left font-medium transition-all duration-300 border-2 shadow-sm ${statusClasses} ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                       >
                          {opt}
                       </button>
                     );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {screen === 'result' && (
             <motion.div 
               key="result"
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-10 text-center border-t-8 border-[#39A900]"
             >
               <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
               <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Misión Cumplida, {name}!</h2>
               <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                 Has ayudado a establecer las bases del Plan Estratégico de Marketing para la MiPyME de Popayán.
               </p>
               
               <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8 max-w-sm mx-auto">
                 <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Puntuación Final</div>
                 <div className="text-5xl font-black text-[#39A900]">
                   {score} <span className="text-3xl text-gray-300">/ {questions.length}</span>
                 </div>
                 {timeLeft <= 0 && score < questions.length && (
                    <p className="text-red-500 font-bold mt-2 text-sm uppercase tracking-wider flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4"/> ¡Tiempo Agotado!
                    </p>
                 )}
                 {score === questions.length ? (
                   <p className="text-[#39A900] mt-3 font-semibold">¡Eres verdaderamente un Genio del Marketing!</p>
                 ) : (
                   <p className="text-gray-500 mt-3 font-semibold">¡Buen esfuerzo! El Mosquito está orgulloso de ti.</p>
                 )}
               </div>

               <div className="flex flex-col md:flex-row justify-center gap-4">
                 <button onClick={restart} className="bg-[#39A900] hover:bg-[#2A7C00] text-white font-bold py-3 px-8 rounded-xl transition-colors flex justify-center items-center gap-2">
                   <RotateCcw className="w-5 h-5" /> Volver al Inicio
                 </button>
               </div>
             </motion.div>
          )}

        </AnimatePresence>
      </main>
      </div>
    </div>
  )
}
