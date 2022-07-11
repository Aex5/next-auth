import { authPage } from "../../middlewares/authorizationPage";
import { useState } from "react";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  // token destructure dari ctx
  const { token } = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();
  console.log(posts);

  return {
    props: {
      token,
      posts: posts.data,
    },
  };
}

export default function PostIndex(props) {
  const [postsState, setPostsState] = useState(props.posts);

  // membuaat fungsi delete
  async function deleteHandler(id, e) {
    e.preventDefault();

    const ask = confirm("Are you sure?");

    if (ask === true) {
      const deletePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });

      const res = await deletePost.json();

      // update data di UI dengan filter setelah di hapuus lewat API
      const postsFiltered = postsState.filter((post) => {
        return post.id !== id && post;
      });

      setPostsState(postsFiltered);

      console.log(res);
    }
  }

  function editHandler(id) {
    Router.push("/posts/edit/" + id);
  }

  return (
    <div>
      <h1>Posts</h1>
      {postsState.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={editHandler.bind(this, post.id)}>Edit</button>
            <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
