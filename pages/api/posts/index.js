import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  // megatasi jika token expired atau tidak ada maka yang muncul bukan error system melainkan error karena tidak ada token yang tidak akan mempengaruhi aplikasi

  const auth = await authorization(req, res);

  if (req.method !== "GET") return res.status(405).end();

  // men select seluruh data di table posts
  const posts = await db("posts");

  res.status(200);
  res.json({ messege: "Hello read", data: posts });
}
