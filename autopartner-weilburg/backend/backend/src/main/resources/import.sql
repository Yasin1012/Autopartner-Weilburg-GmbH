-- Seed data for Autopartner Weilburg Backend
-- Admin user: username=admin, password=admin123
-- Regular user: username=user, password=user123

-- Insert admin user (password: admin123, hashed with BCrypt cost 12)
INSERT INTO users (username, password, role, created_at) VALUES 
('admin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN96VFog.dGaLkUMvPW.S', 'ADMIN', CURRENT_TIMESTAMP);

-- Insert regular user (password: user123, hashed with BCrypt cost 12)
INSERT INTO users (username, password, role, created_at) VALUES 
('user', '$2a$12$HqWqEa89r5vKClkGGUHEI.GhkCPLhT0L4RQBiGW0Pm.9m.6p.6ZOu', 'USER', CURRENT_TIMESTAMP);

-- Insert sample vehicles
INSERT INTO vehicles (model, type, first_registration, mileage, equipment, price, active, created_at) VALUES 
('BMW 320d', 'Limousine', '2020-03-15', 45000, 'Leder, Navi, Klimaautomatik, PDC', 28900.00, true, CURRENT_TIMESTAMP),
('Mercedes-Benz C 200', 'Kombi', '2021-06-20', 32000, 'AMG Line, Navi Premium, LED, Keyless', 35500.00, true, CURRENT_TIMESTAMP),
('Audi A4 2.0 TDI', 'Limousine', '2019-11-10', 68000, 'S-Line, Virtual Cockpit, Matrix LED', 26900.00, true, CURRENT_TIMESTAMP),
('VW Golf 8 GTI', 'Kompaktwagen', '2022-01-05', 18000, 'DCC, Panoramadach, Navi Discover Pro', 32900.00, true, CURRENT_TIMESTAMP),
('Porsche 911 Carrera', 'Sportwagen', '2020-09-12', 25000, 'Sportabgasanlage, PASM, Sport Chrono', 98500.00, true, CURRENT_TIMESTAMP);

