# Imagen base con Bun preinstalado
FROM oven/bun:1.1.13 as build

# Directorio de trabajo
WORKDIR /app

# Copiar solo archivos necesarios para instalar deps
COPY bun.lock /app/
COPY package.json /app/

# Instalar dependencias de producción
RUN bun install --production

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto si es necesario (opcional si usas TS)
# RUN bun run build

# Exponer puerto (Railway detecta este por defecto)
EXPOSE 3000

# Comando de inicio
CMD ["bun", "src/index.ts"]
