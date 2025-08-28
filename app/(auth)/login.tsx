import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/authStyles";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
	return (
		<View style={styles.container}>
			{/* Brand Section */}
			<View style={styles.brandSection}>
				{/* Lumora Logo */}
				<View style={styles.logoContainer}>
					<Ionicons
						name="sparkles"
						size={32}
						color={COLORS.primary}
					/>
				</View>
				{/* App name */}
				<Text style={styles.appName}>lumora</Text>
				{/* Tagline */}
				<Text style={styles.tagline}>don&apos;t miss anything</Text>
				{/* Illustration Image */}
				<View style={styles.illustrationContainer}>
					<Image
						source={require("../../assets/images/auth-illustration.png")}
						style={styles.illustration}
						resizeMode="cover"
					/>
				</View>
			</View>
			{/* Login Section */}
			<View style={styles.loginSection}>
				{/* Login-with-Google button */}
				<TouchableOpacity
					style={styles.googleButton}
					// onPress={handleGoogleLogin}
					activeOpacity={0.9}
				>
					{/* Google Logo Icon */}
					<View style={styles.googleIconContainer}>
						<Ionicons
							name="logo-google"
							size={22}
							color={COLORS.white}
						/>
					</View>
					{/* Button Text */}
					<Text style={styles.googleButtonText}>Login with Google</Text>
				</TouchableOpacity>
				{/* Terms Text */}
				<Text style={styles.termsText}>
					By continuing, you agree to our Terms and Privacy Policy
				</Text>
			</View>
		</View>
	);
}
