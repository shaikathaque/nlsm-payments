insert into athletes
  (id, first_name, last_name, dob, branch, email, phone)
values
  (1, 'Shaikat', 'Haque', '1995-04-08', 'BASHUNDHARA_SG', 'shaikathaque4@gmail.com@gmail.com', '1234567890'),
  (2, 'Rahbar', 'Khan', '1995-03-10', 'UTTARA_IHSB', 'nlsmbd.dev@gmail.com', '0987654321'),
  (3, 'Shayer', 'Khan', '2000-01-01', 'BASHUNDHARA_SG', 'info.nlsmbd@gmail.com', '1029384756');

SELECT vault.create_secret(
    'http://host.docker.internal:54321', 
    'project_url', 
    'URL to be used for calling edge functions, this is set here because we want to develop edge functions with webhohks from database triggers in multiple environments'
);

-- Insert users
INSERT INTO auth.users 
  (id, email) 
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'shaikat@hawkapps.io'),
  ('00000000-0000-0000-0000-000000000001', 'nlsmbd.dev@gmail.com'),
  ('00000000-0000-0000-0000-000000000002', 'info.nlsmbd@gmail.com');

-- Insert user athletes
INSERT INTO user_athletes
  (user_id, athlete_id)
VALUES
  ('00000000-0000-0000-0000-000000000000', 1),
  ('00000000-0000-0000-0000-000000000001', 2),
  ('00000000-0000-0000-0000-000000000002', 3);

-- Commenting out because we don't want to end up triggering emails during every seed
-- Especially during the CI/CD pipeline
-- insert into athlete_progress
--   (athlete_id, comments, scores)
-- values
--   -- Christiano Ronaldo
--   (1, 'Works hard, needs to listen to coach more.', '{"passing": 1, "dribbling": 10, "discipline": 5, "attendance": 5}'),
--   (1, 'Improving', '{"passing": 2, "dribbling": 10, "discipline": 6, "attendance": 6}'),
--   (1, 'Can do better', '{"passing": 4, "dribbling": 10, "discipline": 6, "attendance": 6}'),

--   -- Messi
--   (2, 'Megesterial', '{"passing": 10, "dribbling": 10, "discipline": 10, "attendance": 10}'),
--   (2, 'Keep up the good work', '{"passing": 10, "dribbling": 10, "discipline": 10, "attendance": 10}'),
--   (2, 'Well done!', '{"passing": 10, "dribbling": 10, "discipline": 10, "attendance": 10}'),

--   -- Neymar
--   (3, 'Needs to keep working harder', '{"passing": 7, "dribbling": 10, "discipline": 7, "attendance": 8}'),
--   (3, 'Out due to injury', NULL),
--   (3, 'Still recovering from surgery', NULL);
