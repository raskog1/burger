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

  $(".devour").on("click", function (event) {
    event.preventDefault();

    const id = $(this).data("id");
    const devourStatus = {
      devoured: true,
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devourStatus,
    }).then(function () {
      location.reload();
    });
  });

  $(".regurgitate").on("click", function (event) {
    event.preventDefault();

    const id = $(this).data("id");
    const devourStatus = {
      devoured: false,
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devourStatus,
    }).then(function () {
      location.reload();
    });
  });
});
