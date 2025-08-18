-- Dados iniciais para desenvolvimento e demonstração

-- Inserir perfil de barbeiro demo
INSERT INTO profiles (id, email, full_name, phone, role) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'barbeiro@demo.com', 'João Silva', '(11) 99999-9999', 'barbeiro'),
('550e8400-e29b-41d4-a716-446655440001', 'cliente@demo.com', 'Maria Santos', '(11) 88888-8888', 'cliente');

-- Inserir barbearia demo
INSERT INTO barbershops (id, name, description, address, phone, whatsapp, owner_id, opening_hours) VALUES 
('660e8400-e29b-41d4-a716-446655440000', 'Barbearia Premium', 'A melhor barbearia da região com atendimento de qualidade', 'Rua das Flores, 123 - Centro', '(11) 3333-3333', '5511999999999', '550e8400-e29b-41d4-a716-446655440000', 
'{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}, "wednesday": {"open": "09:00", "close": "18:00"}, "thursday": {"open": "09:00", "close": "18:00"}, "friday": {"open": "09:00", "close": "19:00"}, "saturday": {"open": "08:00", "close": "17:00"}, "sunday": {"closed": true}}');

-- Inserir barbeiro demo
INSERT INTO barbers (id, profile_id, barbershop_id, specialties, bio, experience_years, rating) VALUES 
('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', ARRAY['corte', 'barba', 'sobrancelha'], 'Barbeiro profissional com mais de 10 anos de experiência', 10, 4.8);

-- Inserir serviços demo
INSERT INTO services (barbershop_id, name, description, price, duration, category) VALUES 
('660e8400-e29b-41d4-a716-446655440000', 'Corte Masculino', 'Corte moderno e personalizado', 35.00, 30, 'corte'),
('660e8400-e29b-41d4-a716-446655440000', 'Barba Completa', 'Aparar e modelar barba', 25.00, 20, 'barba'),
('660e8400-e29b-41d4-a716-446655440000', 'Combo Corte + Barba', 'Corte + barba com desconto', 50.00, 45, 'combo'),
('660e8400-e29b-41d4-a716-446655440000', 'Sobrancelha', 'Design de sobrancelha masculina', 15.00, 15, 'sobrancelha');
