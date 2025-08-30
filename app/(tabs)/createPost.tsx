import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/createPostStyles";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";

export default function CreatePostScreen() {
	// RN/Expo Hooks
	const router = useRouter();
	// Clerk Hooks
	const { user } = useUser();
	// States
	const [caption, setCaption] = useState("");
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [isSharing, setIsSharing] = useState(false);
	// Function for image uploading
	const uploadImage = async () => {
		// Configure the Image Library
		const result = await launchImageLibraryAsync({
			mediaTypes: "images",
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
		});
		// Set the Image-URI to the uploadedImage state
		if (!result.canceled) setUploadedImage(result.assets[0].uri);
	};
	// Render the UI that should be shown when no image is uploaded
	if (!uploadedImage) {
		return (
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					{/* Back-Arrow button that redirects to the previous screen/route */}
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="chevron-back"
							size={28}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
					{/* Header Title */}
					<Text style={styles.headerTitle}>New Post</Text>
					{/* Empty Container to fill-up the most-right space */}
					<View style={{ width: 24 }}></View>
				</View>
				{/* Main content */}
				<TouchableOpacity
					style={styles.emptyImageContainer}
					onPress={uploadImage}
				>
					{/* Empty-Image icon */}
					<Ionicons
						name="image"
						size={56}
						color={COLORS.lightGray}
					/>
					{/* Empty-Image text */}
					<Text style={styles.emptyImageText}>Tap to select a thumbnail image</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
			keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
		>
			<View style={styles.contentContainer}>
				{/* Header */}
				<View style={styles.header}>
					{/* Back button */}
					<TouchableOpacity
						onPress={() => {
							setUploadedImage(null);
							setCaption("");
						}}
						disabled={isSharing}
					>
						<Ionicons
							name="close"
							size={28}
							color={isSharing ? COLORS.lightGray : COLORS.white}
						/>
					</TouchableOpacity>
					{/* Header Title */}
					<Text style={styles.headerTitle}>New Post</Text>
					{/* Post Share button */}
					<TouchableOpacity
						style={[styles.shareButton, isSharing && styles.shareButtonDisabled]}
						disabled={isSharing || !uploadedImage}
						onPress={() => setIsSharing(true)}
					>
						{isSharing ? (
							<ActivityIndicator
								size="small"
								color={COLORS.primary}
							/>
						) : (
							<Text style={styles.shareText}>Share</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
