import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
	// Get dynamic values as arguments
	args: {
		clerkId: v.string(),
		username: v.string(),
		fullname: v.string(),
		email: v.string(),
		image: v.string(),
		bio: v.optional(v.string()),
	},
	// Mutation handler
	handler: async (ctx, args) => {
		// Check if the user already exists in app/DB
		const isUserExists = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.first();
		if (isUserExists) return;
		// Insert the user in DB
		await ctx.db.insert("users", {
			clerkId: args.clerkId,
			username: args.username,
			fullname: args.fullname,
			email: args.email,
			image: args.image,
			bio: args.bio,
			followers: 0,
			following: 0,
			posts: 0,
		});
	},
});
