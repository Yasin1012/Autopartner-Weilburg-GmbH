-- Seed data for Autopartner Weilburg Backend
-- Note: Users are created programmatically via StartupBean.java
-- Default users: admin/admin123 (ADMIN), user/user123 (USER)

-- Insert sample vehicles
INSERT INTO vehicles (model, type, first_registration, mileage, equipment, price, active, description, images, created_at) VALUES 
('BMW 320d', 'Limousine', '2020-03-15', 45000, 'Leder, Navi, Klimaautomatik, PDC', 28900.00, true, 
 'Sportliche Limousine mit effizienter Dieseltechnologie. Perfekt für Langstrecken und Business. Sehr gepflegter Zustand, Scheckheftgepflegt, Nichtraucherfahrzeug.', 
 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800,https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 
 CURRENT_TIMESTAMP),
('Mercedes-Benz C 200', 'Kombi', '2021-06-20', 32000, 'AMG Line, Navi Premium, LED, Keyless', 35500.00, true, 
 'Eleganter Kombi mit AMG-Sportpaket. Ideales Familienauto mit viel Platz und modernster Technik. Erster Besitz, alle Services bei Mercedes durchgeführt.', 
 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800,https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800', 
 CURRENT_TIMESTAMP),
('Audi A4 2.0 TDI', 'Limousine', '2019-11-10', 68000, 'S-Line, Virtual Cockpit, Matrix LED', 26900.00, true, 
 'Moderne Limousine mit innovativem Cockpit. Sparsamer TDI-Motor mit ausgezeichneter Performance. Volldigitales Instrumenten-Display, Head-up Display.', 
 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800,https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800', 
 CURRENT_TIMESTAMP),
('VW Golf 8 GTI', 'Kompaktwagen', '2022-01-05', 18000, 'DCC, Panoramadach, Navi Discover Pro', 32900.00, true, 
 'Sportlicher Kompaktwagen mit Power. Der Klassiker unter den Hot Hatches. Adaptive Dämpfer, großes Panorama-Glasdach, top Ausstattung.', 
 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800,https://images.unsplash.com/photo-1632294473709-d9b5a75d9c63?w=800', 
 CURRENT_TIMESTAMP),
('Porsche 911 Carrera', 'Sportwagen', '2020-09-12', 25000, 'Sportabgasanlage, PASM, Sport Chrono', 98500.00, true, 
 'Ikone des Sportwagenbaus. Zeitloses Design trifft auf moderne Performance. Sport Chrono Paket, PASM Sport-Fahrwerk, Sport-Abgasanlage mit Klappensteuerung.', 
 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800,https://images.unsplash.com/photo-1611821064430-f9ab1b87c531?w=800', 
 CURRENT_TIMESTAMP);

