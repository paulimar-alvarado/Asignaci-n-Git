require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

const authRoutes = require('./routes/auth');
const manualRoutes = require('./routes/manuals');
const folderRoutes = require('./routes/folders');
const activityRoutes = require('./routes/activity');
const prestamoRoutes = require('./routes/prestamos');
const downloadRoutes = require('./routes/downloads');
const notificationRoutes = require('./routes/notifications');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/manuals', manualRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/prestamos', prestamoRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/notifications', notificationRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB');
    const adminCount = await User.countDocuments({ rol: 'admin' });
    if (adminCount === 0) {
      const admin = new User({
        nombre: 'Administrador',
        email: process.env.ADMIN_EMAIL || 'admin@fibextelecom.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        rol: 'admin',
        departamento: 'Sistemas',
        cargo: 'Administrador',
        telefono: ''
      });
      await admin.save();
      console.log('Usuario admin creado');
    }
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('Error de conexion a MongoDB:', err));
