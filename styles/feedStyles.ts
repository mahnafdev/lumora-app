import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

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
		paddingTop: 4,
		paddingBottom: 12,
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
		rowGap: 1,
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
	postedTime: {
		fontSize: 12,
		color: COLORS.lightGray,
		fontWeight: 500,
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
		paddingTop: 12,
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
	buzzes: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 8,
	},
	comments: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 8,
	},
	buzzesCount: {
		fontSize: 16,
		color: COLORS.lightGray,
	},
	commentsCount: {
		fontSize: 16,
		color: COLORS.lightGray,
	},
});
