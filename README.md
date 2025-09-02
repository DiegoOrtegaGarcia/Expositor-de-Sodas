🥤 Soda Expoxition - Experiencia 3D de Refrescos

https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vuedotjs
https://img.shields.io/badge/TypeScript-4-3178C6?logo=typescript
https://img.shields.io/badge/Three.js-R128-000000?logo=threedotjs
https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock
https://img.shields.io/badge/Vuetify-3-1867C0?logo=vuetify

Una experiencia web inmersiva que muestra latas de refresco en 3D con animaciones fluidas y información detallada de cada producto.

✨ Características Principales
🎨 Visualización 3D: Modelos 3D interactivos de latas de refresco

⚡ Animaciones Avanzadas: Transiciones suaves con GSAP

📱 Interactividad: Navegación intuitiva entre diferentes refrescos

🎨 Diseño Moderno: Interfaz con temática neón y efectos visuales

🚀 Performance: Carga optimizada y animaciones eficientes

🛠️ Tecnologías Utilizadas
Frameworks Principales
Vue 3 - Framework principal con Composition API

TypeScript - Tipado estático para mayor robustez

Vuetify 3 - Componentes UI material design

Gráficos 3D y Animaciones
TresJS - Vue wrapper para Three.js

GSAP - Animaciones profesionales y scroll-triggered

GLTF Loader - Carga eficiente de modelos 3D

Estado y Gestión
Pinia - State management moderno

Vue Router - Navegación SPA

📦 Estructura del Proyecto
text
src/
├── components/          # Componentes Vue
│   ├── Dashboard.vue   # Barra de navegación animada
│   ├── SodaInfo.vue    # Información de productos
│   └── ChanceSectio.vue # Selector de refrescos
├── hooks/              # Custom Composition API hooks
│   ├── useIndex.ts     # Lógica principal 3D
│   ├── useSodaInfo.ts  # Animaciones de información
│   ├── useDashboard.ts # Animaciones del navbar
│   └── useChanceSection.ts # Navegación productos
├── stores/             # Gestión de estado con Pinia
│   └── app.ts         # Estado global de la aplicación
├── constants/          # Datos y configuraciones
│   └── constants.ts   # Información de los refrescos
└── helpers/            # Utilidades
    └── arrayTextRef.ts # Manejo de referencias
🚀 Instalación y Uso
Prerrequisitos
Node.js 16+

npm o yarn

Instalación
Clonar el repositorio

bash
git clone https://github.com/tu-usuario/soda-expoxition.git
cd soda-expoxition
Instalar dependencias

bash
npm install
# o
yarn install
Servidor de desarrollo

bash
npm run dev
# o
yarn dev
Compilar para producción

bash
npm run build
# o
yarn build
🎮 Cómo Usar
Navegación Principal:

Usa la barra de navegación superior para saltar entre secciones

Scroll suave entre las diferentes vistas

Visualización 3D:

Observa la lata actual en el centro de la pantalla

Animación automática de flotación

Cambio de Productos:

Haz scroll hasta la sección inferior

Usa los botones de flecha para navegar entre refrescos

Las animaciones se actualizan automáticamente

Información del Producto:

Tarjetas laterales con detalles del refresco

Animaciones de texto al cambiar productos

Efectos visuales al hacer hover

🎨 Personalización
Añadir Nuevos Refrescos
Edita src/constants/constants.ts:

typescript
export const SODAS = [
  {
    name: "Nueva Soda",
    price: 23,
    calories: 130,
    size: '500ml',
    available: true,
    sugar: 32,
    caffeine: 0,
    flavor: 'Manzana Canela',
    rating: 4.1,
    ingredients: ['Agua carbonatada', 'Jugo manzana', 'Azúcar morena', 'Canela', 'Aromas'],
    benefits: ['Sabor único', 'Aroma canela', 'Sin cafeína'],
  }
  // ... otros refrescos
]
Modificar Modelos 3D
Coloca modelos GLTF en public/models/

Actualiza la ruta en useIndex.ts:

typescript
const { nodes } = await useGLTF(`/models/${index}/nuevo-modelo.gltf`)
Customizar Animaciones
Modifica los hooks en src/hooks/:

typescript
// Ejemplo: Modificar animación de entrada
tl.from(SodaRef.value.position, {
  x: -10, // Mayor distancia
  y: 8,   // Mayor altura
  
  duration: 2.0 // Más lento
})
📱 Responsive Design (Se Esta Desarrollando para Adaptarlo a todos los posibles)
El proyecto incluye breakpoints para:

Desktop: 1200px+

Tablet: 768px - 1199px

Mobile: 320px - 767px

🚀 Performance Tips
Los modelos 3D usan compresión Draco

Animaciones optimizadas con GSAP

Lazy loading de componentes

Assets comprimidos y optimizados

🤝 Contribuir
Fork el proyecto

Crea tu feature branch (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push al branch (git push origin feature/AmazingFeature)

Abre un Pull Request


🙌 Reconocimientos
Three.js por la potente librería 3D

GSAP por las increíbles animaciones

Vuetify por los componentes UI

Vue.js por el framework reactivo


⭐️ Hecho con Vue 3, Three.js y mucho ☕️

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.
