# 💻 MarketingSystem

Sistema de Carga y Gestión de Productos

---

## 📝 ¿Qué hace este proyecto?

Este proyecto permite **cargar productos** desde archivos Excel, CSV o JSON a una base de datos, actualizar su stock y consultar la información desde una API REST. También envía **reportes por email** y **notificaciones automáticas** cuando se realiza una nueva carga.

---

## 🛠️ Tecnologías utilizadas

- Node.js + Express 
- Prisma ORM
- Typescript
- Swagger
- ExcelJS / CSV Parse / JSON
- Nodemailer (para envío de correos)
- dotenv (configuración de entorno)

---

## ⚡ Instalación y puesta en marcha

1. Cloná el repositorio:

    ```
    git clone https://github.com/SofiLeonar/leonardelliSistemasP2.git
    cd leonardelliSistemasP2
    ```

2. Instalá dependencias:

    ```
    npm install
    ```
3. Configurá el archivo `.env` en la raíz con las siguientes variables:

   ```
   DATABASE_URL="mysql://root:@localhost:3306/marketingsystem"

   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_contraseña_app
   ```
Se solicita reemplazar los datos por los suyos. Para este paso yo creé una contraseña de aplicación para mi cuenta de Gmail. En caso de que no tenga una, la puede crear [aquí](https://myaccount.google.com/apppasswords).

4. Configurá la base de datos:
Entrá a tu consola de MySQL o cliente (como DBeaver, phpMyAdmin o Workbench) y ejecutá:

    ```
    CREATE DATABASE IF NOT EXISTS marketingsystem;
    ```


5. Inicializá la base de datos con Prisma:

   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```

---

5. Iniciar el servidor:

    ```
    npm run dev
    ```
El servidor corre en: `http://localhost:3000/api-docs/`

---

### 📤 Carga de productos

| Tipo     | Endpoint                 | Descripción                          |
|----------|--------------------------|--------------------------------------|
| `POST`   | `/parser/parse_excel`    | Sube archivo Excel                  |
| `POST`   | `/parser/parse_csv`      | Sube archivo CSV                    |
| `POST`   | `/parser/parse_json`     | Sube archivo JSON                   |

✔️ Luego de procesar el archivo, se envía una **notificación automática por email** avisando que se hizo una nueva carga.

---

⚠️ **IMPORTANTE:** 
Para que el sistema pueda enviar correctamente una notificación cada vez que se realiza una carga de productos (ya sea desde un archivo Excel, CSV o JSON), es necesario establecer un correo de destino en el archivo correspondiente.

📍 Archivo: src/services/notificacion.service.ts
💻Linea 3

```
const DESTINATARIO = 'sandra.leonardelli@davinci.edu.ar'
```
Se solicita cambiarlo por su correo para poder recibir dichas notificaciones.


### 📄 Visualización de datos

| Tipo     | Endpoint            | Descripción                        |
|----------|---------------------|------------------------------------|
| `GET`    | `/productos`        | Lista todos los productos          |
| `GET`    | `/stock`            | Muestra el stock por producto      |

### 📧 Reporte por email

| Tipo     | Endpoint             | Descripción                                |
|----------|----------------------|--------------------------------------------|
| `POST`   | `/enviar-reporte`    | Envía un Excel con stock al correo enviado en el body |

```json
{
  "email": "ejemplo@gmail.com"
}
```
⚠️ **IMPORTANTE:** 
No olvidar reemplazar el correo por el que quiera recibir el reporte.

---

## 📁 Estructura del proyecto

```
📦src
 ┣ 📂dataFormats
 ┃ ┣ 📜excel.dataformat.ts
 ┃ ┣ 📜csv.dataformat.ts
 ┃ ┗ 📜dataformat.interface.ts
 ┣ 📂requestFormats
 ┃ ┣ 📜json.requestformat.ts
 ┃ ┗ 📜requestformat.interface.ts
 ┣ 📂services
 ┃ ┣ 📜email.service.ts
 ┃ ┣ 📜notification.service.ts
 ┃ ┣ 📜product.service.ts
 ┃ ┣ 📜reporte.service.ts
 ┃ ┗ 📜stock.service.ts
 ┗ 📜index.ts
```
---
## 🧠 Principios SOLID aplicados

### ✅ **S - Single Responsibility Principle**
Cada clase tiene una responsabilidad clara: cargar datos, enviar correos, guardar productos, etc.

### ✅ **O - Open/Closed Principle**
Las funciones `storeData()` y `storeRequest()` no necesitan modificarse al agregar nuevos formatos. Solo se crean nuevas clases que implementen `IDataFormat` o `IRequestFormat`.

### ✅ **L - Liskov Substitution Principle**
Cualquier clase que implemente `IDataFormat` puede ser pasada a `storeData()` sin romper el sistema.

### ✅ **I - Interface Segregation Principle**
Se separaron las interfaces `IDataFormat` e `IFileDataFormat` para no forzar a clases a implementar métodos innecesarios.

### ✅ **D - Dependency Inversion Principle**
Las funciones dependen de abstracciones (`IDataFormat`, `IRequestFormat`), no de implementaciones concretas.

---

## 🎯 Patrón de diseño: Strategy

Se usó el patrón **Strategy** para manejar la lógica de extracción de datos según el tipo de archivo. Todas las clases (`ExcelDataFormat`, `CSVDataFormat`, `JSONRequestFormat`) implementan el método `extract()` definido en una interfaz común.

Esto permite que `storeData()` trabaje de forma desacoplada y extensible, sin tener que preocuparse por el tipo de archivo recibido.

---

## 🧱 Patrón de arquitectura: Event-Driven + RESTful API

- **RESTful API:** estructura clara, con endpoints bien definidos, ideal para interacción desde distintos clientes.
- **Event-Driven:** acciones como "enviar notificaición" se realiza mediante eventos, lo que permite una comunicación bien definida entre diferentes partes del sistema.

---

 ## ✨ Autora
Sandra Sofía Rita Leonardelli
Estudiante de la Tecnicatura en Análisis de Sistemas – Escuela Da Vinci
[✉️ sandra.leonardelli@davinci.edu.ar](mailto:sandra.leonardelli@davinci.edu.ar)
