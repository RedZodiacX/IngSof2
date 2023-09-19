import { Router } from "express";
import applyFiltersHandler from "./applyFiltersHandler.mjs";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.send("ok imagen get");
});

router.post("/", upload.array("files"), (req, res) => {
    const files = req.files;
    const filters = req.body.filters;

    console.log("Filters:", filters);

    files.forEach((file, index) => {
        console.log(`File ${index + 1}:`);
        console.log("Fieldname:", file.fieldname);
        console.log("Originalname:", file.originalname);
        console.log("Mimetype:", file.mimetype);
    });

    res.send("Archivos recibidos y procesados correctamente.");
});

export const test = () => {};

export default router;
