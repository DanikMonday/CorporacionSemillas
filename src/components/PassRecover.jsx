import axios from 'axios';
import {React , useState} from 'react';
import { Header } from './Header';

const url = "https://corporacionbackend.vercel.app"

export const PassRecover = () => {

    const [email, setEmail] = useState('');

    const recovery = async (e)=> {
        e.preventDefault();
    try {
        const res = await axios.post(url+'/user/recovery', {email:email});
        console.log(email);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div>
        <Header></Header>
        <div className='recover-form-cont'>
            <form className='recover-form' onSubmit={recovery}>
                <h2>RECUPERACIÓN DE CONTRASEÑA</h2>
                <label >Por favor ingresa el correo asociado a tu cuenta para recuperar tu contraseña.</label>
                <input type='text'  onChange={e => {setEmail(e.target.value)}} value={email} ></input>
                <button >Solicitar</button>
            </form >
        </div>
    </div>
  )
}
