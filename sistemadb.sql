CREATE DATABASE IF NOT EXISTS marketingsystem;
USE marketingsystem;

CREATE TABLE usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    rol VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE sucursal(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    direccion VARCHAR(50)
);

CREATE TABLE cliente(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE producto(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    categoria VARCHAR(50),
    proveedor VARCHAR(50),
    precio_base INT
);

CREATE TABLE venta(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursal(id)
);

CREATE TABLE detalle_venta(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT,
    precio INT,
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE stock(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursal(id)
);


    