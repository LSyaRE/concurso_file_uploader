import Elysia, { t } from "elysia";
import { upload } from "./cloudinary";

export const file_uploader = new Elysia().post("/upload", upload, {
		body: t.Object({
			file: t.File({ format: 'image/*' }),
		})
	});