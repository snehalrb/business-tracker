import { useForm } from "react-hook-form";
import { endpoint } from "../utils/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  const dataPassword = watch("password");

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

  const validatePassword = (e) => {
    const confirmpass = e.target.value;

    if (confirmpass !== dataPassword) {
      //console.log(confirmpass, dataPassword);
      setError("confirmpassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      if (errors.confirmpassword) {
        clearErrors("confirmpassword");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await endpoint.post("/signup", data);
      if (response.data.success) {
        toast.success("Data saved successfully!");
        navigate("/");
      } else toast.error("Failed to save data");
    } catch (e) {
      toast.error("error while submitting form");
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name*
        </label>
        <input
          {...register("fullname", { required: true })}
          type="text"
          name="fullname"
          placeholder="Full name"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.fullname && <ErrorDisplay />}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email*
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
          placeholder="youremail@test.com"
          onChange={validateEmail}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.email && <ErrorDisplay message={errors.email.message} />}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone number*
        </label>
        <input
          {...register("phone", { required: true })}
          type="tel"
          name="phone"
          minLength="10"
          maxLength="10"
          placeholder="0475884123"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.phone && <ErrorDisplay />}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password*
        </label>
        <input
          {...register("password", { required: true, pattern: /^\S+$/ })}
          type="password"
          name="password"
          placeholder="*******"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.password && <ErrorDisplay />}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password*
        </label>
        <input
          {...register("confirmpassword", { required: true, pattern: /^\S+$/ })}
          type="password"
          name="confirmpassword"
          placeholder="*******"
          onChange={validatePassword}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {errors.confirmpassword && (
          <ErrorDisplay message={errors.confirmpassword.message} />
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        Create Account
      </button>
    </form>
  );
};

const ErrorDisplay = ({ message }) => {
  !message ? (message = "This field is required") : message;
  return <span className="text-red-500 text-sm mt-1">{message}</span>;
};

export default Signup;
