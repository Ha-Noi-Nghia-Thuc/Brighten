import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const registerController = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ yêu cầu
    const {
      firstName,
      lastName,
      gender,
      dob,
      username,
      password,
      secretAnswer,
      email,
      phoneNumber,
      address,
      ward,
      district,
      city,
      country,
    } = req.body;

    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.warn(`Registration attempt with existing username: ${username}`);
      return res.status(400).json({ error: "Username is already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }
    // Băm mật khẩu bằng bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Kiểm tra định dạng email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      console.warn(`Invalid email format provided: ${email}`);
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Kiểm tra xem email đã được đăng ký chưa
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.warn(`Registration attempt with existing email: ${email}`);
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Kiểm tra định dạng số điện thoại (giả định số điện thoại Việt Nam)
    const phoneNumberRegex =
      /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g;
    if (!phoneNumberRegex.test(phoneNumber)) {
      console.warn(`Invalid phone number format provided: ${phoneNumber}`);
      return res.status(400).json({ error: "Invalid phone format" });
    }

    // Tạo một người dùng mới
    const newUser = new User({
      firstName,
      lastName,
      gender,
      dob,
      username,
      password: hashedPassword,
      secretAnswer,
      email,
      phoneNumber,
      address,
      ward,
      district,
      city,
      country,
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    await newUser.save();

    // Tạo token và đặt trong cookie phản hồi
    generateTokenAndSetCookie(newUser._id, res);

    // Phản hồi với dữ liệu người dùng (trừ thông tin nhạy cảm)
    console.log(`New user registered successfully: ${username}`);
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      gender: newUser.gender,
      dob: newUser.dob,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address,
      ward: newUser.ward,
      district: newUser.district,
      city: newUser.city,
      country: newUser.country,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      bio: newUser.bio,
      link: newUser.link,
    });
  } catch (error) {
    // Ghi lại lỗi chi tiết và phản hồi với thông báo lỗi chung
    console.error(`Error in registerController: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    // Lấy thông tin đăng nhập từ yêu cầu
    const { username, password } = req.body;

    // Tìm người dùng dựa trên username
    const user = await User.findOne({ username });

    // Kiểm tra mật khẩu có khớp với mật khẩu được băm trong cơ sở dữ liệu không
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    // Nếu người dùng không tồn tại hoặc mật khẩu không chính xác, trả về lỗi
    if (!user || !isPasswordCorrect) {
      console.warn(`Login failed for username: ${username}`);
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Tạo JWT token và đặt vào cookie
    generateTokenAndSetCookie(user._id, res);

    // Phản hồi với thông tin người dùng sau khi đăng nhập thành công
    console.log(`User logged in successfully: ${username}`);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dob: user.dob,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      ward: user.ward,
      district: user.district,
      city: user.city,
      country: user.country,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      bio: user.bio,
      link: user.link,
    });
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in loginController: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    // Xóa cookie chứa JWT bằng cách đặt thời gian hết hạn của nó là 0
    res.cookie("jwt", "", { maxAge: 0 });

    // Phản hồi với thông báo đăng xuất thành công
    console.log("User logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in logoutController: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrentUserProfile = async (req, res) => {
  try {
    // Tìm người dùng dựa trên ID đã được gán vào yêu cầu từ middleware bảo vệ
    const user = await User.findById(req.user._id).select(
      "-password -secretAnswer"
    );

    // Trả về thông tin người dùng (không bao gồm mật khẩu và câu trả lời bí mật)
    res.status(200).json(user);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in meController: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
