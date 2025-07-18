"use server"

// Get all users (mock data)
export async function getUsers() {
  try {
    // Mock data
    return {
      users: [
        {
          id: "1",
          email: "admin@aicmt.com",
          firstName: "Admin",
          lastName: "User",
          role: "ADMIN",
          status: "ACTIVE",
          company: "AICMT International",
          position: "Administrator",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 1,
        totalPages: 1
      }
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      users: [],
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0
      }
    };
  }
}

// Get user statistics (mock data)
export async function getUserStats() {
  try {
    return {
      total: 1,
      admins: 1,
      editors: 0,
      active: 1,
      inactive: 0,
      newThisMonth: 1,
      pending: 0
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      total: 0,
      admins: 0,
      editors: 0,
      active: 0,
      inactive: 0,
      newThisMonth: 0,
      pending: 0
    };
  }
}

// Create a new user
export async function createUser(data: any) {
  try {
    console.log("Creating user:", data);
    return {
      success: true,
      user: {
        id: "new-user-id",
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }
}