import jwt from "jsonwebtoken"

const authorize = (req, res, next) => {
  try {
    const token = req.cookies["private-instagram-token"]
    if (!token) {
      return res.status(401).json({ success: false, message: "No token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { id: decoded.id, name: decoded.name, email:decoded.email }
    next()
  } catch {
    return res.status(403).json({ success: false, message: "Invalid token" })
  }
}

export { authorize }
