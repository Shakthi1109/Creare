export const envCheck = () => {
  const { PORT, MONGO_URI, JWT_KEY } = process.env;

  if (!PORT) throw new Error("PORT is required");
  if (!MONGO_URI) throw new Error("MONGO connection string is required");
  if (!JWT_KEY) throw new Error("JWT secret is required");
};
