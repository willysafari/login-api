import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";

export default function Login() {
  const { setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful");
        
        // Validate that data.user is properly structured before setting it
        if (data.user && typeof data.user === 'object') {
          setUser(data.user);
        } else {
          console.warn("User data is not in expected format:", data.user);
          // Set a default user structure or handle appropriately
          setUser({ email: formData.email });
        }
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setErrors(data.errors || {});
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: ["Network error. Please try again."] });
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }

  return (
    <>
      <h2 className="title">Login Page</h2>
      <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
        {/* Display general errors */}
        {errors.general && (
          <div className="error p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {Array.isArray(errors.general) ? errors.general[0] : errors.general}
          </div>
        )}
        <div>
          <input 
            type="email" 
            name="email"
            placeholder="Email"
            value={formData.email} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="error text-red-500 text-sm mt-1">
              {Array.isArray(errors.email) ? errors.email[0] : errors.email}
            </p>
          )}
        </div>

        <div>
          <input 
            type="password" 
            name="password"
            placeholder="Password"
            value={formData.password} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="error text-red-500 text-sm mt-1">
              {Array.isArray(errors.password) ? errors.password[0] : errors.password}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          className="primary-btn w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
}