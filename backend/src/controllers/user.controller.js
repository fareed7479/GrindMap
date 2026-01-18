import User from "../models/user.model.js";
import UserBadge from "../models/userBadge.model.js";

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    const updated = await user.save();

    // Get user's badge count
    const badgeCount = await UserBadge.countDocuments({ user: req.user.id });

    res.json({
      message: "Profile updated",
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        bio: updated.bio,
        totalPoints: updated.totalPoints,
        badgeCount: badgeCount,
        totalProblemsSolved: updated.totalProblemsSolved,
        currentStreak: updated.currentStreak,
        longestStreak: updated.longestStreak,
        averageRating: updated.averageRating,
        fastestSolveTime: updated.fastestSolveTime,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's badge count
    const badgeCount = await UserBadge.countDocuments({ user: req.user.id });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        totalPoints: user.totalPoints,
        badgeCount: badgeCount,
        totalProblemsSolved: user.totalProblemsSolved,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        averageRating: user.averageRating,
        fastestSolveTime: user.fastestSolveTime,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
