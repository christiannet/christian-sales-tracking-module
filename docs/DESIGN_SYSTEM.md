# Design System — Sales Tracking Module

Guía de referencia de los tokens visuales, tipografía y componentes estilizados de la aplicación. Toda la definición vive en `frontend/src/styles.scss`.

---

## Índice

1. [Principios](#1-principios)
2. [Paleta de superficies](#2-paleta-de-superficies)
3. [Paleta de texto](#3-paleta-de-texto)
4. [Colores semánticos](#4-colores-semánticos)
5. [Tipografía — texto](#5-tipografía--texto)
6. [Tipografía — íconos](#6-tipografía--íconos)
7. [Componentes Angular Material](#7-componentes-angular-material)
8. [Notificaciones (ngx-toastr)](#8-notificaciones-ngx-toastr)
9. [Scrollbar](#9-scrollbar)

---

## 1. Principios

- **Tema oscuro único.** No existe modo claro. Todos los tokens asumen un fondo oscuro como base.
- **Tokens primero.** Ningún componente usa valores de color o tamaño literales; siempre se referencian las variables CSS de `:root`.
- **Overrides centralizados.** Los estilos de Angular Material se sobreescriben globalmente en `styles.scss` para que los componentes standalone no necesiten repetir reglas. Se usa `!important` únicamente para combatir la alta especificidad de MDC.
- **Identidad visual rosa.** El color `#e91e8c` es el único elemento de marca que aparece como literal (borde de tarjetas, hover de botones de acción). Todo lo demás se expresa en tokens.

---

## 2. Paleta de superficies

Escala de oscuro a claro. Se aplican en orden ascendente para crear jerarquía visual:
**fondo de página → tarjeta → input → fila destacada / hover**.

| Token | Valor | Uso |
|---|---|---|
| `--bg-base` | `#0f1117` | Fondo base de toda la página |
| `--bg-surface` | `#1a1d27` | Tarjetas (`mat-card`), toolbar, tabla |
| `--bg-surface-2` | `#242736` | Inputs, fila de cabecera de tabla, panel de select |
| `--bg-surface-3` | `#2e3247` | Hover de fila, botón desactivado, snackbar |

```scss
background-color: var(--bg-surface);
```

---

## 3. Paleta de texto

Opacidades sobre blanco puro (`#ffffff`) calibradas según la especificación de Material Design para modo oscuro.

| Token | Valor | Opacidad | Uso |
|---|---|---|---|
| `--text-primary` | `rgba(255,255,255,0.87)` | 87 % | Contenido principal, valores, labels de tabla |
| `--text-secondary` | `rgba(255,255,255,0.60)` | 60 % | Subtítulos, placeholders, cabeceras de tabla |
| `--text-disabled` | `rgba(255,255,255,0.38)` | 38 % | Texto desactivado (botones, campos bloqueados) |

> **Nota:** `--text-disabled` coincide intencionalmente con el valor estándar de Material Design para estados desactivados, de modo que los botones nativos de Material y los estilos propios tienen coherencia visual.

```scss
color: var(--text-secondary);
```

---

## 4. Colores semánticos

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#7eb8f7` | Color principal de acción: botones activos, íconos de prefijo, borde de input en hover |
| `--accent-dim` | `#1a3358` | Fondo de chips, badges y avatares que usan el accent como referencia |
| `--success` | `#81c784` | Montos en tabla, KPI de completitud positiva |
| `--warning` | `#ffb74d` | KPI de "restante", alertas no bloqueantes |
| `--danger` | `#ef9a9a` | Mensajes de error inline, validaciones de formulario |
| `--border` | `rgba(255,255,255,0.08)` | Líneas divisorias, bordes de inputs en reposo, separadores |
| `--shadow` | `rgba(0,0,0,0.50)` | Referencia para `box-shadow` (no aplicado directamente en tokens, disponible para uso manual) |

```scss
color: var(--success);
border-color: var(--border);
```

---

## 5. Tipografía — texto

Escala semántica en `rem`. El tamaño raíz del navegador es **16 px**, por lo que `1rem = 16 px`.  
Los nombres describen el rol del texto, no su tamaño.

| Token | Valor | px aprox. | Uso en la app |
|---|---|---|---|
| `--font-size-2xs` | `0.70rem` | ~11 px | Ticks de escala en barra de progreso, metadatos mínimos |
| `--font-size-xs` | `0.75rem` | 12 px | Etiquetas de KPI (`kpi__label`), chips, badges |
| `--font-size-sm` | `0.875rem` | 14 px | Mensajes de error de formulario, texto auxiliar |
| `--font-size-base` | `0.90rem` | ~14 px | Cuerpo de sección, subtítulos, usuario en toolbar |
| `--font-size-md` | `1rem` | 16 px | Botones de acción, labels de inputs |
| `--font-size-lg` | `1.15rem` | ~18 px | Título de toolbar (`toolbar-title`) |
| `--font-size-display` | `1.60rem` | ~26 px | Valores KPI grandes (`kpi__value`) |

```scss
font-size: var(--font-size-xs);   /* label de KPI */
font-size: var(--font-size-display); /* valor KPI */
```

---

## 6. Tipografía — íconos

Los íconos de Material Design requieren valores absolutos en `px` para respetar la cuadrícula del sistema de íconos. **No usar `rem` para tamaños de ícono.**

| Token | Valor | Uso en la app |
|---|---|---|
| `--icon-size-sm` | `18px` | Íconos en títulos de sección (`badges-title`), mensajes inline (`error-msg`) |
| `--icon-size-md` | `20px` | Avatar circular en `mat-card-header` |
| `--icon-size-lg` | `28px` | Logo de la toolbar (`toolbar-logo`) |
| `--icon-size-xl` | `40px` | Ícono de marca en la pantalla de login |
| `--icon-size-2xl` | `48px` | Íconos decorativos de estado vacío (`empty-state`) |

```scss
font-size: var(--icon-size-md);
width:      var(--icon-size-md);
height:     var(--icon-size-md);
```

---

## 7. Componentes Angular Material

Todos los overrides aplican globalmente a través de `styles.scss`. Los componentes standalone **no deben** redefinir estas reglas.

### Tarjetas (`mat-card`)

El borde rosa `#e91e8c` es el elemento de identidad visual del proyecto y se aplica a todas las tarjetas de la app.

| Propiedad | Valor |
|---|---|
| `background-color` | `var(--bg-surface)` |
| `color` | `var(--text-primary)` |
| `border` | `1px solid #e91e8c` |
| `border-radius` | `12px` |
| `box-shadow` | `0 4px 20px rgba(0,0,0,0.35)` |

### Toolbar (`mat-toolbar`)

| Propiedad | Valor |
|---|---|
| `background-color` | `var(--bg-surface)` |
| `border-bottom` | `1px solid var(--border)` |

### Campos de formulario (`mat-form-field`)

- **Fondo del input:** `var(--bg-surface-2)`, `border-radius: 8px`
- **Borde en reposo:** `var(--border)` — el outline MDC se divide en tres segmentos (`leading`, `notch`, `trailing`) que se colorean por separado
- **Borde en hover:** `var(--accent)`
- **Label flotante:** `var(--text-secondary)`
- **Texto del input:** `var(--text-primary)`
- **Íconos de prefijo (`matPrefix`):** `#ffffff` — incluye `mat-icon` y `mat-datepicker-toggle`

### Tabla (`mat-table`)

| Elemento | Fondo | Texto | Borde inferior |
|---|---|---|---|
| Tabla | `var(--bg-surface)` | `var(--text-primary)` | — |
| Fila de cabecera | `var(--bg-surface-2)` | `var(--text-secondary)` | `var(--border)` |
| Celdas | `var(--bg-surface)` | `var(--text-primary)` | `var(--border)` |
| Hover de fila | `var(--bg-surface-2)` en cada celda | — | — |

> El hover cambia el color celda por celda (comportamiento MDC), no de la fila completa.

### Botones

- **Todas las variantes** (`mat-button`, `mat-raised-button`, `mat-outlined-button`, `mat-unelevated-button`): `border-radius: 24px` (estilo píldora)
- **`mat-outlined-button` activo:** `border-color: var(--border)`, `color: var(--text-primary)`
- **`mat-raised-button` desactivado:** fondo `var(--bg-surface-3)`, texto e ícono al `38%` de opacidad

### Subtítulo de tarjeta (`mat-card-subtitle`)

`color: #bebdbd` — Material aplica un gris muy oscuro por defecto; se eleva a un gris claro casi blanco para legibilidad en superficies oscuras.

### Barra de progreso (`mat-progress-bar`)

| Propiedad MDC | Valor |
|---|---|
| `border-radius` | `6px` |
| `--mdc-linear-progress-track-height` | `12px` |
| `--mdc-linear-progress-active-indicator-height` | `12px` |
| `--mdc-linear-progress-track-color` | `rgba(255,255,255,0.10)` |

### Divisor (`mat-divider`)

`border-color: var(--border)`

---

## 8. Notificaciones (ngx-toastr)

Los toasts se renderizan en un overlay fuera del árbol de componentes Angular, por lo que solo pueden estilizarse globalmente mediante el selector `#toast-container`.

| Tipo | Color de fondo | Color de texto | Cuándo usar |
|---|---|---|---|
| `.toast-success` | `#388e3c` (verde) | Blanco (default) | Confirmación de acciones exitosas (ej. venta registrada) |
| `.toast-error` | `#c62828` (rojo) | Blanco (default) | Fallos de API o errores críticos de validación |
| `.toast-warning` | `#f9a825` (amarillo) | `#1a1a1a` (oscuro) | Alertas no bloqueantes — el texto es oscuro porque el fondo es claro |

**Uso en componentes:**

```typescript
import { ToastrService } from 'ngx-toastr';

this.toastr.success('Venta registrada correctamente.');
this.toastr.error('Error al conectar con el servidor.');
this.toastr.warning('La meta está próxima a vencer.');
```

**Configuración global** (definida en `app.config.ts`):

```typescript
provideToastr({
  timeOut: 3500,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
})
```

---

## 9. Scrollbar

Scrollbar personalizado para navegadores Webkit (Chrome, Edge, Safari). Firefox utiliza las propiedades estándar `scrollbar-color` / `scrollbar-width`, que no están implementadas en esta versión.

| Parte | Valor |
|---|---|
| Ancho / alto | `6px` |
| Track | `var(--bg-base)` — se mezcla con el fondo de página |
| Thumb | `var(--bg-surface-3)` — visible sin distraer |
| Thumb en hover | `#3d4266` — feedback visual de interacción |
