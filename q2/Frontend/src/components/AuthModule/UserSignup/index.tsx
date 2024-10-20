import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import request from "../../../utils/ApiRequest";
import { ApiUrl } from "../../../enums/apiUrls";
import { toast } from "sonner";

const schema = z
  .object({
    fullName: z.string().min(1, "Fullname is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmPassword"],
      });
    }
  });

type SignupFormInputs = z.infer<typeof schema>;

const UserSignup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    const resp = await request(ApiUrl.SIGNUP, "POST", data);

    if (resp.success) {
      toast.success("Signup successful");
      navigate("/dashboard");
    } else {
      toast.error(resp?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h3>Signup</h3>

        <label htmlFor="fullname">Full name</label>
        <input
          type="text"
          placeholder="Full name"
          id="fullname"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="err_msg">{errors.fullName.message}</p>
        )}

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

        <label htmlFor="cnf-password">Confirm Password</label>
        <input
          type="password"
          placeholder="Password"
          id="cnf-password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="err_msg">{errors?.confirmPassword?.message ?? ""}</p>
        )}

        <button className="submit_btn" type="submit">
          Signup
        </button>

        <div className="footer_text" onClick={() => navigate("/auth/login")}>
          Login to your account
        </div>
      </form>
    </>
  );
};

export default UserSignup;
