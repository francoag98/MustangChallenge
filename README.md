# MustangChallenge
1- Consigna:
Crear una aplicación que tome los datos de las posiciones del fútbol argentino de forma
automática (técnica de scrapper, por ejemplo:
https://www.futbolargentino.com/primera-division/tabla-de-posiciones - puede ser cualquier otra
fuente que cumpla con el requerimiento).
La información obtenida, debe obtenerse cada X tiempo (configurable por variable de entorno)
y guardarse en la base de datos.
Al acceder a la aplicación vía web (en cualquier contexto elegido - /posiciones por ej), se debe
mostrar la información en la web de forma responsive, sin utilizar frameworks como bootstrap.
Es deseado mostrar la tabla con los equipos y escudos correspondientes.
TIP para el responsive: en celular mostrar columnas importantes (PJ, G, E, P, Pts), en pantallas
más anchas mostrar todas las columnas.
Destacar los cuatro primeros equipos con un color (acceden a otra copa) y los cuatro últimos
con otro color (juegan el descenso).
<br>
2- Tecnologias a utilizar.
- Git
- Node.js (express.js, cheerio o similar, mongoose, handlebars)
- MongoDB
- <br>
3- Despliegue:
La aplicación debe estar online utilizando las siguientes plataformas que ofrecen una capa
gratuita para tal fin:
- Heroku
- MongoDB Atlas 
- <br>
4- SEO:
- Usando plugin de chrome SEO 1 meta click o similar, revisar el contenido. Description,
titles, h1, imagen de preview, etc.
- Tutorial: https://youtube.com/playlist?list=PLvJ_dXFSpd2vk6rQ4Rta5MhDIRmakFbp6
