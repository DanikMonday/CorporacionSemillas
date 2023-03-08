import React, { useState } from "react";
import "../newuser.css";
import axios from "axios";
import { Link} from "react-router-dom";
import { Header } from "./Header";

let url = "http://localhost:3030";

export const NewUser = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleInput = (e) => {
        let { name, value } = e.target;
        let userData = { ...user, [name]: value };
        setUser(userData);
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url + "/user/sign", user);
            if(res.data.message == "Usuario Registrado"){
                alert(res.data.message);
                setTimeout(function () { window.location.href = "http://localhost:3000/TableData"; }, 2000);
            }else{
                alert(res.data.message);
            }

        } catch (error) {
            console.log(error);            
        }
    };

    return (
        <> <Header></Header>
            <div className="container-newuser">

                <div className="container-form">

                    <div className="container-form-newuser">

                        <span>Registro De Nuevo Usuario</span>

                        <form onSubmit={register}>

                            <label htmlFor="name">Nombre Completo</label>
                            <input name="name" type="text" id="name" onChange={handleInput} value={user.name} required />

                            <label htmlFor="email">Email</label>
                            <input name="email" type="email" id="email" onChange={handleInput} value={user.email} required />

                            <label htmlFor="password">Contraseña</label>
                            <input name="password" type="password" id="password" onChange={handleInput} value={user.password} required />

                            <label htmlFor="repeatpassword">Vuelve a escribir la contraseña</label>
                            <input name="" type="password" id="repeatpassword" required />

                            <label>Rol</label>
                            <select className="rol-slct" name="role" onChange={handleInput} value={user.role} required>
                                <option>----</option>
                                <option>admin</option>
                                <option>user</option>
                            </select>

                            <button className="button-newuser">Enviar</button>                            
                        </form>
                    </div>
                    <div className="img-newuser">
                    </div>
                </div>
            </div>
        </>
    )
};

export default NewUser;