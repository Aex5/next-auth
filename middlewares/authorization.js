import jwt from "jsonwebtoken";

export default function authorization(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).end();

    // membagi data di authorizon menjadi dua dan men destructur
    const authSplit = authorization.split(" ");
    const [authType, authToken] = [authSplit[0], authSplit[1]];

    if (authType !== "Bearer") return res.status(401).end();

    // melakukan decode dengan secret key yang sudah dibuat di halaman register
    return jwt.verify(authToken, "secret", function (err, decode) {
      if (err) return res.status(401).end();

      return resolve(decode);
    });
  });
}
