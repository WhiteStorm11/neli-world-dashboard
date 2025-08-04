# Dashboard de Gestión Integral - Neli World Solutions

Sistema completo de gestión empresarial desarrollado para Neli World Solutions, empresa dedicada a proporcionar soluciones innovadoras, estratégicas y logísticas que permiten a las empresas mejorar su eficiencia y rendimiento de manera integral.

## 🚀 Características Principales

### 🏢 Gestión de Empleados
- Registro completo de información personal y laboral
- Gestión de fotos de empleados con GridFS
- Cálculo automático de salarios y antigüedad
- Control de beneficios (bonos, días libres, etc.)
- Búsqueda y filtrado avanzado

### 💰 Gestión de Finanzas
- Control completo de gastos e ingresos
- Generación de reportes financieros en tiempo real
- Exportación de datos a Excel
- Visualización de flujos de caja con gráficos interactivos
- Dashboard financiero con métricas clave

### 👥 Gestión Humana
- Control de asistencia diario
- Sistema de evaluaciones de rendimiento
- Gestión de vacaciones y permisos
- Calendario de eventos y actividades
- Reportes de productividad

### 🔗 Gestión de Servicios Externos
Control de 10 proveedores principales:
- RedConexión
- ComuRed
- TeleLink
- NetCom
- InterMóvil
- TeleSistemas
- RedTigo
- Comunicaciones Mayoristas
- MediCom
- RedComunicaciones

Funcionalidades:
- Control de pagos y contratos
- Análisis de costos e impacto financiero
- Alertas de vencimientos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos

### Backend
- **Next.js API Routes** - API REST
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **GridFS** - Almacenamiento de archivos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

### Funcionalidades Adicionales
- **XLSX** - Importación/exportación Excel
- **Nodemailer** - Envío de emails
- **Multer** - Subida de archivos
- **Date-fns** - Manejo de fechas

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd neli-world-solutions-dashboard
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus configuraciones:
```env
MONGODB_URI=mongodb://localhost:27017/neli-world-solutions
JWT_SECRET=your-super-secret-jwt-key-here
```

4. **Iniciar MongoDB**
```bash
# Si usas MongoDB local
mongod

# O usar MongoDB Atlas (cloud)
# Configurar MONGODB_URI con tu connection string
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:8000`

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticación
│   │   ├── employees/     # Gestión de empleados
│   │   ├── finances/      # Gestión financiera
│   │   ├── hr/           # Recursos humanos
│   │   └── services/     # Servicios externos
│   ├── employees/        # Página de empleados
│   ├── finances/         # Página de finanzas
│   ├── hr/              # Página de RRHH
│   ├── services/        # Página de servicios
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Dashboard principal
├── components/
│   ├── dashboard/       # Componentes del dashboard
│   └── ui/             # Componentes UI (shadcn)
├── lib/
│   ├── models/         # Modelos de MongoDB
│   ├── auth.ts         # Utilidades de autenticación
│   ├── mongodb.ts      # Conexión a MongoDB
│   └── utils.ts        # Utilidades generales
└── types/
    └── index.ts        # Tipos TypeScript
```

## 🔐 Autenticación

El sistema incluye un sistema de autenticación completo con:
- Registro de usuarios
- Login/Logout
- Roles de usuario (admin, manager, employee)
- Protección de rutas
- JWT tokens

### Roles de Usuario
- **Admin**: Acceso completo al sistema
- **Manager**: Gestión de empleados y reportes
- **Employee**: Acceso limitado a información personal

## 📊 Dashboard Principal

El dashboard principal incluye:
- Métricas clave de la empresa
- Gráficos interactivos de flujo de caja
- Distribución de empleados por departamento
- Actividad reciente del sistema
- Accesos rápidos a módulos principales

## 🔧 APIs Disponibles

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/logout` - Cerrar sesión

### Empleados
- `GET /api/employees` - Listar empleados
- `POST /api/employees` - Crear empleado
- `GET /api/employees/[id]` - Obtener empleado
- `PUT /api/employees/[id]` - Actualizar empleado
- `DELETE /api/employees/[id]` - Eliminar empleado

### Finanzas
- `GET /api/finances` - Listar registros financieros
- `POST /api/finances` - Crear registro
- `GET /api/finances/[id]` - Obtener registro
- `PUT /api/finances/[id]` - Actualizar registro
- `DELETE /api/finances/[id]` - Eliminar registro

### Recursos Humanos
- `GET /api/hr` - Listar registros de RRHH
- `POST /api/hr` - Crear registro
- `GET /api/hr/[id]` - Obtener registro
- `PUT /api/hr/[id]` - Actualizar registro
- `DELETE /api/hr/[id]` - Eliminar registro

### Servicios Externos
- `GET /api/services` - Listar proveedores
- `POST /api/services` - Crear proveedor
- `GET /api/services/[id]` - Obtener proveedor
- `PUT /api/services/[id]` - Actualizar proveedor
- `DELETE /api/services/[id]` - Eliminar proveedor

## 🎨 Características de UI/UX

- **Diseño Responsivo**: Funciona en desktop, tablet y móvil
- **Modo Oscuro/Claro**: Tema adaptable
- **Sidebar Colapsible**: Navegación optimizada
- **Gráficos Interactivos**: Visualización de datos
- **Filtros Avanzados**: Búsqueda y filtrado en tiempo real
- **Formularios Validados**: Validación client-side y server-side
- **Notificaciones**: Feedback visual para acciones

## 📈 Funcionalidades Avanzadas

### Importación/Exportación Excel
- Importar datos de empleados desde Excel
- Exportar reportes financieros
- Actualización masiva de información

### Sistema de Alertas
- Contratos próximos a vencer
- Evaluaciones pendientes
- Vacaciones programadas

### Reportes en Tiempo Real
- Dashboard con métricas actualizadas
- Gráficos de tendencias
- Análisis de costos

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Docker (Opcional)
```bash
# Crear imagen
docker build -t neli-dashboard .

# Ejecutar contenedor
docker run -p 8000:8000 neli-dashboard
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@neliworldsolutions.com
- Teléfono: +1 (555) 123-4567

---

**Desarrollado con ❤️ para Neli World Solutions**
