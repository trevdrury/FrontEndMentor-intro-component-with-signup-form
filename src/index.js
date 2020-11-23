import './styles.scss';
import html from './index.html';

class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
      });
    })
  }

  validateFields(field) {

    // No empty fields
    if (field.value.trim() === '') {
      this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error");
    } else {
      this.setStatus(field, null, "success");
    }

    // Email validation
    if (field.type === "email") {
      let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

      if (isValidEmail) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Please enter a valid email address", "error");
      }
    }

    // Password check
    if (field.type === "password") {
      const passwordField = this.form.querySelector('#password');

      if (passwordField.value.length < 8) {
        this.setStatus(field, "Password must be at least 8 characters", "error");
      } else {
        console.log('password check');
        this.setStatus(field, null, "success");
      }
    }

  }

  setStatus(field, message, status) {
    const errorIcon = field.parentElement.querySelector('.icon-error');
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (status === "success") {
      if (errorIcon) { 
        errorIcon.classList.add('hidden');
        field.classList.remove('input-error'); 
      }
      if (errorMessage) { errorMessage.innerText = "" }
    }

    if (status === "error") {
      field.parentElement.querySelector('.error-message').innerText = message;
      field.classList.add('input-error');
      errorMessage.classList.remove('hidden');
      errorIcon.classList.remove('hidden');
    }
  }
}

const form = document.querySelector('.form');
const fields = ["first-name", "last-name", "email-address", "password"];

const validator = new FormValidator(form, fields);
validator.initialize();