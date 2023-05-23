// Retrieve the job reference number from Local Storage
var refNum = localStorage.getItem("refNum");

// Set the value of the job reference number field
var refNumField = document.getElementById("refnum");
refNumField.value = refNum;

function validateForm() {
  var dob = document.getElementById("dob").value;

  // Calculate the age based on the date of birth
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  // Validate age (must be between 15 and 80)
  if (age < 15 || age > 80) {
    document.getElementById("dob-error").textContent =
      "*Applicants must be at between 15 and 80 years old";
    return false;
  } else {
    document.getElementById("dob-error").textContent = " ";
  }

  //state validation
  var state = document.getElementById("state").value;
  var postcode = document.getElementById("postcode").value;

  // Get the first digit of the postcode
  var firstDigit = parseInt(postcode.charAt(0));

  // Validate that the selected state matches the first digit of the postcode
  if (
    (state === "VIC" && !(firstDigit === 3 || firstDigit === 8)) ||
    (state === "NSW" && !(firstDigit === 1 || firstDigit === 2)) ||
    (state === "QLD" && !(firstDigit === 4 || firstDigit === 9)) ||
    (state === "NT" && firstDigit !== 0) ||
    (state === "WA" && firstDigit !== 6) ||
    (state === "SA" && firstDigit !== 5) ||
    (state === "TAS" && firstDigit !== 7) ||
    (state === "ACT" && firstDigit !== 0)
  ) {
    document.getElementById("postcode-error").textContent =
      "*The selected state dose not match the first digit of the post code";
    return false;
  } else {
    document.getElementById("postcode-error").textContent = " ";
  }

  //skills validation
  var otherSkillsCheckbox = document.getElementById("Other_Skills");
  var otherSkillsTextarea = document.getElementsByName("other_skills")[0];

  // Check if the "Other skills..." checkbox is selected
  if (otherSkillsCheckbox.checked && otherSkillsTextarea.value.trim() === "") {
    document.getElementById("otherSkills-error").textContent =
      "*Please specify your other skills.";
    return false;
  } else {
    document.getElementById("otherSkills-error").textContent = "";
  }

  return true;
}

// JavaScript code to store and retrieve applicant details using Session Storage
var form = document.getElementById("application-form");

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission
  var formData = new FormData(form); // Get form data

  // Store form data in Session Storage
  for (var pair of formData.entries()) {
    sessionStorage.setItem(pair[0], pair[1]);
  }

  // Redirect the user to another page or perform other actions
});

// Retrieve and populate form fields with stored data when the apply.html page is loaded
window.addEventListener("load", function () {
  var formFields = document.querySelectorAll("input, textarea, select");

  // Loop through form fields and retrieve stored data from Session Storage
  formFields.forEach(function (field) {
    var storedValue = sessionStorage.getItem(field.name);

    // Populate form field with stored value
    if (storedValue) {
      field.value = storedValue;
    }
  });
});
