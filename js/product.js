// ==========================================
// CAMPUSLOOP - PRODUCT DETAILS
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    Number(
        params.get("id")
    );

const type =
    params.get("type") || "product";

const details =
    document.getElementById(
        "productDetails"
    );


// ==========================================
// PRODUCT ICON
// ==========================================

function getProductIcon(product) {

    const icons = {

        book: "📚",

        stationery: "✏️",

        electronics: "💻",

        accessories: "🎒",

        hostel: "🪴",

        clothing: "👕",

        sports: "⚽",

        lab: "🧪",

        other: "☕"

    };

    return icons[product.category] || "📦";

}


// ==========================================
// SHOW BUILT-IN PRODUCT
// ==========================================

function showBuiltInProduct(product) {

    if (!product) {

        details.innerHTML = `

            <h2>
                Product not found
            </h2>

        `;

        return;

    }


    details.innerHTML = `

        <div class="product-icon large">

            ${getProductIcon(product)}

        </div>


        <h1>

            ${product.name}

        </h1>


        <p class="price">

            ₹${product.price}

        </p>


        <p>

            ${
                product.category === "book"

                ? "Useful academic book for college students."

                : `A useful ${product.category} item for campus life.`
            }

        </p>


        <div class="quantity">

            <button id="minus">
                −
            </button>


            <span id="quantity">
                1
            </span>


            <button id="plus">
                +
            </button>

        </div>


        <button
            id="addButton"
            class="primary-btn">

            Add to Cart

        </button>


        <a
            class="back-link"
            href="products.html">

            ← Back to Browse

        </a>

    `;


    let quantity = 1;


    const quantityElement =
        document.getElementById(
            "quantity"
        );


    // Minus

    document.getElementById(
        "minus"
    ).onclick = function () {

        if (quantity > 1) {

            quantity--;

        }

        quantityElement.textContent =
            quantity;

    };


    // Plus

    document.getElementById(
        "plus"
    ).onclick = function () {

        quantity++;

        quantityElement.textContent =
            quantity;

    };


    // Add to cart

    document.getElementById(
        "addButton"
    ).onclick = function () {

        addToCart(
            product.id,
            quantity
        );

    };

}


// ==========================================
// SHOW BACKEND LISTING
// ==========================================

function showBackendListing(listing) {

    if (!listing) {

        details.innerHTML = `

            <h2>
                Listing not found
            </h2>

            <a
                class="back-link"
                href="products.html">

                ← Back to Browse

            </a>

        `;

        return;

    }


    details.innerHTML = `

        <div class="product-icon large">

            ${getProductIcon(listing)}

        </div>


        <span class="listing-status">

            Student Listing

        </span>


        <h1>

            ${listing.title}

        </h1>


        <p class="price">

            ${
                listing.price > 0
                ? `₹${listing.price}`
                : "Free"
            }

        </p>


        <p>

            ${listing.description || "No description provided."}

        </p>


        <div class="product-listing-info">

            <p>

                <strong>Category:</strong>

                ${listing.category || "Other"}

            </p>


            <p>

                <strong>Condition:</strong>

                ${listing.condition || "Not specified"}

            </p>


            <p>

                <strong>Seller:</strong>

                ${listing.sellerName || "Campus Student"}

            </p>


            <p>

                <strong>Email:</strong>

                ${listing.sellerEmail || "Not available"}

            </p>

        </div>


      <a
    class="primary-btn"
    href="messages.html?seller=${encodeURIComponent(
        listing.sellerName || "Campus Student"
    )}&email=${encodeURIComponent(
        listing.sellerEmail || ""
    )}&item=${encodeURIComponent(
        listing.title
    )}&listingId=${listing.id}">

    Contact Seller

</a>

        <a
            class="back-link"
            href="products.html">

            ← Back to Browse

        </a>

    `;

}


// ==========================================
// LOAD BACKEND LISTING
// ==========================================

async function loadBackendListing() {

    try {

        const response =
            await fetch(
                `http://localhost:8080/api/listings/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Listing not found"
            );

        }


        const listing =
            await response.json();


        showBackendListing(listing);


    } catch (error) {

        console.error(
            "Could not load listing:",
            error
        );


        details.innerHTML = `

            <h2>
                Unable to load listing
            </h2>


            <p>
                Please make sure the CampusLoop backend is running.
            </p>


            <a
                class="back-link"
                href="products.html">

                ← Back to Browse

            </a>

        `;

    }

}


// ==========================================
// INITIAL LOAD
// ==========================================

if (type === "listing") {

    loadBackendListing();

} else {

    const product =
        products.find(
            item => item.id === id
        );


    showBuiltInProduct(product);

}


updateCartCount();