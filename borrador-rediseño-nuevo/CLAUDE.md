# RAR Transformación Estratégica — Sitio Web

## Descripción del proyecto
Sitio web corporativo de una página (single-page) para RAR Transformación Estratégica (RAR TE), firma boutique de optimización empresarial con base en Lima, Perú. Opera en LatAm en sectores de minería, oil & gas, manufactura, agroindustria, infraestructura y servicios.

## Archivos
```
index.html      — sitio completo (HTML + CSS + JS inline, sin frameworks)
photo RR.png    — foto del Socio Director (Raúl A. Rojas)
CLAUDE.md       — este archivo
```

## Stack técnico
- HTML/CSS/JS puro. Sin frameworks, sin bundlers, sin dependencias externas.
- Un único archivo `index.html` con estilos y scripts inline.
- Para publicar: arrastrar la carpeta a Netlify Drop (drop.netlify.com) o subir a cualquier hosting estático.

## Paleta de colores (Pizarra + Lima Dorado)
```css
--dark:    #1C2B3A   /* fondo oscuro principal, nav, secciones alternas */
--mid:     #2A3D52   /* color secundario, iconos, botones secundarios */
--light:   #3A5068   /* hover states */
--gold:    #B8962A   /* acento principal: botones, separadores, highlights */
--gold-lt: #D4AE3C   /* acento secundario: texto destacado en fondos oscuros */
--white:   #FFFFFF
--off:     #F3F5F7   /* fondo secciones claras alternas */
--txt:     #1C2B3A   /* texto principal */
--tmid:    #3A4F62   /* texto secundario */
--tlt:     #7A90A3   /* texto terciario / placeholders */
--border:  #DDE3EA   /* bordes de cards y separadores */
```

## Sistema bilingüe (ES / EN)
El idioma se controla con la clase `lang-es` o `lang-en` en el `<body>`.

```html
<!-- Bloques: mostrar según idioma activo -->
<p data-lang="es">Texto en español</p>
<p data-lang="en">English text</p>

<!-- Inline dentro de un párrafo -->
<span data-lang="es">español</span><span data-lang="en">english</span>
```

CSS base:
```css
[data-lang] { display: none; }
body.lang-es [data-lang="es"] { display: revert; }
body.lang-en [data-lang="en"] { display: revert; }
```

JS para cambiar idioma:
```js
function setLang(l) {
  document.body.className = 'lang-' + l;
  document.querySelectorAll('.lang-btn')
    .forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === l));
}
```

## Secciones (en orden)
1. **Nav** — logo + links + toggle ES/EN + CTA "Agendar reunión"
2. **Hero** (`#inicio`) — headline, subtítulo, trust statement, 2 CTAs, 3 stats flotantes (desktop)
3. **Sector strip** — 6 íconos: Minería, Oil & Gas, Manufactura, Agroindustria, Infraestructura, Servicios
4. **El problema** (`#problema`) — fondo oscuro, 3 cards con números: −50%, 35%, 29%
5. **Qué hacemos** (`#servicios`) — fondo claro, 3 cards: Estrategia, Excelencia Operacional, Excelencia en Inversiones
6. **Por qué nosotros** (`#nosotros`) — 4 cards con borde izquierdo dorado
7. **Nuestro equipo** (`#equipo`) — foto circular + bio + 4 tarjetas de impacto
8. **Cómo empezar** (`#empezar`) — fondo oscuro, 2 opciones: Reunión 30 min + Diagnóstico Relámpago
9. **Contacto** (`#contacto`) — fondo claro, 2 columnas: info + formulario
10. **Footer** — minimal

## Links clave
- Booking (reunión): `https://bookings.cloud.microsoft/bookwithme/user/18c268b18dcc4351873da0a54e850f25%40rar.pe?anonymous&ismsaljsauthenabled`
- LinkedIn: `https://www.linkedin.com/in/raulrojasrenteria`
- Email: `contacto@rar.pe`
- Teléfono: `+51 983 894 157`

## Foto del equipo
La imagen `photo RR.png` debe estar en la misma carpeta que `index.html`. Si no se encuentra, el sitio muestra un avatar con las iniciales "RR" como fallback:
```html
<img src="photo RR.png" alt="Raúl A. Rojas" class="team-photo"
     onerror="this.style.display='none';document.getElementById('av').style.display='flex';"/>
<div class="team-photo-fallback" id="av" style="display:none;">RR</div>
```

## Formulario de contacto
El formulario abre el cliente de email del usuario con un mailto pre-llenado. No requiere backend:
```js
function sendContact(e) {
  e.preventDefault();
  const n = document.getElementById('cf-name').value;
  const m = document.getElementById('cf-email').value;
  const t = document.getElementById('cf-msg').value;
  window.location.href = 'mailto:contacto@rar.pe?subject='
    + encodeURIComponent('Contacto RAR TE — ' + n)
    + '&body=' + encodeURIComponent('Nombre/empresa: ' + n + '\nEmail: ' + m + '\n\nMensaje:\n' + t);
}
```
Para cambiar a un backend real (ej. Formspree, EmailJS), reemplazar esta función.

## Decisiones de diseño
- **Sin redes sociales** — decisión explícita del cliente.
- **McKinsey solo en sección Equipo** — no aparece en hero ni en "Por qué nosotros". Solo en la bio y en el badge `.tbadge`.
- **Sin sección de testimonios** — eliminada por decisión del cliente.
- **Sin sección de resultados** — las métricas están solo en el hero (stats flotantes) y en la sección de equipo (tarjetas de impacto).
- **Posicionamiento** — "socio de confianza en la implementación" (inspirado en APOYO Consultoría) + diferenciador boutique vs. firmas grandes.

## Cambios comunes

### Actualizar texto en ambos idiomas
Buscar el bloque `data-lang="es"` y su par `data-lang="en"` correspondiente.

### Cambiar el link de booking
Buscar y reemplazar todas las ocurrencias de la URL de bookings (aparece 3 veces: nav CTA, hero CTA, sección empezar).

### Agregar una sección nueva
Copiar el patrón de una sección existente. Usar `background: var(--off)` y `background: var(--white)` de forma alterna para mantener el ritmo visual. Secciones sobre fondo oscuro usan `background: var(--dark)`.

### Publicar el sitio
1. Descargar `index.html` y `photo RR.png` a una carpeta local.
2. Ir a https://drop.netlify.com
3. Arrastrar la carpeta completa.
4. El sitio queda publicado con URL pública en segundos.
