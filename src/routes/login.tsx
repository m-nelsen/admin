import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import "../scss/main.scss";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    await fetch(`${import.meta.env.VITE_API_BASE_ROUTE}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response?.status === 200 ? setShouldRedirect(true) : null;
    });
  };

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-black border-2 p-4"
      >
        <p className="fs-1 text-center">Login</p>
        <div className="input-group has-validation mb-2">
          <input
            {...register("username", { required: "Please enter a username" })}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="Username"
          />
          {errors.username && (
            <div className="invalid-feedback d-block">
              Please enter a username.
            </div>
          )}
        </div>
        <div className="input-group has-validation mb-2">
          <input
            {...register("password", { required: "Please enter a password." })}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            type="password"
            placeholder="Password"
          />

          {errors.password && (
            <div className="invalid-feedback d-block">
              Please enter a password.
            </div>
          )}
        </div>

        <input type="submit" />
        {shouldRedirect && <Navigate replace to="/" />}
      </form>
      <Link to="/dashboard">Admin Page</Link>
    </div>
  );
}
