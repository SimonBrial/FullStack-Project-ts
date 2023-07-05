import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const clearFileName = (filename: string) => {
    const file = filename.split(".").shift();
    return file;
};

readdirSync(PATH_ROUTER).filter((filename) => {
    const cleanName = clearFileName(filename);
    if (cleanName !== "index") {
        import(`./${cleanName}`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router);
        });
        // Para que funcione, se require hacer una importacion dinamica.
        // module.Router --> Objeto en el que se suministra la ruta (router)
    }
});

export { router };
