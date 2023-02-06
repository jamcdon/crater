let resetStart = document.getElementById("reset-start");
let resetMiddle = document.getElementById("reset-middle");
let resetEnd = document.getElementById("reset-end");

let emailSubmissionVerification = document.getElementById("email-submission-verification");
let forgotEmail = document.getElementById("forgot-email");

function toggle(toggled, currentEle, nextEle){
    if (toggled){
        currentEle.classList.remove("visible")
        currentEle.classList.add("invisible");
        currentEle.style = ("height: 0;");

        if (nextEle != null) {
            nextEle.classList.remove("invisible")
            nextEle.classList.add("visible");
            nextEle.style = ("");
        }
    }
    else {
        if (nextEle != null){
            nextEle.classList.remove("visible")
            nextEle.classList.add("invisible");
            nextEle.style = ("height: 0;");
        }

        currentEle.classList.remove("invisible")
        currentEle.classList.add("visible");
        currentEle.style = ("");
    }
}

function toggleEmailCode(toggled){
    if (!toggled){
        emailSubmissionVerification.innerHTML = `Email sent to ${forgotEmail.value}.`;
    }
    else {
        emailSubmissionVerification.innerHTML = '';
    }
    toggle(toggled, resetMiddle, resetStart)
}

function toggleNewPassword(toggled){
    toggle(toggled, resetEnd, resetMiddle)
}