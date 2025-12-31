import express from "express"
import { profile } from "../controllers/user.controller.js"
import { authorize } from "../middlewares/authorize.js"
import { User } from "../models/user.model.js"

const router = express.Router()

router.get("/me", authorize, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password")

  if (!user) {
    return res.status(401).json({ success: false })
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

router.get("/profile",authorize,profile)

export default router