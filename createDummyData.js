var express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");


const { generateQRC } = require("./controllers/qr");

  User.remove();

const createTestData = async () => {
  //Create Test users
  try {
    // Check if user_id 3 already exists
    const user3Exists = await User.exists({ user_id: 3 });
    if (!user3Exists) {
      await User.create({
        user_id: 3,
        user_name: "user3",
        qrc: generateQRC({ user_name: "user3" }),
      });
          console.log("Dummy data created.");
    } else {
      console.log("Dummy data already exists. Skipping...");
    }


  } catch (error) {
    console.error("Error creating dummy data:", error);
  }
};

    module.exports = {
      createTestData
    };
