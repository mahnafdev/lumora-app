import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/commentsStyles";
import { Image, Text, View } from "react-native";
import { formatDistanceToNow } from "date-fns";

interface CommentInterface {
	_creationTime: number;
	content: string;
	commenter: {
		_id?: Id<"users">;
		image?: string;
		fullname?: string;
	};
}

const Comment = ({ comment }: { comment: CommentInterface }) => {
	return (
		<View style={styles.commentContainer}>
			{/* Commenter Avatar */}
			<Image
				source={{ uri: comment.commenter.image }}
				style={styles.commenterAvatar}
			/>
			<View style={styles.commentContent}>
				<View style={styles.commentHeader}>
					{/* Commenter Full Name */}
					<Text style={styles.commenterFullname}>{comment.commenter.fullname}</Text>
					{/* Comment Time */}
					<Text style={styles.commentTime}>
						{formatDistanceToNow(comment._creationTime)}
					</Text>
				</View>
				{/* Comment Text/Content */}
				<Text style={styles.commentText}>{comment.content}</Text>
			</View>
		</View>
	);
};

export default Comment;
