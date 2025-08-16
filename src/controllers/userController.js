import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  findUserByEmail,
  createUser,
  getAllUsers,   // 👈 corregido
  updateUser,
  deleteUser
} from '../models/UserModel.js';

export const register = (req, res) => {
  const { name, email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (results.length > 0) return res.status(400).json({ msg: 'Usuario ya existe' });

    const hashed = bcrypt.hashSync(password, 10);
    createUser({ name, email, password: hashed }, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: 'Usuario registrado' });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (!results.length || !bcrypt.compareSync(password, results[0].password)) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

// 🔹 Aquí ya no choca porque el modelo es getAllUsers
export const getUsers = (req, res) => {
  getAllUsers((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const updateUserController = (req, res) => {
  updateUser(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Usuario actualizado' });
  });
};

export const deleteUserController = (req, res) => {
  deleteUser(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Usuario eliminado' });
  });
};