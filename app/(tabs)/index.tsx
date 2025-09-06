import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { STORIES } from "@/constants/story_mock_data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feedStyles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FeedScreen() {
	// Import auth-related SDKs
	const { signOut } = useAuth();
	// Fetch Posts data
	const posts = useQuery(api.posts.getFeedPosts, {});
	// Display loader if posts aren't fetched
	if (posts === undefined) return <Loader />;
	// Display an info text if there are no posts
	if (posts.length === 0)
		return (
			<View style={styles.noPostsContainer}>
				<Text style={styles.noPostsText}>No one posted something yet</Text>
			</View>
		);
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
			{/* Posts */}
			<FlatList
				data={posts}
				renderItem={({ item }) => <Post post={item} />}
				keyExtractor={(item) => item._id}
				ListHeaderComponent={<StoriesSection />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 48 }}
			/>
		</View>
	);
}

const StoriesSection = () => (
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
);
