import express from "express";
import User from "../models/UserModel.js";
// import redis from '../config/redis.js'

const router = express.Router();

router.post("/add-user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({
      status: "Success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});
// this code contains sample code for caching using redis

// router.get('/get-users', async(req,res) => {
//     try {
//         // Check cache first
//         const cachedUsers = await redis.get('users')
//         if (cachedUsers) {
//             return res.status(200).json({
//                 status: 'Success',
//                 data: {
//                     users: JSON.parse(cachedUsers)
//                 }
//             })
//         }

//         // If not in cache, get from DB
//         const users = await User.find()

//         // Set cache with 1 hour expiration
//         await redis.setex('users', 3600, JSON.stringify(users))

//         res.status(200).json({
//             status: 'Success',
//             data: {
//                 users: users
//             }
//         })
//     } catch(err) {
//         res.status(500).json({
//             status: 'Failed',
//             message: err
//         })
//     }
// })

router.put("/update-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});
router.get("/test", (req, res) => {
  res.send("Hello World for uploading to Azure in latest version");
});

export default router;
