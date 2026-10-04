document.addEventListener("DOMContentLoaded", function () {

    const profile =
        JSON.parse(
            localStorage.getItem("campusLoopProfile") || "null"
        );

    // Find common user greeting elements
    const greetingElements = document.querySelectorAll(
        "#userGreeting, .user-profile span"
    );

    greetingElements.forEach(function (element) {

        // Do not modify the dropdown arrow
        if (
            element.textContent.trim() === "▾" ||
            element.textContent.trim() === ""
        ) {
            return;
        }

        if (profile && profile.name) {

            element.textContent =
                "Hi, " + profile.name;

        } else {

            element.textContent =
                "Login / Register";

            element.style.cursor = "pointer";

            element.addEventListener(
                "click",
                function () {
                    window.location.href = "login.html";
                }
            );
        }
    });

});