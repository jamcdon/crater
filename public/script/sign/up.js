function togglePassword() {
    let inputPass = document.getElementById('password');
    if (inputPass.type == "password"){
        inputPass.type = "text"
    }
    else {
        inputPass.type = "password"
    }
}

class validator {
    constructor(element, type){
        this.route = `/api/v1/user/${type}-exists/${element}`
        this.element = element

        this.response = "";
        this.taken = true;
        this.valid = false;
    }
}


async function createOrError(){

    if (document.getElementById('username').value != ""){
        usernameObject = new validator(document.getElementById('username').value, "user")
        await newGetValid(usernameObject)
    }
    else {
        usernameValidate = false;
    }
    if (document.getElementById('email').value != ""){
        emailObject = new validator(document.getElementById('email').value, "email");
        await newGetValid(emailObject)
    }
    else {
        emailValidate = false;
    }
    if (document.getElementById('password').value != ""){
        passwordValidate = true;
    }
    else {
        passwordValidate= false;
    }

    function sendOrUpdate(){
        if (emailObject.response == "" || usernameObject.response == ""){
            setTimeout(() => {
                sendOrUpdate()
            }, 350)
        }
        else {
            if (usernameObject.valid && emailObject.valid && passwordValidate){
                    document.getElementById('usernameValidation').innerHTML = "&nbsp;"
                    document.getElementById('emailValidation').innerHTML = "&nbsp;"
                    document.getElementById('passwordValidation').innerHTML = "&nbsp;"

                var apiStr = `{\n"username": "${document.getElementById('username').value}",\n"email": "${document.getElementById('email').value}",\n"password": "${document.getElementById('password').value}"\n}`
                sendUser(apiStr, '/api/v1/user/')
            }
            else{
                if (!usernameObject.valid){
                    if (usernameObject.taken){
                        document.getElementById('usernameValidation').innerHTML = "Username taken";
                    }
                    else {
                        document.getElementById('usernameValidation').innerHTML = "Username error";
                    }

                }
                if (!emailObject.valid){
                    if (!emailObject.valid){
                        document.getElementById('emailValidation').innerHTML = "Email taken"
                    }
                    else{
                        document.getElementById('emailValidation').innerHTML = "Email error"
                    }
                }
                if (!passwordValidate){
                    if (document.getElementById('password').value.length < 8){
                        document.getElementById('passwordValidation').innerHTML = "Password must be 8 or more characters";
                    }
                    else {
                        document.getElementById('passwordValidation').innerHTML = "Password error"
                    }
                }
            }
        }
    }
    sendOrUpdate()
}

function sendUser(jsonStr, route) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status == 200){
            document.location.href = `/account/${usernameObject.element}`
        }
    }
    xhr.open('POST', route)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(jsonStr)
}

async function newGetValid(self) {
        function loadResponse(isReady, xhrObj) {
            if (isReady){
                if(xhrObj.responseText == "notExists"){
                    self.response = xhrObj.responseText
                    self.taken = false;
                    self.valid = true;
                }
                else {
                    self.response = xhrObj.responseText
                    self.taken = true;
                    self.valid = false;
                }
            }
            else{
                setTimeout(() => {
                    loadResponse((xhrObj.readyState === 4 && xhr.status === 200), xhrObj)
                }, 350)
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            loadResponse((xhr.readyState === 4 && xhr.status === 200), xhr)
        };
        xhr.open('GET', self.route, true);
        xhr.send();
    }