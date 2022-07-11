import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/nav";

export async function getServerSideProps(ctx) {
  // token destructure dari ctx
  const { token } = await authPage(ctx);
  return { props: { token } };
}

export default function PostCreate(props) {
  const [fields, setFields] = useState({ title: "", content: "" });
  const [status, setStatus] = useState("normal");

  async function createHandler(e) {
    e.preventDefault();

    setStatus("loading...");

    const { token } = props;

    const create = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    if (!create.ok) return setStatus("error");

    const res = await create.json();

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
      <h1>Create Post</h1>
      <Nav />
      <form onSubmit={createHandler}>
        <input
          onChange={fieldHandler}
          type="text"
          placeholder="title"
          name="title"
        />{" "}
        <br />
        <textarea
          onChange={fieldHandler}
          placeholder="content"
          name="content"
        ></textarea>{" "}
        <br />
        <button type="submit">Post</button>
        <br />
        <div>{status}</div>
      </form>
    </div>
  );
}
