import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import request from "../../../utils/ApiRequest";
import { ApiUrl } from "../../../enums/apiUrls";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof schema>;

const UserLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth-token"]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const resp = await request(ApiUrl.LOGIN, "POST", data);

    if (resp.success) {
      toast.success("Login success");
      setCookie("auth-token", resp.data?.token, { path: "/", maxAge: 3600 });
      navigate("/dashboard");
    } else {
      toast.error(resp?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          {...register("email")}
        />
        {errors.email && <p className="err_msg">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="err_msg">{errors.password.message}</p>
        )}

        <button className="submit_btn" type="submit">
          Log In
        </button>

        <div className="footer_text" onClick={() => navigate("/auth/signup")}>
          Create an account
        </div>
      </form>
    </>
  );
};

export default UserLogin;
