import { useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Required for browser-based OAuth to close the browser tab on redirect
WebBrowser.maybeCompleteAuthSession();

// Supported OAuth strategies (must be enabled in Clerk Dashboard)
export type OAuthStrategy = "oauth_google" | "oauth_apple" | "oauth_facebook";

// ─── useOAuthFlow ─────────────────────────────────────────────────────────────
// Wraps Clerk's useSSO hook.
// Works in Expo Go (browser-based). No dev build required.
//
// Session resolution priority:
//   1. createdSessionId  — returned directly by the flow (most cases)
//   2. signIn.createdSessionId — existing user completing OAuth
//   3. signUp.createdSessionId — new user completing OAuth sign-up

export function useOAuthFlow() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const startFlow = useCallback(
    async (strategy: OAuthStrategy) => {
      try {
        const { createdSessionId, setActive, signIn, signUp } =
          await startSSOFlow({
            strategy,
            // Redirect back to app root — Expo Router's index handles auth routing
            redirectUrl: Linking.createURL("/"),
          });

        // Resolve the session ID from whichever resource completed
        const sessionId =
          createdSessionId ??
          (signIn?.status === "complete" ? signIn.createdSessionId : null) ??
          (signUp?.status === "complete" ? signUp.createdSessionId : null);

        if (sessionId && setActive) {
          await setActive({ session: sessionId });
          // index.tsx reads isSignedIn and redirects to /language-select automatically,
          // but we push directly here to be explicit
          router.replace("/language-select");
        }
        // null sessionId = user cancelled or flow is incomplete — do nothing
      } catch (err: unknown) {
        const clerkError = err as { errors?: { message: string }[] };
        console.error("OAuth error:", JSON.stringify(clerkError, null, 2));
        const msg =
          clerkError.errors?.[0]?.message ?? "OAuth sign-in failed. Please try again.";
        alert(msg);
      }
    },
    [startSSOFlow, router],
  );

  return { startFlow };
}
