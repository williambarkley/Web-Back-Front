const { WebpageModel, MerchantModel } = require("../../models");
const { REQUEST } = require("../../types");

exports.createWebpage = async (req, res) => {
  try {
    const { city, activity, title, resume } = req.body;

    const merchant = await MerchantModel.findOne({
      userId: res.locals.userId,
    });

    const webpage = await WebpageModel.create({
      city,
      activity,
      title,
      resume,
      merchantId: merchant._id,
    });

    res.status(REQUEST.CREATED).json({ webpage });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getAllWebpages = async (req, res) => {
  try {
    const webpages = await WebpageModel.find({});

    res.json(webpages);
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getWebpageById = async (req, res) => {
  try {
    const { webpageId } = req.params;

    const webpage = await WebpageModel.findById(webpageId);

    res.json(webpage);
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.updateWebpageById = async (req, res) => {
  try {
    const { webpageId } = req.params;
    const body = req.body;

    const webpage = await WebpageModel.findByIdAndUpdate(webpageId, {
      body,
    });

    res.status(REQUEST.UPDATED).json({ webpage });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.deleteWebpageById = async (req, res) => {
  try {
    const { webpageId } = req.params;

    const webpage = await WebpageModel.findByIdAndRemove(webpageId);

    res.json({ message: `${webpageId} was deleted` });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.addPhotosToWebpageById = async (req, res) => {
  try {
    const { webpageId } = req.params;
    const { photo } = req.body;

    const oldWebpage = await WebpageModel.findById(webpageId);
    const webpage = await WebpageModel.findByIdAndUpdate(webpageId, {
      photos: [...oldWebpage.photos, photo],
    });

    res.status(REQUEST.UPDATED).json({ webpage });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.addTextsToWebpageById = async (req, res) => {
  try {
    const { webpageId } = req.params;
    const { text } = req.body;

    const oldWebpage = await WebpageModel.findById(webpageId);
    const webpage = await WebpageModel.findByIdAndUpdate(webpageId, {
      texts: [...oldWebpage.texts, text],
    });

    res.status(REQUEST.UPDATED).json({ webpage });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getWebpagesByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const webpages = await WebpageModel.find({ city });

    res.json({ webpages });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getWebpagesByCityAndActivity = async (req, res) => {
  try {
    const { city, activity } = req.params;

    const webpages = await WebpageModel.find({ city, activity });

    res.json({ webpages });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.updateScoreAndReviewToWebpageById = async (req, res) => {
  const { webpageId } = req.params;
  const { score, review } = req.body;

  const { scores, reviews } = await WebpageModel.findById(webpageId);

  const scoring =
    (scores.reduce((acc, { score }) => acc + score, 0) + score) /
      scores.length +
    1;
  const webpage = await WebpageModel.findByIdAndUpdate(webpageId, {
    scoring,
    scores: [...scores, { score, userId: res.locals.userId }],
    reviews: [...reviews, { review, userId: res.locals.userId }],
  });

  res.status(REQUEST.UPDATED).json({ webpage });
};
