import jwt from 'jsonwebtoken';

//authenticates user
export const isAuth = (req, res, next) => {
  const auth = req.headers.auth;
  if (auth) {
    const token = auth.slice(7, auth.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token. Please Try Again!' });
        } else {
          req.customer = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token. Please Try Again!' });
  }
};

//authenticates admin
export const isAdmin = (req, res, next) => {
  if (req.customer && req.customer.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
