-- Reviews content for the Reviews section (Phase 13). Kept separate from
-- seed.sql because that file uses fixed ids for artists/services/works —
-- re-running it would violate the primary key uniqueness on a database
-- that already has those rows. This one is safe to run once, standalone.

insert into reviews (name, rating, text_en, text_ru, artist_id)
values
  (
    'Lena K.', 5,
    'Alex nailed exactly what I described after just one sketch. The blackwork piece looks even better in person than I imagined.',
    'Алекс с одного эскиза попал ровно в то, что я описывала. Блэкворк вживую выглядит даже лучше, чем я представляла.',
    (select id from artists where slug = 'alex')
  ),
  (
    'Tom R.', 5,
    'Super gentle process, Mia explained every step. The line work is incredibly clean.',
    'Очень бережный процесс, Мия объясняла каждый шаг. Линии невероятно чистые.',
    (select id from artists where slug = 'mia')
  ),
  (
    'Sofia M.', 4,
    'Took three sessions but the portrait turned out amazing. Would''ve liked a bit more heads-up on the total time.',
    'Потребовалось три сеанса, но портрет получился потрясающий. Было бы неплохо заранее чуть точнее понимать общее время.',
    (select id from artists where slug = 'noah')
  ),
  (
    'Daniel P.', 5,
    'The whole studio has this calm, professional vibe from the moment you walk in. Booking online was effortless too.',
    'У всей студии спокойная, профессиональная атмосфера с порога. И записаться онлайн было очень просто.',
    null
  ),
  (
    'Anna B.', 5,
    'Eva''s colors are unreal — exactly the bold look I wanted for my sleeve piece.',
    'Цвета у Евы нереальные — ровно тот смелый стиль, который я хотела для рукава.',
    (select id from artists where slug = 'eva')
  ),
  (
    'Chris W.', 5,
    'First tattoo ever and they made it a genuinely calm experience, not scary at all.',
    'Первая татуировка в жизни, и они сделали процесс по-настоящему спокойным, совсем не страшным.',
    null
  );
