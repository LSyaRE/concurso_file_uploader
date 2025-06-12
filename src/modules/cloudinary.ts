import { Readable } from 'stream';
import {v2 as cloudinary } from 'cloudinary';
import { logger } from '../config/logger';
import { enviroments } from '../config/enviroments';

cloudinary.config({ 
  cloud_name: enviroments.CLOUDINARY_CLOUD_NAME, 
  api_key: enviroments.CLOUDINARY_API_KEY, 
  api_secret: enviroments.CLOUDINARY_API_SECRET
});

export const  upload = async ({body}: {body:{file: File}}) => {
    logger.info('Se trae el archivo del formdata:', body);
    const file = body.file;

    logger.info('Verificando el archivo recibido:', file);
    if (!body.file.name) {
      logger.error('No se recibió ningún archivo en la solicitud');
      return new Response('No se recibió ningún archivo', { status: 400 });
    }

    logger.info('Archivo recibido:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    logger.info('Buffer creado con el archivo recibido');
    // Convertir el buffer en un stream para Cloudinary
    const stream = Readable.from(buffer);

    logger.info('Iniciando la subida a Cloudinary');
    // Promisificar la subida para esperarla correctamente
    const uploadResult = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'sonidos' ,            
          resource_type: 'video',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

     logger.info('Subiendo el archivo al stream de Cloudinary');
      stream.pipe(cloudinaryStream);
      logger.info('Archivo enviado al stream de Cloudinary');
    });

    return uploadResult;
  };