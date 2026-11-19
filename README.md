# Kanban Board (tipo Jira)

Aplicación Kanban en **React + Vite** para crear, editar, eliminar y mover tareas entre **Pendiente**, **En progreso** y **Completado**, con prioridad, progreso, búsqueda, ordenamiento y arrastrar y soltar.

🌐 Producción: https://kanban-jira-pipeline.vercel.app (Vercel) · Render: ver `render.yaml`

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Pruebas con Vitest |
| `npm run lint` | Análisis estático con ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run build` | Build de producción en `dist/` |

## Estructura

```
src/
├── components/
│   ├── ui/        # Componentes genéricos reutilizables (Button, Modal, Badge, ProgressBar, Select, SearchInput)
│   ├── layout/    # Estructura de la página (AppShell, Sidebar, Topbar, ProjectHeader, ViewTabs)
│   ├── board/     # Tablero (Board, Column, BoardToolbar)
│   ├── task/      # Dominio de tareas (TaskCard, TaskForm, TaskModal, PriorityBadge)
│   └── icons/     # Iconos SVG
├── hooks/         # useTasks, useLocalStorage
├── constants/     # Estados, prioridades, opciones de orden
├── utils/         # Lógica pura (taskUtils, format) + pruebas
├── styles/        # Tokens de diseño y estilos globales
└── test/          # Configuración de Vitest
```

## Flujo de ramas y CI/CD

Se sigue **GitFlow** con títulos de PR y commits en **Conventional Commits** (`feat(scope): …`, `fix(scope): …`, `chore(release): versión X.Y.Z`).

```
feat/* · fix/*  ──PR──►  develop  ──PR de release──►  main
                           │                           │
                   CI ► CD: Preview              CI ► CD: Producción
```

| Workflow | Disparador | Qué hace |
|---|---|---|
| `ci.yml` (CI) | push y PR a `develop`/`main` | `npm ci` → lint → pruebas → build |
| `cd.yml` (CD) | CI exitoso tras un push | `develop`: Preview + PR de release · `main`: Producción |
| `commits.yml` | PR | Valida título del PR y commits (Conventional Commits) |

- `main` está protegida: requiere PR y el check `build-and-test` en verde.
- **Vercel** despliega `main` a producción y cada PR como Preview.
- **Render** (`render.yaml`) despliega `main` como sitio estático cuando los checks pasan.

### Configuración requerida

| Tipo | Nombre | Dónde |
|---|---|---|
| Secret | `VERCEL_TOKEN` | Settings → Secrets and variables → Actions |
| Variable | `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Settings → Secrets and variables → Actions → Variables |
