import express from "express";
import routes from "./routes";
import rateLimit from "express-rate-limit";
const compression = require('compression')
const cors = require("cors");

const port = 3000;
const app = express();
app.use(cors());

app.use(compression({
  level: 6,
  threshold: 100*1000, //its in bytes
  // filter: (req,res)=>{
  //   if(req.header['x-no-compression']){
  //     return false
  //   }
  //   return compression.filter(req,res)
  // }
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use(limiter);
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});