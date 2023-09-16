import Express from "express";
import bodyParser from "body-parser";
import { starConnection } from "./src/mongoo/index.mjs";
import FilterRouter from "./src/handlers/filters/index.mjs"
import Boom from "@hapi/boom";

const app = Express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("ok");
})

app.use("/images", FilterRouter);

app.use((error, _req, res, next) => {
    if (error) {
        let err = Boom.isBoom(error) ? error: Boom.internal(error);
        const starCode = err.output.statusCode;
        const payload = err.output.payload;
        return res.status(statusCode).json(payload);
    }
    return next;
});

const PORT = 3000;

const starServer = async () => {
    await starConnection();
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    });
};

starServer();