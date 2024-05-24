import createRouter from "../common/createRouter";
import { validateRequest } from "../common/validate";
import { signUpSchema, loginSchema } from "../dto/userSchema";
import AuthController from "../controllers/auth";

export const authRouter = createRouter({
  basePath: "/api/v1/auth",
  allowedUsers: ["user"],
  version: 1,
});

authRouter.post(
  "/signUp",
  validateRequest(signUpSchema),
  async (req, res) => await AuthController.signUp(req, res)
);

authRouter.post(
  "/login",
  validateRequest(loginSchema),
  async (req, res) => await AuthController.login(req, res)
);
