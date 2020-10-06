const url = 'https://us-central1-genco-d92d2.cloudfunctions.net/helloWorld?contactUs=true';
const tipoUsuario = "";

document.getElementById('btnsignUp').onclick = function (){
    sendEmail()
}

function sendEmail(){
    
    let formData = { 
        userType : document.getElementById("userType").value,
        mail : document.getElementById("mail").value,
        name : document.getElementById("name").value,
        profession : document.getElementById("professional").value,
        message : document.getElementById("message").value
    }

    var raw = JSON.stringify({
        "userType": formData.userType,
        "mail": formData.mail,
        "name": formData.name,
        "profession": formData.professional,
        "message": formData.message
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://genco.com.co/landing-function", requestOptions)
      .then(response => response.text())
       .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function changeBox(){
    document.getElementById('form-box').style.visibility = "hidden";

}
