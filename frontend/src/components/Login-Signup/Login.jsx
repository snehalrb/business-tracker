import { useForm } from "react-hook-form";
import { endpoint } from "../../utils/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [loginerrors, setLoginerrors] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "snehaltest@gmail.com", password: "helloworld" },
  });

  const validateEmail = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      setError("email", { type: "manual", message: "Invalid email address" });
    } else {
      if (errors.email) {
        clearErrors("email");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await endpoint.post("/login", data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.returnedToken);
        navigate("/dashboard");
      } else setLoginerrors(true);
    } catch (e) {
      toast.error("Error while authenticating");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {loginerrors && <ErrorDisplay message={"Invalid Login Credentials"} />}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="youremail@test.com"
          onChange={validateEmail}
          defaultValue={"snehaltest@gmail.com"}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.email && <ErrorDisplay message={errors.email.message} />}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="*******"
          defaultValue={"helloworld"}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.password && <ErrorDisplay />}
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        Login
      </button>
    </form>
  );
};

const ErrorDisplay = ({ message }) => {
  !message ? (message = "This field is required") : message;
  return <span className="text-red-500 text-sm mt-1">{message}</span>;
};
