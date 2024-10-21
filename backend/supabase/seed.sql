insert into athletes
  (id, first_name, last_name, dob, branch, email, phone)
values
  (1, 'Christiano', 'Ronaldo', '1995-04-08', 'BASHUNDHARA_SG', 'nlsmbd.dev@gmail.com', '1234567890'),
  (2, 'Lionel', 'Messi', '1995-03-10', 'UTTARA_IHSB', 'nlsmbd.dev@gmail.com', '0987654321'),
  (3, 'Neymar', 'Santos', '2000-01-01', 'BASHUNDHARA_SG', 'nlsmbd.dev@gmail.com', '1029384756');

-- Commenting out to see if this causes error in CI
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
