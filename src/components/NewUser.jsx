import React, { useState } from "react";
import "../newuser.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Header } from "./Header";

let url = "https://corporacionbackend.vercel.app";

export const NewUser = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleInput =(e)=>{
        let {name, value} = e.target;
        let userData = {...user, [name]: value};
        setUser(userData);
    };

   const register = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(url+"/user/sign", user);
            console.log(res);
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
                    
                        <label for="name">Nombre Completo</label>
                        <input name="name" type="text" id="name" onChange={handleInput} value={user.name} />

                        <label for="email">Email</label>
                        <input name="email" type="text" id="email" onChange={handleInput} value={user.email}  />

                        <label for="password">Contraseña</label>
                        <input name="password" type="password" id="password" onChange={handleInput} value={user.password} />

                        <label for="repeatpassword">Vuelve a escribir la contraseña</label>
                        <input name="" type="password" id="repeatpassword" />

                        <label>Rol</label>
                        <select className="rol-slct" name="role" onChange={handleInput} value={user.role}>
                            <option>----</option>
                            <option>admin</option>
                            <option>user</option>
                        </select>
                        
                        <button className="button-newuser">Enviar</button>
                        {/*<Link className="button-newuser-link" to='/'><button className="button-newuser" type="submit">Crear Usuario</button></Link>*/}

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