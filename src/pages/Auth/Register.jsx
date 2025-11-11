import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";


export default function Register() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_picture: null,
    role: "",
  });

  const [errors, setErrors] = useState({});

  async function handlerRegister(e) {

    e.preventDefault();

    const res = await fetch('/api/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Registration successfully");
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setErrors(data);
    }


  }

  return (
    <>
      <h2 className="title">Register Page</h2>

      <form onSubmit={handlerRegister} className="w-1/2 mx-auto space-y-6">
        <div>
          <input type="text" placeholder="name"
            value={formData.name} onChange={(e) => setFormData({
              ...formData, name: e.target.value
            })}

          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div>
          <input type="text" placeholder="email"
            value={formData.email} onChange={(e) => setFormData({
              ...formData, email: e.target.value
            })} />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <div>
          <input type="password" placeholder="Password"
            value={formData.password} onChange={(e) => setFormData({
              ...formData, password: e.target.value
            })} />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div>
          <input type="password" placeholder=" Confirm Password"
            value={formData.password_confirmation} onChange={(e) => setFormData({
              ...formData, password_confirmation: e.target.value
            })} />
        </div>
        <div>
          <input type="file" placeholder=" profile picture"
            value={formData.profile_picture} onChange={(e) => setFormData({
              ...formData, profile_picture: e.target.value
            })} />
        </div>
        <div>
          <input type="text" placeholder="Role"
            value={formData.role} onChange={(e) => setFormData({
              ...formData, role: e.target.value
            })} />

        </div>

        <button className="primary-btn">Register</button>
      </form>
    </>

  );
}
