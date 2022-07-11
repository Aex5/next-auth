import Link from "next/link";
import cookie from "js-cookie";
import Router from "next/router";

export default function Nav() {
  function logoutHandler(e) {
    e.preventDefault();

    cookie.remove("token");
    Router.replace("/auth/login");
  }

  return (
    <div>
      <Link href="/posts">
        <a>posts</a>
      </Link>
      &nbsp; | &nbsp;
      <Link href="/posts/create">
        <a>Create post</a>
      </Link>
      &nbsp; | &nbsp;
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
}
