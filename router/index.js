const {Router}  = require("express");
const utility = require("../utils/utils");

const app = Router();
var data = [
  {
    id: 2,
    type: "sell",
    user_id: 43,
    symbol: "ABX",
    shares: 30,
    price: 134,
  },
  {
    id: 1,
    type: "buy",
    user_id: 43,
    symbol: "ABX",
    shares: 30,
    price: 134,
  },
  {
    id: 3,
    type: "buy",
    user_id: 23,
    symbol: "ABX",
    shares: 30,
    price: 134,
  },
  {
    id: 4,
    type: "sell",
    user_id: 23,
    symbol: "ABX",
    shares: 30,
    price: 134,
  },
];
//creates duplicate rows with same ID
app.post("/", (req, res) => {
  try {
    const payload = utility.handleKeysCase(req.body);
    if (payload.shares > 0 && payload.shares < 100) {
      if (payload.type == "buy" || payload.type == "sell") {
        data.push(payload);
        res.send(`Trades Created ${payload.id}`).status(201);
      } else {
        res.send().status(400);
      }
    } else {
      res.send().status(400);
    }
  } catch (error) {
    console.log(error);
    res.send().status(500);
  }
});

app.get("/", (req, res) => {
  try {
    const { type, user_id } = req.query;
    var filterData = data;
    if (type) {
      filterData = utility.filterRecords(filterData, 'type', type);
    }
    if (user_id) {
      filterData = utility.filterRecords(filterData, 'user_id',parseInt(user_id));
    }
    res.send(filterData.sort((a, b) => (a.id > b.id ? 1 : -1))).status(200);
  } catch (error) {
    console.log(error);
    res.send().status(500);
  }
});

app.get("/:id", (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    var filterData = data;
    filterData = utility.filterRecords(filterData,'id',parseInt(id));
    if (!filterData.length) res.send("Not Found Data").status(404);
    else res.send(filterData).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete("/:id", function (req, res) {
  try {
    if (!data.find((el) => el.id == req.params.id)) {
      res.send("No Data Found for deletion").status(404);
    } else {
      utility.removeByAttr(data, "id", parseInt(req.params.id));
      res.send().status(405);
    }
  } catch (error) {
    res.send(error).status(500);
  }
});

app.put("/:id", function (req, res) {
  try {
    const payload = utility.handleKeysCase(req.body);
    const id = req.params.id;
    var object = payload;
    if (!req.body.id) object.id = id;
    objIndex = data.findIndex((obj) => obj.id == id);
    data[objIndex] = object;
    res.send({ "After Update": data }).status(405);
  } catch (err) {
    res.send(err).status(500);
  }
});

app.patch("/:id", function (req, res) {
  try {
    const id = req.params.id;
    const payload = utility.handleKeysCase(req.body);
    objIndex = data.findIndex((obj) => obj.id == id);
    Object.keys(payload).forEach(function (key) {
      data[objIndex][key] = payload[key];
    });
    res.send({ "after update": data }).status(405);
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = app;
