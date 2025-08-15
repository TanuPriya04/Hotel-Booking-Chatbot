const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendBookingConfirmation(to, name, room, nights, total, bookingId) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Booking Confirmation - ${bookingId}`,
    text: `Hello ${name},\n\nYour booking is confirmed!\nRoom: ${room}\nNights: ${nights}\nTotal: ₹${total}\nBooking ID: ${bookingId}\n\nThank you for booking with us!`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendBookingConfirmation };