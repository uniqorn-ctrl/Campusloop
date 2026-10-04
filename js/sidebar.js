document.addEventListener("DOMContentLoaded", function () {

    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) {
        return;
    }


    /* =========================
       CURRENT PAGE
    ========================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    /* =========================
       SIDEBAR HTML
    ========================== */

    sidebar.innerHTML = `

        <div class="sidebar-brand">

            <div class="brand-logo">◉</div>

            <div>
                <h2>CampusLoop</h2>
                <p>Your campus marketplace</p>
            </div>

        </div>


        <nav>

            <a href="index.html"
               class="sidebar-link"
               data-page="index.html">

                <span class="sidebar-icon">
                    <i data-lucide="house"></i>
                </span>

                <span>Home</span>

            </a>


            <a href="products.html"
               class="sidebar-link"
               data-page="products.html">

                <span class="sidebar-icon">
                    <i data-lucide="search"></i>
                </span>

                <span>Browse</span>

            </a>


            <a href="add-listing.html"
               class="sidebar-link"
               data-page="add-listing.html">

                <span class="sidebar-icon">
                    <i data-lucide="plus-circle"></i>
                </span>

                <span>Add Listing</span>

            </a>


            <a href="my-list.html"
               class="sidebar-link"
               data-page="my-list.html">

                <span class="sidebar-icon">
                    <i data-lucide="list"></i>
                </span>

                <span>My List</span>

            </a>


            <a href="saved.html"
               class="sidebar-link"
               data-page="saved.html">

                <span class="sidebar-icon saved-icon">
                    <i data-lucide="heart"></i>
                </span>

                <span>Saved</span>

            </a>


            <a href="borrow-request.html"
               class="sidebar-link"
               data-page="borrow-request.html">

                <span class="sidebar-icon">
                    <i data-lucide="refresh-cw"></i>
                </span>

                <span>Borrow Requests</span>

            </a>


            <a href="messages.html"
               class="sidebar-link"
               data-page="messages.html">

                <span class="sidebar-icon">
                    <i data-lucide="message-circle"></i>
                </span>

                <span>Messages</span>

            </a>


            <a href="profile.html"
               class="sidebar-link"
               data-page="profile.html">

                <span class="sidebar-icon">
                    <i data-lucide="user-round"></i>
                </span>

                <span>Profile</span>

            </a>

        </nav>


        <div class="sidebar-bottom">

            <p>Same Campus</p>

            <strong>Different Needs</strong>

            <span>One Loop ♡</span>

        </div>

    `;


    /* =========================
       ACTIVE PAGE
    ========================== */

    const links =
        sidebar.querySelectorAll(".sidebar-link");


    links.forEach(function (link) {

        const page =
            link.getAttribute("data-page");


        link.classList.remove("active");


        /*
         * Product Details belongs
         * under Browse.
         */

        if (
            currentPage === "product.html" &&
            page === "products.html"
        ) {

            link.classList.add("active");

        }


        else if (
            currentPage === page
        ) {

            link.classList.add("active");

        }

    });


    /* =========================
       CREATE LUCIDE ICONS
    ========================== */

    if (
        typeof lucide !== "undefined"
    ) {

        lucide.createIcons();

    }

});