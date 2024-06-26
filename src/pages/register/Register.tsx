import ButtonShared from "@/components/Button/Button";
import HELMET from "@/components/shared/HELMET/HELMET";
import { AuthProvider } from "@/contexts/auth-context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import Loader from "@/components/shared/Loader/Loader";
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const { Register, Loading } = React.useContext(AuthProvider);
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const isValidProps = registerSchema.safeParse(values);
      if (!isValidProps.success) {
        setError("root", { message: "Please provide all field" });
        return;
      }
      const { name, email, password } = isValidProps.data;
      const data = await fetch(
        `https://luxury-living-server-o99b.onrender.com/users/${email}`
      );
      const exist = await data.json();
      if (!exist.success) {
        await fetch(`https://luxury-living-server-o99b.onrender.com/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        await Register(email, password);
      } else {
        setError("root", { message: "Email already exist" });
      }
    } catch (err) {
      console.log(err + "Register page");
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
          <HELMET title="REGISTER" />
          <div className="border px-6 py-3 flex flex-col gap-4 my-4">
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Smith"
                {...register("name")}
                className="border py-2 px-4 border-cBlue w-full focus:outline-none"
              />
              {errors?.name && (
                <div className="text-cError font-semibold text-sm">
                  {errors?.name?.message}
                </div>
              )}
            </div>
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

            <div>
              <ButtonShared title={"Submit"} type="submit" />
            </div>
            <div className="text-sm">
              <p>
                Already have an account?{" "}
                <Link className="text-cBlue underline" to={"/login"}>
                  SIGN IN
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Register;
