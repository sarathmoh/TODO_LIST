import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const schema = yup
  .object({
    username: yup
      .string()
      .required("username is required")
      .min(4, "username must be at least 4 characters long"),
    password: yup
      .string()
      .required("password required")
      .min(3, "Password must be at least 3 characters long"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data.username, data.password);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/home");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-sm:px-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="font-bold">
                Enter your username
              </label>
              <div className="mt-1 mb-5">
                <input
                  id="username"
                  type="username"
                  {...register("username")}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors?.username ? "border-red-500" : ""
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 m-1">{errors.username.message}</p>
                )}
              </div>

              <label htmlFor="password" className="font-bold">
                Enter your password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors?.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 m-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#FEDFE1] text-black hover:bg-[#f7bec7] p-2  "
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
