import Elysia, { t } from "elysia";
import { upload } from "../cloudinary";
import { TypeFlowEnum } from "../enums/type-flow.enum";

export const file_uploader = new Elysia()
	.post("/upload", upload, {
		body: t.Object({
			file: t.File({
				format: [
					'image/jpeg',
					'image/png',
					'image/webp',
					'audio/mpeg',
					'audio/wav',
					'audio/ogg',
				],
				error: t.String({
					description: "El archivo debe ser una imagen o un audio",
					example: "jpeg, png, webp, mp3, wav, ogg",
				})
			}),
			type: t.Enum(TypeFlowEnum)
		})
	})
	.post("test", (data: unknown) => data);