-- Test seed data for Autopartner Weilburg Backend
-- Note: Users are created programmatically via StartupBean.java

-- Insert sample vehicles for testing
INSERT INTO vehicles (model, type, first_registration, mileage, equipment, price, active, created_at) VALUES 
('BMW 320d', 'Limousine', '2020-03-15', 45000, 'Leder, Navi, Klimaautomatik, PDC', 28900.00, true, CURRENT_TIMESTAMP),
('Mercedes-Benz C 200', 'Kombi', '2021-06-20', 32000, 'AMG Line, Navi Premium, LED, Keyless', 35500.00, true, CURRENT_TIMESTAMP),
('Audi A4 2.0 TDI', 'Limousine', '2019-11-10', 68000, 'S-Line, Virtual Cockpit, Matrix LED', 26900.00, true, CURRENT_TIMESTAMP);

