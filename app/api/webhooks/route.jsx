import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    switch (eventType) {
      case "user.created":
      case "user.updated":
        // Handle user creation or update
        const { first_name, last_name, email_addresses, image_url, username } = evt?.data;
        try {
          await createOrUpdateUser(
            evt.data.id,
            first_name,
            last_name,
            email_addresses,
            image_url,
            username
          );
          return new Response("User created or updated", { status: 200 });
        } catch (error) {
          console.error("Error creating or updating user:", error);
          return new Response("Error processing user data", { status: 500 });
        }
        break;
      case "user.deleted":
        const { id } = evt?.data;
        try {
          await deleteUser(id);
          return new Response("User deleted", { status: 200 });
        } catch (error) {
          console.error("Error deleting user:", error);
          return new Response("Error processing user deletion", { status: 500 });
        }
        break;
      default:
        console.warn(`Unhandled event type: ${eventType}`);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
