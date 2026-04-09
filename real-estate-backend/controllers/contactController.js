const contact = require("../models/Contact");

async function handleContact(req, res) {
  const { First_name, Last_name, email, message, phone, subject } = req.body;

  if (!First_name || !Last_name || !email || !message || !phone || !subject) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newContact = await contact.create({
    First_name,
    Last_name,
    phone,
    subject,
    email,
    message,
  });

  res.json({
    success: true,
    message: "Message received successfully",
    data: newContact,
  });
}

async function handleGetContacts(req, res) {
  try {
    const contacts = await contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { handleContact, handleGetContacts };
