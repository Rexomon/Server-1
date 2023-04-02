const errorHandler = (err, req, res, next) => {
    console.log(err);

    let code = 500;
    let message = "ADA YANG ERORRRRRRRRR!!!";

    if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
    ) {
        code = 400;
        message = err.errors[0].message;
    } else if (err.name === "login tidak valdi") {
        code = 401;
        message = "invaldi login or password";
    }

    res.status(code).json({ message });
};

module.exports = errorHandler;
