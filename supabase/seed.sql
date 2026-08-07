-- Demo content matching what currently lives in src/data/*.ts and the
-- messages/*.json files. Phase 11 swaps the frontend over to read this
-- instead of the static files — content should match exactly so nothing
-- visibly changes for a visitor when that switch happens.
--
-- Fixed ids are used (instead of letting gen_random_uuid() pick) purely
-- so this file stays readable and the works→artist references below are
-- easy to follow.
--
-- Reviews are intentionally left unseeded here — that copy gets written
-- in Phase 13 together with the Reviews section itself.

insert into artists
  (id, name, slug, bio_en, bio_ru, specialization_en, specialization_ru, experience_years)
values
  (
    '00000000-0000-0000-0000-000000000001', 'Alex', 'alex',
    'Alex works in heavy blackwork and graphic shapes, building tattoos the way a poster designer builds a layout — strong silhouettes first, detail second. Best known for large-scale pieces that hold up from across the room.',
    'Алекс работает в технике блэкворк и графичных форм, выстраивая тату так, как дизайнер выстраивает постер — сначала силуэт, потом детали. Известен крупными работами, которые считываются издалека.',
    'Blackwork / Graphic', 'Блэкворк / Графика', 7
  ),
  (
    '00000000-0000-0000-0000-000000000002', 'Mia', 'mia',
    'Mia''s fine-line and minimal work is about restraint — thin, confident lines and a lot of empty space. A favourite for first tattoos and quiet, personal pieces.',
    'Мия работает в технике тонких линий и минимализма — уверенные тонкие линии и много пустого пространства. Частый выбор для первой татуировки и камерных личных работ.',
    'Fine Line / Minimal', 'Тонкие линии / Минимализм', 5
  ),
  (
    '00000000-0000-0000-0000-000000000003', 'Noah', 'noah',
    'Noah specializes in color realism — portraits, animals, nature — built up in careful layers over multiple sessions. Technical precision with a painter''s eye for color.',
    'Ной специализируется на цветном реализме — портреты, животные, природа — выстроенных послойно за несколько сеансов. Техническая точность и взгляд художника на цвет.',
    'Realism / Color', 'Реализм / Цвет', 9
  ),
  (
    '00000000-0000-0000-0000-000000000004', 'Eva', 'eva',
    'Eva reinterprets traditional tattoo motifs with a modern illustrative style — bold outlines, saturated color, and a bit of storytelling in every piece.',
    'Ева переосмысляет традиционные мотивы тату в современном иллюстративном стиле — чёткий контур, насыщенный цвет и немного истории в каждой работе.',
    'Neo Traditional', 'Нео-традишнл', 6
  );

insert into services
  (id, slug, name_en, name_ru, description_en, description_ru, duration_display_en, duration_display_ru, price_from, duration_minutes)
values
  (
    '00000000-0000-0000-0000-000000000101', 'tattoo', 'Tattoo', 'Татуировка',
    'Custom tattoos across styles — blackwork, fine line, realism, color, and neo-traditional. Price and duration depend on size and detail and are confirmed during your consultation.',
    'Индивидуальные татуировки в разных стилях — блэкворк, тонкие линии, реализм, цвет, нео-традишнл. Цена и длительность зависят от размера и детализации и уточняются на консультации.',
    'From ~2 hours', 'От ~2 часов', 80, 120
  ),
  (
    '00000000-0000-0000-0000-000000000102', 'piercing', 'Piercing', 'Пирсинг',
    'Professional piercing with sterile, single-use equipment and clear aftercare guidance.',
    'Профессиональный пирсинг со стерильным одноразовым инструментом и понятными рекомендациями по уходу.',
    '~20 min', '~20 минут', 35, 20
  ),
  (
    '00000000-0000-0000-0000-000000000103', 'consultation', 'Consultation', 'Консультация',
    'A free sit-down to talk placement, size, and style before booking a session — no commitment required.',
    'Бесплатная встреча, чтобы обсудить расположение, размер и стиль перед записью на сеанс — без обязательств.',
    '~20 min', '~20 минут', 0, 20
  );

insert into works
  (title, artist_id, category, description_en, description_ru)
values
  (
    'Shadow Wolf', '00000000-0000-0000-0000-000000000001', 'blackwork',
    'A heavy blackwork wolf built from solid negative space.',
    'Плотный блэкворк-волк, построенный на негативном пространстве.'
  ),
  (
    'Botanical Line', '00000000-0000-0000-0000-000000000002', 'fine-line',
    'Single-needle botanical study, kept light and airy.',
    'Ботанический эскиз одной иглой — лёгкий и воздушный.'
  ),
  (
    'Portrait Study', '00000000-0000-0000-0000-000000000003', 'realism',
    'Color realism portrait, built up over three sessions.',
    'Цветной реалистичный портрет, выполненный за три сеанса.'
  ),
  (
    'Phoenix Rising', '00000000-0000-0000-0000-000000000004', 'color',
    'Saturated neo-traditional phoenix with bold outlines.',
    'Насыщенный нео-традишнл феникс с чётким контуром.'
  ),
  (
    'Geometric Stag', '00000000-0000-0000-0000-000000000001', 'blackwork',
    'A stag reduced to clean geometric blackwork shapes.',
    'Олень, сведённый к чистым геометрическим формам блэкворка.'
  ),
  (
    'Single Line Wave', '00000000-0000-0000-0000-000000000002', 'minimal',
    'A minimal wave rendered in a single continuous line.',
    'Минималистичная волна одной непрерывной линией.'
  ),
  (
    'Koi in Color', '00000000-0000-0000-0000-000000000003', 'color',
    'Layered color work capturing movement in the water.',
    'Многослойная цветная работа с ощущением движения воды.'
  ),
  (
    'Traditional Rose', '00000000-0000-0000-0000-000000000004', 'color',
    'A rose in saturated traditional color and bold linework.',
    'Роза в насыщенном традиционном цвете с чётким контуром.'
  ),
  (
    'Linework Portrait', '00000000-0000-0000-0000-000000000002', 'fine-line',
    'A portrait built entirely from fine, deliberate lines.',
    'Портрет, полностью построенный на тонких выверенных линиях.'
  ),
  (
    'Realistic Lion', '00000000-0000-0000-0000-000000000003', 'realism',
    'Black-and-grey realism with careful shading and depth.',
    'Чёрно-серый реализм с проработанной светотенью.'
  ),
  (
    'Minimal Mountain', '00000000-0000-0000-0000-000000000002', 'minimal',
    'A quiet mountain range reduced to its simplest form.',
    'Горный хребет, сведённый к самой простой форме.'
  ),
  (
    'Blackwork Mandala', '00000000-0000-0000-0000-000000000001', 'blackwork',
    'A large-scale mandala built from precise blackwork patterns.',
    'Крупная мандала из точных блэкворк-узоров.'
  );
