import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const createComment = mutation({
	// Get dynamic values from arguments
	args: {
		postId: v.id("posts"),
		content: v.string(),
	},
	// Mutation handler
	handler: async (ctx, args) => {
		// Check and get the currently authenticated user
		const currentUser = await getAuthenticatedUser(ctx);
		// Get the post
		const post = await ctx.db.get(args.postId);
		// Throw error if post not found
		if (!post) throw new Error("404 Not Found: Post not found.");
		// Insert the comment
		const commentId = await ctx.db.insert("comments", {
			commenterId: currentUser._id,
			postId: args.postId,
			content: args.content,
		});
		// Increment the post's comment count (+1)
		await ctx.db.patch(args.postId, { comments: post.comments + 1 });
		// ToDo: If the commenter isn't the author, send a notification to the author
		// Return the inserted comment Id
		return commentId;
	},
});
