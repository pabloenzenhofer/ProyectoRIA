"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function assetPath(path: string | null) {
  if (!path) return undefined;
  const base = typeof document === "undefined"
    ? ""
    : document.documentElement.dataset.assetBase ?? "";

  return `${base}${path}`;
}

const chapterData = [
  {
    id: "intro",
    module: "proteinas",
    page: null,
    navTitle: "Bienvenida",
    title: "Antes de empezar",
    description: "Una breve introducción para entender cómo recorrer este módulo sobre proteínas.",
    video: "/videos/00-intro.mp4",
    image: null,
  },
  {
    id: "pagina-01",
    module: "proteinas",
    page: 1,
    navTitle: "No es un suplemento",
    title: "La proteína no es un producto deportivo",
    description: "Qué es la proteína y por qué forma parte de la alimentación cotidiana.",
    video: "/videos/01-proteina-no-es-suplemento.mp4",
    image: "/materiales/01-proteina-ladrillos.webp",
  },
  {
    id: "pagina-02",
    module: "proteinas",
    page: 2,
    navTitle: "Alimento y aminoácidos",
    title: "Del alimento a los aminoácidos",
    description: "Cómo la digestión desarma las proteínas para que el cuerpo pueda utilizarlas.",
    video: "/videos/02-alimento-aminoacidos.mp4",
    image: "/materiales/02-alimento-aminoacidos.webp",
  },
  {
    id: "pagina-03",
    module: "proteinas",
    page: 3,
    navTitle: "9 son esenciales",
    title: "20 aminoácidos, 9 esenciales",
    description: "Qué significa que un aminoácido sea esencial y por qué necesitamos obtenerlo de los alimentos.",
    video: "/videos/03-aminoacidos-esenciales.mp4",
    image: "/materiales/03-aminoacidos-esenciales.webp",
  },
  {
    id: "pagina-04",
    module: "proteinas",
    page: 4,
    navTitle: "No es proteína pura",
    title: "El alimento no es proteína pura",
    description: "Cada alimento combina proteína con agua, grasas, hidratos y micronutrientes.",
    video: "/videos/04-alimento-no-es-proteina.mp4",
    image: "/materiales/04-alimento-no-es-proteina.webp",
  },
  {
    id: "pagina-05",
    module: "proteinas",
    page: 5,
    navTitle: "Cuánto necesitamos",
    title: "Cuánta proteína necesitamos",
    description: "Una referencia práctica para pensar las necesidades diarias sin obsesionarse con un número aislado.",
    video: "/videos/05-cuanta-proteina.mp4",
    image: "/materiales/05-cuanta-proteina.webp",
  },
  {
    id: "pagina-06",
    module: "proteinas",
    page: 6,
    navTitle: "Total y distribución",
    title: "Total y distribución",
    description: "No importa solamente el total del día: también conviene repartirlo entre las comidas.",
    video: "/videos/06-total-distribucion.mp4",
    image: "/materiales/06-total-distribucion.webp",
  },
  {
    id: "pagina-07",
    module: "proteinas",
    page: 7,
    navTitle: "Saciedad y músculo",
    title: "Saciedad y masa muscular",
    description: "Cómo una ingesta adecuada ayuda a sostener la saciedad y preservar la masa muscular.",
    video: "/videos/07-saciedad-masa-muscular.mp4",
    image: "/materiales/07-saciedad-masa-muscular.webp",
  },
  {
    id: "carbohidratos-01",
    module: "carbohidratos",
    page: 1,
    navTitle: "Energía para la vida",
    title: "La glucosa: energía solar que mueve la vida",
    description: "Cómo la energía del sol queda almacenada en los alimentos y llega a nuestras células como glucosa.",
    video: "/videos/carbohidratos-01-energia-vida.mp4",
    image: "/materiales/carbohidratos-01-energia-vida.webp",
  },
  {
    id: "carbohidratos-02",
    module: "carbohidratos",
    page: 2,
    navTitle: "Una familia diversa",
    title: "No todos los carbohidratos son iguales",
    description: "Una familia de moléculas diferentes, con estructuras y efectos distintos en el organismo.",
    video: "/videos/carbohidratos-02-familia-moleculas.mp4",
    image: "/materiales/carbohidratos-02-familia-moleculas.webp",
  },
  {
    id: "carbohidratos-03",
    module: "carbohidratos",
    page: 3,
    navTitle: "Del alimento a la sangre",
    title: "Del alimento a la sangre",
    description: "Qué ocurre durante la digestión hasta que la glucosa queda disponible para circular por el cuerpo.",
    video: "/videos/carbohidratos-03-alimento-sangre.mp4",
    image: "/materiales/carbohidratos-03-alimento-sangre.webp",
  },
  {
    id: "carbohidratos-04",
    module: "carbohidratos",
    page: 4,
    navTitle: "Ramitas o troncos",
    title: "Ramitas o troncos",
    description: "Cómo la estructura del carbohidrato influye en el trabajo digestivo y en la velocidad de absorción.",
    video: "/videos/carbohidratos-04-ramitas-troncos.mp4",
    image: "/materiales/carbohidratos-04-ramitas-troncos.webp",
  },
  {
    id: "carbohidratos-05",
    module: "carbohidratos",
    page: 5,
    navTitle: "La curva de glucosa",
    title: "La curva de glucosa",
    description: "Por qué la glucosa sube y baja después de comer, y qué nos cuenta la forma de esa curva.",
    video: "/videos/carbohidratos-05-curva-glucosa.mp4",
    image: "/materiales/carbohidratos-05-curva-glucosa.webp",
  },
  {
    id: "carbohidratos-06",
    module: "carbohidratos",
    page: 6,
    navTitle: "La insulina organiza",
    title: "La insulina organiza el tránsito",
    description: "El papel de la insulina para ordenar la circulación de glucosa y facilitar su entrada a las células.",
    video: "/videos/carbohidratos-06-insulina.mp4",
    image: "/materiales/carbohidratos-06-insulina.webp",
  },
  {
    id: "carbohidratos-07",
    module: "carbohidratos",
    page: 7,
    navTitle: "Densidad del carbohidrato",
    title: "Densidad del carbohidrato",
    description: "Una forma práctica de comparar cuánta energía aporta un alimento en relación con su volumen.",
    video: "/videos/carbohidratos-07-densidad.mp4",
    image: "/materiales/carbohidratos-07-densidad.webp",
  },
  {
    id: "carbohidratos-08",
    module: "carbohidratos",
    page: 8,
    navTitle: "Energía y volumen",
    title: "Mucha energía en poco volumen",
    description: "Cómo algunos alimentos concentran mucha energía en porciones pequeñas y por qué importa el contexto.",
    video: "/videos/carbohidratos-08-energia-volumen.mp4",
    image: "/materiales/carbohidratos-08-energia-volumen.webp",
  },
  {
    id: "carbohidratos-09",
    module: "carbohidratos",
    page: 9,
    navTitle: "No era la papa",
    title: "No era la papa",
    description: "El alimento aislado no explica todo: preparación, combinación y cantidad cambian la experiencia completa.",
    video: "/videos/carbohidratos-09-papa.mp4",
    image: "/materiales/carbohidratos-09-papa.webp",
  },
  {
    id: "carbohidratos-10",
    module: "carbohidratos",
    page: 10,
    navTitle: "No se trata de evitar",
    title: "No se trata de evitar carbohidratos",
    description: "Una síntesis para elegir fuentes, cantidades y combinaciones sin convertir al carbohidrato en un enemigo.",
    video: "/videos/carbohidratos-10-no-evitar.mp4",
    image: "/materiales/carbohidratos-10-no-evitar.webp",
  },
  {
    id: "grasas-01",
    module: "grasas",
    page: 1,
    navTitle: "Plato y cuerpo",
    title: "Grasa del plato ≠ grasa corporal",
    description: "Por qué la grasa alimentaria y la grasa corporal comparten el nombre, pero no son lo mismo.",
    video: "/videos/grasas-01-plato-corporal.mp4",
    image: "/materiales/grasas-01.webp",
  },
  {
    id: "grasas-02",
    module: "grasas",
    page: 2,
    navTitle: "Por qué la necesitamos",
    title: "¿Por qué necesitamos grasas?",
    description: "Las funciones que cumplen las grasas en las membranas, la señalización, las vitaminas, el sabor y la saciedad.",
    video: "/videos/grasas-02-necesitamos.mp4",
    image: "/materiales/grasas-02.webp",
  },
  {
    id: "grasas-03",
    module: "grasas",
    page: 3,
    navTitle: "Una familia diferente",
    title: "No existe una sola grasa",
    description: "Cómo la estructura de los ácidos grasos modifica su comportamiento y da lugar a distintos tipos de grasas.",
    video: "/videos/grasas-03-tipos.mp4",
    image: "/materiales/grasas-03.webp",
  },
  {
    id: "grasas-04",
    module: "grasas",
    page: 4,
    navTitle: "Una brújula para elegir",
    title: "Priorizar, moderar y reducir",
    description: "Una guía práctica para priorizar grasas insaturadas, moderar las saturadas y reducir al mínimo las trans industriales.",
    video: "/videos/grasas-04-priorizar-moderar-reducir.mp4",
    image: "/materiales/grasas-04.webp",
  },
  {
    id: "grasas-05",
    module: "grasas",
    page: 5,
    navTitle: "Necesarias, no ilimitadas",
    title: "Necesarias no significa ilimitadas",
    description: "Cómo pensar cantidades compatibles con nuestras necesidades cuando un nutriente concentra mucha energía en poco volumen.",
    video: "/videos/grasas-05-cantidad.mp4",
    image: "/materiales/grasas-05.webp",
  },
  {
    id: "grasas-06",
    module: "grasas",
    page: 6,
    navTitle: "Elegir y usar aceites",
    title: "Aceites: elegir y usar",
    description: "Qué tener en cuenta al elegir un aceite y cómo influyen el uso, la temperatura, el tiempo y la reutilización.",
    video: "/videos/grasas-06-aceites.mp4",
    image: "/materiales/grasas-06.webp",
  },
  {
    id: "fibra-01",
    module: "fibra",
    page: 1,
    navTitle: "Más fibra, más saciedad",
    title: "Más fibra, más saciedad",
    description: "Cómo los alimentos enteros e integrales aportan volumen, exigen más masticación y ayudan a sostener la saciedad.",
    video: "/videos/fibra-01-mas-fibra-mas-saciedad.mp4",
    image: "/materiales/fibra-01.webp",
  },
  {
    id: "fibra-02",
    module: "fibra",
    page: 2,
    navTitle: "El colchón de fibra",
    title: "El colchón de fibra cambia la curva",
    description: "Por qué empezar con verduras o legumbres ayuda a que la glucosa del resto de la comida llegue de manera más gradual.",
    video: "/videos/fibra-02-colchon-cambia-curva.mp4",
    image: "/materiales/fibra-02.webp",
  },
  {
    id: "fibra-03",
    module: "fibra",
    page: 3,
    navTitle: "Alimenta tu microbiota",
    title: "La fibra alimenta tu microbiota",
    description: "Cómo la fibra que llega al colon alimenta a la microbiota y favorece un ecosistema intestinal diverso.",
    video: "/videos/fibra-03-alimenta-microbiota.mp4",
    image: "/materiales/fibra-03.webp",
  },
  {
    id: "micronutrientes-01",
    module: "micronutrientes",
    page: 1,
    navTitle: "Micro, enormes en función",
    title: "Micro en cantidad, enormes en función",
    description: "Qué son las vitaminas y los minerales, por qué no aportan calorías y cómo permiten que el cuerpo use la energía y sostenga sus funciones.",
    video: "/videos/micronutrientes-01-funciones.mp4",
    image: "/materiales/micronutrientes-01.webp",
  },
  {
    id: "micronutrientes-02",
    module: "micronutrientes",
    page: 2,
    navTitle: "Biodisponibilidad",
    title: "Biodisponibilidad",
    description: "Cuánto de un nutriente podemos absorber y utilizar, y cómo combinar, elegir y suplementar con criterio.",
    video: "/videos/micronutrientes-02-biodisponibilidad.mp4",
    image: "/materiales/micronutrientes-02.webp",
  },
  {
    id: "hidratacion-01",
    module: "hidratacion",
    page: 1,
    navTitle: "Hidratarse con criterio",
    title: "Hidratarse no es una competencia",
    description: "Por qué las necesidades de agua cambian según el cuerpo, el clima, la actividad, la sudoración y la salud.",
    video: "/videos/hidratacion-01-criterio.mp4",
    image: "/materiales/hidratacion-01.webp",
  },
  {
    id: "alcohol-01",
    module: "alcohol",
    page: 1,
    navTitle: "Más allá de las calorías",
    title: "El impacto del alcohol no termina en las calorías",
    description: "Cómo el alcohol también puede influir en las decisiones, la ingesta, el sueño, el cansancio y el hambre del día siguiente.",
    video: "/videos/alcohol-01-impacto.mp4",
    image: "/materiales/alcohol-01.webp",
  },
  {
    id: "etiquetas-ultraprocesados-01",
    module: "etiquetas-ultraprocesados",
    page: 1,
    navTitle: "Leer una etiqueta",
    title: "Cómo leer una etiqueta nutricional",
    description: "Qué cantidad describe la etiqueta y cómo interpretar porciones, energía, azúcares, ingredientes, nutrientes, alérgenos y vencimiento.",
    video: "/videos/etiquetas-ultraprocesados-01-etiqueta.mp4",
    image: "/materiales/etiquetas-ultraprocesados-01-etiqueta.webp",
  },
  {
    id: "etiquetas-ultraprocesados-02",
    module: "etiquetas-ultraprocesados",
    page: 2,
    navTitle: "Frente y dorso",
    title: "El frente vende. El dorso permite comprobar",
    description: "Cómo poner en contexto palabras como proteico, integral, light o sin azúcar y comparar productos con datos equivalentes.",
    video: "/videos/etiquetas-ultraprocesados-02-marketing.mp4",
    image: "/materiales/etiquetas-ultraprocesados-02-marketing.webp",
  },
  {
    id: "etiquetas-ultraprocesados-03",
    module: "etiquetas-ultraprocesados",
    page: 3,
    navTitle: "Procesado no es malo",
    title: "Procesado no significa malo",
    description: "Qué significa procesar un alimento y cómo distinguir alimentos mínimamente procesados, ingredientes culinarios, procesados y ultraprocesados.",
    video: "/videos/etiquetas-ultraprocesados-03-procesamiento.mp4",
    image: "/materiales/etiquetas-ultraprocesados-03-procesamiento.webp",
  },
  {
    id: "etiquetas-ultraprocesados-04",
    module: "etiquetas-ultraprocesados",
    page: 4,
    navTitle: "Bliss point",
    title: "Bliss point: cómo se diseña el máximo agrado",
    description: "Cómo se combinan sabor, textura, aroma y contexto para aumentar la aceptación y por qué decidir antes de abrir puede ayudar.",
    video: "/videos/etiquetas-ultraprocesados-04-bliss-point.mp4",
    image: "/materiales/etiquetas-ultraprocesados-04-bliss-point.webp",
  },
  {
    id: "balance-flexibilidad-01",
    module: "balance-flexibilidad",
    page: 1,
    navTitle: "Calidad y cantidad",
    title: "Calidad y cantidad: necesitamos las dos",
    description: "Cómo combinar qué aporta un alimento con cuánto, con qué frecuencia y para qué lo necesitamos.",
    video: "/videos/balance-flexibilidad-01-calidad-cantidad.mp4",
    image: "/materiales/balance-flexibilidad-01-calidad-cantidad.webp",
  },
  {
    id: "balance-flexibilidad-02",
    module: "balance-flexibilidad",
    page: 2,
    navTitle: "Balance dinámico",
    title: "El balance energético es dinámico",
    description: "Por qué el peso cambia día a día y conviene observar tendencias, respuestas y señales más amplias que un número aislado.",
    video: "/videos/balance-flexibilidad-02-balance-dinamico.mp4",
    image: "/materiales/balance-flexibilidad-02-balance-dinamico.webp",
  },
  {
    id: "balance-flexibilidad-03",
    module: "balance-flexibilidad",
    page: 3,
    navTitle: "Gasto y macronutrientes",
    title: "Del gasto total a los macronutrientes",
    description: "Un punto de partida para estimar el gasto, orientar proteínas, grasas y carbohidratos, observar la evolución y ajustar.",
    video: "/videos/balance-flexibilidad-03-gasto-macronutrientes.mp4",
    image: "/materiales/balance-flexibilidad-03-gasto-macronutrientes.webp",
  },
  {
    id: "balance-flexibilidad-04",
    module: "registro-ia",
    page: 1,
    navTitle: "Registro con IA",
    title: "Registrar para aprender y flexibilizar",
    description: "Cómo usar un registro breve para observar, elegir, probar y comparar sin convertir la información en control permanente.",
    video: "/videos/balance-flexibilidad-04-registrar-flexibilizar.mp4",
    image: "/materiales/balance-flexibilidad-04-registrar-flexibilizar.webp",
  },
] as const;

const chapters = chapterData;

const modules = [
  { id: "proteinas", label: "Proteínas", summary: "Introducción + 7 páginas", firstChapter: 0 },
  { id: "carbohidratos", label: "Carbohidratos", summary: "10 páginas", firstChapter: 8 },
  { id: "grasas", label: "Grasas", summary: "6 páginas", firstChapter: 18 },
  { id: "fibra", label: "Fibra", summary: "3 páginas", firstChapter: 24 },
  { id: "micronutrientes", label: "Micronutrientes", summary: "2 páginas", firstChapter: 27 },
  { id: "hidratacion", label: "Hidratación", summary: "1 página", firstChapter: 29 },
  { id: "alcohol", label: "Alcohol", summary: "1 página", firstChapter: 30 },
  { id: "etiquetas-ultraprocesados", label: "Etiquetas y ultraprocesados", summary: "4 páginas", firstChapter: 31 },
  { id: "balance-flexibilidad", label: "Balance y flexibilidad", summary: "3 páginas", firstChapter: 35 },
  { id: "registro-ia", label: "Registro con IA", summary: "1 página", firstChapter: 38 },
] as const;

const playbackRates = [0.75, 1, 1.25, 1.5, 2] as const;

function formatPlaybackRate(rate: number) {
  return `${String(rate).replace(".", ",")}×`;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={direction === "right" ? "arrow-right" : undefined}>
      <path d="m14.5 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [autoAdvanceReady, setAutoAdvanceReady] = useState(false);
  const [autoStartBlocked, setAutoStartBlocked] = useState(false);
  const [pendingAutoStartChapter, setPendingAutoStartChapter] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playbackRateReady, setPlaybackRateReady] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [notesReady, setNotesReady] = useState(false);
  const activeRef = useRef(active);
  const autoAdvanceRef = useRef(autoAdvance);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const advancedChapterRef = useRef<string | null>(null);
  const pendingAutoStartRef = useRef<string | null>(null);
  const chapter = chapters[active];
  const progress = Math.round(((active + 1) / chapters.length) * 100);
  const activeModule = modules.find((item) => item.id === chapter.module) ?? modules[0];
  const moduleChapters = chapters
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.module === chapter.module);
  const modulePages = moduleChapters.filter(({ item }) => item.page !== null);
  const pagePosition = modulePages.findIndex(({ index }) => index === active) + 1;

  useEffect(() => {
    try {
      const storedNotes = window.localStorage.getItem("ria-nutricion-notes");
      if (storedNotes) setNotes(JSON.parse(storedNotes));
    } catch {
      // La bitácora sigue disponible aunque el navegador bloquee el almacenamiento.
    } finally {
      setNotesReady(true);
    }
  }, []);

  useEffect(() => {
    try {
      setAutoAdvance(window.localStorage.getItem("ria-nutricion-auto-advance") === "true");
    } catch {
      // El control sigue funcionando aunque no pueda recordar la preferencia.
    } finally {
      setAutoAdvanceReady(true);
    }
  }, []);

  useEffect(() => {
    if (!autoAdvanceReady) return;
    try {
      window.localStorage.setItem("ria-nutricion-auto-advance", String(autoAdvance));
    } catch {
      // La preferencia queda activa durante esta visita aunque no pueda guardarse.
    }
  }, [autoAdvance, autoAdvanceReady]);

  useEffect(() => {
    try {
      const storedRate = Number(window.localStorage.getItem("ria-nutricion-playback-rate"));
      if (playbackRates.some((rate) => rate === storedRate)) setPlaybackRate(storedRate);
    } catch {
      // El selector sigue funcionando aunque no pueda recordar la preferencia.
    } finally {
      setPlaybackRateReady(true);
    }
  }, []);

  useEffect(() => {
    const video = activeVideoRef.current;
    if (video) {
      video.defaultPlaybackRate = playbackRate;
      video.playbackRate = playbackRate;
    }

    if (!playbackRateReady) return;
    try {
      window.localStorage.setItem("ria-nutricion-playback-rate", String(playbackRate));
    } catch {
      // La velocidad elegida se mantiene durante esta visita.
    }
  }, [active, playbackRate, playbackRateReady]);

  useEffect(() => {
    if (!notesReady) return;
    try {
      window.localStorage.setItem("ria-nutricion-notes", JSON.stringify(notes));
    } catch {
      // Evitamos interrumpir la lección si el navegador no permite guardar.
    }
  }, [notes, notesReady]);

  useEffect(() => {
    setZoomed(false);
    advancedChapterRef.current = null;
  }, [active]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    autoAdvanceRef.current = autoAdvance;
  }, [autoAdvance]);

  const tryStartActiveVideo = useCallback((video: HTMLVideoElement) => {
    const currentChapter = chapters[activeRef.current];

    if (
      !autoAdvanceRef.current ||
      pendingAutoStartRef.current !== currentChapter.id
    ) return;

    const playAttempt = video.play();
    if (!playAttempt) return;

    void playAttempt
      .then(() => {
        if (pendingAutoStartRef.current === currentChapter.id) {
          pendingAutoStartRef.current = null;
          setPendingAutoStartChapter(null);
          setAutoStartBlocked(false);
        }
      })
      .catch(() => {
        if (pendingAutoStartRef.current === currentChapter.id) {
          setAutoStartBlocked(true);
        }
      });
  }, []);

  useEffect(() => {
    const video = activeVideoRef.current;
    const currentChapter = chapters[active];

    if (!video || pendingAutoStartRef.current !== currentChapter.id) return;

    video.currentTime = 0;
    tryStartActiveVideo(video);
  }, [active, tryStartActiveVideo]);

  const goToNextChapter = () => {
    setActive((value) => Math.min(chapters.length - 1, value + 1));
  };

  const advanceAfterVideo = useCallback((video: HTMLVideoElement) => {
    const currentIndex = activeRef.current;
    const currentChapter = chapters[currentIndex];
    const duration = video.duration;
    const reachedEnd = video.ended || (
      Number.isFinite(duration) &&
      duration > 0 &&
      duration - video.currentTime <= 0.5
    );

    if (
      !autoAdvanceRef.current ||
      !reachedEnd ||
      currentIndex >= chapters.length - 1 ||
      advancedChapterRef.current === currentChapter.id
    ) return;

    advancedChapterRef.current = currentChapter.id;
    pendingAutoStartRef.current = chapters[currentIndex + 1].id;
    setPendingAutoStartChapter(chapters[currentIndex + 1].id);
    setAutoStartBlocked(false);
    setActive(currentIndex + 1);
  }, []);

  const setAutoAdvancePreference = (enabled: boolean) => {
    autoAdvanceRef.current = enabled;
    setAutoAdvance(enabled);

    if (!enabled) {
      pendingAutoStartRef.current = null;
      setPendingAutoStartChapter(null);
      setAutoStartBlocked(false);
    }

    if (enabled && activeVideoRef.current?.ended) {
      advanceAfterVideo(activeVideoRef.current);
    }
  };

  const setVideoPlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (activeVideoRef.current) {
      activeVideoRef.current.defaultPlaybackRate = rate;
      activeVideoRef.current.playbackRate = rate;
    }
  };

  const playbackRateControl = (
    <div className="playback-rate-control" role="group" aria-label="Velocidad de reproducción">
      <div className="playback-rate-heading">
        <strong>Velocidad</strong>
        <span aria-live="polite">{formatPlaybackRate(playbackRate)}</span>
      </div>
      <div className="playback-rate-options">
        {playbackRates.map((rate) => (
          <button
            type="button"
            className={playbackRate === rate ? "active" : undefined}
            key={rate}
            onClick={() => setVideoPlaybackRate(rate)}
            aria-pressed={playbackRate === rate}
            aria-label={`Reproducir a velocidad ${formatPlaybackRate(rate)}`}
          >
            {formatPlaybackRate(rate)}
          </button>
        ))}
      </div>
    </div>
  );

  const autoAdvanceControl = (
    <label className="auto-advance-control">
      <span className="auto-advance-copy">
        <strong>Avance automático</strong>
        <small>
          {active === chapters.length - 1
            ? "Esta es la última página"
            : autoStartBlocked
              ? "La página cambió. Tocá reproducir para continuar"
              : pendingAutoStartChapter === chapter.id
                ? "Activo: iniciando el siguiente video…"
            : autoAdvance
              ? "Activo: al terminar, sigue la próxima página"
              : "Desactivado: el avance queda manual"}
        </small>
      </span>
      <span className="switch">
        <input
          type="checkbox"
          checked={autoAdvance}
          onChange={(event) => setAutoAdvancePreference(event.target.checked)}
          aria-label="Avance automático entre páginas"
        />
        <span className="switch-track" aria-hidden="true"><span /></span>
      </span>
    </label>
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
      if (zoomed) return;
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLButtonElement ||
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLVideoElement
      ) return;
      if (event.key === "ArrowLeft") setActive((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight") setActive((value) => Math.min(chapters.length - 1, value + 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomed]);

  const actions = (
    <div className="lesson-actions">
      <button onClick={() => setActive((value) => Math.max(0, value - 1))} disabled={active === 0}>
        <ArrowIcon direction="left" /> Anterior
      </button>
      <button className="next" onClick={goToNextChapter} disabled={active === chapters.length - 1}>
        Siguiente <ArrowIcon direction="right" />
      </button>
    </div>
  );

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#contenido" aria-label="Nutrición sin vueltas, inicio">
          <span className="brand-mark">RIA</span>
          <span className="brand-name">Nutrición sin vueltas</span>
        </a>
        <span className="module-badge"><i /> Módulo {activeModule.label}</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Aprendé a tu ritmo</p>
          <h1 id="page-title">Mirá la página.<br />Escuchá la explicación.</h1>
        </div>
        <p className="intro-copy">
          Un recorrido continuo por proteínas, carbohidratos, grasas, fibra, micronutrientes, hidratación, alcohol, etiquetas, ultraprocesados, balance energético y registro con IA. Cada página tiene su propio video e infografía.
        </p>
      </section>

      <section className="course-progress" aria-label="Progreso del recorrido">
        <div className="progress-heading">
          <span>Tu recorrido</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${progress}% · Etapa ${active + 1} de ${chapters.length}`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>Etapa {active + 1} de {chapters.length}</p>
      </section>

      <nav className="module-nav" aria-label="Módulos del recorrido">
        {modules.map((item) => (
          <button
            className={item.id === chapter.module ? "module-tab active" : "module-tab"}
            key={item.id}
            onClick={() => setActive(item.firstChapter)}
            aria-current={item.id === chapter.module ? "page" : undefined}
          >
            <span>{item.label}</span>
            <small>{item.summary}</small>
          </button>
        ))}
      </nav>

      <nav className="chapter-nav" aria-label={`Páginas del módulo ${activeModule.label}`}>
        {moduleChapters.map(({ item, index }) => (
          <button className={index === active ? "chapter-tab active" : "chapter-tab"} key={item.id} onClick={() => setActive(index)} aria-current={index === active ? "page" : undefined}>
            <span className="chapter-number">{item.page === null ? "IN" : String(item.page).padStart(2, "0")}</span>
            <span>
              <small>{item.page === null ? "Introducción" : `Página ${String(item.page).padStart(2, "0")}`}</small>
              <strong>{item.navTitle}</strong>
            </span>
          </button>
        ))}
      </nav>

      <div id="contenido">
        <section className={chapter.page === null ? "welcome-card" : "lesson-grid"} aria-labelledby="lesson-title">
          {chapter.page === null ? (
            <div className="welcome-copy">
              <span className="content-label">Introducción</span>
              <h2 id="lesson-title">{chapter.title}</h2>
              <p>{chapter.description}</p>
              <div className="welcome-note"><span aria-hidden="true">1</span> Podés pasar a la primera página manualmente o activar el avance automático.</div>
              {autoAdvanceControl}
              <button className="start-button" onClick={() => setActive(1)}>
                Ir a la página 1 <ArrowIcon direction="right" />
              </button>
            </div>
          ) : (
            <article className="infographic-card">
              <div className="card-heading">
                <div>
                  <span className="content-label">Infografía · {activeModule.label} · Página {String(chapter.page).padStart(2, "0")}</span>
                  <h2 id="lesson-title">{chapter.title}</h2>
                </div>
                <button className="zoom-button" onClick={() => setZoomed(true)} aria-label="Ampliar infografía">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m15 15 4.5 4.5M8 10.5h5M10.5 8v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Ampliar
                </button>
              </div>
              <button className="infographic-frame" onClick={() => setZoomed(true)} aria-label={`Ver ampliada: ${chapter.title}`}>
                <img src={assetPath(chapter.image)} alt={`Página ${chapter.page}: ${chapter.title}`} />
              </button>
            </article>
          )}

          <aside className={chapter.page === null ? "welcome-video-wrap" : "video-card"} aria-label={chapter.page === null ? "Video de introducción" : `Video de la página ${chapter.page}`}>
            <div className="video-panel-before" hidden={chapter.page === null}>
              <div className="video-topline">
                <span className="content-label light">Video · Página {String(chapter.page ?? "").padStart(2, "0")}</span>
                <span>{pagePosition} de {modulePages.length}</span>
              </div>
              <h2>Escuchá mientras recorrés la página</h2>
              <p className="track-title">{chapter.description}</p>
            </div>

            <div className={chapter.page === null ? "intro-video-stage" : "video-stage"}>
              <video
                ref={activeVideoRef}
                className={chapter.page === null ? "lesson-video intro-video" : "lesson-video"}
                src={assetPath(chapter.video)}
                poster={assetPath(chapter.video.replace("/videos/", "/posters/").replace(".mp4", ".jpg"))}
                controls
                playsInline
                preload={autoAdvance ? "auto" : "metadata"}
                autoPlay={pendingAutoStartChapter === chapter.id && autoAdvance}
                onEnded={(event) => advanceAfterVideo(event.currentTarget)}
                onTimeUpdate={(event) => advanceAfterVideo(event.currentTarget)}
                onLoadedMetadata={(event) => {
                  event.currentTarget.defaultPlaybackRate = playbackRate;
                  event.currentTarget.playbackRate = playbackRate;
                }}
                onCanPlay={(event) => {
                  event.currentTarget.playbackRate = playbackRate;
                  tryStartActiveVideo(event.currentTarget);
                }}
                onPlay={() => {
                  if (pendingAutoStartRef.current === chapter.id) {
                    pendingAutoStartRef.current = null;
                    setPendingAutoStartChapter(null);
                    setAutoStartBlocked(false);
                  }
                }}
                aria-label={chapter.page === null ? "Video de introducción al módulo Proteínas" : `Explicación en video: ${chapter.title}`}
              />
            </div>

            {playbackRateControl}

            <div className="video-panel-after" hidden={chapter.page === null}>
              <div className="video-tip"><span aria-hidden="true">i</span> Podés pausar el video y ampliar la infografía cuando lo necesites.</div>
              {autoAdvanceControl}
              {actions}
            </div>
          </aside>
        </section>
      </div>

      {chapter.page !== null && (
        <section className="journal-card" aria-labelledby="journal-title">
          <div className="journal-heading">
            <div className="journal-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="3" /><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" /></svg>
            </div>
            <div>
              <span className="content-label">Espacio personal · {activeModule.label} · Página {String(chapter.page).padStart(2, "0")}</span>
              <h2 id="journal-title">Mi bitácora privada</h2>
              <p>Escribí lo que quieras recordar, probar o volver a pensar de esta página.</p>
            </div>
          </div>
          <div className="journal-editor">
            <label htmlFor="private-note">Mis anotaciones sobre “{chapter.navTitle}”</label>
            <textarea id="private-note" value={notes[chapter.id] ?? ""} onChange={(event) => setNotes((current) => ({ ...current, [chapter.id]: event.target.value }))} placeholder="Por ejemplo: una idea importante, algo que quiero poner en práctica o una reflexión personal…" />
            <div className="journal-status" aria-live="polite">
              <span><i /> Guardado automático</span>
              <span>Solo queda en este navegador. No se comparte con nadie.</span>
            </div>
          </div>
        </section>
      )}

      <footer>
        <span>Nutrición sin vueltas</span>
        <span>{modules.map((item) => item.label).join(" + ")} · {chapters.length} etapas</span>
      </footer>

      {zoomed && chapter.image && (
        <div className="zoom-overlay" role="dialog" aria-modal="true" aria-label={`Infografía ampliada: ${chapter.title}`}>
          <button className="zoom-close" onClick={() => setZoomed(false)} aria-label="Cerrar imagen ampliada">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <div className="zoom-scroll" onClick={() => setZoomed(false)}>
            <img onClick={(event) => event.stopPropagation()} src={assetPath(chapter.image)} alt={`Página ${chapter.page}: ${chapter.title}`} />
          </div>
        </div>
      )}
    </main>
  );
}
