import { TypeFlowEnum } from "../enums/type-flow.enum"
import { CloudinaryFlowsModel } from "../models/cloudinary-flows.model";
import { randomUUID } from 'crypto';

export function flowsFactory(type: TypeFlowEnum): CloudinaryFlowsModel {
    switch (type) {
        case TypeFlowEnum.IMAGE:
            return {
                folder: 'images',
                resource_type: 'image',
                public_id: randomUUID()
            };
        case TypeFlowEnum.AUDIO:
            return {
                folder: 'audios',
                resource_type: 'video',
                public_id: randomUUID()
            };
        case TypeFlowEnum.VIDEO:
            return {
                folder: 'videos',
                resource_type: 'video',
                public_id: randomUUID()
            };
        case TypeFlowEnum.DOCUMENT:
            return {
                folder: 'documents',
                resource_type: 'raw',
                public_id: randomUUID()
            };
        default:
            throw new Error('Tipo de flujo no soportado');
    }
}