import { useState, useEffect } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("normal");

  async function loginHandler(e) {
    e.preventDefault();
    setStatus("loading...");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error" + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus("success");

    cookie.set("token", loginRes.token);

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
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <input
          onChange={fieldHandler}
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          onChange={fieldHandler}
          name="password"
          type="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
        <br /> <div>status:{status}</div>
      </form>
    </div>
  );
}
