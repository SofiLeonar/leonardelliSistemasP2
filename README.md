# 💻 MarketingSystem

Sistema con **Node.js**, **TypeScript**, **Express** y **Sequelize** para gestionar usuarios, clientes, productos, sucursales, ventas y stock.

---

## 📝 ¿Qué hace este proyecto?

- 👥 Administra usuarios, clientes y sucursales  
- 📦 Controla productos y su stock  
- 🛒 Registra ventas y detalles  
- 🚫 Maneja la base MySQL sin SQL manual gracias a Sequelize  

---

## 🎯 Requisitos

- Node.js (v16+)  
- MySQL  
- npm  

---

## ⚡ Instalación y puesta en marcha

1. Cloná el repo:

    ```
    git clone https://github.com/SofiLeonar/leonardelliSistemasP2.git
    cd leonardelliSistemasP2
    ```

2. Instalá dependencias:

    ```
    npm install
    ```

3. Configurá la base de datos:
Entrá a tu consola de MySQL o cliente (como DBeaver, phpMyAdmin o Workbench) y ejecutá:

    ```
    CREATE DATABASE IF NOT EXISTS marketingsystem;
    ```

4. Configure la conexión a la base de datos:
Creá un archivo .env en la raíz del proyecto con la siguiente información (configuración por defecto si usás XAMPP o phpMyAdmin):

    ```
    DB_NAME=marketingsystem
    DB_USER=root
    DB_PASS=
    DB_HOST=localhost
    PORT=3000

    ```



> ⚠️ **IMPORTANTE:**  
> Si ya tenés MySQL configurado con otro usuario, contraseña o puerto, reemplazá los valores anteriores por los tuyos reales.  
> Por ejemplo, si tu usuario no es `root`, o si usás una contraseña, actualizá los campos `DB_USER` y `DB_PASS` según tu configuración local.

5. Levantá el servidor:

    ```
    npm run start
    ```

---

## 📡 Endpoints principales

| Método | Ruta        | Descripción               |
|--------|-------------|---------------------------|
| POST   | `/parser/parse_excel` | Parsea archivo de Excel |
| POST   | `/parser/parse_csv` | Parsea archivo de CSV |

---

## 🛠 Comandos útiles

| Comando         | Descripción                  |
|-----------------|------------------------------|
| `npm run dev`   | Iniciar servidor en modo dev |

---

 
