const Form = require('../models/portfolio.models');

// Controller function to handle form submission
const submitForm = async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    // Form data creation
    const newForm = new Form({
      name,
      email,
      subject,
      phone,
      message,
    });

    // Save the form data to database
    await newForm.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again' });
  }
};

// GET - Fetch all form submissions (without sorting)
const getForms = async (req, res) => {
  try {
    const forms = await Form.find(); // koi sort nahi, jaise hain waise hi milenge
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch form data' });
  }
};

module.exports = {
  submitForm,
  getForms,
};
