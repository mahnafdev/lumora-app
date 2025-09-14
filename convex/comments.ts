import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

// Query - Get Comments of a Post
export const getComments = query({
	args: {
		postId: v.id("posts"),
	},
	handler: async (ctx, args) => {
		// Fetch all comments of the post
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		// Return an empty array if no comments
		if (comments.length === 0) return [];
		// Organize posts with commenter data
		const organizedComments = await Promise.all(
			comments.map(async (comment) => {
				// Get the commenter data
				const commenter = await ctx.db.get(comment.commenterId);
				// Return the organizedComments
				return {
					...comment,
					commenter: {
						_id: commenter?._id,
						image: commenter?.image,
						fullname: commenter?.fullname,
					},
				};
			}),
		);
		return organizedComments;
	},
});

// Mutation - Create Comment
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
