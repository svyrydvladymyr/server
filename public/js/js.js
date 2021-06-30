//get element
const $_ = (value, parent = document) => parent.querySelectorAll(value);
//redirect page
const redirect = way => window.location.replace(`${way}`);
