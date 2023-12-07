"use server";

import { FilterQuery, SortOrder } from "mongoose";

import Crew from "../models/crew.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function createCrew(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string // Change the parameter name to reflect it's an id
) {
  ConnectionToDb()
  try {
    // Find the user with the provided unique id
    const user = await User.findOne({ id: createdById });

    if (!user) {
      throw new Error("User not found"); // Handle the case if the user with the id is not found
    }

    const newCrew = new Crew({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id, // Use the mongoose ID of the user
    });

    const createdCrew = await newCrew.save();

    // Update User model
    user.crews.push(createdCrew._id);
    await user.save();

    return createdCrew;
  } catch (error) {
    // Handle any errors
    console.error("Error creating crew:", error);
    throw error;
  }
}

export async function fetchCrewDetails(id: string) {
  ConnectionToDb()
  try {
    const crewDetails = await Crew.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    return crewDetails;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching crew details:", error);
    throw error;
  }
}

export async function fetchCrewPosts(id: string) {
  ConnectionToDb()
  try {
    const crewPosts = await Crew.findById(id).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "image _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return crewPosts;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching crew posts:", error);
    throw error;
  }
}

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  ConnectionToDb()
  try {
    // Calculate the number of communities to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter communities.
    const query: FilterQuery<typeof Crew> = {};

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched communities based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    // Create a query to fetch the communities based on the search and sort criteria.
    const communitiesQuery = Crew.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    // Count the total number of communities that match the search criteria (without pagination).
    const totalCommunitiesCount = await Crew.countDocuments(query);

    const communities = await communitiesQuery.exec();

    // Check if there are more communities beyond the current page.
    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return { communities, isNext };
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}

export async function addMemberToCrew(
  crewId: string,
  memberId: string
) {
  ConnectionToDb()
  try {
    // Find the crew by its unique id
    const crew = await Crew.findOne({ id: crewId });

    if (!crew) {
      throw new Error("Crew not found");
    }

    // Find the user by their unique id
    const user = await User.findOne({ id: memberId });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user is already a member of the crew
    if (crew.members.includes(user._id)) {
      throw new Error("User is already a member of the crew");
    }

    // Add the user's _id to the members array in the crew
    crew.members.push(user._id);
    await crew.save();

    // Add the crew's _id to the communities array in the user
    user.crews.push(crew._id);
    await user.save();

    return crew;
  } catch (error) {
    // Handle any errors
    console.error("Error adding member to crew:", error);
    throw error;
  }
}

export async function removeUserFromCrew(
  userId: string,
  crewId: string
) {
  ConnectionToDb()
  try {
    const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
    const crewIdObject = await Crew.findOne(
      { id: crewId },
      { _id: 1 }
    );

    if (!userIdObject) {
      throw new Error("User not found");
    }

    if (!crewIdObject) {
      throw new Error("Crew not found");
    }

    // Remove the user's _id from the members array in the crew
    await Crew.updateOne(
      { _id: crewIdObject._id },
      { $pull: { members: userIdObject._id } }
    );

    // Remove the crew's _id from the communities array in the user
    await User.updateOne(
      { _id: userIdObject._id },
      { $pull: { crews: crewIdObject._id } }
    );

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error("Error removing user from crew:", error);
    throw error;
  }
}

export async function updateCrewInfo(
  crewId: string,
  name: string,
  username: string,
  image: string
) {
  ConnectionToDb()
  try {
    // Find the crew by its _id and update the information
    const updatedCrew = await Crew.findOneAndUpdate(
      { id: crewId },
      { name, username, image }
    );

    if (!updatedCrew) {
      throw new Error("Crew not found");
    }

    return updatedCrew;
  } catch (error) {
    // Handle any errors
    console.error("Error updating crew information:", error);
    throw error;
  }
}

export async function deleteCrew(crewId: string) {
  ConnectionToDb()
  try {
    // Find the crew by its ID and delete it
    const deletedCrew = await Crew.findOneAndDelete({
      id: crewId,
    });

    if (!deletedCrew) {
      throw new Error("Crew not found");
    }

    // Delete all threads associated with the crew
    await Thread.deleteMany({ crew: crewId });

    // Find all users who are part of the crew
    const crewUsers = await User.find({ crews: crewId });

    // Remove the crew from the 'communities' array for each user
    const updateUserPromises = crewUsers.map((user) => {
      user.crews.pull(crewId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedCrew;
  } catch (error) {
    console.error("Error deleting crew: ", error);
    throw error;
  }
}

const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to connect to mongoDB :${error.message}`);
	}
};