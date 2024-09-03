import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    // Lấy token từ cookie của yêu cầu
    const token = req.cookies.jwt;
    if (!token) {
      console.warn("Unauthorized access attempt: No token provided");
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Xác thực token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.warn("Unauthorized access attempt: Invalid token");
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Tìm người dùng dựa trên ID trong token, loại trừ mật khẩu và câu trả lời bí mật
    const user = await User.findById(decoded.userId).select(
      "-password -secretAnswer"
    );
    if (!user) {
      console.warn(
        `Unauthorized access attempt: User not found for ID ${decoded.userId}`
      );
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Gán đối tượng người dùng vào yêu cầu để sử dụng trong các middleware hoặc route tiếp theo
    req.user = user;
    next();
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in protectRoute middleware: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
