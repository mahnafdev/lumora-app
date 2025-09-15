import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/notificationsStyles";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

interface NotificationProps {
	_id: Id<"notifications">;
	_creationTime: number;
	type: string;
	receiverId: Id<"users">;
	senderId: Id<"users">;
	postId?: Id<"posts">;
	sender: {
		_id: Id<"users">;
		image: string;
		username: string;
	};
	post?: {
		image: string;
	};
}

export default function Notification({ notification }: { notification: NotificationProps }) {
	return (
		<View style={styles.notification}>
			<View style={styles.notificationContent}>
				{/* ToDo: Add sender profile link */}
				<TouchableOpacity style={styles.senderAvatarContainer}>
					{/* Sender Image */}
					<Image
						source={{ uri: notification.sender.image }}
						style={styles.senderAvatar}
						contentFit="cover"
						transition={200}
					/>
					{/* Notification Type Icon */}
					<View style={styles.notificationTypeIcon}>
						{notification.type === "buzz" ? (
							<Ionicons
								name="radio"
								size={16}
								color="#00cc00"
							/>
						) : notification.type === "follow" ? (
							<Ionicons
								name="person-add"
								size={16}
								color="#6b44f2"
							/>
						) : notification.type === "unfollow" ? (
							<Ionicons
								name="person-remove"
								size={16}
								color="#ee2255"
							/>
						) : (
							<Ionicons
								name="chatbubble"
								size={16}
								color="#0076ff"
							/>
						)}
					</View>
				</TouchableOpacity>
				<View style={styles.notificationInfo}>
					{/* Sender Username */}
					<Text style={styles.senderUsername}>{notification.sender.username}</Text>
					{/* Notification Text */}
					<Text style={styles.notificationText}>
						{notification.type === "buzz"
							? "buzzed your post"
							: notification.type === "follow"
								? "started following you"
								: notification.type === "unfollow"
									? "is no longer following you"
									: "commented in your post"}
					</Text>
					{/* Notification Receive Time */}
					<Text style={styles.receiveTime}>
						{formatDistanceToNow(notification._creationTime)}
					</Text>
				</View>
			</View>
			{/* Post Image */}
			{notification.post && (
				<Image
					source={{ uri: notification.post.image }}
					style={styles.postImage}
					contentFit="cover"
					transition={200}
				/>
			)}
		</View>
	);
}
