import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		// Check and get the currently authenticated user
		const currentUser = await getAuthenticatedUser(ctx);
		// Fetch the same bookmark document (if it exists)
		const sameBookmark = await ctx.db
			.query("bookmarks")
			.withIndex("by_both", (q) =>
				q.eq("bookmarkerId", currentUser._id).eq("postId", args.postId),
			)
			.first();
		// Check if the bookmark already exists or not
		if (!sameBookmark) {
			await ctx.db.insert("bookmarks", {
				bookmarkerId: currentUser._id,
				postId: args.postId,
			});
			return true;
		} else {
			await ctx.db.delete(sameBookmark._id);
			return false;
		}
	},
});
