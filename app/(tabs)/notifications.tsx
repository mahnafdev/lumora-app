import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notificationsStyles";
import { useQuery } from "convex/react";
import { FlatList, Text, View } from "react-native";

export default function Notifications() {
	// Fetch notifications
	const notifications = useQuery(api.notifications.getUserNotifications)!;
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				{/* Header Title */}
				<Text style={styles.headerTitle}>Notifications</Text>
			</View>
			{/* Notifications */}
			{!notifications ? (
				<Loader />
			) : notifications.length === 0 ? (
				<View style={styles.noNotificationsContainer}>
					<Text style={styles.noNotificationsText}>
						No notifications received yet
					</Text>
				</View>
			) : (
				<FlatList
					data={notifications}
					renderItem={({ item }) => <Notification notification={item} />}
					keyExtractor={(item) => item._id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.notificationsContainer}
				/>
			)}
		</View>
	);
}
