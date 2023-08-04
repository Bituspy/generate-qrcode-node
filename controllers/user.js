const { response } = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { generateQRC } = require("./qr");
const fs = require("fs");
const path = require("path");



const getUsers = (request, response) => {
  User.find().exec((error, Users) => {
    if (error) {
      response.status(400).json(error);
    } else {
      if (Users) {
        response.status(201).json(Users);
      } else {
        return response.status(404).json({
          message: "User not found",
        });
      }
    }
  });
};

const createUser = (request, response) => {
  User.create(
    {
      user_id: request.body.user_id,
      user_name: request.body.user_name,
      qrc : generateQRC({user_name : request.body.user_name})

    },
    (error, User) => {
      if (error) {
        response.status(400).json(error);
      } else {
        response.status(201).json(User);
      }
    }
  );
};


const updateUser = (request, response) => {
  const Userid = request.params.Userid;

  User.findById(Userid).exec((error, User) => {
    if (!User) {
      return response.status(404).json({
        message: "Userid not found",
      });
    } else if (error) {
      return response.status(400).json(error);
    }
    User.user_id = request.body.user_id;
      User.user_name = request.body.user_name;
    User.save((error, User) => {
      if (error) {
        response.status(404).json(error);
      } else {
        response.status(200).json(User);
      }
    });
  });
};

const deleteUser = (request, response) => {
  const { Userid } = request.params;
  if (Userid) {
    User.findByIdAndRemove(Userid).exec((error, User) => {
      if (error) {
        response.status(404).json(error);
      }
      response.status(204).json({ message: "deleted" });
    });
  } else {
    return response.status(404).json({ message: "Userid not found" });
  }
};


const readUser = (request, response) => {
  const userId = request.params.userid;

  // Assuming that the QR codes are stored in the 'uploads' folder with filenames as the user_name.
  const fileName = `uploads/${userId}.png`;

  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      response.status(404).json({ message: "QR code not found for the user." });
    } else {
      User.findById(userId).exec((err, User) => {
        if (!User) {
          response.status(404).json({ message: "User not found." });
        } else if (err) {
          response.status(500).json(err);
        } else {
          response.status(200).json(User);
        }
      });
    }
  });
};


const getUserQRCodeImage = (req, res) => {
  const { user_name } = req.params;

  User.findOne({ user_name }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving user." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log(user.qrc);
    const fileName = user.qrc;
    const absolutePath = path.join(__dirname, fileName); // Resolve the absolute path

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res
          .status(404)
          .json({ message: "QR code not found for the user." });
      }

      res.sendFile(absolutePath);
    });
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  readUser,
  getUserQRCodeImage
};
