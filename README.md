# Orquestador de Eventos Cloud y Agentes de IA

Sistema de inteligencia de eventos/noticias: ingiere fuentes RSS de forma automática,
las procesa con agentes de IA (traducción, resumen, sentimiento, etiquetado), las almacena
en PostgreSQL + Qdrant y dispara alertas críticas. Incluye un panel **React** y un backend
**Spring Boot** con login JWT. La infraestructura (**PostgreSQL · Qdrant · n8n**) se aloja
en un VPS propio, fuera de este repositorio.


## Requisitos

- **Node** 18+ y **npm**
- **Java** 17+ y **Maven** 3.9+
- Acceso a una instancia de **PostgreSQL**, **Qdrant** y **n8n** (en tu VPS) si quieres usar el perfil `postgres` con IA real

---

## Arranque rápido (modo dev, sin Docker)

El backend usa **H2 en memoria** por defecto y se siembra con los mismos datos del prototipo,
así que puedes probar todo sin instalar nada externo.

**1. Backend** (puerto 8080)

```bash
cd backend
mvn spring-boot:run
```

**2. Frontend** (puerto 5173)

```bash
cd frontend
npm install
npm run dev
```

Abre <http://localhost:5173>.
