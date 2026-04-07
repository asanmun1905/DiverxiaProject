# Diverxia Evento — Aplicación Web Estática

Aplicación web estática para la gestión visual de un evento con pruebas, participantes, jueces e invitados. Desarrollada con **HTML, CSS y JavaScript** puro, sin base de datos ni backend.

---

## 🎨 Diseño y Estética

- **Paleta de colores**: `#31b7db` (azul Diverxia), `#252930` (fondo oscuro), `#ebebeb` (texto claro)
- **Tipografía**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) con pesos 300, 400, 600 y 800
- **Fondo animado**: Formas geométricas 3D (círculos, rectángulos redondeados) con movimiento y animación `float` continua
- **Glassmorphism**: Contenedores con `backdrop-filter: blur` y bordes semitransparentes
- **Inspiración visual**: [diverxiaconsulting.com](https://www.diverxiaconsulting.com)

---

## 📁 Estructura de Archivos

```
DiverxiaProject/
├── index.html         # Página de inicio / login
├── roles.html         # Selección de tipo de participante
├── admin.html         # Panel del Administrador (protegido)
├── jueces.html        # Panel de Jueces (protegido)
├── invitados.html     # Área de Invitados
├── style.css          # Estilos globales
├── script.js          # Lógica de sidebar + autenticación simulada
└── img/
    └── Recurso-1.svg  # Logo de Diverxia
```

---

## 📄 Páginas Implementadas

| Página | Archivo | Acceso |
|---|---|---|
| Inicio / Login | `index.html` | Público |
| Selección de Rol | `roles.html` | Público |
| Panel Administrador | `admin.html` | Solo administradores |
| Panel Jueces | `jueces.html` | Solo jueces |
| Área Invitados | `invitados.html` | Invitados y administradores |

---

## 🔐 Autenticación Simulada

Sin base de datos. El rol se almacena en `localStorage` del navegador:

| Rol | Cómo se activa | Acceso |
|---|---|---|
| `guest` | Sin iniciar sesión | Páginas públicas |
| `admin` | Botón "Iniciar sesión como administrador" | Todo |
| `juez` | Botón "Jueces" en selección de rol | Panel de jueces |
| `invitado` | Botón "Invitados" en selección de rol | Área de invitados |

- El menú lateral muestra/oculta enlaces según el rol activo
- "Cerrar sesión" limpia el `localStorage` y redirige al inicio

---

## 🟰 Header y Sidebar

- **Header**: Logo (`img/Recurso-1.svg`) a la izquierda + botón hamburger (3 barras) a la derecha
- **Sidebar**: Panel deslizante desde la derecha con:
  - Botón **X** (hamburger en estado activo) en la esquina superior derecha para **cerrar**
  - Animación de entrada/salida (`cubic-bezier`) suave
  - Cierre también al hacer clic fuera del panel
  - Efecto hover en cada enlace: resaltado azul + padding animado
- **Navegación del sidebar**:
  - Inicio
  - Comenzar
  - Panel Invitados *(visible si rol = invitado o admin)*
  - Panel Administrador *(visible si rol = admin)*
  - Panel Jueces *(visible si rol = juez o admin)*
  - Sobre Nosotros *(enlace a diverxiaconsulting.com, siempre visible)*
  - Cerrar sesión *(visible si hay sesión activa)*

---

## 🦶 Footer

Presente en todas las páginas:

```
© 2026 Diverxia Consulting
```

---

## ⚙️ Tecnologías Utilizadas

- **HTML5** — Estructura semántica
- **CSS3** — Animaciones, glassmorphism, variables CSS, keyframes
- **JavaScript (ES6+)** — DOM manipulation, localStorage, eventos de click
- **Google Fonts** — Fuente Outfit

---

## 🚀 Cómo Ejecutar

Simplemente abre `index.html` en cualquier navegador moderno. No requiere servidor ni instalación.