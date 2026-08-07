const joi=require("joi");

// for crete form schema
module.exports.ideaSchema=joi.object({
        author:joi.string().required(),
        title:joi.string().required(),
        description:joi.string().required().min(3),
});

// for edit form validation schema
module.exports.updateIdeaSchema=joi.object({
    description:joi.string().required().min(3),
});

module.exports.reviewSchema = joi.object({
  review: joi.object({
    rating: joi.number().required().min(1).max(5),
    comment: joi.string().required(),
  }).required(),
});