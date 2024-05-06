CREATE DATABASE notes_app;

USE notes_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT NOT NULL,
    shared_whith_id INT,
    FOREIGN KEY (todo_id) REFERENCES todo(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_whith_id) REFERENCES users(id) ON DELETE CASCADE
);

-- insertar usuarios 
INSERT INTO users (name, email, password) VALUES ('nati', 'natikitty@gmail.com', 'helloKitty');
INSERT INTO users (name, email, password) VALUES ('pedro', 'pedro@gmail.com', 'pedro1312');
INSERT INTO users (name, email, password) VALUES ('emiliano', 'emiliano@gmail.com', 'zapatavive');

INSERT INTO todo (title, user_id) VALUES 
('Estudiar react native', 3),
('Reunion', 3),
('almorzar', 3),
('sisas1', 3),
('sisas2', 3),
('sisas3', 3);

INSERT INTO shared_todo (todo_id, user_id, shared_whith_id) VALUES (1, 3, 2);

SELECT tod.*, shared_todo.shared_whith_id FROM todo LEFT JOIN shared_todo ON todo_id = shared_todo.todo_id WHERE todo.user_id = [user_id] OR shared_todo.shared_whith_id = [user_id];