# Biblioteca Fibextelecom - Backend

Backend API del sistema de gestion documental de Fibextelecom.

## Stack
- Node.js + Express
- MongoDB (Mongoose)
- JWT Auth
- Multer (file uploads)

## Instalacion Local
```bash
npm install
node seed.js          # Crea usuario admin
npm run dev           # Puerto 5000
```

## Variables de Entorno
- `PORT` = 5000
- `MONGODB_URI` = URI de MongoDB (local o Atlas)
- `JWT_SECRET` = clave secreta

## Deploy (Railway / Render)
1. Conectar este repo
2. Agregar variables: MONGODB_URI, JWT_SECRET, PORT
3. Start Command: `node server.js`

---

# Asignaci-n-Git

Git como herramienta en el desarrollo de aplicaciones Web. Sección 03NM

*Proyecto de la seccion 03NM - Biblioteca Fibextelecom (back-end)*