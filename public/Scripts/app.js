//IIFE
(function () {
  function Start() {
    console.log("App Started...");
    $("#myCarousel").carousel({
      interval: 2000,
    });

    let deleteButtons = document.querySelectorAll(".btn-danger");

    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you Sure?")) {
          event.preventDefault();
          window.location.assign("/contact-list");
        }
      });
    }
  }

  window.addEventListener("load", Start);
})();
