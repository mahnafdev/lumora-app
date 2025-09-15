import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

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
	notificationsContainer: {
		padding: 16,
	},
	notification: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
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
		width: 44,
		height: 44,
		borderRadius: 22,
		borderWidth: 2,
		borderColor: COLORS.surface,
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
		borderWidth: 2,
		borderColor: COLORS.surface,
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
	notificationTypeText: {
		color: COLORS.lightGray,
		fontSize: 14,
		marginBottom: 2,
	},
	receiveTime: {
		color: COLORS.lightGray,
		fontSize: 12,
	},
	postImage: {
		width: 44,
		height: 44,
		borderRadius: 6,
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
});
