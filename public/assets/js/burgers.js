$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    const newBurger = {
      name: $("#burger-name").val().trim(),
      //devoured: false,
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("Added new burger");
      // Reload page to get updated burger list
      location.reload();
    });
  });
});
