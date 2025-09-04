import Post from "@/components/Post";
import Story from "@/components/Story";
import { STORIES } from "@/constants/story_mock_data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feedStyles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FeedScreen() {
	// Import auth-related SDKs
	const { signOut } = useAuth();
	// Fetch Posts data
	const posts = useQuery(api.posts.getFeedPosts, {});
	// ToDo: Show a loader if can't get posts
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>lumora</Text>
				<TouchableOpacity onPress={() => signOut()}>
					<Ionicons
						name="exit-outline"
						size={24}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>
			{/* Main content */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 48 }}
			>
				{/* Stories section */}
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={styles.storiesContainer}
				>
					{STORIES.map((story) => (
						<Story
							key={story.id}
							story={story}
						/>
					))}
				</ScrollView>
				{/* Posts */}
				{posts?.length === 0 ? (
					<View style={styles.noPostsContainer}>
						<Text style={styles.noPostsText}>No one posted something yet</Text>
					</View>
				) : (
					<View>
						{posts?.map((post) => (
							<Post
								key={post._id}
								post={post}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
