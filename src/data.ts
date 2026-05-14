export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Para vender nuestras ruanas online, ¿qué concepto define a quién debemos dirigir exactamente nuestros anuncios?",
    options: ["A) Target (Público Objetivo)", "B) Análisis DOFA", "C) KPI (Indicadores)"],
    correctIndex: 0
  },
  {
    id: 2,
    question: "¿Qué elemento fundamental ayuda a nuestra MiPyME a construir su identidad única, transmitiendo sus valores para ser diferenciada?",
    options: ["A) Las Ventas Netas", "B) Branding (Gestión de Marca)", "C) Un plan de logística"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "La 'MiPyME de Popayán' no tiene redes sociales ni presencia digital. En la matriz SWOT / DOFA, esto se clasifica como una...",
    options: ["A) Fortaleza Histórica", "B) Amenaza del Cliente", "C) Debilidad Interna"],
    correctIndex: 2
  },
  {
    id: 4,
    question: "Si lanzamos una campaña digital, ¿qué concepto nos permite medir cuantitativamente si estamos logrando vender más?",
    options: ["A) El KPI (Key Performance Indicator)", "B) Las Fortalezas", "C) El Branding"],
    correctIndex: 0
  },
  {
    id: 5,
    question: "Para conocer mejor al Target de nuestras ruanas, creamos un perfil semificticio de 'nuestro cliente ideal'. A esto se le conoce como...",
    options: ["A) Buyer Persona", "B) Embudo de Ventas", "C) Retorno de Inversión"],
    correctIndex: 0
  },
  {
    id: 6,
    question: "Si nuestras ruanas son 100% artesanales y ecológicas, y la competencia produce en masa sintéticos, en la DOFA esto es una...",
    options: ["A) Amenaza del Entorno", "B) Fortaleza (Ventaja Competitiva)", "C) Estrategia de Precio"],
    correctIndex: 1
  },
  {
    id: 7,
    question: "¿Qué estrategia necesitamos para que Tejidos Popayán aparezca en Google cuando alguien busque 'comprar ruanas' sin pagar por cada clic?",
    options: ["A) Email Marketing masivo", "B) Publicidad Impresa", "C) SEO (Search Engine Optimization)"],
    correctIndex: 2
  },
  {
    id: 8,
    question: "En vez de presionar para vender, queremos atraer clientes publicando guías sobre 'cómo abrigarse en invierno con estilo'. Esta metodología es...",
    options: ["A) Outbound Marketing", "B) Inbound Marketing", "C) Remarketing"],
    correctIndex: 1
  },
  {
    id: 9,
    question: "Notamos en el mercado que la demanda de prendas étnicas en Europa está aumentando. En nuestra matriz DOFA, esto es una...",
    options: ["A) Oportunidad Externa", "B) Debilidad Organizacional", "C) Fortaleza Financiera"],
    correctIndex: 0
  },
  {
    id: 10,
    question: "Para retener a nuestros clientes y lograr que recomienden la MiPyME a otras personas, necesitamos una estrategia de...",
    options: ["A) Fidelización (Loyalty/CRM)", "B) Reestructuración DOFA", "C) Reducción de Target"],
    correctIndex: 0
  }
];
