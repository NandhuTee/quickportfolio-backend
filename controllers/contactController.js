const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const sendContact = async (req, res) => {
  const { name, email, service, budget, message } = req.body;

  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  try {
    // Save to MongoDB
    const contact = new Contact({ name, email, service, budget, message });
    await contact.save();

    // Send email notification (optional - works if EMAIL_USER & EMAIL_PASS set)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Portfolio Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

module.exports = { sendContact };
