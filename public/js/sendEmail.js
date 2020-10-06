const url = 'https://us-central1-genco-d92d2.cloudfunctions.net/helloWorld?contactUs=true';
const tipoUsuario = "";

document.getElementById('btnsignUp').onclick = function (){
    sendEmail()
}

document.getElementById('btnOk').onclick = function () {
    thanksBoxChange()
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

// thanksBox
function changeBox(){
    document.getElementById('form-box').style.visibility = "hidden";
    document.getElementById('thanksBox').style.visibility = "initial";
}

function thanksBoxChange(){
    document.getElementById('form-box').style.visibility = "initial";
    document.getElementById('thanksBox').style.visibility = "hidden";
}

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");


// fetch("https://us-central1-genco-d92d2.cloudfunctions.net/helloWorld?contactUs=true", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));



// POST 'https://us-central1-genco-d92d2.cloudfunctions.net/helloWorld' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "userType" : "professional",
//     "mail" : "probando@hotmail.com",
//     "name" : "pepito",
//     "profession": "carpintero"
// }'







