import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { auth } from "../../Firebase/Firebase.init";

const AddTask = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState({ title: 0, description: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;

    const taskData = {
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
      email: user.email,
      author: user.displayName,
      status: "pending"

    };

    try {
      const response = await axiosPublic.post("/tasks", taskData);
      
      if (response.data.insertedId) {
        toast.success("Task added successfully!");
        form.reset();
        setCharCount({ title: 0, description: 0 });
      }
    } catch (error) {
      toast.error(error.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    setCharCount(prev => ({
      ...prev,
      [field]: e.target.value.length
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-24">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-purple-100">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-purple-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
              <p className="text-gray-600">Create a new task to manage your work</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                Task Title
                <span className={`text-xs ${charCount.title > 50 ? 'text-red-500' : 'text-gray-500'}`}>
                  {charCount.title}/50
                </span>
              </label>
              <input
                type="text"
                name="title"
                required
                maxLength={50}
                onChange={(e) => handleInputChange(e, 'title')}
                placeholder="Enter task title"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                Description
                <span className={`text-xs ${charCount.description > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                  {charCount.description}/200
                </span>
              </label>
              <textarea
                name="description"
                maxLength={200}
                onChange={(e) => handleInputChange(e, 'description')}
                placeholder="Enter task description"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || charCount.title > 50 || charCount.description > 200}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium 
                hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-purple-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Task...
                </span>
              ) : (
                "Create Task"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;