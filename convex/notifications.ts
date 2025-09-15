import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const getUserNotifications = query({
	handler: async (ctx) => {
		// Check and access current user
		const currentUser = await getAuthenticatedUser(ctx);
		// Fetch all notifications of current user
		const notifications = await ctx.db
			.query("notifications")
			.withIndex("by_receiver", (q) => q.eq("receiverId", currentUser._id))
			.order("desc")
			.collect();
		// Return an empty array if no notifications
		if (notifications.length === 0) return [];
		// Organize notifications
		const organizedNotifications = await Promise.all(
			notifications.map(async (notification) => {
				// Get the sender
				const sender = (await ctx.db.get(notification.senderId))!;
				// Initialize optional values as null
				let post = null;
				// Get post if notification is related to post
				if (notification.postId) post = await ctx.db.get(notification.postId);
				// Return the organized notifications
				return {
					...notification,
					sender: {
						_id: sender._id,
						image: sender.image,
						username: sender.username,
					},
					post: {
						image: post?.image,
					},
				};
			}),
		);
		// Return the notifications as response
		return organizedNotifications;
	},
});
