# Car Trips - Prueba Técnica

## Tecnologías usadas

- Python 3.12 / Django 4.x
- React 18.2 / TypeScript 5.9
- Node 20.19 / Vite 7.2
- MySQL 8
- Docker 24 / Docker Compose 3.8


## Estructura 

car-trips/
│
├─ backend/ # Código del backend Django
├─ frontend/ # Código del frontend React
├─ infra/ # Archivos de infraestructura y Dockerfiles para construir contenedores
├─ docker-compose.yml # Definiciones para levantar contenedores
├─ .env.example # Variables de entorno 
└─ README.md # Instrucciones de uso, instalación, levantamiento con Docker y estructura del proyecto

## Prerrequisitos

-Tener Docker y Docker Compose instalados.
Que los siguientes puertos estén libres (por defecto, pueden cambiarse en .env o docker-compose.yml):
8000 → Backend Django
3000 → Frontend React
3306 → Base de datos MySQL
Si algún puerto está en uso, puedes modificarlo en .env antes de levantar los contenedores.

## INSTALACIÓN 

## 1. Clonar el repositorio

```bash
git clone git@github.com:julianescobar/car-trips.git
cd car-trips
```

## 2. Configurar variables de entorno

### Variables de entorno principales
```bash
cp .env.example .env
```
# Hacer lo mismo en la carpeta frontend
```bash
cd frontend
cp .env.example .env
```

## 3. Descargar Archivo backup de base de datos
- Copiar el archivo `backup.sql` y pegarlo en la carpeta `infra/` del proyecto.  
- Esto permite inicializar la base de datos con datos de prueba al levantar los contenedores.

```bash
# Ejemplo de mover el archivo al directorio infra
cp /ruta/del/backup/backup.sql ./infra/
```

## 4. Levantar la aplicación con Docker

```bash
docker-compose up -d --build
```
-Backend Django: http://localhost:8000
-Frontend React: http://localhost:3000
-Base de datos MySQL: puerto 3306
