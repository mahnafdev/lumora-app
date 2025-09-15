import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feedStyles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CommentsModal from "./CommentsModal";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-expo";

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
	// State of Bookmarked state
	const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
	// State of Comment Visibility
	const [showComments, setShowComments] = useState(false);
	// Current user
	const { user } = useUser();
	const currentUser = useQuery(
		api.users.getUserByClerkId,
		user ? { clerkId: user.id } : "skip",
	);
	// Import necessary mutation functions
	const toggleBuzz = useMutation(api.posts.toggleBuzz);
	const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
	const deletePost = useMutation(api.posts.deletePost);
	// Handle buzz toggling
	const handleBuzzToggle = async () => {
		try {
			const newIsBuzzed = await toggleBuzz({ postId: post._id });
			setIsBuzzed(newIsBuzzed);
		} catch (error) {
			console.error("Error while toggling Buzz:", error);
		}
	};
	// Handle bookmark toggling
	const handleBookmarkToggle = async () => {
		try {
			const newIsBookmarked = await toggleBookmark({ postId: post._id });
			setIsBookmarked(newIsBookmarked);
		} catch (error) {
			console.error("Error while toggling Bookmark:", error);
		}
	};
	// Handle post deletion
	const handleDelete = async () => {
		try {
			await deletePost({ postId: post._id });
		} catch (error) {
			console.error("Error while deleting Post:", error);
		}
	};
	return (
		<View style={styles.post}>
			{/* Header */}
			<View style={styles.postHeader}>
				{/* Author */}
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
				{/* Posted Time */}
				<Text style={styles.postedTime}>{formatDistanceToNow(post._creationTime)}</Text>
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
				{/* Buzz */}
				<TouchableOpacity
					style={styles.buzzes}
					onPress={handleBuzzToggle}
				>
					<Ionicons
						name={isBuzzed ? "radio" : "radio-outline"}
						size={22}
						color={isBuzzed ? COLORS.primary : COLORS.white}
					/>
					{/* Buzzes Count */}
					<Text style={styles.buzzesCount}>{post.buzzes}</Text>
				</TouchableOpacity>
				{/* Comment */}
				<TouchableOpacity
					style={styles.comments}
					onPress={() => setShowComments(true)}
				>
					<Ionicons
						name="chatbubble-outline"
						size={22}
						color={COLORS.white}
					/>
					{/* Comments Count */}
					<Text style={styles.commentsCount}>{post.comments}</Text>
				</TouchableOpacity>
				{/* Bookmark */}
				<TouchableOpacity onPress={handleBookmarkToggle}>
					<Ionicons
						name={isBookmarked ? "bookmark" : "bookmark-outline"}
						size={22}
						color={isBookmarked ? COLORS.primary : COLORS.white}
					/>
				</TouchableOpacity>
				{/* Delete */}
				{currentUser?._id === post.author._id && (
					<TouchableOpacity onPress={handleDelete}>
						<Ionicons
							name="trash-outline"
							size={22}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
				)}
			</View>
			{/* Comments Modal */}
			<CommentsModal
				postId={post._id}
				isVisible={showComments}
				onClose={() => setShowComments(false)}
				onCommentAdd={() => {}}
			/>
		</View>
	);
};

export default Post;
