const Card = require('../models/card.models');
const User = require('../models/user.models');

// 📦 Create Card
exports.createCard = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    const userId = req.user.id;

    if (!title || !subtitle || !description) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title, subtitle aur description chahiye boss 📋',
      });
    }

    const newCard = await Card.create({
      title,
      subtitle,
      description,
      user: userId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Card create ho gaya 🎉',
      data: newCard,
    });

  } catch (error) {
    console.error('❌ Create Card Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while creating card 😔',
    });
  }
};

// 📦 Get All Cards of Current User
exports.getUserCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const cards = await Card.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: 'success',
      message: 'Tumhare sare cards mil gaye 🎯',
      data: cards,
    });

  } catch (error) {
    console.error('❌ Get Cards Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while fetching cards 😵',
    });
  }
};

// 📦 Get Single Card
exports.getSingleCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({
        status: 'fail',
        message: 'Card nahi mila 😕',
      });
    }

    // 👇 Ownership check
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Tum is card ke malik nahi ho 😡',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Card mil gaya ✨',
      data: card,
    });

  } catch (error) {
    console.error('❌ Get Single Card Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while fetching single card 😵',
    });
  }
};

// 📦 Update Card
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    // Pehle card uthao
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({
        status: 'fail',
        message: 'Update karne ke liye card nahi mila 😕',
      });
    }

    // 👇 Ownership check
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Tum is card ke malik nahi ho 😡',
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { title, subtitle, description },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Card update ho gaya 🔥',
      data: updatedCard,
    });

  } catch (error) {
    console.error('❌ Update Card Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while updating card 😵',
    });
  }
};

// 📦 Edit Card
exports.editCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    // Pehle card uthao
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({
        status: 'fail',
        message: 'Edit karne ke liye card nahi mila 😕',
      });
    }

    // 👇 Ownership check
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Tum is card ke malik nahi ho 😡',
      });
    }

    const editCard = await Card.findByIdAndUpdate(
      id,
      { title, subtitle, description },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Card edit ho gaya 🔥',
      data: editCard,
    });

  } catch (error) {
    console.error('❌ edit Card Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while edit card 😵',
    });
  }
};

// 📦 Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Pehle card uthao
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({
        status: 'fail',
        message: 'Delete karne ke liye card nahi mila 😕',
      });
    }

    // 👇 Ownership check
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Tum is card ke malik nahi ho 😡',
      });
    }

    await Card.findByIdAndDelete(id);

    return res.status(200).json({
      status: 'success',
      message: 'Card delete ho gaya 🚀',
    });

  } catch (error) {
    console.error('❌ Delete Card Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while deleting card 😵',
    });
  }
};
