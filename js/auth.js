const API_URL = "https://campusloop-production-b9b6.up.railway.app/api/users";


// ==========================================
// TABS
// ==========================================

const loginTab =
    document.getElementById("loginTab");

const registerTab =
    document.getElementById("registerTab");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const authMessage =
    document.getElementById("authMessage");


loginTab.addEventListener(
    "click",
    function () {

        loginTab.classList.add("active");
        registerTab.classList.remove("active");

        loginForm.classList.add("active");
        registerForm.classList.remove("active");

        clearMessage();

    }
);


registerTab.addEventListener(
    "click",
    function () {

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        registerForm.classList.add("active");
        loginForm.classList.remove("active");

        clearMessage();

    }
);


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    message,
    type
) {

    authMessage.textContent =
        message;

    authMessage.className =
        "auth-message " + type;

}


function clearMessage() {

    authMessage.textContent = "";

    authMessage.className =
        "auth-message";

}


// ==========================================
// REGISTER
// ==========================================

registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        try {

            const response =
                await fetch(
                    API_URL + "/register",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                name: name,

                                email: email,

                                password: password

                            })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    typeof data === "string"
                        ? data
                        : "Registration failed"
                );

            }


            showMessage(
                "Account created successfully! You can now login.",
                "success"
            );


            registerForm.reset();


            setTimeout(
                function () {

                    loginTab.click();

                    document.getElementById(
                        "loginEmail"
                    ).value = email;

                },
                1000
            );


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            showMessage(
                error.message ||
                "Registration failed. Make sure the backend is running.",
                "error"
            );

        }

    }
);


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        try {

            const response =
                await fetch(
                    API_URL + "/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                email: email,

                                password: password

                            })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    typeof data === "string"
                        ? data
                        : "Login failed"
                );

            }


            // Save logged-in user
            localStorage.setItem(
                "campusLoopProfile",
                JSON.stringify({

                    name:
                        data.name,

                    email:
                        data.email

                })
            );


            showMessage(
                "Login successful! Opening CampusLoop...",
                "success"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                700
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            showMessage(
                error.message ||
                "Login failed. Make sure the backend is running.",
                "error"
            );

        }

    }
);