const { MerchantModel } = require("../../models");
const { REQUEST } = require("../../types");

exports.getAllMerchants = async (req, res) => {
  try {
    const merchants = await MerchantModel.find({});

    res.json({ merchants });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getMerchantById = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const merchant = await MerchantModel.findById(merchantId);

    res.json({ merchant });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.deleteMerchantById = async (req, res) => {
  try {
    const { merchantId } = req.params;
    await MerchantModel.findByIdAndDelete(merchantId);

    res.json({ message: `${merchantId} was deleted` });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.updateMerchantById = async (req, res) => {
  try {
    const { name, email, cif, direction, phone } = req.body;
    const { merchantId } = req.params;
    const merchant = await MerchantModel.findByIdAndUpdate(merchantId, {
      name,
      email,
      cif,
      direction,
      phone,
    });

    res.status(REQUEST.UPDATED).json(merchant);
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.createMerchant = async (req, res) => {
  try {
    const { name, email, cif, direction, phone, userId } = req.body;

    const merchant = await MerchantModel.create({
      name,
      email,
      cif,
      direction,
      phone,
      userId,
    });

    res.status(REQUEST.CREATED).json({ merchant });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
