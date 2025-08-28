import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.lightGray,
				tabBarStyle: {
					backgroundColor: COLORS.background,
					borderTopWidth: 0,
					position: "absolute",
					elevation: 0,
					height: 44,
				},
			}}
		>
			{/* 'Feed' screen tab */}
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			{/* 'Bookmarks' screen tab */}
			<Tabs.Screen
				name="bookmarks"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="bookmark"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			{/* 'Create Post' screen tab */}
			<Tabs.Screen
				name="createPost"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="add-circle"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			{/* 'Notifications' screen tab */}
			<Tabs.Screen
				name="notifications"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="notifications"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			{/* 'Profile' screen tab */}
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="person-circle"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
