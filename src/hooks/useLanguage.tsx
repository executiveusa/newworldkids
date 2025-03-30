
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Define types for our translations
type TranslationsType = {
  blogTitle: string;
  whoWeAre: {
    title: string;
    description: string;
  };
  whatWeDo: {
    title: string;
    items: string[];
  };
  whyWeDoIt: {
    title: string;
    description: string;
  };
  theBigFour: string;
  categories: {
    food: {
      title: string;
      description: string;
    };
    water: {
      title: string;
      description: string;
    };
    energy: {
      title: string;
      description: string;
    };
    shelter: {
      title: string;
      description: string;
    };
  };
  automation: {
    title: string;
    items: string[];
  };
  web3Transparency: {
    title: string;
    description: string;
    button: string;
  };
  chatbot: {
    title: string;
    description: string;
    inputPlaceholder: string;
  };
  blogPost: {
    backToCategory: string;
    readMore: string;
    publishedOn: string;
    notFound: string;
    loading: string;
  };
};

// Define the context type
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translations: TranslationsType;
};

// English translations
const en: TranslationsType = {
  blogTitle: "Inspiring Solutions. Real Impact.",
  whoWeAre: {
    title: "Who We Are",
    description: "We are a diverse, global network of changemakers supported by our 501(c)(3) fiscal sponsor. Everything we do is powered by transparency, passion, and the belief that every human has the right to thrive."
  },
  whatWeDo: {
    title: "What We Do",
    items: [
      "We build food forests, rainwater systems, solar power grids, and off-grid shelters.",
      "We train youth in high-impact skills and launch social-purpose projects.",
      "We collaborate with governments, universities, and Web3 communities."
    ]
  },
  whyWeDoIt: {
    title: "Why We Do It",
    description: "Because survival mode kills dreams. We help young people reclaim their futures with purpose, dignity, and access to the tools of transformation."
  },
  theBigFour: "The Big 4",
  categories: {
    food: {
      title: "Food",
      description: "Regenerative agriculture, heirloom seed banking, hydroponics, vertical gardens."
    },
    water: {
      title: "Water",
      description: "Filtration tech, rainwater catchment, conservation methods, clean water access."
    },
    energy: {
      title: "Energy",
      description: "Solar kits, battery banks, biogas, sustainable energy education, energy justice."
    },
    shelter: {
      title: "Shelter",
      description: "Affordable housing models, eco-builds, disaster-resistant structures, bamboo tech."
    }
  },
  automation: {
    title: "Automation + AI",
    items: [
      "Auto-generated from YouTube transcripts",
      "Translated with AI into multiple languages",
      "Repurposed with LangChain, Firecrawler, Make.com, n8n, Apify",
      "Published weekly with zero-code flows",
      "Indexed and searchable via chatbot"
    ]
  },
  web3Transparency: {
    title: "Web3 Transparency",
    description: "All donations and impact logs are stored on-chain. View our giving records, project milestones, and outcomes publicly.",
    button: "View Impact Records"
  },
  chatbot: {
    title: "AI Assistant",
    description: "Ask me anything about our programs and impact projects.",
    inputPlaceholder: "Type your question here...",
  },
  blogPost: {
    backToCategory: "Back to",
    readMore: "Read more",
    publishedOn: "Published on",
    notFound: "Blog post not found",
    loading: "Loading blog post..."
  }
};

// Spanish translations
const es: TranslationsType = {
  blogTitle: "Soluciones Inspiradoras. Impacto Real.",
  whoWeAre: {
    title: "Quiénes Somos",
    description: "Somos una red global diversa de agentes de cambio respaldados por nuestro patrocinador fiscal 501(c)(3). Todo lo que hacemos está impulsado por la transparencia, la pasión y la creencia de que todo ser humano tiene derecho a prosperar."
  },
  whatWeDo: {
    title: "Qué Hacemos",
    items: [
      "Construimos bosques comestibles, sistemas de agua de lluvia, redes de energía solar y refugios fuera de la red.",
      "Capacitamos a jóvenes en habilidades de alto impacto y lanzamos proyectos con propósito social.",
      "Colaboramos con gobiernos, universidades y comunidades Web3."
    ]
  },
  whyWeDoIt: {
    title: "Por Qué Lo Hacemos",
    description: "Porque el modo de supervivencia mata los sueños. Ayudamos a los jóvenes a recuperar su futuro con propósito, dignidad y acceso a las herramientas de transformación."
  },
  theBigFour: "Los 4 Grandes",
  categories: {
    food: {
      title: "Alimentos",
      description: "Agricultura regenerativa, banco de semillas patrimoniales, hidroponía, jardines verticales."
    },
    water: {
      title: "Agua",
      description: "Tecnología de filtración, captación de agua de lluvia, métodos de conservación, acceso a agua limpia."
    },
    energy: {
      title: "Energía",
      description: "Kits solares, bancos de baterías, biogás, educación en energía sostenible, justicia energética."
    },
    shelter: {
      title: "Vivienda",
      description: "Modelos de vivienda asequible, eco-construcciones, estructuras resistentes a desastres, tecnología de bambú."
    }
  },
  automation: {
    title: "Automatización + IA",
    items: [
      "Generado automáticamente a partir de transcripciones de YouTube",
      "Traducido con IA a múltiples idiomas",
      "Adaptado con LangChain, Firecrawler, Make.com, n8n, Apify",
      "Publicado semanalmente con flujos sin código",
      "Indexado y consultable a través del chatbot"
    ]
  },
  web3Transparency: {
    title: "Transparencia Web3",
    description: "Todas las donaciones y registros de impacto se almacenan en la cadena de bloques. Vea nuestros registros de donaciones, hitos de proyectos y resultados públicamente.",
    button: "Ver Registros de Impacto"
  },
  chatbot: {
    title: "Asistente IA",
    description: "Pregúntame cualquier cosa sobre nuestros programas y proyectos de impacto.",
    inputPlaceholder: "Escribe tu pregunta aquí...",
  },
  blogPost: {
    backToCategory: "Volver a",
    readMore: "Leer más",
    publishedOn: "Publicado el",
    notFound: "Entrada de blog no encontrada",
    loading: "Cargando entrada de blog..."
  }
};

// Create context with proper typing
const LanguageContext = createContext<LanguageContextType | null>(null);

// Create provider with proper typing for children
type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<TranslationsType>(en);
  
  useEffect(() => {
    setTranslations(language === 'en' ? en : es);
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create hook with proper return type
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage;
