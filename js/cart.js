const cartItems =
    document.getElementById(
        "cartItems"
    );


const cartSummary =
    document.getElementById(
        "cartSummary"
    );



function renderCart() {


    const cart =
        getCart();



    /* Empty cart */

    if (cart.length === 0) {


        cartItems.innerHTML = `


            <div class="empty-cart">


                <h2>

                    Your CampusLoop cart
                    is empty.

                </h2>


                <a
                    href="index.html"
                    class="primary-btn">

                    Continue Shopping

                </a>


            </div>


        `;


        cartSummary.innerHTML = "";


        updateCartCount();


        return;

    }



    let total = 0;



    cartItems.innerHTML =
        cart.map(item => {


            const product =
                products.find(
                    p => p.id === item.id
                );


            const subtotal =
                product.price *
                item.quantity;


            total += subtotal;



            return `


                <div class="cart-item">


                    <div>


                        <h3>

                            ${product.name}

                        </h3>


                        <p>

                            ₹${product.price}

                            ×

                            ${item.quantity}

                        </p>


                    </div>



                    <div class="cart-controls">


                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                -1
                            )">

                            −

                        </button>


                        <strong>

                            ${item.quantity}

                        </strong>


                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                1
                            )">

                            +

                        </button>


                        <button
                            onclick="removeItem(
                                ${product.id}
                            )">

                            Remove

                        </button>


                    </div>


                </div>


            `;


        }).join("");



    cartSummary.innerHTML = `


        <h2>

            Total: ₹${total}

        </h2>


        <button
            class="secondary-btn"
            onclick="clearCart()">

            Clear Cart

        </button>


        <a
            href="checkout.html"
            class="primary-btn">

            Proceed to Checkout

        </a>


    `;


    updateCartCount();

}



/* Change quantity */

function changeQuantity(
    id,
    amount
) {


    const cart =
        getCart();


    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) {

        return;

    }


    item.quantity += amount;



    if (item.quantity <= 0) {


        const index =
            cart.findIndex(
                product =>
                    product.id === id
            );


        cart.splice(
            index,
            1
        );

    }



    saveCart(cart);


    renderCart();

}



/* Remove */

function removeItem(id) {


    const cart =
        getCart().filter(
            item => item.id !== id
        );


    saveCart(cart);


    renderCart();

}



/* Clear */

function clearCart() {


    localStorage.removeItem(
        "campusloopCart"
    );


    renderCart();

}



/* Load cart */

renderCart();