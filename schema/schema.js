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

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});