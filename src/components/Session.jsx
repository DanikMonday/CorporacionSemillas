<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
let url = "http://localhost:3030";
=======
import React from 'react';
import { Link } from "react-router-dom";
>>>>>>> daniela

export const Session = () => {
    
    const [data, setData] = useState({
        email: " ",
        password: ""
    });

    const handleInput = (e) =>{
        let {name, value} = e.target;
        let newDatos = {...data, [name]: value};
        setData(newDatos);
    };

    const login = async (e) =>{
        e.preventDefault();
        
            let res = await axios.post(url+"/user/login", data);
            console.log(res.data);
        
    };

  return (
   <div className='admin-login'>
        <h2>Una propuesta para tiempos mejores</h2>
        <div className='login-admin-cont'>
            
<<<<<<< HEAD
            <form onSubmit={login} className='form-login'>
                <div><strong>Administrador</strong></div>                
=======
            <div className='form-login'>
                
>>>>>>> daniela
                <div className='input'>
                    <label>Usuario</label>
                    <input name='email' type='email' className='pass-input'  onChange={handleInput} value={data.user} required/>
                </div>

                <div className='input'>
                    <label>Contraseña</label>
                    <input name='password' type="password"  className='pass-input'  onChange={handleInput} value={data.password} required/>
                </div>

                <div>
                    <input type="checkbox" id="" name="" value=""/>
                    <label>Mostrar Contraseña</label>
                </div>
                <div className='login-btn'>
<<<<<<< HEAD
                    <button type='submit'>Ingresar</button>
                </div>                
            </form>
=======
                   <Link to='/NewUser'><button>Ingresar</button></Link>
                </div>
            </div>
>>>>>>> daniela
            
            <div className='img-login-admin'></div>
        
        </div>
   </div>
  )
}
