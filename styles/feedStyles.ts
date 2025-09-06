import { COLORS } from "@/constants/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
	storiesContainer: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.surfaceLight,
	},
	storyWrapper: {
		alignItems: "center",
		marginHorizontal: 4,
		width: 72,
	},
	storyRing: {
		width: 72,
		height: 72,
		borderRadius: 40,
		padding: 2,
		backgroundColor: COLORS.background,
		borderWidth: 1.5,
		borderColor: COLORS.primary,
		marginBottom: 4,
	},
	noStoryRing: {
		borderColor: COLORS.lightGray,
	},
	storyAvatar: {
		width: "100%",
		height: "100%",
		borderRadius: 36,
	},
	storyUsername: {
		fontSize: 12,
		color: COLORS.white,
		textAlign: "center",
	},
	noPostsContainer: {
		height: height,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background,
	},
	noPostsText: {
		fontSize: 20,
		color: COLORS.primary,
	},
	post: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.surface,
	},
	postHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 12,
	},
	postAuthor: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 8,
	},
	postAuthorAvatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
	},
	postAuthorNames: {
		rowGap: 2,
	},
	postAuthorFullname: {
		fontSize: 14,
		fontWeight: 600,
		color: COLORS.white,
		letterSpacing: 0.2,
	},
	postAuthorUsername: {
		fontSize: 12,
		color: COLORS.lightGray,
		letterSpacing: 0.2,
	},
	postImage: {
		width: width,
		height: width,
	},
	postActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	postActionsLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	postStats: {
		paddingHorizontal: 12,
	},
	captionText: {
		fontSize: 14,
		fontWeight: 400,
		color: COLORS.white,
		marginHorizontal: 12,
		marginBottom: 12,
	},
	captionLargeText: {
		fontSize: 16,
		fontWeight: 600,
	},
	postStatsBottom: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	postedTime: {
		fontSize: 14,
		color: COLORS.white,
		marginBottom: 4,
	},
	buzzesText: {
		fontSize: 14,
		color: COLORS.lightGray,
	},
	commentsText: {
		fontSize: 14,
		color: COLORS.lightGray,
	},
	modalContainer: {
		backgroundColor: COLORS.background,
		marginBottom: Platform.OS === "ios" ? 44 : 0,
		flex: 1,
		marginTop: Platform.OS === "ios" ? 44 : 0,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		height: 56,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	modalTitle: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: "600",
	},
	commentsList: {
		flex: 1,
	},
	commentContainer: {
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	commentAvatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 12,
	},
	commentContent: {
		flex: 1,
	},
	commentUsername: {
		color: COLORS.white,
		fontWeight: "500",
		marginBottom: 4,
	},
	commentText: {
		color: COLORS.white,
		fontSize: 14,
		lineHeight: 20,
	},
	commentTime: {
		color: COLORS.lightGray,
		fontSize: 12,
		marginTop: 4,
	},
	commentInput: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderTopWidth: 0.5,
		borderTopColor: COLORS.surface,
		backgroundColor: COLORS.background,
	},
	input: {
		flex: 1,
		color: COLORS.white,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 12,
		backgroundColor: COLORS.surface,
		borderRadius: 20,
		fontSize: 14,
	},
	postButton: {
		color: COLORS.primary,
		fontWeight: "600",
		fontSize: 14,
	},
	postButtonDisabled: {
		opacity: 0.5,
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
});
