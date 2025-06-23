import { LassoSelect } from "lucide-react";
import User from "../models/user.model";
import { Connect } from "../mongodb/mongoose"
import { mongo } from "mongoose";

export const createOrUpdateUser = async (
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    username
) => {
    try {
        await Connect();

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
        await Connect();

        await User.findOneAndDelete({ clerkId: id });

        if (!user) {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}