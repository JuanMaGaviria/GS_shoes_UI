# Proyecto React - Sistema de Gestión

Este proyecto es una aplicación web desarrollada en React.js que incluye un sistema de gestión con múltiples módulos administrativos.

## 🚀 Características

- **Dashboard**: Panel principal con métricas y resumen del sistema
- **Gestión de Usuarios**: Módulo completo para administrar usuarios del sistema
- **Artículos**: Sistema de gestión de artículos con funcionalidades CRUD
- **Movimientos**: Módulo para listar y visualizar movimientos del sistema

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-proyecto.git
   cd nombre-del-proyecto
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o si prefieres yarn
   yarn install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm start
   # o con yarn
   yarn start
   ```

4. **Abre tu navegador**
   
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔑 Acceso al Sistema

Para iniciar sesión en la aplicación:

- **Correo electrónico**: Puedes ingresar cualquier dirección de correo electrónico
- **Contraseña**: Puedes ingresar cualquier contraseña

> **Nota**: El sistema de autenticación actual es de demostración y acepta cualquier combinación de credenciales.

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas principales de la aplicación
│   ├── Dashboard/      # Panel principal
│   ├── Users/          # Gestión de usuarios
│   ├── Articles/       # Gestión de artículos
│   └── Movements/      # Listado de movimientos
├── services/           # Servicios y llamadas a API
├── utils/              # Utilidades y helpers
└── App.js              # Componente principal
```

## 🎯 Módulos Disponibles

### Dashboard
Panel principal que muestra un resumen general del sistema con métricas importantes y accesos rápidos.

### Gestión de Usuarios
Módulo completo para la administración de usuarios que incluye:
- Crear nuevos usuarios
- Editar información existente
- Eliminar usuarios
- Visualizar listado de usuarios

### Artículos
Sistema de gestión de artículos con funcionalidades completas:
- Crear nuevos artículos
- Editar artículos existentes
- Eliminar artículos
- Visualizar catálogo de artículos

### Movimientos
Módulo para visualizar movimientos del sistema:
- Listado de movimientos
- Filtros de búsqueda
- Visualización detallada

> **Nota**: Actualmente el módulo de movimientos solo incluye la funcionalidad de listado.

## 🛠️ Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Ejerce el proyecto (no reversible)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📞 Contacto

Tu Nombre - tu.email@example.com

Link del Proyecto: [https://github.com/tu-usuario/nombre-del-proyecto](https://github.com/tu-usuario/nombre-del-proyecto)
