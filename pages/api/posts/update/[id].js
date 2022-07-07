import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const auth = await authorization(req, res);

  const { id } = req.query;
  console.log(id);
  const { title, content } = req.body;

  const update = await db("posts")
    .where({ id: id })
    .update({ title: title, content: content });

  const createdData = await db("posts").where({ id: id }).first();

  const updatedData = await db("posts").where({ id: id }).first();

  res.status(200);
  res.json({ messege: "Hello update post", data: updatedData });
}
