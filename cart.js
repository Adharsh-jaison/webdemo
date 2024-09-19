const itemsList = document.getElementById('itemsList');
const totalPrice = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');
const paymentSection = document.getElementById('payment');
const successMessage = document.getElementById('successMessage');

// Load cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();

function updateCart() {
    itemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        itemsList.innerHTML += `
            <div>
                <p>${item.name}: $${item.price}</p>
                <button class="removeFromCart" data-index="${index}">Remove</button>
            </div>
        `;
        total += item.price;
    });

    totalPrice.innerText = `Total: $${total.toFixed(2)}`;
    attachRemoveListeners();
}

function attachRemoveListeners() {
    document.querySelectorAll('.removeFromCart').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1); // Remove item from cart
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
            updateCart(); // Refresh cart display
        });
    });
}

checkoutButton.addEventListener('click', function() {
    if (cart.length > 0) {
        paymentSection.style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
});

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    paymentSection.style.display = 'none';
    successMessage.style.display = 'block';

    // Clear the cart
    localStorage.removeItem('cart');
    cart = [];
});
