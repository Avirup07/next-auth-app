import User from "../models/user.model";
import { connect } from "../mongodb/mongoose"

export const createOrUpdateUser = async (
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    username
) => {
    try {
        await connect();

        const user = await User.findOneAndUpdate(
          { clerkId: id },
          {
            $set: {
              firstName: first_name,
              lastName: last_name,
              emailAddresses: email_addresses[0].email_address,
              imageUrl: image_url,
              username: username,
            },
          },
          { new: true, upsert: true }
        );

        return user;
    } catch (error) {
        console.error("Error creating or updating user:", error);
        throw error;
        
    }
}

export const deleteUser = async (id) => {
    try {
        await connect();

        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}