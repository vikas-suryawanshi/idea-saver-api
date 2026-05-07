const joi=require("joi");

module.exports.ideaSchema=joi.object({
        author:joi.string().required(),
        title:joi.string().required(),
        description:joi.string().required().min(3),
});