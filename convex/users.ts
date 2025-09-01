import { v } from "convex/values";
import { mutation, MutationCtx, QueryCtx } from "./_generated/server";

// Mutation - Create User
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

// Helper Function - Get Authenticated User
export const getAuthenticatedUser = async (ctx: QueryCtx | MutationCtx) => {
	// Get the user identity
	const userIdentity = await ctx.auth.getUserIdentity();
	// Check if the user is identified/authorized
	if (!userIdentity) throw new Error("401 Unauthorized: User is not authorized.");
	// Get the user from DB
	const currentUser = await ctx.db
		.query("users")
		.withIndex("by_clerk_id", (qry) => qry.eq("clerkId", userIdentity.subject))
		.first();
	// Check if the user isn't found
	if (!currentUser) throw new Error("404 Not Found: User not found.");
	// Return the authenticated user
	return currentUser;
};
