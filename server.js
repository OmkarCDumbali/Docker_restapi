const express = require("express");
const obsrvRoutes = require("./src/obsrv/routes");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/datasets", obsrvRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));