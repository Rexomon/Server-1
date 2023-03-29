"use strict";
const { encryptPass } = require("../helpers/hash");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Pake nama yang lain goblok",
                },
                validate: {
                    notEmpty: { msg: "Usernamenya kosong tolol" },
                    notNull: { msg: " Usernamnye kosong tolol" },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Passwordnya diisi dong" },
                    notNull: { msg: "Passwordnya diisi dong" },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate(user, options) {
                    user.password = encryptPass(user.password);
                },
            },
        }
    );
    return User;
};
