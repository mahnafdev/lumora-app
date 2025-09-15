import Loader from "@/components/Loader";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/bookmarksStyles";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

export default function Bookmarks() {
	// Fetch bookmarks
	const bookmarks = useQuery(api.bookmarks.getUserBookmarks);
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				{/* Header Title */}
				<Text style={styles.headerTitle}>Bookmarks</Text>
			</View>
			{/* Bookmarks */}
			{!bookmarks ? (
				// Loader
				<Loader />
			) : bookmarks.length === 0 ? (
				// No Posts
				<View style={styles.noBookmarksContainer}>
					<Text style={styles.noBookmarksText}>No posts bookmarked yet</Text>
				</View>
			) : (
				// Display Bookmarks
				<ScrollView contentContainerStyle={styles.bookmarksContainer}>
					{bookmarks.map((post) => (
						<View
							key={post?._id}
							style={styles.post}
						>
							{/* Image */}
							<Image
								source={{ uri: post?.image }}
								style={styles.postImage}
								contentFit="cover"
								transition={200}
								cachePolicy="memory-disk"
							/>
							{/* Caption */}
							{post?.caption && (
								<Text style={styles.postCaption}>{post.caption}</Text>
							)}
						</View>
					))}
				</ScrollView>
			)}
		</View>
	);
}
