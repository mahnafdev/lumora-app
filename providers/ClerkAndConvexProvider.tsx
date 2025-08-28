import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string, {
	unsavedChangesWarning: false,
});

export default function ClerkAndConvexProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk
				client={convex}
				useAuth={useAuth}
			>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
