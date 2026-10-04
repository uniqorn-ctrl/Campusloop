// ==========================================
// CAMPUSLOOP - BROWSE / MAIN
// ==========================================

const searchBox =
    document.getElementById("searchBox");

const featuredGrid =
    document.getElementById("featuredGrid");

const productGrid =
    document.getElementById("productGrid");

const categoryFilter =
    document.getElementById("categoryFilter");


// ==========================================
// BACKEND LISTINGS
// ==========================================

let backendListings = [];


// ==========================================
// LOAD LISTINGS FROM BACKEND
// ==========================================

async function loadBackendListings() {

    try {

        console.log("Loading listings from backend...");

        const response =
            await fetch(
                "https://campusloop-production-b9b6.up.railway.app/api/listings"
            );

        if (!response.ok) {

            throw new Error(
                "Server returned " + response.status
            );

        }

        const listings =
            await response.json();

        console.log(
            "Backend listings:",
            listings
        );

        backendListings =
            listings.map(listing => ({

                id: "listing-" + listing.id,

                backendId: listing.id,

                name: listing.title,

                price: listing.price,

                category:
                    listing.category || "other",

                description:
                    listing.description || "",

                condition:
                    listing.condition || "Not specified",

                sellerName:
                    listing.sellerName || "Campus Student",

                sellerEmail:
                    listing.sellerEmail || "",

                location:
                    listing.location || "Campus",

                type:
                    listing.type || "sale",

                isBackendListing: true

            }));


        renderProducts();

        displayFeaturedProducts();


    } catch (error) {

        console.error(
            "Could not load backend listings:",
            error
        );

        backendListings = [];

        renderProducts();

        displayFeaturedProducts();

    }

}


// ==========================================
// ALL PRODUCTS
// ==========================================

function getAllProducts() {

    return [
        ...products,
        ...backendListings
    ];

}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts() {

    if (!productGrid || !categoryFilter) {
        return;
    }


    const search =
        searchBox
            ? searchBox.value.trim().toLowerCase()
            : "";


    const category =
        categoryFilter.value;


    const allProducts =
        getAllProducts();


    const matchingProducts =
        allProducts.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return matchesSearch &&
                   matchesCategory;

        });


    if (matchingProducts.length === 0) {

        productGrid.innerHTML =
            '<p class="no-products">No items match your search. Try another name or category.</p>';

        return;

    }


    productGrid.innerHTML =
        matchingProducts.map(product => {

            // Backend listing uses backendId.
            // Normal product uses its normal id.
            const detailsId =
                product.isBackendListing
                    ? product.backendId
                    : product.id;


            const saved =
                !product.isBackendListing &&
                isProductSaved(product.id);


            return `

                <article class="product-card">

                    <div class="product-save-row">

                        ${
                            product.isBackendListing
                            ? `
                                <span class="listing-status">
                                    Student Listing
                                </span>
                              `
                            : `
                                <button
                                    class="save-product-btn ${saved ? "saved" : ""}"
                                    type="button"
                                    onclick="handleSaveProduct(${product.id}, event)"
                                    aria-label="${saved ? "Remove from saved" : "Save item"}">

                                    ${saved ? "🔖" : "♡"}

                                </button>
                              `
                        }

                    </div>


                    <a
                        class="product-card-link"
                        href="product.html?id=${detailsId}&type=${product.isBackendListing ? "listing" : "product"}"
                        aria-label="View ${product.name}">

                        <div class="product-icon">

                            ${getProductIcon(product)}

                        </div>


                        <h3>

                            ${product.name}

                        </h3>

                    </a>


                    <p class="price">

                        ${
                            product.price > 0
                            ? `₹${product.price}`
                            : "Free"
                        }

                    </p>


                    ${
                        product.isBackendListing
                        ? `
                            <p class="product-condition">
                                ${product.condition}
                            </p>
                          `
                        : ""
                    }


                    <div class="card-actions">

                        ${
                            product.isBackendListing
                            ? `
                                <a
                                    class="primary-btn"
                                    href="product.html?id=${detailsId}&type=listing">

                                    Details

                                </a>
                              `
                            : `
                                <a
                                    class="primary-btn"
                                    href="product.html?id=${detailsId}&type=product">

                                    Details

                                </a>

                                <button
                                    class="add-cart-btn"
                                    type="button"
                                    onclick="addToCart(${product.id})">

                                    Add to Cart

                                </button>
                              `
                        }

                    </div>

                </article>

            `;

        }).join("");

}


// ==========================================
// SAVE PRODUCT
// ==========================================

function handleSaveProduct(id, event) {

    if (event) {
        event.stopPropagation();
    }


    const saved =
        toggleSaveProduct(id);


    renderProducts();


    if (saved) {

        alert("Item saved!");

    } else {

        alert("Item removed from Saved!");

    }

}


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
// FEATURED PRODUCTS
// ==========================================

function displayFeaturedProducts() {

    if (!featuredGrid) {
        return;
    }


    const allProducts =
        getAllProducts();


    const featured =
        allProducts.slice(0, 8);


    featuredGrid.innerHTML =
        featured.map(product => {

            const detailsId =
                product.isBackendListing
                    ? product.backendId
                    : product.id;


            return `

                <article
                    class="featured-card"
                    onclick="viewProduct(
                        ${detailsId},
                        ${product.isBackendListing}
                    )">

                    <div class="featured-image">

                        ${getProductIcon(product)}

                    </div>


                    <div class="featured-info">

                        <span class="listing-status">

                            ${
                                product.isBackendListing
                                ? "Student Listing"
                                : "For Sale"
                            }

                        </span>


                        <h3>

                            ${product.name}

                        </h3>


                        <p class="featured-price">

                            ₹${product.price}

                        </p>


                        <p class="featured-location">

                            📍
                            ${
                                product.location ||
                                "Campus Store"
                            }

                        </p>

                    </div>

                </article>

            `;

        }).join("");

}


// ==========================================
// SEARCH
// ==========================================

if (searchBox) {

    const initialSearch =
        new URLSearchParams(
            window.location.search
        ).get("search");


    if (initialSearch) {

        searchBox.value =
            initialSearch;

    }


    if (categoryFilter) {

        searchBox.addEventListener(
            "input",
            renderProducts
        );


        categoryFilter.addEventListener(
            "change",
            renderProducts
        );


        renderProducts();

    }


    searchBox.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                const search =
                    searchBox.value.trim();


                if (search !== "") {

                    window.location.href =
                        "products.html?search=" +
                        encodeURIComponent(search);

                } else {

                    window.location.href =
                        "products.html";

                }

            }

        }
    );

}


// ==========================================
// VIEW PRODUCT
// ==========================================

function viewProduct(
    id,
    isBackendListing = false
) {

    if (isBackendListing) {

        window.location.href =
            `product.html?id=${id}&type=listing`;

        return;

    }


    window.location.href =
        `product.html?id=${id}&type=product`;

}


// ==========================================
// INITIAL LOAD
// ==========================================

displayFeaturedProducts();

updateCartCount();

loadBackendListings();