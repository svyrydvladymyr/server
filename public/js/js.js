//get element
const $_ = (value, parent = document) => parent.querySelectorAll(value);

//redirect page
const redirect = way => window.location.replace(`${way}`);

//for send AJAX  
const send = (obj, url, fun) => {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            fun(this.responseText);
        }};
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(obj));     
};  

//logout
const exit = () => { send({}, '/exit', (res) => { }) };

