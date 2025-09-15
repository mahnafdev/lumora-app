import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	// Users table
	users: defineTable({
		clerkId: v.string(),
		username: v.string(),
		fullname: v.string(),
		email: v.string(),
		image: v.string(),
		bio: v.optional(v.string()),
		followers: v.number(),
		following: v.number(),
		posts: v.number(),
	}).index("by_clerk_id", ["clerkId"]),
	// Posts table
	posts: defineTable({
		authorId: v.id("users"),
		image: v.string(),
		storageId: v.id("_storage"),
		caption: v.optional(v.string()),
		buzzes: v.number(),
		comments: v.number(),
	}).index("by_author", ["authorId"]),
	// Buzzes table
	buzzes: defineTable({
		buzzerId: v.id("users"),
		postId: v.id("posts"),
	})
		.index("by_post", ["postId"])
		.index("by_both", ["buzzerId", "postId"]),
	// Comments table
	comments: defineTable({
		commenterId: v.id("users"),
		postId: v.id("posts"),
		content: v.string(),
	}).index("by_post", ["postId"]),
	// Notifications table
	notifications: defineTable({
		receiverId: v.id("users"),
		senderId: v.id("users"),
		type: v.union(
			v.literal("buzz"),
			v.literal("comment"),
			v.literal("follow"),
			v.literal("unfollow"),
		),
		postId: v.optional(v.id("posts")),
	})
		.index("by_receiver", ["receiverId"])
		.index("by_post", ["postId"])
		.index("by_type", ["type"]),
	// Follows table
	follows: defineTable({
		followerId: v.id("users"),
		followingId: v.id("users"),
	})
		.index("by_follower", ["followerId"])
		.index("by_following", ["followingId"])
		.index("by_both", ["followerId", "followingId"]),
	// Bookmarks table
	bookmarks: defineTable({
		bookmarkerId: v.id("users"),
		postId: v.id("posts"),
	})
		.index("by_bookmarker", ["bookmarkerId"])
		.index("by_post", ["postId"])
		.index("by_both", ["bookmarkerId", "postId"]),
});
