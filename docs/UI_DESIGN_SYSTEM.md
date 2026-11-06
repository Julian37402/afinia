# UI DESIGN SYSTEM - AFINIA

Este documento define la base visual de Afinia (Mobile-First en Ionic/Angular).

## 1. Identidad
Afinia tiene un tono de investigación pero debe sentirse juvenil, moderna e intuitiva, alejándose de los patrones estéticos exactos de Tinder (Rojo/Fuego) o Bumble (Amarillo/Panal).

## 2. Paleta de Colores
Blanco, lila y rojo, con tonos suavizados para evitar el cansancio visual (los tokens viven en `frontend/src/theme/variables.scss`).
- **Primary (lila):** `#6446BE` - Botones principales, enlaces, pestaña activa. Apoyos: `#F7F4FD` (50), `#EEE8FB` (100), `#E0D6F7` (200), `#AD98E8` (400), `#4B3194` (700).
- **Acción / afecto (rojo):** `#D93249` - "Me gusta", insignias de mensajes sin leer, cierre de sesión. Apoyos: `#FDEEF0` (50), `#FAD9DE` (100), `#A8213A` (deep).
- **Background:** `#FAF9FD` (blanco con matiz lila).
- **Surface:** `#FFFFFF` - Tarjetas, hojas, campos.
- **Text Primary:** `#2A2540`. **Text Secondary:** `#625C7C`. **Líneas:** `#ECE8F6`.
- El rojo se usa solo en acciones puntuales; el lila claro cubre las zonas de apoyo.

## 3. Tipografía
- **Títulos:** Bricolage Grotesque (700-800). **Cuerpo:** Inter (400-600).
- Si no hay conexión se usa la fuente del sistema (ver `--af-font-*`).
- Marca: logotipo "afinia" en minúsculas con dos círculos que se solapan (afinidad = intersección). El medidor de afinidad reutiliza ese motivo: el solape crece con el porcentaje.

## 4. Botones
- **Solid Button:** Fondo lila, texto blanco. Esquinas redondeadas (`border-radius: 25px` o píldora).
- **Outline Button:** Borde Primary, fondo transparente, texto Primary.
- **Ghost Button:** Sin borde, sin fondo, texto Primary (para "Omitir" o acciones terciarias).

## 5. Tarjetas (Cards)
- **Profile Card (Swipe):** 
  - Ocupa el 85% de la altura de la pantalla (en móvil).
  - Esquinas redondeadas (`20px`).
  - Sombra sutil: `box-shadow: 0 10px 20px rgba(0,0,0,0.1)`.
  - La información (Nombre, Edad, Bio corta) superpuesta con gradiente inferior oscuro para asegurar contraste.

## 6. Feedback Visual
- **Loading:** Skeleton screens preferidos sobre spinners para el contenido principal del perfil. Spinners sutiles para peticiones de red pequeñas (botones).
- **Match State:** Modal a pantalla completa o bottom sheet, confetti sutil (lila + rojo).
- **Empty States:** Ilustraciones vectoriales minimalistas acompañadas de un mensaje amigable (ej. "No hay más perfiles por ahora, ajusta tus filtros").

## 7. Navegación
- **Tabs (Inferiores):**
  1. Descubrir (Cards) - `/app/dashboard`.
  2. Matches (Lista de coincidencias; abre el chat en `/chat/:matchId`) - `/app/matches`.
  3. Perfil (Gestión de configuración) - `/app/profile`.
