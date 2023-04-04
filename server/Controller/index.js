const { User, Book } = require("../models");
const { verifyPass } = require("../helpers/hash");
const { encodeToken } = require("../helpers/jwt");

class Controller {
    static async userRegister(req, res, next) {
        const { username, password } = req.body;
        try {
            const userRegister = await User.create({
                username,
                password,
            });

            res.status(201).json({ message: " Sukses mendaftar" });
        } catch (error) {
            next(error);
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { username, password } = req.body;

            const userLogin = await User.findOne({ where: { username } });

            const error = { name: "login tidak valdi" };

            if (!userLogin) {
                throw error;
            } else {
                const isValid = verifyPass(password, userLogin.password);

                if (!isValid) {
                    throw error;
                } else {
                    const acces_token = encodeToken({
                        id: userLogin.id,
                    });

                    res.status(200).json({
                        acces_token,
                        username: userLogin.username,
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    static async userData(req, res) {
        try {
            const userData = await User.findAll({
                attributes: ["id", "username", "password"],
            });
            if (userData.length > 0) {
                res.status(201).json({
                    DataPengguna: userData,
                });
            } else {
                res.status(200).json({
                    message: "Gagal mendapatkan data",
                    data: [],
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
