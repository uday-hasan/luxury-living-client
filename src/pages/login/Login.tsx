import ButtonShared from "@/components/Button/Button";
import HELMET from "@/components/shared/HELMET/HELMET";
import { AuthProvider } from "@/contexts/auth-context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import Loader from "@/components/shared/Loader/Loader";

const loginSchema = z.object({
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const { Login, Loading } = React.useContext(AuthProvider);
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const isValidProps = loginSchema.safeParse(values);
      if (!isValidProps.success) {
        setError("root", { message: "Please provide all field" });
        return;
      }
      const { email, password } = isValidProps.data;
      const data = await fetch(
        `https://luxury-living-server-o99b.onrender.com/users/login/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      const exist = await data.json();
      if (exist.success) {
        await Login(email, password);
        localStorage.setItem("access-token", JSON.stringify(exist?.token));
        navigate(from);
      } else {
        setError("root", { message: exist.message });
      }
    } catch (err) {
      console.log(err + "Login page");
    }
  };
  return (
    <>
      {isSubmitting || Loading ? (
        <Loader />
      ) : (
        <form
          className=" flex flex-col items-center justify-center  "
          onSubmit={handleSubmit(onSubmit)}
        >
          <HELMET title="LOGIN" />
          <div className="border px-6 py-3 flex flex-col gap-4 my-4">
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@web.com"
                {...register("email")}
                className="border py-2 px-4 border-cBlue w-full focus:outline-none"
              />
              {errors?.email && (
                <div className="text-cError font-semibold text-sm">
                  {errors?.email?.message}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                placeholder="*** *** ***"
                {...register("password")}
                className="border py-2 px-4 border-cBlue w-full focus:outline-none"
              />
              {errors?.password && (
                <div className="text-cError font-semibold text-sm">
                  {errors?.password?.message}
                </div>
              )}
            </div>
            {errors.root && (
              <p className="text-cError font-semibold">
                {errors?.root?.message}
              </p>
            )}
            <div>
              <ButtonShared title={"Submit"} type="submit" />
            </div>
            <div className="text-sm">
              <p>
                Don't have an account?{" "}
                <Link className="text-cBlue underline" to={"/register"}>
                  SIGN UP
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
