const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            successMessage.classList.add('show');
            form.reset();
            
            nameInput.classList.remove('success');
            emailInput.classList.remove('success');
            phoneInput.classList.remove('success');
            messageInput.classList.remove('success');
            
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }
    });

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    messageInput.addEventListener('blur', validateMessage);

    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (nameValue.length < 2) {
            nameInput.classList.add('error');
            nameInput.classList.remove('success');
            nameError.classList.add('show');
            return false;
        } else {
            nameInput.classList.remove('error');
            nameInput.classList.add('success');
            nameError.classList.remove('show');
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailValue)) {
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
            emailError.classList.add('show');
            return false;
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
            emailError.classList.remove('show');
            return true;
        }
    }

    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^\d{10}$/;
        
        if (!phoneRegex.test(phoneValue.replace(/[\s-]/g, ''))) {
            phoneInput.classList.add('error');
            phoneInput.classList.remove('success');
            phoneError.classList.add('show');
            return false;
        } else {
            phoneInput.classList.remove('error');
            phoneInput.classList.add('success');
            phoneError.classList.remove('show');
            return true;
        }
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (messageValue.length < 10) {
            messageInput.classList.add('error');
            messageInput.classList.remove('success');
            messageError.classList.add('show');
            return false;
        } else {
            messageInput.classList.remove('error');
            messageInput.classList.add('success');
            messageError.classList.remove('show');
            return true;
        }
    }
