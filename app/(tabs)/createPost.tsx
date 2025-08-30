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
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Image } from "expo-image";
import { uploadAsync, FileSystemUploadType } from "expo-file-system";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

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
	// Import the needed mutation functions
	const generateImageUploadUrl = useMutation(api.posts.generateImageUploadUrl);
	const createPost = useMutation(api.posts.createPost);
	// Handle sharing
	const handleShare = async () => {
		// Check if no image is uploaded
		if (!uploadedImage) return;
		try {
			// Update the 'isSharing' state
			setIsSharing(true);
			// Generate the image upload URL
			const uploadUrl = await generateImageUploadUrl();
			// Upload the image using FileSystem and get the result
			const uploadResult = await uploadAsync(uploadUrl, uploadedImage, {
				httpMethod: "POST",
				uploadType: FileSystemUploadType.BINARY_CONTENT,
				mimeType: "image/jpeg",
			});
			// Throw error if the upload failed
			if (uploadResult.status !== 200)
				throw new Error(`(${uploadResult.status}) Image upload failed`);
			// Get the 'storageId' from upload response body
			const { storageId } = JSON.parse(uploadResult.body);
			// Create the post using a Convex mutation
			await createPost({ storageId, caption });
			// Redirect to the Feed screen
			router.push("/(tabs)");
		} catch (error) {
			console.error("Error while Sharing Post:", error);
		} finally {
			setIsSharing(false);
		}
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
			behavior={Platform.OS === "android" ? "height" : "padding"}
			style={styles.container}
			keyboardVerticalOffset={Platform.OS === "android" ? 30 : 30}
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
						onPress={() => handleShare()}
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
				{/* Main content */}
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					contentOffset={{ x: 0, y: 100 }}
					bounces={false}
					keyboardShouldPersistTaps="handled"
				>
					<View style={[styles.content, isSharing && styles.contentDisabled]}>
						{/* Image section */}
						<View style={styles.imageSection}>
							{/* Thumbnail Image */}
							<Image
								source={uploadedImage}
								style={styles.imagePreview}
								contentFit="cover"
								transition={200}
							/>
							{/* Change-Image button */}
							<TouchableOpacity
								style={styles.changeImageButton}
								onPress={uploadImage}
								disabled={isSharing}
							>
								<Ionicons
									name="image"
									size={20}
									color={COLORS.white}
								/>
								<Text style={styles.changeImageText}>Change</Text>
							</TouchableOpacity>
						</View>
						{/* Caption section */}
						<View style={styles.captionSection}>
							<View style={styles.captionContainer}>
								{/* Author Image */}
								<Image
									source={user?.imageUrl}
									style={styles.authorImage}
									contentFit="cover"
									transition={200}
								/>
								{/* Caption Input */}
								<TextInput
									style={styles.captionInput}
									multiline
									placeholder="Write the caption..."
									placeholderTextColor={COLORS.lightGray}
									value={caption}
									onChangeText={setCaption}
									editable={!isSharing}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}
