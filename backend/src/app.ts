import express from "express";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";

const app = express();

app.use(express.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.listen(5000, () => {
  console.log("Server is up and running on port 5000");
});
