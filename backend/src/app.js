const express = require('express');
const auth = require("../routes/auth")
const list = require("../routes/list")
const cors = require('cors');
const app = express();
require("../conn/conn");
app.use(cors());
app.use(express.json());
app.use("/api/v1",auth);
app.use("/api/v2",list);
app.listen(1080, () => console.log('server is running'));
