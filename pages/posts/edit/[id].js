import { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  // token destructure dari ctx
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch("http://localhost:3000/api/posts/detail/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await postReq.json();
  console.log(res);

  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function PostEdit(props) {
  const [fields, setFields] = useState({ title: "", content: "" });
  const [status, setStatus] = useState("normal");

  async function updateHandler(e) {
    e.preventDefault();

    setStatus("loading...");

    const { token } = props;

    const update = await fetch("/api/posts/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    if (!update.ok) return setStatus("error");

    const res = await update.json();

    setStatus("success");

    Router.push("/posts");
  }

  function fieldHandler(e) {
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={updateHandler}>
        <input
          onChange={fieldHandler}
          type="text"
          placeholder="title"
          name="title"
          defaultValue={props.post.title}
        />
        <br />
        <textarea
          onChange={fieldHandler}
          placeholder="content"
          name="content"
          defaultValue={props.post.content}
        ></textarea>
        <br />
        <button type="submit">Post</button>
        <br />
        <div>{status}</div>
      </form>
    </div>
  );
}
