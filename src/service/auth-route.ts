export const checkAuthRoutes = (ctx: any, currentUser: any) => {
  // add routes here that you want to restrict for unauthenticated users
  const authRoutes: string[] = []; // example "/dummy"
  //   const unAuthRoutes: string[] = [];
  const { res, pathname } = ctx;
  if (res) {
    console.log(authRoutes.indexOf(pathname));
    if (authRoutes.indexOf(pathname) >= 0) {
      res.writeHead(302, "not allowed", {
        location: "/",
      });
      res.end();
    }
  }
  return {};
};
