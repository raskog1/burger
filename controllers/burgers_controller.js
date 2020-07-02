const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
  burger.show((data) => {
    //console.log(data);

    const allBurgers = {
      burgers: data,
    };
    res.render("index", allBurgers);
  });
}); //How is this working?  We get all the burger data and assign to burgers?

router.post("/api/burgers", (req, res) => {
  burger.create("burger_name", req.body.name, (data) => {
    res.json(data);
  });
});

router.put("/api/burgers/:id", function (req, res) {
  const condition = "id = " + req.params.id;

  burger.update(condition, { devoured: req.body.devoured }, function (data) {
    if (data.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//   router.put("/api/cats/:id", function (req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);

//     cat.update(
//       {
//         sleepy: req.body.sleepy,
//       },
//       condition,
//       function (result) {
//         if (result.changedRows == 0) {
//           // If no rows were changed, then the ID must not exist, so 404
//           return res.status(404).end();
//         } else {
//           res.status(200).end();
//         }
//       }
//     );
//   });

//   router.delete("/api/cats/:id", function (req, res) {});

module.exports = router;
