
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

      console.log(userInfo)

      const res1 = await axiosPublic.post("/users", userInfo);
      

      if (res1.data.insertedId ) {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">Join Our Team</h2>
          <p className="mt-2 text-lg text-gray-600">Create your account and start managing tasks efficiently</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 6 characters with uppercase, lowercase, and number</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Profile Picture URL</label>
                <input
                  name="photoURL"
                  type="text"
                  required
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">Privacy Policy</a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;