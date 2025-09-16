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
		borderBottomColor: COLORS.surface,
	},
	username: {
		fontSize: 20,
		fontWeight: 600,
		color: COLORS.white,
	},
	profileInfo: {
		paddingHorizontal: 12,
		paddingVertical: 16,
	},
	avatarAndStats: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	avatarContainer: {
		marginRight: 32,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 2,
		borderColor: COLORS.surfaceLight,
	},
	statsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	stat: {
		alignItems: "center",
	},
	statNumber: {
		fontSize: 16,
		fontWeight: 700,
		color: COLORS.white,
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 14,
		color: COLORS.lightGray,
	},
	fullname: {
		fontSize: 20,
		fontWeight: 700,
		color: COLORS.white,
		marginBottom: 2,
	},
	bio: {
		fontSize: 14,
		color: COLORS.white,
		lineHeight: 20,
	},
	editButton: {
		flex: 1,
		backgroundColor: COLORS.surface,
		padding: 8,
		borderRadius: 6,
		alignItems: "center",
		marginTop: 12,
	},
	editButtonText: {
		color: COLORS.white,
		fontWeight: 600,
		fontSize: 16,
	},
	noPostsContainer: {
		height: height * 0.55,
		justifyContent: "center",
		alignItems: "center",
	},
	noPostsText: {
		fontSize: 20,
		color: COLORS.primary,
	},
	gridItem: {
		flex: 1 / 3,
		aspectRatio: 1,
		padding: 2,
	},
	gridImage: {
		flex: 1,
		borderRadius: 8,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 16,
		minHeight: 375,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	modalTitle: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 700,
	},
	editProfileInputContainer: {
		marginBottom: 12,
	},
	editProfileInputLabel: {
		color: COLORS.lightGray,
		marginBottom: 2,
		fontSize: 14,
	},
	editProfileInput: {
		backgroundColor: COLORS.surface,
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
		color: COLORS.white,
		fontSize: 16,
	},
	editProfileBioInput: {
		height: 100,
		borderRadius: 8,
		textAlignVertical: "top",
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 12,
	},
	saveButtonText: {
		color: COLORS.background,
		fontSize: 16,
		fontWeight: 600,
	},
	postImageModalBackdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		justifyContent: "center",
	},
	postImageModalContainer: {
		backgroundColor: COLORS.background,
		maxHeight: height * 0.9,
	},
	postImageModalHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	postImage: {
		width: width,
		height: width,
		borderRadius: 8,
	},
	followButton: {
		backgroundColor: COLORS.primary,
		paddingHorizontal: 24,
		paddingVertical: 8,
		borderRadius: 8,
		marginTop: 16,
	},
	followingButton: {
		backgroundColor: COLORS.surface,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	followButtonText: {
		color: COLORS.background,
		fontSize: 14,
		fontWeight: 600,
		textAlign: "center",
	},
	followingButtonText: {
		color: COLORS.white,
		textAlign: "center",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	postsGrid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
});
