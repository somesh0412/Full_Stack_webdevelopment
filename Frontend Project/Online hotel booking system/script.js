// Local in-memory state for room catalogs
const hotelRooms = [
    { id: 1, type: "Standard", title: "Standard City Room", desc: "Cozy essential city room equipped with a queen bed and work desk.", price: 120, img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500" },
    { id: 2, type: "Deluxe", title: "Deluxe Ocean View", desc: "Enjoy panoramic sea views and high-speed Wi-Fi.", price: 220, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500" },
    { id: 3, type: "Suite", title: "Presidential Penthouse", desc: "Exclusive master penthouse with a separate lounge and luxury amenities.", price: 450, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500" }
];

const reservations = [
    { id: 2001, guest: "Suresh Patil", roomTitle: "Deluxe Ocean View", checkIn: "2026-05-12", checkOut: "2026-05-15", totalCost: 660 }
];

const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const roomsContainer = document.getElementById('roomsContainer');
const resultsCount = document.getElementById('resultsCount');
const bookingsTableBody = document.getElementById('bookingsTableBody');

// Modal Elements
const bookingModal = document.getElementById('bookingModal');
const modalRoomId = document.getElementById('modalRoomId');
const modalRoomDetails = document.getElementById('modalRoomDetails');
const confirmBookingForm = document.getElementById('confirmBookingForm');

// Set default check-in/out dates automatically on page load
function setDefaultDates() {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 1); // Tomorrow
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 3); // 3 days after tomorrow

    checkInInput.value = checkIn.toISOString().split('T')[0];
    checkOutInput.value = checkOut.toISOString().split('T')[0];
}

// Render available room tiles
function renderRooms(filteredList = hotelRooms) {
    resultsCount.innerText = `${filteredList.length} Rooms Available`;
    roomsContainer.innerHTML = filteredList.map(r => `
        <div class="room-card">
            <div class="room-img-placeholder" style="background-image: url('${r.img}')"></div>
            <div class="room-details">
                <span class="room-tag badge-${r.type.toLowerCase()}">${r.type}</span>
                <h3 class="room-title">${r.title}</h3>
                <p class="room-desc">${r.desc}</p>
                <div class="room-price-row">
                    <div class="room-price">$${r.price} <span>/ night</span></div>
                </div>
                <button class="btn-book" onclick="openBookingModal(${r.id})">Reserve Stay</button>
            </div>
        </div>
    `).join('');
}

// Render active client bookings in the lower table
function renderBookings() {
    bookingsTableBody.innerHTML = reservations.map(b => `
        <tr>
            <td><strong>${b.guest}</strong></td>
            <td>${b.roomTitle}</td>
            <td>${b.checkIn}</td>
            <td>${b.checkOut}</td>
            <td><strong>$${b.totalCost}</strong></td>
            <td><span class="status-confirmed">Active</span></td>
            <td><button class="btn-cancel" onclick="cancelReservation(${b.id})">Cancel</button></td>
        </tr>
    `).join('');
}

// Filter rooms by category
function filterRooms() {
    const selectedType = document.getElementById('roomType').value;
    if (selectedType === "All") {
        renderRooms(hotelRooms);
    } else {
        const filtered = hotelRooms.filter(r => r.type === selectedType);
        renderRooms(filtered);
    }
}

// Modal handling
function openBookingModal(roomId) {
    const room = hotelRooms.find(r => r.id === roomId);
    const dateIn = new Date(checkInInput.value);
    const dateOut = new Date(checkOutInput.value);
    
    if (dateOut <= dateIn) {
        alert("Check-out date must be after your check-in date.");
        return;
    }

    const duration = Math.round((dateOut - dateIn) / (1000 * 60 * 60 * 24));
    const calculatedCost = duration * room.price;

    modalRoomId.value = room.id;
    modalRoomDetails.innerHTML = `<strong>Room:</strong> ${room.title}<br><strong>Stays:</strong> ${duration} nights ($${room.price}/night)<br><strong>Total Cost:</strong> $${calculatedCost}`;
    bookingModal.style.display = 'flex';
}

function closeModal() {
    bookingModal.style.display = 'none';
    confirmBookingForm.reset();
}

// Handle reservation form confirmation
confirmBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rId = parseInt(modalRoomId.value);
    const name = document.getElementById('guestName').value.trim();
    
    const room = hotelRooms.find(r => r.id === rId);
    const dateIn = new Date(checkInInput.value);
    const dateOut = new Date(checkOutInput.value);
    const duration = Math.round((dateOut - dateIn) / (1000 * 60 * 60 * 24));
    const calculatedCost = duration * room.price;

    reservations.unshift({
        id: Date.now(),
        guest: name,
        roomTitle: room.title,
        checkIn: checkInInput.value,
        checkOut: checkOutInput.value,
        totalCost: calculatedCost
    });

    renderBookings();
    closeModal();
    alert("Stay reserved successfully!");
});

// Remove/cancel a reservation
function cancelReservation(id) {
    const index = reservations.findIndex(b => b.id === id);
    if (index !== -1) {
        reservations.splice(index, 1);
        renderBookings();
    }
}

// Page initialization
setDefaultDates();
renderRooms();
renderBookings();