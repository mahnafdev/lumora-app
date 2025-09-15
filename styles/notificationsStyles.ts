import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.surfaceLight,
	},
	headerTitle: {
		fontSize: 24,
		fontFamily: "JetBrainsMono-Medium",
		color: COLORS.primary,
	},
	noNotificationsContainer: {
		height: height * 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	noNotificationsText: {
		fontSize: 20,
		color: COLORS.primary,
	},
	notificationsContainer: {
		padding: 12,
	},
	notification: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	notificationContent: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginRight: 12,
	},
	senderAvatarContainer: {
		position: "relative",
		marginRight: 12,
	},
	senderAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 0,
	},
	notificationTypeIcon: {
		position: "absolute",
		bottom: -4,
		right: -4,
		backgroundColor: COLORS.background,
		borderRadius: 12,
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 0,
	},
	notificationInfo: {
		flex: 1,
	},
	senderUsername: {
		color: COLORS.white,
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 2,
	},
	notificationText: {
		color: COLORS.lightGray,
		fontSize: 14,
		fontWeight: 500,
		marginBottom: 2,
	},
	receiveTime: {
		color: COLORS.lightGray,
		fontSize: 12,
	},
	postImage: {
		width: 56,
		height: 56,
		borderRadius: 4,
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
});
