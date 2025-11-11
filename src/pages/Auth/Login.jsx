import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";


export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
 


  const [errors, setErrors] = useState({});

  async function handlerLogin(e) {

    e.preventDefault();

    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    console.log(data.token);


    if (res.ok) {
      console.log("Login successfully");
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } else {
      setErrors(data);
    } 


  }

  return (
    <>
      <h2 className="title">Login Page</h2>

      <form onSubmit={handlerLogin} className="w-1/2 mx-auto space-y-6">
      
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
    
        <button className="primary-btn">Login</button>
      </form>
    </>

  );
}
