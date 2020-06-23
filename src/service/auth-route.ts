export const checkAuthRoutes = (ctx: any, currentUser: any) => {
  // add routes here that you want to restrict for unauthenticated users
  const authRoutes: string[] = []; // example "/dummy"
  // add routes here that you want to restrict for authenticated users
  const unAuthRoutes: string[] = []; // example "/login"
  const { res, pathname } = ctx;
  if (res) {
    // if someone tries to enter protected route and is not authenticated
    if (authRoutes.indexOf(pathname) >= 0 && !!!currentUser) {
      res.writeHead(302, "not allowed", {
        // location to be changed to /login , once page is setup
        location: "/",
      });
      res.end();
    }
    // if someone tries to enter unprotected route and is already authenticated
    if (unAuthRoutes.indexOf(pathname) >= 0 && !!currentUser) {
      res.writeHead(302, "not allowed", {
        location: "/",
      });
      res.end();
    }
  }
  return {};
};
