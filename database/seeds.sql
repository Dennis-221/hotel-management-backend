-- Room Types
INSERT INTO room_types (category, basePrice, maxOccupancy, amenities) VALUES
('Single', 3000, 1, 'WiFi,AC,TV'),
('Double', 4500, 2, 'WiFi,AC,TV,Mini Bar'),
('Suite', 8000, 4, 'WiFi,AC,TV,Mini Bar,Jacuzzi');

-- Rooms
INSERT INTO rooms (roomNumber, typeId, floor, status, pricePerNight) VALUES
('101', 1, 1, 'available', 3000),
('102', 2, 1, 'available', 4500),
('201', 3, 2, 'available', 8000);

-- Staff
INSERT INTO staff (employeeId, name, role, department, passwordHash) VALUES
('EMP001', 'John Manager', 'Manager', 'Front Office', '$2b$10$hashedpassword1'),
('EMP002', 'Sara Reception', 'Receptionist', 'Front Office', '$2b$10$hashedpassword2');

-- Menu Items
INSERT INTO menu_items (name, description, price, category, available, preparationTime) VALUES
('Continental Breakfast', 'Toast, eggs, juice, coffee', 450, 'breakfast', 1, 20),
('Veg Sandwich', 'Grilled with veggies', 250, 'snacks', 1, 10);

-- Inventory
INSERT INTO inventory (name, category, currentStock, reorderPoint, unit, supplier) VALUES
('Bath Towels', 'linens', 50, 100, 'pieces', 'ABC Linens Ltd'),
('Toiletries Kit', 'toiletries', 200, 300, 'pieces', 'XYZ Toiletries Ltd');


-- Bills
INSERT INTO bills (bookingId, details, subtotal, taxes, totalAmount, paymentStatus)
VALUES
(1, 'Room: 3 nights at 5000; Restaurant: 1500', 16500, 1485, 17985, 'unpaid');

-- Spa Bookings
INSERT INTO spa_bookings (roomId, service, date, time, duration, therapistPreference, status)
VALUES
(1, 'Swedish Massage', '2025-07-15', '10:00', 60, 'Any', 'booked');

-- Attendance
INSERT INTO attendance (staffId, date, shift, status)
VALUES
(1, '2025-07-10', 'Morning', 'present'),
(2, '2025-07-10', 'Evening', 'absent');

-- Sample Requests / Complaints
INSERT INTO requests (roomId, type, priority, description, status, resolution)
VALUES
(1, 'maintenance', 'high', 'AC not cooling properly', 'open', NULL),
(2, 'service', 'medium', 'Need extra blanket', 'resolved', 'Delivered blanket');
