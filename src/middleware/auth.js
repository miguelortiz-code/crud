import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ msg: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};