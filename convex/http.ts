import { api } from "./_generated/api";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";

const http = httpRouter();

// POST /clerk-webhook
http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		// Get webhook secret key from Env
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
		// Throw an error if the secret key is not defined
		if (!webhookSecret)
			throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
		// Check headers
		const svixId = request.headers.get("svix-id");
		const svixSignature = request.headers.get("svix-signature");
		const svixTimestamp = request.headers.get("svix-timestamp");
		// Throw an error if any header is missing
		if (!svixId || !svixSignature || !svixTimestamp)
			return new Response("Error: No SVIX headers", {
				status: 400,
				statusText: "Bad Request",
			});
		// Get payload and body
		const payload = await request.json();
		const body = JSON.stringify(payload);
		// Create webhook with webhook-secret
		const webhook = new Webhook(webhookSecret);
		let event: any;
		// Verify webhook
		try {
			event = webhook.verify(body, {
				"svix-id": svixId,
				"svix-signature": svixSignature,
				"svix-timestamp": svixTimestamp,
			}) as any;
		} catch (error) {
			console.error("Error while Verifying Webhook:", error);
			return new Response("Error:", { status: 400, statusText: "Bad Request" });
		}
		// Get the event type
		const eventType = event.type;
		// Check if event type is user-creation
		if (eventType === "user.created") {
			// Destructure and arrange the data
			const {
				id: clerkId,
				email_addresses,
				first_name,
				last_name,
				image_url: image,
			} = event.data;
			const email = email_addresses[0].email_address;
			const fullname = `${first_name || ""} ${last_name || ""}`.trim();
			const username = email.split("@")[0];
			try {
				// Run the mutation
				await ctx.runMutation(api.users.createUser, {
					clerkId,
					username,
					fullname,
					email,
					image,
				});
			} catch (error) {
				console.error("Error while Creating User:", error);
				return new Response("Error while Creating User", {
					status: 500,
					statusText: "Internal Server Error",
				});
			}
		}
		return new Response("user.created function is executed successfully", {
			status: 200,
			statusText: "OK",
		});
	}),
});

export default http;
