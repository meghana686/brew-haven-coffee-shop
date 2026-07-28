// Initialize AOS
AOS.init();

// Data
const products = [
    { id: 1, name: "Gold Roast Latte", price: 6.50, cat: "hot", img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500" },
    { id: 2, name: "Midnight Cold Brew", price: 5.50, cat: "cold", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500" },
    { id: 3, name: "Caramel Macchiato", price: 7.00, cat: "hot", img: "https://images.unsplash.com/photo-1485808191679-5f6333c1fe51?w=500" },
    { id: 4, name: "Iced Vanilla Oat", price: 6.00, cat: "cold", img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500" }
];

let cart = [];

// Load Menu
function loadMenu(items) {
    const container = document.getElementById('menu-container');
    container.innerHTML = items.map(item => `
        <div class="col-md-3" data-aos="fade-up">
            <div class="glass-card p-3 text-center">
                <img src="${item.img}" class="img-fluid rounded mb-3" style="height: 200px; object-fit: cover; width:100%">
                <h5>${item.name}</h5>
                <p class="text-accent fw-bold">$${item.price.toFixed(2)}</p>
                <button class="btn btn-sm btn-accent" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Cart Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.querySelector('.cart-badge').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if(cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        totalEl.innerText = '$0.00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-2">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalEl.innerText = `$${total.toFixed(2)}`;
    }
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        loadMenu(filter === 'all' ? products : products.filter(p => p.cat === filter));
    });
});

// Dark Mode Toggle
document.getElementById('theme-btn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    document.querySelector('#theme-btn i').className = target === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// Custom Cursor Motion
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
    }, { duration: 500, fill: "forwards" });
});

// Initial Load
loadMenu(products);
