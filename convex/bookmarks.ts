import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		// Check and access the current user
		const currentUser = await getAuthenticatedUser(ctx);
		// Get the existing bookmark document
		const sameBookmark = await ctx.db
			.query("bookmarks")
			.withIndex("by_both", (q) =>
				q.eq("bookmarkerId", currentUser._id).eq("postId", args.postId),
			)
			.first();
		// Bookmark
		if (!sameBookmark) {
			// Insert bookmark to DB
			await ctx.db.insert("bookmarks", {
				bookmarkerId: currentUser._id,
				postId: args.postId,
			});
			// Confirm bookmarking
			return true;
		}
		// Un-Bookmark
		else {
			// Delete existing bookmark
			await ctx.db.delete(sameBookmark._id);
			// Confirm un-bookmarking
			return false;
		}
	},
});
