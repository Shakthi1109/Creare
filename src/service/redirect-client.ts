export const redirectClient = (ctx: any) => {
  const { res } = ctx;
  if (res) {
    res.writeHead(302, "error", {
      location: "/",
    });
    res.end();
  }
};
