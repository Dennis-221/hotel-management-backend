# Hotel Management Backend

📘 Hotel Management System – Backend
A Node.js + Express + SQLite3 backend API for managing hotel operation

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/dennis221/hotel-management-backend.git
   cd hotel-management-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file at project root:

   ```env
   PORT=3000
   SECRET_KEY=MY_SECRET_KEY
   ```

4. **Initialize the database**

   - Ensure SQLite is installed
   - Run the initialization script:
     ```bash
     node database/init-db.js
     ```
     This will create tables and seed initial data.

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

---

## 🗄️ Database Design Explanation

The SQLite database models core entities via these tables:

✅ **staff** :id (PK), employeeId, name, username, password (bcrypt), role (Admin, Manager, Staff), department

✅ **guests** : id (PK), name, email, phone, password (bcrypt), preferences

✅ **rooms** : id (PK), roomNumber, type, status (available, occupied, cleaning, maintenance), pricePerNight

✅ **bookings**: id (PK), guestId (FK → guests.id), roomId (FK → rooms.id), checkInDate, checkOutDate, status (pending, confirmed, active, completed, cancelled)

✅ **housekeeping** : id (PK), roomId (FK → rooms.id), type, items, status (pending, in-progress, completed), preferredTime, notes

✅ **restaurantOrders** : id (PK), roomId (FK → rooms.id), items (JSON), totalAmount, status (pending, preparing, delivered)

✅ **inventory**: id (PK), itemName, category, quantityAvailable

✅ **bills** : id (PK), bookingId (FK → bookings.id), amount, status (unpaid, paid), paymentMethod

✅ **amenities**: id (PK), service, availability, price, duration

✅ **requests**: id (PK), roomId (FK → rooms.id), type (maintenance, guest), priority, description,
status (open, resolved), resolution

✅ **reports**: virtual endpoints (no table), generated via SQL joins for occupancy, revenue, guest satisfaction

**Relationships & Constraints**:

- FKs enforce referential integrity
- Timestamps track creation and events
- JSON fields (e.g. plan features) stored as text

---

## 📚 API Documentation

All routes are prefixed with `/api`.

### 1. Authentication

| Method | Endpoint                   | Auth | Description               |
| ------ | -------------------------- | ---- | ------------------------- |
| POST   | `/api/auth/staff/login`    | ❌   | Staff login (returns JWT) |
| POST   | `/api/auth/guest/register` | ❌   | Guest registration        |

### 2. Rooms

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | /api/rooms                 | List all rooms           |
| GET    | /api/rooms/availability    | Check room availability  |
| PUT    | /api/rooms/\:roomId/status | Update room status (JWT) |

### 3. Bookings

| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| POST   | /api/bookings/create               | Create new booking      |
| GET    | /api/bookings                      | List all bookings (JWT) |
| PUT    | /api/bookings/\:bookingId/checkin  | Check-in guest (JWT)    |
| PUT    | /api/bookings/\:bookingId/checkout | Check-out guest (JWT)   |

### 4. Guests

| Method | Endpoint                          | Description                    |
| ------ | --------------------------------- | ------------------------------ |
| GET    | /api/guests/\:guestId             | Get guest info (JWT)           |
| PUT    | /api/guests/\:guestId/preferences | Update guest preferences (JWT) |
| GET    | /api/guests/\:guestId/history     | Get guest stay history (JWT)   |

### 5. Housekeeping

| Method | Endpoint                          | Description                       |
| ------ | --------------------------------- | --------------------------------- |
| GET    | /api/housekeeping/schedule        | View housekeeping schedule (JWT)  |
| POST   | /api/housekeeping/request         | Create housekeeping request (JWT) |
| PUT    | /api/housekeeping/\:taskId/status | Update task status (JWT)          |

### 6. Restaurant

| Method | Endpoint                                | Description               |
| ------ | --------------------------------------- | ------------------------- |
| GET    | /api/restaurant/menu                    | View restaurant menu      |
| POST   | /api/restaurant/order                   | Place order               |
| GET    | /api/restaurant/orders                  | List all orders (JWT)     |
| PUT    | /api/restaurant/orders/\:orderId/status | Update order status (JWT) |

### 7. Bills

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | /api/bills/\:bookingId | Get bill for booking (JWT) |
| POST   | /api/bills/payment     | Process payment (JWT)      |

### 8. Inventory

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | /api/inventory       | View inventory items (JWT)   |
| POST   | /api/inventory/usage | Record inventory usage (JWT) |

### 9. Amenities

| Method | Endpoint                        | Description            |
| ------ | ------------------------------- | ---------------------- |
| GET    | /api/amenities/spa/availability | Check spa availability |
| POST   | /api/amenities/spa/book         | Book spa appointment   |

### 10. Requests

| Method | Endpoint                          | Description                      |
| ------ | --------------------------------- | -------------------------------- |
| POST   | /api/requests/create              | Create guest/maintenance request |
| GET    | /api/requests                     | View all requests (JWT)          |
| PUT    | /api/requests/\:requestId/resolve | Resolve request (JWT)            |

### 11. Staff

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | /api/staff/schedule   | View staff schedule (JWT)   |
| POST   | /api/staff/attendance | Mark staff attendance (JWT) |

### 12. Reports

| Method | Endpoint                        | Description                      |
| ------ | ------------------------------- | -------------------------------- |
| GET    | /api/reports/occupancy          | Occupancy report (Manager/Admin) |
| GET    | /api/reports/revenue            | Revenue report (Manager/Admin)   |
| GET    | /api/reports/guest-satisfaction | Guest satisfaction report        |

---

🛡️ **Middleware**

- authMiddleware.js – JWT token verification
- roleCheck.js – Role-based access control
- audit.js – Logs requests for audit trail
- errorHandler.js – Central error handling
- validateInput.js – Request body validation

🛠️ **Utilities**

- hashPassword.js – bcrypt helpers
- generateJWT.js – JWT helpers
- availability.js – Room availability checks
- pricing.js – Billing and taxes
- constants.js – Central roles, statuses
- helpers.js – Miscellaneous helpers

## 💭 Assumptions Made

- Staff passwords stored hashed (bcrypt)

- JWT-based authentication for staff

- Guests register without JWT

- Roles enforced with middleware

- Foreign keys enabled in SQLite

- All inputs validated with middleware

- Designed for easy migration to PostgreSQL

---

> © 2025 Hotel Management Backend Team
