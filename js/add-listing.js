document.addEventListener("DOMContentLoaded", function () {

    const listingForm = document.getElementById("listingForm");
    const listingMessage = document.getElementById("listingMessage");

    const listingTypeInputs =
        document.querySelectorAll('input[name="listingType"]');

    const priceGroup =
        document.getElementById("priceGroup");

    const itemPrice =
        document.getElementById("itemPrice");


    // Check that the form exists
    if (!listingForm) {
        console.error("listingForm not found");
        return;
    }


    // Show / hide price field
    listingTypeInputs.forEach(input => {

        input.addEventListener("change", function () {

            if (!input.checked) {
                return;
            }

            if (input.value === "giveaway") {

                priceGroup.style.display = "none";
                itemPrice.value = "0";

            } else {

                priceGroup.style.display = "block";

            }

        });

    });


    // Submit listing
    listingForm.addEventListener("submit", async function (event) {

        // VERY IMPORTANT
        event.preventDefault();
        event.stopPropagation();


        const name =
            document.getElementById("itemName").value.trim();

        const category =
            document.getElementById("itemCategory").value;

        const selectedType =
            document.querySelector(
                'input[name="listingType"]:checked'
            );

        const type =
            selectedType ? selectedType.value : "sale";

        const price =
            Number(
                document.getElementById("itemPrice").value || 0
            );

        const condition =
            document.getElementById("itemCondition").value;

        const location =
            document.getElementById("itemLocation").value.trim();

        const description =
            document.getElementById("itemDescription").value.trim();


        // Get seller information
        let profile = {};

        try {

            profile =
                JSON.parse(
                    localStorage.getItem("campusLoopProfile")
                ) || {};

        } catch (error) {

            console.log("No saved profile found.");

        }


        const sellerName =
            profile.name || "CampusLoop User";

        const sellerEmail =
            profile.email || "user@campusloop.com";


        // Data sent to Spring Boot
        const listing = {

            title: name,

            description: description,

            price: price,

            category: category,

            condition: condition,

            sellerName: sellerName,

            sellerEmail: sellerEmail

        };


        // Show message
        listingMessage.textContent =
            "Posting your listing...";

        listingMessage.style.color =
            "#555";


        try {

            console.log("Sending listing to backend:", listing);


            const response =
                await fetch(
                    "https://campusloop-production-9e06.up.railway.app/api/listings",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(listing)
                    }
                );


            if (!response.ok) {

                const errorText =
                    await response.text();

                throw new Error(
                    "Server returned " +
                    response.status +
                    ": " +
                    errorText
                );

            }


            const savedListing =
                await response.json();


            console.log(
                "Listing saved:",
                savedListing
            );


            /*
             * Keep a temporary local copy.
             * My List will now primarily use
             * the backend.
             */
            const localListings =
                JSON.parse(
                    localStorage.getItem(
                        "campusLoopListings"
                    )
                ) || [];


            localListings.push({

                id: savedListing.id,

                name: savedListing.title,

                category: savedListing.category,

                type: type,

                price: savedListing.price,

                condition: savedListing.condition,

                location: location,

                description: savedListing.description,

                sellerName: savedListing.sellerName,

                sellerEmail: savedListing.sellerEmail

            });


            localStorage.setItem(
                "campusLoopListings",
                JSON.stringify(localListings)
            );


            // Success
            listingMessage.textContent =
                "✓ Your listing has been posted successfully!";

            listingMessage.style.color =
                "#16704d";


            // Reset form
            listingForm.reset();

            priceGroup.style.display =
                "block";


        } catch (error) {

            console.error(
                "Error creating listing:",
                error
            );


            listingMessage.textContent =
                "✕ Unable to post listing. " +
                error.message;

            listingMessage.style.color =
                "#c0392b";

        }

    });

});