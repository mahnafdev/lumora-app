import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Mutation - Generate File (Image) Upload URL
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
		// Get the current user identity
		const userIdentity = await ctx.auth.getUserIdentity();
		// Check if the user identity is present
		if (!userIdentity) throw new Error("401 Unauthorized: User is not authorized.");
		// Get the current user by ClerkId
		const currentUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (qry) => qry.eq("clerkId", userIdentity.subject))
			.first();
		// Check if the current user isn't found
		if (!currentUser) throw new Error("404 Not Found: User not found.");
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
