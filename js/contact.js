// ===========================
// Contact Form Handler
// ===========================

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        insuranceType: document.getElementById('insuranceType').value,
        contactMethod: document.querySelector('input[name="contactMethod"]:checked').value,
        terms: document.getElementById('terms').checked
    };
    
    // Validate form
    const errors = validateContactForm(formData);
    
    if (errors.length > 0) {
        // Display errors
        errors.forEach(error => {
            displayError(error.field, error.message);
        });
        return;
    }
    
    // Form is valid - submit
    submitContactForm(formData);
}

// ===========================
// Form Validation
// ===========================

function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name) {
        errors.push({ field: 'name', message: 'Please enter your full name' });
    } else if (data.name.length < 3) {
        errors.push({ field: 'name', message: 'Name must be at least 3 characters' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
        errors.push({ field: 'email', message: 'Please enter your email address' });
    } else if (!emailRegex.test(data.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!data.phone) {
        errors.push({ field: 'phone', message: 'Please enter your 10-digit phone number' });
    } else if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        errors.push({ field: 'phone', message: 'Please enter a valid 10-digit phone number' });
    }
    
    // Subject validation
    if (!data.subject) {
        errors.push({ field: 'subject', message: 'Please select a subject' });
    }
    
    // Message validation
    if (!data.message) {
        errors.push({ field: 'message', message: 'Please enter your message' });
    } else if (data.message.length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    }
    
    // Terms validation
    if (!data.terms) {
        errors.push({ field: 'terms', message: 'Please accept the terms and conditions' });
    }
    
    return errors;
}

// ===========================
// Error Display
// ===========================

function displayError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = '#dc2626';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// ===========================
// Form Submission
// ===========================

function submitContactForm(formData) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend API call)
    setTimeout(() => {
        // In production, send to backend API
        console.log('Form Data Submitted:', formData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            const successMsg = document.getElementById('successMessage');
            if (successMsg) {
                successMsg.style.display = 'none';
            }
        }, 5000);
        
    }, 1500);
}

// ===========================
// Success Message Display
// ===========================

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ===========================
// FAQ Accordion
// ===========================

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===========================
// Phone Number Format
// ===========================

document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// ===========================
// Smooth Scroll to Form
// ===========================

function scrollToContactForm() {
    const formSection = document.querySelector('.contact-form-section');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
}