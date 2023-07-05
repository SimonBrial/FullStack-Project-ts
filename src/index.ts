import "dotenv/config";
import cors from "cors";
import app from "./app";
//import { router } from "./routes/index";
import { connectDB } from "./config/mongo";

const PORT = process.env.PORT || 3001;

// Si no se coloca nada en los cors, se inidica que se puede consumir desde cualquier punto.
app.use(cors());
//app.use(app.json());
// Rutas de la App
//app.use(router);
//dbConnect().then(() => console.log("conexion ready!!!"));
connectDB();
app.listen(PORT, () => {
    console.log("The app is running on the PORT: " + PORT);
});
