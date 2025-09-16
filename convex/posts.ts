import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

// Query - Get All Posts for Feed
export const getFeedPosts = query({
	handler: async (ctx) => {
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
				const author = (await ctx.db.get(post.authorId))!;
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
						_id: author?._id,
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

// Query - Get Posts of a User
export const getUserPosts = query({
	args: {
		userId: v.optional(v.id("users")),
	},
	handler: async (ctx, args) => {
		// Get the user
		const user = args.userId
			? await ctx.db.get(args.userId)
			: await getAuthenticatedUser(ctx);
		// Throw an error if user not found
		if (!user) throw new Error("404 Not Found: User not found.");
		// Fetch posts of the user
		const posts = await ctx.db
			.query("posts")
			.withIndex("by_author", (q) => q.eq("authorId", args.userId || user._id))
			.order("desc")
			.collect();
		// Return the posts as response
		return posts;
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
		const postId = await ctx.db.insert("posts", {
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
		// Return the inserted post Id
		return postId;
	},
});

// Mutation - Delete Post
export const deletePost = mutation({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		// Check and get the currently authenticated user
		const currentUser = await getAuthenticatedUser(ctx);
		// Get the post
		const post = await ctx.db.get(args.postId);
		if (!post) throw new Error("404 Not Found: Post not found.");
		// Verify post authority
		if (post.authorId !== currentUser._id)
			throw new Error("403 Forbidden: User don't have permission to delete the post.");
		// Delete connected buzzes
		const buzzes = await ctx.db
			.query("buzzes")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const buzz of buzzes) await ctx.db.delete(buzz._id);
		// Delete connected comments
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const comment of comments) await ctx.db.delete(comment._id);
		// Delete connected bookmarks
		const bookmarks = await ctx.db
			.query("bookmarks")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const bookmark of bookmarks) await ctx.db.delete(bookmark._id);
		// Delete connected notifications
		const notifications = await ctx.db
			.query("notifications")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const notification of notifications) await ctx.db.delete(notification._id);
		// Delete connected files from storage
		await ctx.storage.delete(post.storageId);
		// Delete the post
		await ctx.db.delete(args.postId);
		// Decrement author's post count (-1)
		await ctx.db.patch(currentUser._id, {
			posts: (currentUser.posts || 1) - 1,
		});
	},
});

// Mutation - Toggle Post Buzzing
export const toggleBuzz = mutation({
	args: {
		postId: v.id("posts"),
	},
	handler: async (ctx, args) => {
		// Check and access current user
		const currentUser = await getAuthenticatedUser(ctx);
		// Get the existing buzz document
		const existingBuzz = await ctx.db
			.query("buzzes")
			.withIndex("by_both", (q) =>
				q.eq("buzzerId", currentUser._id).eq("postId", args.postId),
			)
			.first();
		// Get the post
		const post = await ctx.db.get(args.postId);
		// Throw error if post not found
		if (!post) throw new Error("404 Not Found: Post not found.");
		// Unbuzz
		if (existingBuzz) {
			// Delete the existing buzz document
			await ctx.db.delete(existingBuzz._id);
			// Decrement buzz count of the post by 1
			await ctx.db.patch(args.postId, { buzzes: post.buzzes - 1 });
			// Confirm Unbuzzing
			return false;
		}
		// Buzz
		else {
			// Insert the new buzz
			await ctx.db.insert("buzzes", {
				buzzerId: currentUser._id,
				postId: args.postId,
			});
			// Increment buzz count of the post by 1
			await ctx.db.patch(args.postId, { buzzes: post.buzzes + 1 });
			// Send a notification to the author
			if (post.authorId !== currentUser._id) {
				await ctx.db.insert("notifications", {
					postId: post._id,
					type: "buzz",
					receiverId: post.authorId,
					senderId: currentUser._id,
				});
			}
			// Confirm Buzzing
			return true;
		}
	},
});
