import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

// Query - Get Bookmarks of Current User
export const getUserBookmarks = query({
	handler: async (ctx) => {
		// Check and get the current user
		const currentUser = await getAuthenticatedUser(ctx);
		// Fetch all bookmarks of current user
		const bookmarks = await ctx.db
			.query("bookmarks")
			.withIndex("by_bookmarker", (q) => q.eq("bookmarkerId", currentUser._id))
			.order("desc")
			.collect();
		// Organize posts
		const organizedBookmarks = await Promise.all(
			bookmarks.map(async (bookmark) => {
				const bookmarkedPost = await ctx.db.get(bookmark.postId);
				return bookmarkedPost;
			}),
		);
		return organizedBookmarks;
	},
});

// Mutation - Toggle Bookmarking
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
