# Kanban Board (tipo Jira)

Aplicación Kanban en **React + Vite** para crear, editar, eliminar y mover tareas entre **Pendiente**, **En progreso** y **Completado**, con prioridad, progreso, búsqueda, ordenamiento y arrastrar y soltar.

🌐 Producción: https://kanban-jira-pipeline.vercel.app

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

```
feature → develop ──(PR automático)──► main
            │                           │
     CI + Preview Vercel        CI + Producción Vercel
```

- **CI** (`.github/workflows/ci.yml`): en cada push y PR a `develop`/`main` → `npm ci`, lint, pruebas y build.
- **Entrega continua**: un push a `develop` que pasa CI despliega un *Preview* y abre/actualiza el PR `develop → main`.
- **Despliegue continuo**: un merge a `main` que pasa CI despliega a *Producción*.
- `main` está protegida: requiere PR y el check `build-and-test` en verde.

### Configuración requerida

| Tipo | Nombre | Dónde |
|---|---|---|
| Secret | `VERCEL_TOKEN` | Settings → Secrets and variables → Actions |
| Variable | `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Settings → Secrets and variables → Actions → Variables |
