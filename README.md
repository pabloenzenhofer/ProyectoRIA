# Plataforma RIA — Nutrición sin vueltas

Audioguía educativa e interactiva sobre nutrición. El recorrido reúne 39 etapas con videos, infografías y una bitácora privada guardada en el navegador.

Sitio publicado: [nutricion-audioguia.pabloenzenhofer.chatgpt.site](https://nutricion-audioguia.pabloenzenhofer.chatgpt.site)

## Contenido

- Proteínas
- Carbohidratos
- Grasas
- Fibra
- Micronutrientes
- Hidratación
- Alcohol
- Etiquetas y ultraprocesados
- Balance y flexibilidad
- Registro con IA

## Funciones

- Navegación continua entre módulos y páginas.
- Avance automático al finalizar cada video.
- Inicio automático del video siguiente.
- Velocidades de reproducción: 0,75×, 1×, 1,25×, 1,5× y 2×.
- Ampliación de infografías.
- Progreso y preferencias guardados localmente.
- Bitácora privada guardada sólo en el dispositivo del usuario.
- Diseño adaptable a computadora y celular.

## Desarrollo local

Requisitos: Node.js 22.13 o superior y npm.

```bash
npm ci
npm run dev
```

Para generar y verificar la versión de producción:

```bash
npm run build
```

## Estructura principal

- `app/page.tsx`: contenido, recorrido e interacciones.
- `app/globals.css`: estilos y adaptación responsive.
- `public/videos/`: videos de las 39 etapas.
- `public/materiales/`: infografías.
- `public/posters/`: portadas de los videos.
- `.openai/hosting.json`: configuración de publicación en ChatGPT Sites.

## Tecnología

React 19, Next.js 16, TypeScript, Vinext, Vite y Cloudflare Workers.
