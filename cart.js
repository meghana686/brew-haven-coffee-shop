let cart = JSON.parse(localStorage.getItem('brew_haven_cart')) || [];

function addToCart(id, name, price, image) {
    const item = { id, name, price, image, quantity: 1 };
    
    const existingItem = cart.find(i => i.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    saveCart();
    showToast(`${name} added to cart!`);
}

function saveCart() {
    localStorage.setItem('brew_haven_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if(badge) {
        badge.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

function showToast(message) {
    // Basic implementation of toast logic
    alert(message); 
    // In production, use a Bootstrap Toast or SweetAlert2
}

// Initialize on load
document.addEventListener('DOMContentLoaded', updateCartBadge);
