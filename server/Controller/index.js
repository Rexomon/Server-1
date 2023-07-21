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

            const error = Error("Login yang bener woi ");

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

                    // res.status(200).json({
                    //     acces_token,
                    //     username: userLogin.username,
                    // });
                    res.cookie("accessToken", acces_token, { httpOnly: true });

                    // Pass the session data to the view and render it
                    res.render("home.ejs", {
                        username: userLogin.username,
                        loginSuccess: true,
                    });
                }
            }
        } catch (error) {
            res.redirect(`/login.html?loginFailed=true`);
        }
    }

    static async userData(req, res) {
        try {
            const userData = await User.findAll({
                attributes: ["id", "username"],
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
