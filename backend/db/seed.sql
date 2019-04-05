DROP DATABASE IF EXISTS earworm_report;
CREATE DATABASE earworm_report;

\c earworm_report;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS comments;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre_name TEXT
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  img_url TEXT,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  genre_id INT REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  song_id INT REFERENCES songs(id) ON DELETE CASCADE
);

ALTER TABLE favorites
ADD CONSTRAINT UQ_user_id_song_id UNIQUE(user_id, song_id);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_body TEXT,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  song_id INT REFERENCES songs(id) ON DELETE CASCADE
);


INSERT INTO users (username)
VALUES ('Nielene'),
('Sally'),
('Sandy'),
('Shan'),
('Sarai'),
('Su'),
('Slick'),
('Sean'),
('SnowJon'),
('Shawn');

INSERT INTO genres (genre_name)
VALUES ('Soca'),
('Reggae'),
('HipHop/Rap'),
('Pop/NewR&B'),
('Country');

INSERT INTO songs (title, img_url, user_id, genre_id)
VALUES ('Body Like a Back Road','https://s3.amazonaws.com/roughstock-production/2017/02/SamHuntBody610.jpg', 1, 5),
('Dangerous', 'https://i.ytimg.com/vi/gUevS9OJe0w/hqdefault.jpg', 2, 2),
('Patiently Waiting', 'https://i.pinimg.com/originals/c2/b7/f2/c2b7f237a7e834c0d9309900b921e3fa.jpg', 4, 3),
('I''m Only Human', 'https://i.pinimg.com/originals/0e/b2/e4/0eb2e499fef9a6f8d910ca8b48419e06.jpg', 4, 5),
('Somebody That I Used To Know', 'https://i1.sndcdn.com/artworks-000236054898-2q8n7u-t500x500.jpg', 10, 4),
('Like Ah Boss', 'https://i.ytimg.com/vi/1lh7IF6lK0g/maxresdefault.jpg', 7, 1),
('Girl Crush', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/LBTGIRLCRUSHSINGLEART.jpg/220px-LBTGIRLCRUSHSINGLEART.jpg', 3, 5),
('Live Your Life', 'https://i.ytimg.com/vi/Yv9U5mgDekk/hqdefault.jpg', 4, 3),
('Miserable Life', 'https://m.media-amazon.com/images/I/91DGQGFYMKL._SS500_.jpg', 5, 2),
('Radica', 'https://i.ytimg.com/vi/yjngH8k2D9o/hqdefault.jpg', 8, 1),
('Just a Dream', 'http://www.sonicamp.com/images/videos/nelly_justadream.jpg', 1, 4),
('Redemption Song', 'https://i.ytimg.com/vi/TiKffuLyajQ/hqdefault.jpg', 6, 2),
('Kim', 'http://2.bp.blogspot.com/-Khj31GVsd90/VRqfUrJpnqI/AAAAAAAABE4/2ygNCZ-x_gw/s1600/Kim%2BBy%2BEminem%2B(DopeSong.blogspot.com).jpg', 5, 3),
('The Caribbean Man', 'https://img.discogs.com/gdzsFNNXQA-IW16VwTgNIJwLoD0=/fit-in/600x595/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-5420990-1429466568-6623.jpeg.jpg', 9, 1),
('Medicine', 'https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2Fb1ba5c773e05f0cc14d03a73b78c95d8.503x503x1.jpg', 2, 4);

INSERT INTO favorites (user_id, song_id)
VALUES (1 , 1), (2 , 2), (3 , 3), (4 , 4), (5 , 5), (6 , 6), (7 , 7), (8 , 8), (9 , 9), (10 , 10),
(1 , 11), (2 , 12), (3 , 13), (4 , 14), (5 , 15), (6 , 1), (7 , 2), (8 , 3), (9 , 4), (10 , 5),
(1 , 6), (2 , 7), (3 , 8), (4 , 9), (5 , 10), (6 , 11), (7 , 12), (8 , 13), (9 , 14), (10 , 15),
(1 , 15), (2 , 14), (3 , 1), (4 , 12), (5 , 11), (6 , 10), (7 , 9), (8 , 4), (9 , 7), (10 , 6),
(1 , 7), (2, 8), (3, 7);


-- escape quotes in sql
INSERT INTO comments (comment_body, user_id, song_id)
VALUES ('good song' , 1, 1), ('ear splitting' , 1, 11),
('i liked it' , 2, 2), ('learn to drum' , 2, 12),
('best song' , 3, 3), ('again! why, man?' , 3, 13),
('don''t make them like this anymore' , 4, 4), ('noice.' , 4, 14),
('yeah' , 5, 5), ('won''t you be original?' , 5, 15),
('yes' , 6, 6), ('tonight is the night' , 6, 1),
('definitely' , 7, 7), ('tomorrow never dies. neither does love. nor this song''s repetitive lines!' , 7, 2),
('thanks!' , 8, 8), ('another one!?' , 8, 3),
('almost as good as Best Song Ever' , 9, 9), ('creep' , 9, 4),
('Almost, but not quite' , 10, 10), ('did you know we can do this neat thing now: make music' , 10, 5);
