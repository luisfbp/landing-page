const url = 'https://us-central1-genco-d92d2.cloudfunctions.net/helloWorld?contactUs=true';
const tipoUsuario = "";

document.getElementById('btnsignUp').onclick = function (){
    sendEmail();
    changeBox();
}

document.getElementById('btnOk').onclick = function () {
    thanksBoxChange();
}

function sendEmail(){
    
    let formData = { 
        userType : document.getElementById("userType") ? document.getElementById("userType").value : null,
        mail : document.getElementById("mail") ? document.getElementById("mail").value : null,
        name : document.getElementById("name") ? document.getElementById("name").value : null,
        profession : document.getElementById("profession") ? document.getElementById("profession").value : null,
        message : document.getElementById("message") ? document.getElementById("message").value : null
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(formData),
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
