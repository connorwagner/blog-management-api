import express from "express";

import { configureEndpoints } from "./endpoint/configure-endpoints";

const app = express();

configureEndpoints(app);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
