import { v2 as cloudinary } from 'cloudinary';
import { logger } from '../config/logger';
import { enviroments } from '../config/enviroments';
import { FileUploadingModel } from './models/file-uploading.model';
import { flowsFactory } from './factories/flows.factory';



cloudinary.config({
  cloud_name: enviroments.CLOUDINARY_CLOUD_NAME,
  api_key: enviroments.CLOUDINARY_API_KEY,
  api_secret: enviroments.CLOUDINARY_API_SECRET,
  sign_url: true,
});

export async function upload({ body }: { body: FileUploadingModel }) {
  logger.info('Se trae el archivo del formdata:', body);
  const { file, type } = body;

  logger.info(type);

  logger.info('Verificando el archivo recibido:', file);
  if (!body.file.name) {
    logger.error('No se recibió ningún archivo en la solicitud');
    return new Response('No se recibió ningún archivo', { status: 400 });
  }

  logger.info('Archivo recibido:', file.name);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  logger.info('Buffer creado con el archivo recibido');
  const base64Str = buffer.toString('base64');
  const dataUri = `data:audio/mpeg;base64,${base64Str}`;

  logger.info('Iniciando la subida a Cloudinary');
  const uploadResult = await cloudinary.uploader.upload(dataUri, flowsFactory(type));
  logger.info('Archivo enviado al stream de Cloudinary');


  return uploadResult;
};