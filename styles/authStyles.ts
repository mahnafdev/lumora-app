import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	brandSection: {
		alignItems: "center",
		marginTop: height * 0.1,
	},
	logoContainer: {
		width: 60,
		height: 60,
		borderRadius: 12,
		backgroundColor: "#4afe6026",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	appName: {
		fontSize: 36,
		fontWeight: 700,
		color: COLORS.primary,
		letterSpacing: 0.5,
		marginBottom: 8,
	},
	tagline: {
		fontSize: 16,
		color: COLORS.lightGray,
		letterSpacing: 0.75,
		textTransform: "lowercase",
	},
	illustrationContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
	},
	illustration: {
		width: width * 0.75,
		height: width * 0.75,
		maxHeight: 280,
	},
	loginSection: {
		width: "100%",
		paddingHorizontal: 24,
		paddingBottom: 40,
		alignItems: "center",
	},
	googleButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.surfaceLight,
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 20,
		width: width * 0.75,
		elevation: 0,
	},
	googleIconContainer: {
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	googleButtonText: {
		fontSize: 18,
		fontWeight: "600",
		color: COLORS.white,
	},
	termsText: {
		textAlign: "center",
		fontSize: 12,
		color: COLORS.lightGray,
		maxWidth: 280,
	},
});
