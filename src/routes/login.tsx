import { useForm, SubmitHandler } from "react-hook-form";
import "../scss/main.scss";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Login</p>
        <div className="input-group">
          <input
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="input-group">
          <input
            {...register("password", { required: true })}
            placeholder="password"
          />
          {errors.password && (
            <span className="error-message">This field is required</span>
          )}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}
