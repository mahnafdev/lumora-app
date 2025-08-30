import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	contentContainer: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: 600,
		color: COLORS.white,
		alignSelf: "center",
	},
	shareButton: {
		padding: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	shareButtonDisabled: {
		opacity: 0.5,
	},
	shareText: {
		color: COLORS.primary,
		fontSize: 18,
		fontWeight: 600,
	},
	shareTextDisabled: {
		color: COLORS.lightGray,
	},
	emptyImageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 12,
	},
	emptyImageText: {
		color: COLORS.lightGray,
		fontSize: 16,
	},
	content: {
		flex: 1,
	},
	contentDisabled: {
		opacity: 0.75,
	},
	scrollContent: {
		flexGrow: 1,
	},
	imageSection: {
		width: width,
		height: width,
		backgroundColor: COLORS.surface,
		justifyContent: "center",
		alignItems: "center",
	},
	imagePreview: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	changeImageButton: {
		position: "absolute",
		bottom: 8,
		right: 8,
		backgroundColor: "#03070ebf",
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderRadius: 6,
		gap: 4,
	},
	changeImageText: {
		color: COLORS.white,
		fontSize: 14,
		fontWeight: 500,
	},
	captionSection: {
		padding: 16,
		flex: 1,
	},
	captionContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		columnGap: 12,
	},
	authorImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	captionInput: {
		minHeight: 40,
		flex: 1,
		paddingTop: 8,
		color: COLORS.white,
		fontSize: 16,
	},
});
