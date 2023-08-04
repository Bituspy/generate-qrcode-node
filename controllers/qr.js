const QRCode = require("qrcode");

const generateQRC = (Userdata) => {
let stringdata = JSON.stringify(Userdata);
console.log(Userdata.user_name);

QRCode.toFile(
  "./uploads/"+ Userdata.user_name +".png",
  stringdata,
  function (err) {
    if (err) return console.log("couldn't generate QR");
    console.log("generated to uploads folder");
  }
);
return "../uploads/" + Userdata.user_name + ".png";
};


    module.exports = {
      generateQRC,
    };