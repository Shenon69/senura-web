// Retrieve all Apply links
var applyLinks = document.querySelectorAll(".apply-link");

// Attach event listeners to Apply links
applyLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    var refNum = link.dataset.refnum; // Get the job reference number from data attribute
    localStorage.setItem("refNum", refNum); // Store the job reference number in Local Storage
    window.location.href = link.href; // Redirect the user to the apply.html page
  });
});
