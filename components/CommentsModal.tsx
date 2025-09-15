import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/commentsStyles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Loader from "./Loader";
import Comment from "./Comment";

type CommentsModalType = {
	postId: Id<"posts">;
	isVisible: boolean;
	onClose: () => void;
	onCommentAdd: () => void;
};

export default function CommentsModal({
	postId,
	isVisible,
	onClose,
	onCommentAdd,
}: CommentsModalType) {
	// State for new added comment
	const [newComment, setNewComment] = useState("");
	// Fetch comments
	const comments = useQuery(api.comments.getComments, { postId });
	// Import mutation for comment adding
	const addComment = useMutation(api.comments.createComment);
	// Handle add comment
	const handleAddComment = async () => {
		// Check if there's no text in comment
		if (!newComment.trim()) return;
		try {
			// Add comment in DB
			await addComment({ postId, content: newComment });
			// Reset comment input
			setNewComment("");
			onCommentAdd();
		} catch (error) {
			console.error("Error while Commenting:", error);
		}
	};
	return (
		<Modal
			visible={isVisible}
			animationType="slide"
			transparent
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "android" ? "height" : "padding"}
				style={styles.modalContainer}
			>
				{/* Header */}
				<View style={styles.modalHeader}>
					{/* Close button */}
					<TouchableOpacity onPress={onClose}>
						<Ionicons
							name="close"
							size={24}
							color={COLORS.white}
						/>
					</TouchableOpacity>
					{/* Title */}
					<Text style={styles.modalTitle}>Comments</Text>
					{/* Empty box right-side to align items */}
					<View style={{ width: 24 }} />
				</View>
				{/* Comments List */}
				{!comments ? (
					<Loader />
				) : (
					<FlatList
						data={comments}
						renderItem={({ item }) => <Comment comment={item} />}
						keyExtractor={(item) => item._id}
						contentContainerStyle={styles.commentsList}
					/>
				)}
				{/* New Comment Input */}
				<View style={styles.newCommentInputContainer}>
					{/* New Comment Input */}
					<TextInput
						style={styles.newCommentInput}
						value={newComment}
						onChangeText={setNewComment}
						placeholder="Write a comment..."
						placeholderTextColor={COLORS.lightGray}
						maxLength={150}
						multiline
					/>
					{/* Post button */}
					<TouchableOpacity
						onPress={handleAddComment}
						disabled={!newComment.trim()}
					>
						<Text
							style={[
								styles.postCommentBtn,
								!newComment.trim() && styles.postCommentBtnDisabled,
							]}
						>
							Post
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}
