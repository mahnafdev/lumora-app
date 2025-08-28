import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
	// Import properties and methods from Auth hook
	const { isLoaded, isSignedIn } = useAuth();
	// Initialize Segments hook
	const segments = useSegments();
	// Initialize Router hook
	const router = useRouter();
	// Run effect at the initial render and based on dependencies
	useEffect(() => {
		// If the user isn't loaded, just return
		if (!isLoaded) return;
		// Boolean that checks if the user is in Auth screen or not
		const isInAuthScreen = segments[0] === "(auth)";
		// If user isn't signed in and isn't in Auth screen, redirect user to Auth/Login screen
		if (!isSignedIn && !isInAuthScreen) router.replace("/(auth)/login");
		// If user isn signed in and isn in Auth screen, redirect user to Index/Feed screen
		else if (isSignedIn && isInAuthScreen) router.replace("/(tabs)");
	}, [isLoaded, isSignedIn, segments]);
	// If user isn't loaded, return nothing
	if (!isLoaded) return null;
	// After successful operations, return the Stack
	return <Stack screenOptions={{ headerShown: false }} />;
}
