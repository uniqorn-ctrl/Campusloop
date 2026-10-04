const summary = document.getElementById("checkoutSummary");
const form = document.getElementById("checkoutForm");
const message = document.getElementById("orderMessage");

const upiSection = document.getElementById("upiSection");
const cardSection = document.getElementById("cardSection");
const bankSection = document.getElementById("bankSection");


// =========================
// GET CART
// =========================

const cart = getCart();

let total = 0;


// =========================
// ORDER SUMMARY
// =========================

if (cart.length === 0) {

    summary.innerHTML = `
        <div class="empty-cart">
            <h3>Your cart is empty.</h3>

            <a href="index.html" class="primary-btn">
                Continue Shopping
            </a>
        </div>
    `;

    form.style.display = "none";

} else {

    summary.innerHTML = cart.map(item => {

        const product = products.find(
            p => p.id === item.id
        );

        const subtotal =
            product.price * item.quantity;

        total += subtotal;

        return `
            <div class="summary-item">

                <span>
                    ${product.name} × ${item.quantity}
                </span>

                <strong>
                    ₹${subtotal}
                </strong>

            </div>
        `;

    }).join("");


    summary.innerHTML += `
        <div class="summary-total">

            <span>Total</span>

            <strong>
                ₹${total}
            </strong>

        </div>
    `;
}


// =========================
// PAYMENT OPTIONS
// =========================

const paymentOptions =
    document.querySelectorAll(
        'input[name="payment"]'
    );


paymentOptions.forEach(option => {

    option.addEventListener("change", function () {

        hidePaymentSections();


        // UPI
        if (this.value === "upi") {

            upiSection.classList.remove("hidden");

            generateQRCode(total);
        }


        // CARD
        if (this.value === "card") {

            cardSection.classList.remove("hidden");
        }


        // NET BANKING
        if (this.value === "netbanking") {

            bankSection.classList.remove("hidden");
        }

    });

});


// =========================
// HIDE PAYMENT SECTIONS
// =========================

function hidePaymentSections() {

    upiSection.classList.add("hidden");

    cardSection.classList.add("hidden");

    bankSection.classList.add("hidden");
}


// =========================
// GENERATE UPI QR CODE
// =========================

function generateQRCode(total) {

    const qrCode =
        document.getElementById("qrCode");

    const qrAmount =
        document.getElementById("qrAmount");


    if (!qrCode) {
        return;
    }


    qrAmount.textContent =
        "₹" + total;


    // CHANGE THIS TO YOUR ACTUAL UPI ID
    const upiID = "campusloop@upi";


    const upiLink =
        "upi://pay" +
        "?pa=" + encodeURIComponent(upiID) +
        "&pn=" + encodeURIComponent("CampusLoop") +
        "&am=" + total +
        "&cu=INR";


    qrCode.innerHTML = "";


    new QRCode(qrCode, {

        text: upiLink,

        width: 220,

        height: 220

    });

}


// =========================
// PLACE ORDER
// =========================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name")
            .value.trim();


    const phone =
        document.getElementById("phone")
            .value.trim();


    const address =
        document.getElementById("address")
            .value.trim();


    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selectedPayment) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    const payment =
        selectedPayment.value;


    // =========================
    // DELIVERY DETAILS
    // =========================

    if (
        name === "" ||
        phone === "" ||
        address === ""
    ) {

        alert(
            "Please fill all delivery details."
        );

        return;
    }


    // =========================
    // UPI VALIDATION
    // =========================

    if (payment === "upi") {

        const qrCode =
            document.getElementById("qrCode");


        if (!qrCode ||
            qrCode.innerHTML === "") {

            alert(
                "Please select UPI and generate the QR code."
            );

            return;
        }
    }


    // =========================
    // CARD VALIDATION
    // =========================

    if (payment === "card") {

        const cardNumber =
            document.getElementById("cardNumber")
                .value.trim();

        const expiry =
            document.getElementById("expiry")
                .value.trim();

        const cvv =
            document.getElementById("cvv")
                .value.trim();


        if (
            cardNumber.length !== 16 ||
            expiry === "" ||
            cvv.length !== 3
        ) {

            alert(
                "Please enter valid card details."
            );

            return;
        }
    }


    // =========================
    // NET BANKING
    // =========================

    if (payment === "netbanking") {

        const bank =
            document.getElementById("bank")
                .value;


        if (bank === "") {

            alert(
                "Please select your bank."
            );

            return;
        }
    }


    // =========================
    // PAYMENT STATUS
    // =========================

    let paymentStatus;


    if (payment === "cod") {

        paymentStatus =
            "Cash on Delivery";

    } else if (payment === "upi") {

        paymentStatus =
            "UPI Payment";

    } else if (payment === "card") {

        paymentStatus =
            "Card Payment";

    } else {

        paymentStatus =
            "Net Banking";
    }


    // =========================
    // ORDER ID
    // =========================

    const orderId =
        "CL" +
        Date.now()
            .toString()
            .slice(-6);


    // =========================
    // CLEAR CART
    // =========================

    localStorage.removeItem(
        "campusloopCart"
    );


    // =========================
    // HIDE FORM
    // =========================

    form.style.display = "none";


    // =========================
    // SUCCESS MESSAGE
    // =========================

    message.innerHTML = `

        <div class="success-box">

            <h2>
                ✅ Order Placed Successfully!
            </h2>

            <p>
                Thank you,
                <strong>${name}</strong>.
            </p>

            <p>
                Order ID:
                <strong>${orderId}</strong>
            </p>

            <p>
                Payment:
                <strong>${paymentStatus}</strong>
            </p>

            <p>
                Your CampusLoop order
                has been successfully placed.
            </p>

            <a
                href="index.html"
                class="primary-btn">

                Continue Shopping

            </a>

        </div>
    `;


    updateCartCount();

});