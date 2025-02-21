
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const {
    createUser,
    updateUserProfile,
    signOutUser,
    loading,
    setLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const dob = e.target.dob.value;
    const photoURL = e.target.photoURL.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photoURL });

      const userInfo = {
        name,
        email,
        dob,
        photoURL,
      };

      const res1 = await axiosPublic.post("/users", userInfo);

      if (res1.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        toast.error("Failed to save user data to one or more servers.");
      }

      await signOutUser();
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212428] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#38A1DB]">Create an Account</h2>
          <p className="mt-2 text-lg text-gray-400">Join TaskOrbit and start managing your tasks efficiently</p>
        </div>

        <div className="bg-[#1B1D21] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="full name"
                    className="w-full px-4 py-3 rounded-lg bg-[#1B1D21] text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#38A1DB] focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#1B1D21] text-gray-300 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#38A1DB] focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="abc@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#1B1D21] text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#38A1DB] focus:border-transparent transition duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-[#1B1D21] text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#38A1DB] focus:border-transparent transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 6 characters with uppercase, lowercase, and number</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Profile Picture URL</label>
                <input
                  name="photoURL"
                  type="text"
                  required
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 rounded-lg bg-[#1B1D21] text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#38A1DB] focus:border-transparent transition duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#294C5F] to-[#212428]  text-white hover:from-[#212428] hover:to-[#294C5F] py-3 rounded-lg font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38A1DB] transition duration-200 border border-[#38A1DB]"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-[#1B1D21] border-t border-gray-800">
            <p className="text-sm text-gray-400 text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="font-medium text-[#38A1DB] hover:text-[#2C80AF]">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="font-medium text-[#38A1DB] hover:text-[#2C80AF]">Privacy Policy</a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#38A1DB] hover:text-[#2C80AF]">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;