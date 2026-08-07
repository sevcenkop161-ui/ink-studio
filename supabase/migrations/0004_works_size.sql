-- Adds masonry sizing to works (missed in the initial schema — the
-- static data this replaces had a "size" field driving card proportions
-- in the Works gallery, and the DB schema didn't carry it over).

alter table works
  add column size text not null default 'square'
  check (size in ('square', 'tall', 'wide'));

update works set size = 'tall' where title = 'Shadow Wolf';
update works set size = 'square' where title = 'Botanical Line';
update works set size = 'wide' where title = 'Portrait Study';
update works set size = 'tall' where title = 'Phoenix Rising';
update works set size = 'square' where title = 'Geometric Stag';
update works set size = 'wide' where title = 'Single Line Wave';
update works set size = 'tall' where title = 'Koi in Color';
update works set size = 'square' where title = 'Traditional Rose';
update works set size = 'tall' where title = 'Linework Portrait';
update works set size = 'square' where title = 'Realistic Lion';
update works set size = 'wide' where title = 'Minimal Mountain';
update works set size = 'wide' where title = 'Blackwork Mandala';
