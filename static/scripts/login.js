var input = document.getElementById("password");
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    document.getElementById("quickstart-sign-in").click();
  }
});