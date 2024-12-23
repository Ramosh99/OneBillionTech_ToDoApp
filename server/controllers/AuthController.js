import AuthService from "../services/AuthService.js";

export const AuthController = {
  register: async (req, res) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({
        status: "Success",
        message: "Registration successful",
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json({
        status: "Success",
        token: result.token,
      });
    } catch (err) {
      res.status(401).json({
        status: "Failed",
        message: err.message,
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const result = await AuthService.forgotPassword(req.body.email);
      res.status(200).json({
        status: "Success",
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const result = await AuthService.resetPassword(
        req.body.token,
        req.body.password
      );
      res.status(200).json({
        status: "Success",
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const result = await AuthService.changePassword(
        req.params.userId,
        req.body.currentPassword,
        req.body.newPassword
      );
      res.status(200).json({
        status: "Success",
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  },
};

export default AuthController;
