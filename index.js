// Cache DOM elements
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const closeLogin = document.getElementById("closeLogin");
const blurOverlay = document.getElementById("blurOverlay");
const signupForm1 = document.getElementById("signup-form-1");
const signupForm2 = document.getElementById("signup-form-2");
const openSignup1 = document.getElementById("openSignup1");
const showSignupForm1 = document.getElementById("showSignupForm1");
const closeSignup1 = document.getElementById("closeSignup1");
const nextToSignup2 = document.getElementById("nextToSignup2");
const closeSignup2 = document.getElementById("closeSignup2");
const backToLogin = document.getElementById("backToLogin");
const backToSignup1 = document.getElementById("backToSignup1");

// Utility function to toggle visibility
function toggleVisibility(element, show) {
    if (show) {
        element.classList.add("show");
    } else {
        element.classList.remove("show");
    }
}

// Show login form with blur effect
loginBtn?.addEventListener("click", () => {
    toggleVisibility(loginForm, true);
    blurOverlay.classList.add("active");
});

// Close login form
closeLogin.addEventListener("click", () => {
    toggleVisibility(loginForm, false);
    blurOverlay.classList.remove("active");
});

// Open Signup Form 1 from Login
openSignup1?.addEventListener("click", () => {
    toggleVisibility(loginForm, false);
    toggleVisibility(signupForm1, true);
});

// Show Signup Form 1 directly
showSignupForm1?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleVisibility(signupForm1, true);
});

// Close Signup Form 1
closeSignup1?.addEventListener("click", () => {
    toggleVisibility(signupForm1, false);
    blurOverlay.classList.remove("active");
});

// Move to Signup Form 2
nextToSignup2?.addEventListener("click", () => {
    toggleVisibility(signupForm1, false);
    toggleVisibility(signupForm2, true);
});

// Close Signup Form 2
closeSignup2?.addEventListener("click", () => {
    toggleVisibility(signupForm2, false);
    blurOverlay.classList.remove("active");
});

// Back to Login from Signup Form 1
backToLogin?.addEventListener("click", () => {
    toggleVisibility(signupForm1, false);
    toggleVisibility(loginForm, true);
});

// Back to Signup Form 1 from Signup Form 2
backToSignup1?.addEventListener("click", () => {
    toggleVisibility(signupForm2, false);
    toggleVisibility(signupForm1, true);
});
function togglePassword(inputId, icon) {
    let passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.innerHTML = "👁‍🗨"; // Change to an "open eye" emoji
    } else {
        passwordInput.type = "password";
        icon.innerHTML = "👁"; // Back to normal eye
    }
}

//upload profile


document.getElementById("profile-input").addEventListener("click", function() {
    // Check if the device has a camera (Mobile devices)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.setAttribute("capture", "environment"); // Opens Camera on Mobile
    } else {
        this.removeAttribute("capture"); // Opens File Picker on Desktop
    }
});

document.getElementById("profile-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// List of roles
const bases = [
    "BASE 1",
    "BASE 2",
    "BASE 3",
    "BASE 4",
    "BASE 5",
    "BASE 6",
    "BASE 7",
    "BASE 8",
    "BASE 9"
];

// Populate the dropdown
const baseSelect = document.getElementById("base");

bases.forEach(role => {
    let option = document.createElement("option");
    option.value = role.toLowerCase().replace(/\s+/g, "-"); // Creates a proper value
    option.textContent = role;
    baseSelect.appendChild(option);
});


// List of roles
const roles = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Auditor",
    "PRO (Public Relations Officer)",
    "Member"
];

// Populate the dropdown
const roleSelect = document.getElementById("role");

roles.forEach(role => {
    let option = document.createElement("option");
    option.value = role.toLowerCase().replace(/\s+/g, "-"); // Creates a proper value
    option.textContent = role;
    roleSelect.appendChild(option);
});


// List of organizations (Modify this based on actual organizations in Barangay Commonwealth)
const organizations = [
    "Sangguniang Kabataan (SK)",
    "Youth for Change",
    "Community Service Volunteers",
    "Eco-Warriors",
    "Barangay Commonwealth Scholars",
    "Sports & Recreation Club",
    "Youth Empowerment Movement"
];

// Populate the dropdown
const orgSelect = document.getElementById("organization");

organizations.forEach(org => {
    let option = document.createElement("option");
    option.value = org.toLowerCase().replace(/\s+/g, "-"); // Creates a proper value
    option.textContent = org;
    orgSelect.appendChild(option);
});

document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.querySelector(".main-content");

    // Form 1 elements
    const showSignupBtn1 = document.getElementById("showSignupForm1");
    const signupForm1 = document.getElementById("signup-form-1");
    const closeSignup1 = document.getElementById("closeSignup1");
    const nextToSignup2 = document.getElementById("nextToSignup2");
    const closeLogin = document.getElementById("closeLogin");

    // Form 2 elements
    const signupForm2 = document.getElementById("signup-form-2");
    const closeSignup2 = document.getElementById("closeSignup2");
    const backToSignup1 = document.getElementById("backToSignup1");

    // Function to show a form and blur background


    // Close first sign-up form
    closeLogin.addEventListener("click", function () {
        hideForm(signupForm1);
    });


    function showForm(form) {
        form.classList.add("show");
        mainContent.classList.add("blur-active");
    }

    // Function to hide a form and remove blur
    function hideForm(form) {
        form.classList.remove("show");
        mainContent.classList.remove("blur-active");
    }

    // Show first sign-up form
    showSignupBtn1.addEventListener("click", function (event) {
        event.preventDefault();
        showForm(signupForm1);
    });

    // Close first sign-up form
    closeSignup1.addEventListener("click", function () {
        hideForm(signupForm1);
    });

    // Move to second sign-up form
    nextToSignup2.addEventListener("click", function () {
        hideForm(signupForm1);
        showForm(signupForm2);
    });

    // Close second sign-up form
    closeSignup2.addEventListener("click", function () {
        hideForm(signupForm2);
    });


    // Go back to first sign-up form
    backToSignup1.addEventListener("click", function () {
        hideForm(signupForm2);
        showForm(signupForm1);
    });
});


function validatePassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let passwordError = document.getElementById("password-error");
    let confirmPasswordError = document.getElementById("confirm-password-error");

    // Regular expression for validation
    let passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/;

    // Check if password meets the criteria
    if (!passwordRegex.test(password)) {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none";
    }

    // Check if passwords match
    if (confirmPassword !== "" && password !== confirmPassword) {
        confirmPasswordError.style.display = "block";
    } else {
        confirmPasswordError.style.display = "none";
    }
}
let typingTimer;
const typingDelay = 2000; // 1 second delay before showing the eye icon

// Show the eye icon
function showToggle(toggleId) {
    document.getElementById(toggleId).style.display = "inline";
}

// Hide the eye icon
function hideToggle(toggleId) {
    setTimeout(() => {
        document.getElementById(toggleId).style.display = "none";
    }, 200); // Prevent flickering
}

// Hide while typing
function hideWhileTyping(toggleId) {
    clearTimeout(typingTimer);
    document.getElementById(toggleId).style.display = "none";
}

// Show after user stops typing
function typingDone(toggleId) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        document.getElementById(toggleId).style.display = "inline";
    }, typingDelay);
}

// Toggle password visibility
function togglePassword(inputId, eyeIcon) {
    let inputField = document.getElementById(inputId);
    if (inputField.type === "password") {
        inputField.type = "text";
        eyeIcon.textContent = "🙈"; // Change to closed-eye emoji
    } else {
        inputField.type = "password";
        eyeIcon.textContent = "👁"; // Change back to open-eye emoji
    }
}

// Validate password requirements
function validatePassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    // Password validation regex
    const passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/;

    // Check password format
    if (!passwordRegex.test(password)) {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none";
    }

    // Check if passwords match
    if (confirmPassword !== "" && password !== confirmPassword) {
        confirmPasswordError.style.display = "block";
    } else {
        confirmPasswordError.style.display = "none";
    }
}




