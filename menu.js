// State untuk menyimpan pesanan
let orderItems = [];

// Elements
const orderButton = document.getElementById('order-button');
const orderTotal = document.getElementById('order-total');
const customerFormModal = document.getElementById('customer-form-modal');
const closeFormBtn = document.getElementById('close-form');
const backToMenuBtn = document.getElementById('back-to-menu');
const customerForm = document.getElementById('customer-form');
const totalPesanan = document.getElementById('total-pesanan');

// Event Listeners
orderButton.addEventListener('click', showCustomerForm);
closeFormBtn.addEventListener('click', hideCustomerForm);
backToMenuBtn.addEventListener('click', hideCustomerForm);
customerForm.addEventListener('submit', processOrder);

// Functions
function updateQuantity(button, change) {
    const container = button.parentElement;
    const qtyDisplay = container.querySelector('.qty-amount');
    const id = container.dataset.id;
    const name = container.dataset.name;
    const price = parseInt(container.dataset.price);
    
    // Cari item dalam orderItems
    let currentQty = parseInt(qtyDisplay.textContent);
    let newQty = currentQty + change;
    
    // Pastikan qty tidak kurang dari 0
    if (newQty < 0) newQty = 0;
    
    // Update tampilan qty
    qtyDisplay.textContent = newQty;
    
    // Update orderItems
    const existingItem = orderItems.find(item => item.id === id);
    
    if (existingItem) {
        if (newQty === 0) {
            // Hapus item jika qty = 0
            orderItems = orderItems.filter(item => item.id !== id);
        } else {
            existingItem.quantity = newQty;
        }
    } else if (newQty > 0) {
        // Tambahkan item baru jika belum ada dan qty > 0
        orderItems.push({
            id,
            name,
            price,
            quantity: newQty
        });
    }
    
    // Update total dan status tombol pesan
    updateOrderSummary();
}

function updateOrderSummary() {
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotal.textContent = `Rp ${total.toLocaleString()}`;
    
    // Enable/disable tombol pesan
    if (total > 0) {
        orderButton.disabled = false;
    } else {
        orderButton.disabled = true;
    }
}

function showCustomerForm() {
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPesanan.textContent = total.toLocaleString();
    customerFormModal.style.display = 'block';
}

function hideCustomerForm() {
    customerFormModal.style.display = 'none';
}

function processOrder(e) {
    e.preventDefault();
    
    // Ambil data form
    const nama = document.getElementById('checkout-nama').value;
    const telepon = document.getElementById('checkout-telepon').value;
    const alamat = document.getElementById('checkout-alamat').value;
    const tanggal = document.getElementById('checkout-tanggal').value;
    
    // Validasi form
    if (!nama || !telepon || !alamat || !tanggal) {
        showNotification('Semua field harus diisi!', 'error');
        return;
    }
    
    // Format pesan untuk WhatsApp
    let message = '*Pesanan Baru Sumdimsum*%0a%0a';
    
    // Data Customer
    message += '*Data Customer:*%0a';
    message += `Nama: ${nama}%0a`;
    message += `No. Telepon: ${telepon}%0a`;
    message += `Alamat: ${alamat}%0a`;
    message += `Tanggal Pengambilan: ${tanggal}%0a%0a`;
    
    // Detail Pesanan
    message += '*Detail Pesanan:*%0a';
    orderItems.forEach(item => {
        message += `${item.name} x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}%0a`;
    });
    
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0a*Total: Rp ${total.toLocaleString()}*%0a`;
    
    // Ganti nomor WhatsApp di bawah ini dengan nomor Anda
    const waNumber = '6285855905735';
    
    // Sembunyikan form
    hideCustomerForm();
    
    // Redirect ke WhatsApp
    window.location.href = `https://wa.me/${waNumber}?text=${message}`;
    
    // Reset pesanan
    orderItems = [];
    document.querySelectorAll('.qty-amount').forEach(el => {
        el.textContent = '0';
    });
    updateOrderSummary();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 