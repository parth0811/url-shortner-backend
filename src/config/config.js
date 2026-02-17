export const cookieOptions = {
  httpOnly: true,
  secure: true,          // MUST be true on HTTPS
  sameSite: "None",      // REQUIRED for cross-site
  maxAge: 1000 * 60 * 60
};
