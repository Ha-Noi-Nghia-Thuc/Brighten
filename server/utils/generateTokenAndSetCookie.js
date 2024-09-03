import jwt from "jsonwebtoken";

/**
 * Tạo JWT token và đặt vào cookie phản hồi
 *
 * @param {string} userId - ID của người dùng
 * @param {object} res - Đối tượng phản hồi (response) của Express
 */
export const generateTokenAndSetCookie = (userId, res) => {
  // Tạo JWT token với userId và thời hạn 3 ngày
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Cấu hình cookie để lưu trữ token
  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 ngày
    httpOnly: true, // Cookie chỉ có thể truy cập bởi server, bảo vệ khỏi XSS
    sameSite: "strict", // Cookie chỉ được gửi cùng nguồn gốc, giảm thiểu CSRF
    secure: process.env.NODE_ENV !== "development", // Sử dụng HTTPS trong môi trường production
  });

  // Log thông báo về việc tạo và gắn token vào cookie
  console.log(`JWT token generated and set in cookie for user: ${userId}`);
};
