import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

// Query - Get All Posts for Feed
export const getFeedPosts = query({
	handler: async (ctx, args) => {
		// Check and get the currently authenticated user
		const currentUser = await getAuthenticatedUser(ctx);
		// Fetch all posts from DB
		const posts = await ctx.db.query("posts").order("desc").collect();
		// Return an empty array if no posts in DB
		if (posts.length === 0) return [];
		// Organize posts with author data and interaction statuses
		const organizedPosts = await Promise.all(
			posts.map(async (post) => {
				// Get the author document
				const author = await ctx.db.get(post.authorId);
				// Get the buzz document
				const buzz = await ctx.db
					.query("buzzes")
					.withIndex("by_both", (q) =>
						q.eq("buzzerId", currentUser._id).eq("postId", post._id),
					)
					.first();
				// Get the bookmark document
				const bookmark = await ctx.db
					.query("bookmarks")
					.withIndex("by_both", (q) =>
						q.eq("bookmarkerId", currentUser._id).eq("postId", post._id),
					)
					.first();
				// Return the organized post
				return {
					...post,
					author: {
						id: author?._id,
						image: author?.image,
						fullname: author?.fullname,
						username: author?.username,
					},
					isBuzzed: !!buzz,
					isBookmarked: !!bookmark,
				};
			}),
		);
		// Return the posts as response
		return organizedPosts;
	},
});

// Mutation - Generate Image Upload URL
export const generateImageUploadUrl = mutation(
	async (ctx) => await ctx.storage.generateUploadUrl(),
);

// Mutation - Create Post
export const createPost = mutation({
	// Get dynamic values as arguments
	args: {
		storageId: v.id("_storage"),
		caption: v.optional(v.string()),
	},
	// Mutation handler
	handler: async (ctx, args) => {
		// Check and get the currently authenticated user
		const currentUser = await getAuthenticatedUser(ctx);
		// Get the ImageUrl from storage
		const imageUrl = await ctx.storage.getUrl(args.storageId);
		// Check if the image URL isn't found
		if (!imageUrl) throw new Error("404 Not Found: Image URL not found.");
		// Insert the post in DB
		await ctx.db.insert("posts", {
			authorId: currentUser._id,
			storageId: args.storageId,
			image: imageUrl,
			caption: args.caption,
			buzzes: 0,
			comments: 0,
		});
		// Increment the user's post count (+1)
		await ctx.db.patch(currentUser._id, {
			posts: currentUser.posts + 1,
		});
	},
});
