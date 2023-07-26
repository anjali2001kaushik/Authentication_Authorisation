// const express = require("express");
// const dotenv = require("dotenv").config();
// const bodyParser = require("body-parser");
// const mongodb = require("./database/mongoDB");
// const cors = require("cors");
// const serverLogger = require("./utils/logger/serverLogger");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// const usersRoutes = require("./routes/usersRoute");
// const rolesRoutes = require("./routes/rolesRoute");
// const permissionsRoutes = require("./routes/permisssionsRoute");
// app.use(express.static("public"));

// app.use(cors());
// // import routes

// app.use("/users", usersRoutes);
// app.use("/roles", rolesRoutes);
// app.use("/permissions", permissionsRoutes);
// app.use((req, res) => {
//   res.status(404).json({ message: "Page Not Found" });
// });

// const PORT = process.env.PORT;
// app.listen(PORT, (err) => {
//   if (!err) {
//     serverLogger.appLogger.debug(`Server is running on port ${PORT}`);
//     console.log(`Server is running on port ${PORT}`);
//   }
// });

const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongodb = require("./database/mongoDB");
const cors = require("cors");
const serverLogger = require("./utils/logger/serverLogger");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./routes/usersRoute");
const rolesRoutes = require("./routes/rolesRoute");
const permissionsRoutes = require("./routes/permisssionsRoute");

app.use(express.static("./frontend/public"));

app.use(cors());

app.use("/users", usersRoutes);
app.use("/roles", rolesRoutes);
app.use("/permissions", permissionsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (!err) {
    serverLogger.appLogger.debug(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
  }
});
