-- Guests
CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    passwordHash TEXT,
    idType TEXT,
    idNumber TEXT,
    loyaltyPoints INTEGER DEFAULT 0,
    membershipTier TEXT DEFAULT 'Standard',
    preferences TEXT
);

-- Staff
CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employeeId TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    passwordHash TEXT,
    role TEXT NOT NULL,
    department TEXT,
    shift TEXT
);

-- Room Types
CREATE TABLE IF NOT EXISTS room_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    basePrice REAL NOT NULL,
    maxOccupancy INTEGER,
    amenities TEXT
);

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomNumber TEXT UNIQUE NOT NULL,
    typeId INTEGER,
    floor INTEGER,
    status TEXT DEFAULT 'available',
    pricePerNight REAL,
    lastCleaned TEXT,
    FOREIGN KEY (typeId) REFERENCES room_types(id)
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guestId INTEGER,
    roomId INTEGER,
    checkInDate TEXT,
    checkOutDate TEXT,
    status TEXT DEFAULT 'pending',
    specialRequests TEXT,
    paymentStatus TEXT DEFAULT 'unpaid',
    FOREIGN KEY (guestId) REFERENCES guests(id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
);

-- Housekeeping
CREATE TABLE IF NOT EXISTS housekeeping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId INTEGER,
    scheduledDate TEXT,
    type TEXT,
    status TEXT DEFAULT 'pending',
    assignedStaffId INTEGER,
    specialInstructions TEXT,
    FOREIGN KEY (roomId) REFERENCES rooms(id),
    FOREIGN KEY (assignedStaffId) REFERENCES staff(id)
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    available INTEGER DEFAULT 1,
    preparationTime INTEGER
);

-- Restaurant Orders
CREATE TABLE IF NOT EXISTS restaurant_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId INTEGER,
    items TEXT,
    totalAmount REAL,
    status TEXT DEFAULT 'preparing',
    createdAt TEXT,
    FOREIGN KEY (roomId) REFERENCES rooms(id)
);

-- Inventory
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    currentStock INTEGER,
    reorderPoint INTEGER,
    unit TEXT,
    supplier TEXT
);

-- Bills
CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookingId INTEGER,
    details TEXT,
    subtotal REAL,
    taxes REAL,
    totalAmount REAL,
    paymentStatus TEXT DEFAULT 'unpaid',
    FOREIGN KEY (bookingId) REFERENCES bookings(id)
);

-- Requests/Complaints
CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId INTEGER,
    type TEXT,
    priority TEXT,
    description TEXT,
    status TEXT DEFAULT 'open',
    resolution TEXT
);

-- Spa / Amenities Bookings
CREATE TABLE IF NOT EXISTS spa_bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId INTEGER,
    service TEXT,
    date TEXT,
    time TEXT,
    duration INTEGER,
    therapistPreference TEXT,
    status TEXT DEFAULT 'booked',
    FOREIGN KEY (roomId) REFERENCES rooms(id)
);

-- Staff Attendance
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    staffId INTEGER,
    date TEXT,
    shift TEXT,
    status TEXT,
    FOREIGN KEY (staffId) REFERENCES staff(id)
);

