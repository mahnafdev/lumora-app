import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

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
