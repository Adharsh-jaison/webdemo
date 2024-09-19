let cart = [];

// Load cart from local storage
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCount();
}

// Sign-in modal
const signInBtn = document.getElementById("signInBtn");
const signInModal = document.getElementById("signInModal");
const closeModal = document.getElementsByClassName("close")[0];

signInBtn.onclick = function() {
    signInModal.style.display = "block";
}

closeModal.onclick = function() {
    signInModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == signInModal) {
        signInModal.style.display = "none";
    }
}

// Handle sign-in
document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Here, you would typically validate the credentials.
    alert("Signed in successfully! You can now add items to your cart.");
    signInModal.style.display = "none";
});

document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function() {
        const productDiv = this.parentElement;
        const productName = productDiv.querySelector('h3').innerText;
        const productPrice = parseFloat(productDiv.dataset.price);

        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
});

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    cartCount.innerText = cart.length;
}
