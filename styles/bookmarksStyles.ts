import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

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
	noBookmarksContainer: {
		height: height * 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	noBookmarksText: {
		fontSize: 20,
		color: COLORS.primary,
	},
	bookmarksContainer: {
		padding: 12,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	post: {
		width: "33.33%",
		rowGap: 4,
		padding: 4,
	},
	postImage: {
		width: "100%",
		aspectRatio: 1,
		borderRadius: 6,
	},
	postCaption: {
		paddingHorizontal: 2,
		fontSize: 10,
		color: COLORS.white,
	},
});
