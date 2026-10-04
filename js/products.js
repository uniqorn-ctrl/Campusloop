// ==========================================
// CAMPUSLOOP PRODUCT DATABASE
// ==========================================

const products = [

    // ==========================================
    // BOOKS & STUDY MATERIALS
    // ==========================================

    {
        id: 1,
        name: "Chemistry for Information Science",
        price: 350,
        category: "book"
    },

    {
        id: 2,
        name: "Mathematics-1",
        price: 380,
        category: "book"
    },

    {
        id: 3,
        name: "Introduction to Electrical and Electronics Engineering",
        price: 320,
        category: "book"
    },

    {
        id: 4,
        name: "Algorithmic Thinking with Python",
        price: 300,
        category: "book"
    },

    {
        id: 5,
        name: "Physics for Engineers",
        price: 350,
        category: "book"
    },

    {
        id: 6,
        name: "Foundations of Computing",
        price: 250,
        category: "book"
    },

    {
        id: 7,
        name: "Discrete Mathematics",
        price: 300,
        category: "book"
    },

    {
        id: 8,
        name: "Programming in C",
        price: 350,
        category: "book"
    },

    {
        id: 9,
        name: "Mathematics-2",
        price: 380,
        category: "book"
    },


    // ==========================================
    // STATIONERY
    // ==========================================

    {
        id: 10,
        name: "Classmate Notebook",
        price: 60,
        category: "stationery"
    },

    {
        id: 11,
        name: "Spiral Notebook",
        price: 80,
        category: "stationery"
    },

    {
        id: 12,
        name: "Project Notebook",
        price: 100,
        category: "stationery"
    },

    {
        id: 13,
        name: "Stationery Kit",
        price: 150,
        category: "stationery"
    },

    {
        id: 14,
        name: "Premium Pen Set",
        price: 120,
        category: "stationery"
    },


    // ==========================================
    // ELECTRONICS
    // ==========================================

    {
        id: 15,
        name: "Wireless Headphones",
        price: 650,
        category: "electronics"
    },

    {
        id: 16,
        name: "Scientific Calculator",
        price: 400,
        category: "electronics"
    },

    {
        id: 17,
        name: "USB-C Hub",
        price: 550,
        category: "electronics"
    },

    {
        id: 18,
        name: "Wireless Mouse",
        price: 450,
        category: "electronics"
    },

    {
        id: 19,
        name: "USB Flash Drive 32GB",
        price: 350,
        category: "electronics"
    },

    {
        id: 20,
        name: "Laptop Stand",
        price: 700,
        category: "electronics"
    },


    // ==========================================
    // ACCESSORIES
    // ==========================================

    {
        id: 21,
        name: "College Backpack",
        price: 800,
        category: "accessories"
    },

    {
        id: 22,
        name: "Laptop Backpack",
        price: 1200,
        category: "accessories"
    },

    {
        id: 23,
        name: "Student ID Card Holder",
        price: 80,
        category: "accessories"
    },

    {
        id: 24,
        name: "Travel Pouch",
        price: 180,
        category: "accessories"
    },


    // ==========================================
    // HOSTEL ESSENTIALS
    // ==========================================

    {
        id: 25,
        name: "Study Lamp",
        price: 500,
        category: "hostel"
    },

    {
        id: 26,
        name: "Water Bottle",
        price: 300,
        category: "hostel"
    },

    {
        id: 27,
        name: "Desk Organizer",
        price: 250,
        category: "hostel"
    },

    {
        id: 28,
        name: "Laundry Bag",
        price: 200,
        category: "hostel"
    },

    {
        id: 29,
        name: "Electric Kettle",
        price: 900,
        category: "hostel"
    },


    // ==========================================
    // CLOTHING
    // ==========================================

    {
        id: 30,
        name: "Lab Coat",
        price: 450,
        category: "clothing"
    },

    {
        id: 31,
        name: "College Hoodie",
        price: 750,
        category: "clothing"
    },

    {
        id: 32,
        name: "College T-Shirt",
        price: 400,
        category: "clothing"
    },


    // ==========================================
    // SPORTS & FITNESS
    // ==========================================

    {
        id: 33,
        name: "Football",
        price: 600,
        category: "sports"
    },

    {
        id: 34,
        name: "Badminton Racket",
        price: 700,
        category: "sports"
    },

    {
        id: 35,
        name: "Skipping Rope",
        price: 150,
        category: "sports"
    },


    // ==========================================
    // LAB EQUIPMENT
    // ==========================================

    {
        id: 36,
        name: "Engineering Drawing Kit",
        price: 650,
        category: "lab"
    },

    {
        id: 37,
        name: "Digital Multimeter",
        price: 750,
        category: "lab"
    },

    {
        id: 38,
        name: "Safety Goggles",
        price: 180,
        category: "lab"
    },


    // ==========================================
    // OTHER
    // ==========================================

    {
        id: 39,
        name: "Desk Clock",
        price: 250,
        category: "other"
    },

    {
        id: 40,
        name: "Reusable Coffee Mug",
        price: 220,
        category: "other"
    }

];


// ==========================================
// CART FUNCTIONS
// ==========================================


// Get cart from localStorage

function getCart() {

    return JSON.parse(
        localStorage.getItem("campusloopCart")
    ) || [];

}


// Save cart

function saveCart(cart) {

    localStorage.setItem(
        "campusloopCart",
        JSON.stringify(cart)
    );

}


// Add product to cart

function addToCart(id, quantity = 1) {

    id = Number(id);
    quantity = Math.max(1, Number(quantity) || 1);

    const cart = getCart();


    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            id: id,

            quantity: quantity

        });

    }


    saveCart(cart);

    updateCartCount();


    alert(
        "Product added to cart!"
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {

        return;

    }


    const cart = getCart();


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent = count;

}


// ==========================================
// FIND PRODUCT
// ==========================================

function getProductById(id) {

    return products.find(
        product => product.id === Number(id)
    );

}


// ==========================================
// INITIAL CART COUNT
// ==========================================

updateCartCount();
// ==========================================
// SAVED ITEMS FUNCTIONS
// ==========================================

// Get saved items
function getSavedItems() {

    return JSON.parse(
        localStorage.getItem("campusLoopSaved")
    ) || [];

}


// Save items to localStorage
function saveSavedItems(savedItems) {

    localStorage.setItem(
        "campusLoopSaved",
        JSON.stringify(savedItems)
    );

}


// Check whether a product is saved
function isProductSaved(id) {

    id = Number(id);

    const savedItems = getSavedItems();

    return savedItems.some(
        item => item.id === id
    );

}


// Save / unsave a product
function toggleSaveProduct(id) {

    id = Number(id);

    const product = getProductById(id);

    if (!product) {
        return;
    }


    let savedItems = getSavedItems();


    const existingIndex =
        savedItems.findIndex(
            item => item.id === id
        );


    // Remove if already saved
    if (existingIndex !== -1) {

        savedItems.splice(existingIndex, 1);

        saveSavedItems(savedItems);

        return false;

    }


    // Add if not saved
    savedItems.push({

        id: product.id,

        name: product.name,

        price: product.price,

        category: product.category

    });


    saveSavedItems(savedItems);

    return true;

}