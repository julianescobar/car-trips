import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = { username: "", password: "" };
    let valid = true;

    if (!form.username.trim()) {
      tempErrors.username = "El usuario es obligatorio";
      valid = false;
    }

    if (!form.password.trim()) {
      tempErrors.password = "La contraseña es obligatoria";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validate()) return;
  
  const success = await login(form);  
  
  if (success) {
    setSubmitError(""); 
    navigate("/cars"); // sin reload
  } else {
    setSubmitError("Usuario o contraseña incorrecta");
    setSubmitError("Error al iniciar sesión");
  }
 
};

  return (
    <div className="form-login">
      <h1>Laogin</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            className="form-input"
          />
          {errors.username && <p className="form-error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="form-input"
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <button type="submit" className="form-button">Ingresar</button>
      </form>

      {submitError && <p className="form-error center">{submitError}</p>}
    </div>
  );
};

export default LoginPage;
