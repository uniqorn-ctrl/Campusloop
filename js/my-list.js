// ==========================================
// CAMPUSLOOP - MY LIST
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const myListGrid =
        document.getElementById("myListGrid");

    const myListEmpty =
        document.getElementById("myListEmpty");


    // ==========================================
    // GET CURRENT USER EMAIL
    // ==========================================

    function getCurrentUserEmail() {

        try {

            const profile =
                JSON.parse(
                    localStorage.getItem(
                        "campusLoopProfile"
                    )
                ) || {};

            return (
                profile.email ||
                "user@campusloop.com"
            );

        } catch (error) {

            return "user@campusloop.com";

        }

    }


    // ==========================================
    // DISPLAY LISTINGS
    // ==========================================

    function displayMyListings(listings) {

        myListGrid.innerHTML = "";


        if (!listings || listings.length === 0) {

            myListEmpty.hidden = false;

            return;

        }


        myListEmpty.hidden = true;


        listings.forEach(listing => {

            const card =
                document.createElement("div");

            card.className =
                "my-list-card";


            const priceText =
                listing.type === "giveaway"
                    ? "Free"
                    : `₹${listing.price}`;


            card.innerHTML = `

                <div class="my-list-card-top">

                    <span class="my-list-type">

                        ${listing.type || "Sale"}

                    </span>


                    <button
                        class="delete-list-btn"
                        onclick="deleteListing(${listing.id})"
                        title="Delete listing">

                        🗑️

                    </button>

                </div>


                <h2>

                    ${listing.title || listing.name}

                </h2>


                <p class="my-list-category">

                    ${listing.category}

                </p>


                <div class="my-list-details">

                    <p>

                        <strong>Price:</strong>

                        ${priceText}

                    </p>


                    <p>

                        <strong>Condition:</strong>

                        ${listing.condition || "Not specified"}

                    </p>


                    <p>

                        <strong>Location:</strong>

                        ${listing.location || "Campus"}

                    </p>

                </div>


                <p class="my-list-description">

                    ${listing.description || ""}

                </p>


                <div class="my-list-actions">

                    <a
                        href="product.html?id=${listing.id}&type=listing"
                        class="primary-btn">

                        View Details

                    </a>

                </div>

            `;


            myListGrid.appendChild(card);

        });

    }


    // ==========================================
    // LOAD LISTINGS FROM BACKEND
    // ==========================================

    async function loadMyListings() {

        try {

            console.log(
                "Loading listings from backend..."
            );


            const response =
                await fetch(
                    "http://localhost:8080/api/listings"
                );


            if (!response.ok) {

                throw new Error(
                    "Server returned " +
                    response.status
                );

            }


            const listings =
                await response.json();


            console.log(
                "Listings received from backend:",
                listings
            );


            const currentEmail =
                getCurrentUserEmail();


            /*
             * Show only listings belonging
             * to the current user.
             */
            const myListings =
                listings.filter(
                    listing =>
                        listing.sellerEmail ===
                        currentEmail
                );


            displayMyListings(
                myListings
            );


        } catch (error) {

            console.error(
                "Could not load listings from backend:",
                error
            );


            /*
             * Temporary localStorage
             * fallback.
             */
            const localListings =
                JSON.parse(
                    localStorage.getItem(
                        "campusLoopListings"
                    )
                ) || [];


            displayMyListings(
                localListings
            );

        }

    }


    // ==========================================
    // DELETE LISTING
    // ==========================================

    window.deleteListing =
        async function (id) {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete this listing?"
                );


            if (!confirmDelete) {

                return;

            }


            try {

                const response =
                    await fetch(
                        `http://localhost:8080/api/listings/${id}`,
                        {
                            method: "DELETE"
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Delete failed"
                    );

                }


                /*
                 * Remove local copy too.
                 */
                let listings =
                    JSON.parse(
                        localStorage.getItem(
                            "campusLoopListings"
                        )
                    ) || [];


                listings =
                    listings.filter(
                        listing =>
                            listing.id !== id
                    );


                localStorage.setItem(
                    "campusLoopListings",
                    JSON.stringify(listings)
                );


                loadMyListings();


            } catch (error) {

                console.error(
                    "Delete error:",
                    error
                );


                alert(
                    "Unable to delete listing."
                );

            }

        };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    loadMyListings();

});