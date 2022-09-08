
const form = document.querySelector('.register__form');

if(form) {
  form.onsubmit = function() {
    pass1 = document.querySelector('.register__input--password');
    pass2 = document.querySelector('.register__input--password2');

    if(pass1.value != pass2.value) {
      alert("Passwords do not match!");   // TODO
      return false;
    } 

    return true;
  }
}
