const eventSchema = require("./JoiSchema")



exports.eventValidator = (req, res, next) => {
    let { error } = eventSchema.validate(req.body);
    if (error) {
        let result = error.details.map((el) => el.message).join(",");
        return res.status(400).json({
            message: result,
        });
    } else {
      next();
    }
  };