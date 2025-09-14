import { COLORS } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	centered: {
		justifyContent: "center",
		alignItems: "center",
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
		height: 48,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surfaceLight,
	},
	modalTitle: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: 600,
	},
	commentsList: {
		flex: 1,
	},
	commentContainer: {
		flexDirection: "row",
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	commenterAvatar: {
		width: 28,
		height: 28,
		borderRadius: 16,
		marginRight: 10,
	},
	commentHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	commenterFullname: {
		color: COLORS.white,
		fontWeight: 600,
	},
	commentTime: {
		color: COLORS.lightGray,
		fontSize: 12,
	},
	commentContent: {
		flex: 1,
	},
	commentText: {
		color: COLORS.white,
		lineHeight: 20,
	},
	newCommentInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderTopWidth: 0.5,
		borderTopColor: COLORS.surface,
		backgroundColor: COLORS.background,
	},
	newCommentInput: {
		flex: 1,
		color: COLORS.white,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 12,
		backgroundColor: COLORS.surface,
		borderRadius: 20,
		fontSize: 14,
	},
	postCommentBtn: {
		color: COLORS.primary,
		fontWeight: 600,
		fontSize: 14,
	},
	postCommentBtnDisabled: {
		opacity: 0.5,
	},
});
