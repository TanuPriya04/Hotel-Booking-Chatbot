# 🏨 Hotel Booking Chatbot with Email Confirmation

This is an **AI-powered hotel booking chatbot** built with **Node.js, Express, Gemini AI API, and Nodemailer**.  
It helps users book rooms by chatting naturally, asking for location, dates, number of persons, and rooms, and then sends a **booking confirmation email**.

---

## 🚀 Features

- 💬 **AI Chatbot** powered by Google Gemini API.
- 🏨 Room booking flow (location, dates, room type, persons, rooms).
- 📧 **Automatic email confirmation** after booking.
- 🌍 Supports natural conversation & fallback to AI for general queries.
- 🛡 Secure credentials using `.env` file.
- 🔄 Conversation state tracking per session.
- 🖥 Easy integration with frontend apps.

---

## 🛠 Tech Stack

**Backend**:
- Node.js
- Express.js

**AI**:
- Google Gemini API (Gemini Pro Model)

**Email Service**:
- Nodemailer (Gmail SMTP)

**Others**:
- dotenv (for environment variables)
- Body-parser / Express JSON parsing

---

## 📦 Frameworks & Libraries Used

- **express** - Web server
- **nodemailer** - Email sending
- **@google/generative-ai** - Gemini API integration
- **dotenv** - Environment variable management

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
  git clone https://github.com/your-username/hotel-booking-chatbot.git
  cd hotel-booking-chatbot


2️⃣ Install dependencies

     npm install

3️⃣ Create .env file



    EMAIL_USER=yourgmail@gmail.com
    EMAIL_PASS=your-gmail-app-password
    GEMINI_API_KEY=your-gemini-api-key
    CLIENT_ID=your-google-oauth-client-id
    CLIENT_SECRET=your-google-oauth-client-secret
    REFRESH_TOKEN=your-google-oauth-refresh-token

🔑 How to Get API Keys & Credentials
1. Get Gemini API Key

    1. Go to Google AI Studio.
    
    2. Sign in with your Google account.
    
    3. Click "Create API Key".
    
    4. Copy the key and set it in .env as:

        GEMINI_API_KEY=your-key-here

2. Get Gmail App Password (Quick Method)

   1. Go to Google Account Security.

   2. Enable 2-Step Verification.

   3. Go to App Passwords.
    
   4. Select "Mail" as the app and "Other" for device (name it NodeMailer).
    
   5. Copy the generated 16-character password.
    
   6. Set it in .env as:

      EMAIL_PASS=your-16-char-password

3. (Optional & More Secure) Use OAuth2 with Refresh Token

    1.If you don’t want to store your Gmail password at all:
    
    2.Go to Google Cloud Console.
    
    3.Create a New Project.
    
    4.Go to APIs & Services > Credentials.
    
    5.Click Create Credentials > OAuth Client ID.
    
    6.Select "Web Application" and add http://localhost as an authorized redirect URI.
    
    7.Copy the Client ID and Client Secret to .env:

        CLIENT_ID=your-client-id
        CLIENT_SECRET=your-client-secret


  Get Refresh Token

        Use a tool like OAuth 2.0 Playground.
        
        Select Gmail API → https://mail.google.com/ scope.
        
        Authorize and exchange the code for a Refresh Token.
        
        Add to .env:
        
        CLIENT_ID=your_client_id
        CLIENT_SECRET=your_client_secret
        REFRESH_TOKEN=your_refresh_token

▶️ Run the Project
node index.js

📬 Email Confirmation Example
    Subject: Booking Confirmation - BK2025XYZ
    Hello John Doe,
    
    Your booking is confirmed!
    Room: Deluxe
    Nights: 3
    Total: ₹7500
    Booking ID: BK2025XYZ
    
    Thank you for booking with us!



