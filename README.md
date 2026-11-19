# Kanban Board (tipo Jira)

Aplicación Kanban en React + Vite para crear, editar, eliminar y mover tareas entre **Pendiente**, **En progreso** y **Completado**.

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm test         # pruebas con Vitest
npm run build    # build de producción
```

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`): en cada `push` y `pull_request` a `main` instala dependencias, ejecuta las pruebas y genera el build.
- **Vercel**: despliegue automático desde la rama `main`.
