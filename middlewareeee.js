import { withMiddlewareAuthRequired, getToken } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired({
  async getToken(req) {
    // Check Authorization header for Bearer token
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1]; // Extract the token
    }

    // Fallback to cookie-based session (browser)
    const token = await getToken(req);
    return token;
  },
});
