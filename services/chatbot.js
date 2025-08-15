// services/chatbot.js
const { sendBookingConfirmation } = require('./emailService');

let bookingState = {}; // stores booking progress per user/session

async function handleUserMessage(message, gemini, sessionId = "default") {
  const userMessage = message.trim().toLowerCase();

  // Initialize session state if not exists
  if (!bookingState[sessionId]) {
    bookingState[sessionId] = { step: null, data: {} };
  }
  let state = bookingState[sessionId];

  // STEP 1: Detect booking intent
  if (!state.step && /book|reserve|room/i.test(userMessage)) {
    state.step = "ask_location";
    return "🏨 Sure! In which city or location would you like to book your room?";
  }

  // STEP 2: Ask for location
  if (state.step === "ask_location") {
    state.data.location = message;
    state.step = "ask_dates";
    return `📍 Great! Location set to "${state.data.location}". What is your check-in and check-out date?`;
  }

  // STEP 3: Ask for dates
  if (state.step === "ask_dates") {
    state.data.dates = message;
    state.step = "ask_room_type";
    return "🛏️ Got it! What type of room would you like? (Deluxe, Standard, Suite)";
  }

  // STEP 4: Ask for room type
  if (state.step === "ask_room_type") {
    state.data.roomType = message;
    state.step = "ask_persons";
    return "👥 How many persons will be staying?";
  }

  // STEP 5: Ask for number of persons
  if (state.step === "ask_persons") {
    state.data.persons = message;
    state.step = "ask_rooms";
    return "🔑 How many rooms would you like to book?";
  }

  // STEP 6: Ask for number of rooms & confirm booking
  if (state.step === "ask_rooms") {
    state.data.rooms = message;
    state.step = "ask_email";
    return "📧 Please provide your email so we can send your booking confirmation.";
  }

  // STEP 7: Get email and send confirmation
  if (state.step === "ask_email") {
    state.data.email = message;
    const bookingId = "BKG" + Date.now();

    // Send email
    try {
      await sendBookingConfirmation(
        state.data.email,
        "Guest", // You can ask for the name in future steps
        state.data.roomType,
        state.data.dates,
        "Calculated total here",
        bookingId
      );
    } catch (err) {
      console.error("❌ Failed to send booking confirmation email:", err);
    }

    const confirmation = `✅ Booking confirmed!\n\n📍 Location: ${state.data.location}\n📅 Dates: ${state.data.dates}\n🛏️ Room Type: ${state.data.roomType}\n👥 Persons: ${state.data.persons}\n🔑 Rooms: ${state.data.rooms}\n📧 Email: ${state.data.email}\nBooking ID: ${bookingId}\n\nThank you for booking with us! Confirmation has been sent to your email.`;

    // Reset state
    bookingState[sessionId] = { step: null, data: {} };
    return confirmation;
  }

  // DEFAULT: Use Gemini for normal chat
  const model = gemini.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  return result.response.text();
}

module.exports = { handleUserMessage };
