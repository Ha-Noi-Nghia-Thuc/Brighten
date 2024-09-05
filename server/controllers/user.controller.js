import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params; // Lấy tên người dùng từ tham số URL

  try {
    // Tìm người dùng theo tên đăng nhập, loại trừ mật khẩu và câu trả lời bí mật
    const user = await User.findOne({ username }).select(
      "-password -secretAnswer"
    );

    // Nếu không tìm thấy người dùng, trả về mã trạng thái 404
    if (!user) {
      console.warn(`User with username '${username}' not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về thông tin người dùng
    res.status(200).json(user);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedByMe = await User.findById(userId).select("following");
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user._id) {
      return res
        .status(400)
        .json({ error: "You can't follow/unfollow yourself" });
    }

    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      const newNotification = new Notification({
        type: "Follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await newNotification.save();

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfileUser = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    username,
    currentPassword,
    newPassword,
    email,
    phoneNumber,
    address,
    ward,
    district,
    city,
    country,
    bio,
    link,
  } = req.body;
  let { profileImg } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      (!newPassword && currentPassword) ||
      (newPassword && !currentPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      //   if (user.profileImg) {
      //     await cloudinary.uploader.destroy(
      //       user.profileImg.split("/").pop().split(".")[0]
      //     );
      //   }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.dob = dob || user.dob;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.ward = ward || user.ward;
    user.district = district || user.district;
    user.city = city || user.city;
    user.country = country || user.country;
    user.profileImg = profileImg || user.profileImg;
    user.bio = bio || user.bio;
    user.link = link || user.link;

    user = await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in updateProfileUser controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
