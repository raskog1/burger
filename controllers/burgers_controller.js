const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

// GET Method in Express API call
router.get("/", (req, res) => {
  burger.show((data) => {
    const allBurgers = {
      burgers: data,
    };
    res.render("index", allBurgers);
  });
});

// POST Method in Express API call
router.post("/api/burgers", (req, res) => {
  burger.create(
    ["burger_name", "burger_deets"],
    ["'" + req.body.name + "'", "'" + req.body.details + "'"],
    (data) => {
      res.json(data);
    }
  );
});

// PUT Method in Express API call
router.put("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burger.update(condition, { devoured: req.body.devoured }, (data) => {
    if (data.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// DELETE Method in Express API call
router.delete("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burger.delete(condition, (data) => {
    if (data.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
