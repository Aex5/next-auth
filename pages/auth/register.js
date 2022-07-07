import { useState } from "react";

export default function register() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("normal");

  async function registerHandler(e) {
    e.preventDefault();

    setStatus("loading...");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { "Content-Type": "application/json" },
    });

    if (!registerReq.ok) return setStatus("error" + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus("success");
  }

  function fieldHandler(e) {
    const name = e.target.name;
    setFields({
      //supaya data yang sebelumnya tidak ke replace maka menggunakan sprate operator
      ...fields,
      //  kurung kotak supaya dynamic , tidak usah diisi email dan password secara manusl
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <br />
      <p>{status}</p>
      <form onSubmit={registerHandler}>
        <input
          name="email"
          onChange={fieldHandler}
          type="text"
          placeholder="email"
        />
        <br />
        <input
          name="password"
          onChange={fieldHandler}
          type="password"
          placeholder="password"
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
