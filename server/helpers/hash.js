const encrypt = require("bcryptjs");

const encryptPass = (password) => {
    const salt = encrypt.genSaltSync();

    return encrypt.hashSync(password, salt);
};

const verifyPass = (password, hash) => {
    return encrypt.compareSync(password, hash);
};

module.exports = { encryptPass, verifyPass };
