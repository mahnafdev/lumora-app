import { styles } from "@/styles/feedStyles";
import { View, Text, TouchableOpacity, Image } from "react-native";

type StoryType = {
	id: number;
	username: string;
	avatar: string;
	hasStory: boolean;
};

export default function Story({ story }: { story: StoryType }) {
	return (
		<TouchableOpacity style={styles.storyWrapper}>
			<View style={[styles.storyRing, !story.hasStory && styles.noStoryRing]}>
				<Image
					source={{ uri: story.avatar }}
					style={styles.storyAvatar}
				/>
			</View>
			<Text style={styles.storyUsername}>{story.username}</Text>
		</TouchableOpacity>
	);
}
