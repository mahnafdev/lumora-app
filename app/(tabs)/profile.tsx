import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profileStyles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Modal,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TextInput,
} from "react-native";

export default function Profile() {
	// Import necessary auth-related SDKs
	const { userId, signOut } = useAuth();
	// States
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
	// Fetch the current user
	const currentUser = useQuery(
		api.users.getUserByClerkId,
		userId ? { clerkId: userId } : "skip",
	);
	// Fetch all posts of the user
	const posts = useQuery(api.posts.getUserPosts, {});
	// Import updateProfile mutation
	const updateProfile = useMutation(api.users.updateProfile);
	// Edited Profile state
	const [editedProfile, setEditedProfile] = useState({
		fullname: currentUser?.fullname || "",
		bio: currentUser?.bio || "",
	});
	// Static datasets
	const statsData = [
		{
			statNumber: currentUser?.posts,
			statLabel: "Posts",
		},
		{
			statNumber: currentUser?.followers,
			statLabel: "Followers",
		},
		{
			statNumber: currentUser?.following,
			statLabel: "Following",
		},
	];
	// Handle function for profile editing
	const handleEditProfile = async () => {
		await updateProfile(editedProfile);
		setShowEditModal(false);
	};
	// Early Returns
	if (!currentUser || posts === undefined) return <Loader />;
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				{/* Header Title */}
				<Text style={styles.username}>{currentUser.username}</Text>
				{/* Logout Button */}
				<TouchableOpacity onPress={() => signOut()}>
					<Ionicons
						name="exit-outline"
						size={24}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>
			{/* Main Content */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.profileInfo}>
					{/* Avatar & Stats */}
					<View style={styles.avatarAndStats}>
						{/* Image/Avatar */}
						<View style={styles.avatarContainer}>
							<Image
								source={{ uri: currentUser.image }}
								style={styles.avatar}
								contentFit="cover"
								transition={200}
							/>
						</View>
						{/* Stats */}
						<View style={styles.statsContainer}>
							{statsData.map((stat) => (
								<View
									key={stat.statLabel}
									style={styles.stat}
								>
									<Text style={styles.statNumber}>{stat.statNumber}</Text>
									<Text style={styles.statLabel}>{stat.statLabel}</Text>
								</View>
							))}
						</View>
					</View>
					{/* Full Name */}
					<Text style={styles.fullname}>{currentUser.fullname}</Text>
					{/* Bio */}
					{currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}
					{/* Edit Button */}
					<TouchableOpacity
						style={styles.editButton}
						onPress={() => setShowEditModal(true)}
					>
						<Text style={styles.editButtonText}>Edit Profile</Text>
					</TouchableOpacity>
				</View>
				{posts.length === 0 ? (
					<View style={styles.noPostsContainer}>
						<Text style={styles.noPostsText}>Haven&apos;t posted anything yet</Text>
					</View>
				) : (
					<FlatList
						data={posts}
						numColumns={3}
						contentContainerStyle={{ paddingHorizontal: 12 }}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.gridItem}
								onPress={() => setSelectedPost(item)}
							>
								<Image
									source={{ uri: item.image }}
									style={styles.gridImage}
									contentFit="cover"
									transition={200}
								/>
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item._id}
					/>
				)}
			</ScrollView>
			{/* Modal of Edit Profile */}
			<Modal
				visible={showEditModal}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setShowEditModal(false)}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "android" ? "height" : "padding"}
						style={styles.modalContainer}
					>
						<View style={styles.modalContent}>
							{/* Modal Header */}
							<View style={styles.modalHeader}>
								<View style={{ width: 16 }} />
								<Text style={styles.modalTitle}>Edit Profile</Text>
								{/* Close button */}
								<TouchableOpacity onPress={() => setShowEditModal(false)}>
									<Ionicons
										name="close"
										size={24}
										color={COLORS.lightGray}
									/>
								</TouchableOpacity>
							</View>
							{/* Fullname Input */}
							<View style={styles.editProfileInputContainer}>
								<Text style={styles.editProfileInputLabel}>Name</Text>
								<TextInput
									style={styles.editProfileInput}
									value={editedProfile.fullname}
									onChangeText={(text) =>
										setEditedProfile((prev) => ({
											...prev,
											fullname: text,
										}))
									}
									placeholderTextColor={COLORS.lightGray}
								/>
							</View>
							{/* Bio Input */}
							<View style={styles.editProfileInputContainer}>
								<Text style={styles.editProfileInputLabel}>Bio</Text>
								<TextInput
									style={[
										styles.editProfileInput,
										styles.editProfileBioInput,
									]}
									value={editedProfile.bio}
									onChangeText={(text) =>
										setEditedProfile((prev) => ({
											...prev,
											bio: text,
										}))
									}
									multiline
									numberOfLines={4}
									placeholderTextColor={COLORS.lightGray}
								/>
							</View>
							{/* Save button */}
							<TouchableOpacity
								style={styles.saveButton}
								onPress={handleEditProfile}
							>
								<Text style={styles.saveButtonText}>Save Changes</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</Modal>
			{/* Modal of Selected Image */}
			<Modal
				visible={!!selectedPost}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setSelectedPost(null)}
			>
				<View style={styles.postImageModalBackdrop}>
					{/* Modal Header */}
					<View style={styles.postImageModalHeader}>
						{/* Close button */}
						<TouchableOpacity onPress={() => setSelectedPost(null)}>
							<Ionicons
								name="close"
								size={24}
								color={COLORS.white}
							/>
						</TouchableOpacity>
					</View>
					{/* Modal Main content */}
					{/* Post Image */}
					{selectedPost && (
						<Image
							source={{ uri: selectedPost.image }}
							style={styles.postImage}
							cachePolicy="memory-disk"
						/>
					)}
				</View>
			</Modal>
		</View>
	);
}
