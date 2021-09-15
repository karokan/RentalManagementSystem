const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const Agreement = require("../backend/models/agreement");
const Obligation = require("../backend/models/obligation");
const Owner = require("../backend/models/owner");

const tenantRoutes = require("./routes/tenant");
const authRoutes = require("./routes/auth");
const notificationsRoutes = require("./routes/notifications");
const usersRoute = require("./routes/user");
const ownersRoute = require("./routes/owner");
const propertyRoute = require("./routes/property");
const agreementsRoute = require("./routes/agreements");
const conversationsRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const metersRoute = require("./routes/meters");
const moment = require("moment");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Karol:OTqTb91mAx6LeQVC@cluster0.vgidh.mongodb.net/rental_management_system?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connecetd to database!");
  })
  .catch(() => {
    console.log("Connection failed");
  });
//Once a month
// cron.schedule("0 0 1 * *", () => {
//   console.log("cron works");
// });

// cron.schedule("0 10 1 * *", () => {
//   Agreement.find()
//     .populate([
//       {
//         path: "owner",
//         model: "Owner",
//       },
//       {
//         path: "tenant",
//         model: "User",
//       },
//     ])
//     .then((agreement) => {
//       for (let a of agreement) {
//         console.log("Loop works");
//         console.log(a);
//       }
//     });
// });

//GENEROWANIE RAZ W MIESIĄCU RACHUNKÓW
// cron.schedule("0 2 1 * *", () => {

cron.schedule("0 2 1 * *", () => {
  Agreement.find()
    .populate({
      path: "owner",
      model: "Owner",
    })
    .then((agreement) => {
      for (let a of agreement) {
        const obligation = new Obligation({
          tenant: a.tenant,
          owner: a.owner._id,
          agreement: a._id,
          amount: a.media + a.rent,
        });
        obligation.save();
      }
    });
});

//SPRAWDZANIE RAZ NA MIESIĄC

cron.schedule("0 1 1 * *", () => {
  Agreement.find()
    .populate({
      path: "owner",
      model: "Owner",
    })
    .then((agreement) => {
      for (let a of agreement) {
        let endTime = moment(a.dateEnd);
        let now = moment();
        // console.log(endTime);
        // console.log(now);
        // console.log(a._id);
        if (now > endTime) {
          Agreement.deleteOne({ _id: a._id }).then((result) => {});
          Owner.findById(a.owner._id).then((owner) => {
            // console.log(owner);
            filtered = owner.agreements.filter(
              (agreement) => agreement.toString() !== a._id.toString()
            );
            console.log(filtered);
            owner.agreements = filtered;
            owner.save();
          });
          console.log("date is past");
        } else {
          console.log("Date is future");
        }
      }
    });
});

//Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

//Body Parser Middleware
//app.use(bodyParser.json()); // Marks as deprecated - solution line (21) below
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use("/regiter", (req, res, next) => {
  res.send("REGISTER");
});

app.use("/tenant", tenantRoutes);

app.use("/api/auth", authRoutes);

// ŚCIEŻKA DO POBIERANIA/WYSYŁANIA ZGŁOSZEŃ
app.use("/api/notifications", notificationsRoutes);

// ŚCIEŻKA DO OPERCJI NA UŻYTKOWNIKACH
app.use("/api/user", usersRoute);

// ŚCIEŻKA DO OPERACJI NA WŁAŚCICIELACH
app.use("/api/owner", ownersRoute);

// ŚCIEŻKA DO NIERUCHOMOŚCI //
app.use("/api/properties", propertyRoute);

// ŚCIEŻKA DO UMÓW // // // //
app.use("/api/agreements", agreementsRoute);

// ŚCIEŻKI DO KOMUNIKATORA ONLINE
app.use("/api/conversations", conversationsRoute);

app.use("/api/messages", messagesRoute);

// ŚCIEŻKA DO LICZNIKÓW
app.use("/api/meters", metersRoute);

// app.get("/api/notifications", (req, res, next) => {
//   const notifications = [
//     { id: "dasdasd", title: "Tytuł zgłoszenia", content: "Opis zgłoszenia" },
//   ];
//   res.status(200).json({
//     message: "Notification fetched sucess",
//     notifications: notifications,
//   });
// });

// app.post("/api/notifications", (req, res, next) => {
//   const notifications = req.body;
//   console.log(notifications);
//   res.status(201).json({
//     message: "Notification Added succesfully",
//   });
// });

module.exports = app;
