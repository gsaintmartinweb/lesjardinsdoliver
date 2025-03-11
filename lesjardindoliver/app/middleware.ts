import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Extract the token using `getToken`
  const token = await getToken({
    req, // Pass the NextRequest object
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If no token is found or if it's invalid, redirect to the Keycloak login page
  if (!token) {
    const loginUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      redirect_uri: `${process.env.NEXTAUTH_URL}/admin`, // The page to redirect back to after login
      response_type: "code", // Authorization code flow
      scope: "openid profile email", // Keycloak scopes
    });

    return NextResponse.redirect(`${loginUrl}?${params}`);
  }

  // If the token is found but has expired, you can force re-login
  if (token.exp && Date.now() >= Number(token.exp) * 1000) {
    // Optionally, you can clear the token or session here if necessary

    const logoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      post_logout_redirect_uri: `${process.env.NEXTAUTH_URL}/login`, // Redirect after logout
    });

    return NextResponse.redirect(`${logoutUrl}?${params}`);
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/admin"], // Add other protected routes here as needed
};
