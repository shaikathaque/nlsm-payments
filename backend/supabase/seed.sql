insert into athletes
  (id, first_name, last_name, dob, branch, email, phone)
values
  (1, 'Christiano', 'Ronaldo', '1995-04-08', 'BASHUNDHARA_SG', 'example1@gmail.com', '1234567890'),
  (2, 'Lionel', 'Messi', '1995-03-10', 'UTTARA_IHSB', 'example2@gmail.io', '0987654321'),
  (3, 'Neymar', 'Santos', '2000-01-01', 'BASHUNDHARA_SG', 'example3@gmail.io', '1029384756');


insert into athlete_progress
  (athlete_id, passing, dribbling, discipline, attendance, comments)
values
  -- Christiano Ronaldo
  (1, 1, 10, 5, 5, 'Works hard, needs to listen to coach more.'),
  (1, 2, 10, 6, 6, 'Improving'),
  (1, 4, 10, 6, 6, 'Can do better'),

  -- Messi
  (2, 10, 10, 10, 10, 'Megesterial'),
  (2, 10, 10, 10, 10, 'Keep up the good work'),
  (2, 10, 10, 10, 10, 'Well done!'),

  -- Neymar
  (3, 7, 10, 7, 8, 'Needs to keep working harder'),
  (3, NULL, NULL, NULL, NULL, 'Out due to injury'),
  (3, NULL, NULL, NULL, NULL, 'Still recovering from surgery');
