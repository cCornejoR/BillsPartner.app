# 💰 Gastos.app

Una aplicación móvil moderna para el seguimiento de gastos personales y financieros, construida con Next.js y Capacitor.

## ✨ Características

- 📱 **Aplicación móvil nativa** para iOS y Android
- 💳 **Seguimiento de gastos** con categorización automática
- 📊 **Gráficos y análisis** de tus patrones de gasto
- 🎯 **Metas financieras** para controlar tu presupuesto
- 🛒 **Planes de compras** para organizar tus compras futuras
- 📄 **Exportación a PDF** de reportes financieros
- 🔔 **Sistema de notificaciones** para recordatorios
- 🌙 **Modo oscuro** y diseño responsive

## 🚀 Tecnologías

- **Frontend**: Next.js 15 con TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Mobile**: Capacitor para iOS/Android
- **Charts**: Recharts para visualización de datos
- **PDF**: jsPDF para exportación de reportes

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Xcode (para iOS)
- Android Studio (para Android)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/Gastos.app.git
cd Gastos.app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo web**
```bash
npm run dev
```

4. **Construir para móvil**
```bash
# Construir la aplicación
npm run build

# Sincronizar con Capacitor
npx cap sync

# Abrir en iOS (requiere macOS y Xcode)
npx cap open ios

# Abrir en Android
npx cap open android
```

## 📱 Desarrollo móvil

### iOS
1. Asegúrate de tener Xcode instalado
2. Ejecuta `npx cap open ios`
3. Selecciona tu dispositivo o simulador en Xcode
4. Presiona el botón de Play para compilar y ejecutar

### Android
1. Asegúrate de tener Android Studio instalado
2. Ejecuta `npx cap open android`
3. Selecciona tu dispositivo o emulador en Android Studio
4. Presiona el botón de Run para compilar y ejecutar

## 📁 Estructura del proyecto

```
src/
├── app/                    # Páginas de Next.js (App Router)
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI base (shadcn/ui)
│   ├── ExpenseTracker.tsx # Componente principal
│   ├── AddExpenseModal.tsx # Modal para agregar gastos
│   ├── EspenseCharts.tsx  # Gráficos y análisis
│   ├── FinancialGoals.tsx # Metas financieras
│   └── ...
└── lib/                   # Utilidades y configuraciones

ios/                       # Proyecto nativo de iOS
capacitor.config.ts        # Configuración de Capacitor
```

## 🎨 Componentes principales

- **ExpenseTracker**: Componente principal para seguimiento de gastos
- **AddExpenseModal**: Modal para agregar nuevos gastos
- **EspenseCharts**: Visualización de datos con gráficos
- **FinancialGoals**: Gestión de metas financieras
- **CreditCardComponent**: Simulación de tarjeta de crédito
- **ShoppingPlans**: Planificación de compras
- **PDFExport**: Exportación de reportes
- **NotificationSystem**: Sistema de notificaciones

## 🚀 Scripts disponibles

```bash
npm run dev          # Desarrollo web
npm run build        # Construir para producción
npm run build:github # Construir para GitHub Pages
npm run start        # Servir versión de producción
npm run lint         # Ejecutar linter
```

## 🌐 GitHub Pages

Esta aplicación está configurada para desplegarse automáticamente en GitHub Pages. 

**URL de la aplicación**: https://ccornejor.github.io/BillsPartner.app/

### Configuración automática:
- ✅ Build automático con GitHub Actions
- ✅ Despliegue a GitHub Pages
- ✅ Configuración de basePath para subdirectorios
- ✅ Optimizaciones para sitios estáticos

### Despliegue manual:
```bash
npm run build:github
# Los archivos se generan en la carpeta 'out'
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en GitHub.

---

Desarrollado con ❤️ para el control de gastos personales

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
