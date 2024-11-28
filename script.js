// Initialize an empty cart array
let cart = [];

// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    // If the item already exists in the cart, increment the quantity
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // If not, add a new item to the cart
        cart.push({ name, price, quantity: 1 });
    }

    // Update the cart display after adding the item
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(name) {
  const item = cart.find(item => item.name === name); // Find the item in the cart

  if (item) {
      item.quantity--; // Decrease the quantity by 1
      if (item.quantity === 0) {
          // Remove the item if quantity reaches 0
          cart = cart.filter(item => item.name !== name);
      }
  }

  updateCart(); // Refresh the cart display
}

// Function to update the cart display
function updateCart() {
    const cartList = document.querySelector("#cart-items");
    cartList.innerHTML = ""; // Clear the current list of items in the cart

    // Loop through the cart items and add them to the cart list
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="remove" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartList.appendChild(listItem);
    });

    // Update the total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector("#total-price").textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to open the checkout modal
function openCheckoutModal() {
    const checkoutModal = document.querySelector("#checkout-modal");
    const modalContent = checkoutModal.querySelector(".modal-content");

    if (cart.length === 0) {
        modalContent.innerHTML = "<h3>Your cart is empty!</h3>";
    } else {
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        modalContent.innerHTML = `
            <h3>Checkout Summary</h3>
            <ul>
                ${cart.map(item => `
                    <li>${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</li>
                `).join("")}
            </ul>
            <p><strong>Total: $${totalPrice.toFixed(2)}</strong></p>
            <button id="confirm-checkout">Confirm Purchase</button>
        `;
    }

    checkoutModal.style.display = "block";

    // Add checkout confirmation functionality
    document.querySelector("#confirm-checkout").addEventListener("click", confirmCheckout);
}

// Function to confirm checkout
function confirmCheckout() {
    alert("Checkout successful! Thank you for your purchase.");
    cart = []; // Clear the cart
    updateCart();
    closeModal(); // Close the modal
}

// Function to close the modal
function closeModal() {
    document.querySelector("#checkout-modal").style.display = "none";
}

// Event listener for modal close
document.querySelector("#close-modal").addEventListener("click", closeModal);

// Close modal if clicked outside
window.addEventListener("click", (event) => {
    const checkoutModal = document.querySelector("#checkout-modal");
    if (event.target === checkoutModal) {
        closeModal();
    }
});
