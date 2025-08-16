import db from '../config/db.js';

export const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

export const createUser = (user, callback) => {
  db.query('INSERT INTO users SET ?', user, callback);
};

// 🔹 Renombrada para no chocar con el controller
export const getAllUsers = callback => {
  db.query('SELECT * FROM users', callback);
};

export const updateUser = (id, user, callback) => {
  db.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
};

export const deleteUser = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
};