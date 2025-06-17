# RSS Aggregator

Este proyecto es un **lector de feeds RSS automatizado** que recolecta noticias desde distintas fuentes, las unifica y genera una **página estática** con los artículos más recientes.

## 🚀 ¿Qué hace este sistema?

- Lee múltiples fuentes RSS predefinidas.
- Limpia y formatea los artículos (título, descripción, imagen, fecha, etc.).
- Endpoint de consumo de artículos: http://localhost:8080/api/articles
- Genera un JSON con los artículos unificados.
- Construye una página web con los resultados (frontend en React).
- La página se actualiza automáticamente cada 24 horas gracias a GitHub Actions.
- Publicación automática en GitHub Pages (o repositorio externo).

⚠️ **No realiza llamadas en tiempo real**. Toda la información se actualiza en segundo plano mediante un cronjob diario.

## 🛠️ Tecnologías utilizadas

- **Java + Spring Boot**: Backend para recolectar y procesar los feeds RSS.
- **Rome**: Librería para el parsing de RSS.
- **React**: Interfaz de usuario.
- **GitHub Actions**: Automatización del proceso de build y despliegue.
- **GitHub Pages**: Hosting estático del sitio web.

## 📄 Más información

Para más detalles, consultá la [Wiki del proyecto](https://github.com/JuanOrPinilla/rss/wiki).
