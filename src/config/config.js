export const cookieOptions = {
  httpOnly: true,
  secure: true,        // MUST be true on HTTPS (Render + Vercel)
  sameSite: "none",    // REQUIRED for cross-site cookies
  maxAge: 1000 * 60 * 60 // 1 hour
};
