import cookies from "next-cookies";

// jika user ter-autorisasi maka redirect ke halaman dashboard
export function unauthPage(ctx) {
  return new Promise((resolve) => {
    const allCookies = cookies(ctx);

    if (allCookies.token) {
      return ctx.res
        .writeHead(302, {
          location: "/posts",
        })
        .end();
    }
    return resolve("unauthorized");
  });
}

export function authPage(ctx) {
  return new Promise((resolve) => {
    const allCookies = cookies(ctx);

    if (!allCookies.token) {
      return ctx.res
        .writeHead(302, {
          location: "/auth/login",
        })
        .end();
    }
    return resolve({
      token: allCookies.token,
    });
  });
}
