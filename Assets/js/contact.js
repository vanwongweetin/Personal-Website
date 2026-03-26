function sendEmail(){
    Email.send({
        Host : "smtp.gmail.com",
        Username : "wtvwong002@mymail.sim.edu.sg",
        Password : "password",
        To : 'wtvwong002@mymail.sim.edu.sg',
        From : document.getElementById("email").value,
        Subject : "New contact form enquiry",
        Body : "Name" + document.getElementById("name").value +
               "<br> Email: " + document.getElementById("email").value +
               "<br> Message: " + document.getElementById("message").value
    }).then(
      message => alert("Message sent succesfully!")
    );
}