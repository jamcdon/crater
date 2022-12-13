class authenticator {
    constructor(emailValue, passwordValue){
        this.email = emailValue;
        this.password = passwordValue;
        this.authenticated = false;
    }
}

async function authenticate(){
    document.getElementById('error').innerHTML = "&nbsp;"
    userObject = new authenticator(document.getElementById('email').value, document.getElementById('password').value)
    if (userObject.email!= "" && userObject.password != ""){
        logInOrError(userObject)
    }
    else{
        document.getElementById('error').innerHTML = "Please enter email and password"
    }
}

async function logInOrError(self) {
    var apiStr = `{\n"email": "${self.email}","password": "${self.password}"\n}`
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                username = xhr.responseText
                document.location.href = '/account/'
            }
            else if (xhr.status === 401){
                document.getElementById('error').innerHTML = "Email or password incorrect"
            }
        }
    }
    xhr.open('POST', '/api/v1/user/authenticate')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(apiStr)

}