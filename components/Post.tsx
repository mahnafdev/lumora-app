import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feedStyles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Type of Posts
type PostType = {
	_id: Id<"posts">;
	_creationTime: number;
	author: {
		_id: string;
		image: string;
		fullname: string;
		username: string;
	};
	caption?: string;
	image: string;
	buzzes: number;
	comments: number;
	isBuzzed: boolean;
	isBookmarked: boolean;
};

const Post = ({ post }: { post: PostType }) => {
	// State of Buzzed state
	const [isBuzzed, setIsBuzzed] = useState(post.isBuzzed);
	// Import necessary mutation functions
	const toggleBuzz = useMutation(api.posts.toggleBuzz);
	// Handle buzz toggling
	const handleBuzzToggle = async () => {
		try {
			const newIsBuzzed = await toggleBuzz({ postId: post._id });
			setIsBuzzed(newIsBuzzed);
		} catch (error) {
			console.error("Error while toggling Buzz:", error);
		}
	};
	return (
		<View style={styles.post}>
			{/* Header */}
			<View style={styles.postHeader}>
				{/* Author (Left-side) */}
				{/* ToDo: Replace the link with author profile link */}
				<Link href={"/(tabs)/profile"}>
					<TouchableOpacity style={styles.postAuthor}>
						{/* Author Avatar */}
						<Image
							source={{ uri: post.author.image }}
							style={styles.postAuthorAvatar}
							contentFit="cover"
							transition={200}
							cachePolicy="memory-disk"
						/>
						{/* Author Fullname & Username */}
						<View style={styles.postAuthorNames}>
							<Text style={styles.postAuthorFullname}>
								{post.author.fullname}
							</Text>
							<Text style={styles.postAuthorUsername}>
								@{post.author.username}
							</Text>
						</View>
					</TouchableOpacity>
				</Link>
				{/* ToDo: Build the right-side with author options */}
			</View>
			{post.caption && (
				<Text
					style={[
						styles.captionText,
						post.caption.length <= 40 && styles.captionLargeText,
					]}
				>
					{post.caption}
				</Text>
			)}
			{/* Thumbnail Image */}
			<Image
				source={{ uri: post.image }}
				style={styles.postImage}
				contentFit="cover"
				transition={150}
				cachePolicy="memory-disk"
			/>
			{/* Post Actions */}
			<View style={styles.postActions}>
				<View style={styles.postActionsLeft}>
					{/* Buzz */}
					<TouchableOpacity onPress={handleBuzzToggle}>
						<Ionicons
							name={isBuzzed ? "radio" : "radio-outline"}
							size={24}
							color={isBuzzed ? COLORS.primary : COLORS.white}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="chatbubble-outline"
							size={24}
							color={COLORS.white}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity>
					<Ionicons
						name="bookmark-outline"
						size={24}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>
			{/* Stats */}
			<View style={styles.postStats}>
				{/* Posted Time */}
				<Text style={styles.postedTime}>2 hours ago</Text>
				<View style={styles.postStatsBottom}>
					{/* Buzzes Count */}
					<Text style={styles.buzzesText}>
						{post.buzzes === 0 ? "No buzzes yet" : `${post.buzzes} Buzzes`}
					</Text>
					{/* Comments Count */}
					<Text style={styles.commentsText}>
						{post.comments === 0 ? "No comments yet" : `${post.comments} Comments`}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Post;
