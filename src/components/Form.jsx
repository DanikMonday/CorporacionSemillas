import axios from 'axios';
import React, {useState} from 'react';
import {BsFillPersonFill} from "react-icons/bs";
import { Link } from "react-router-dom";
import "../PopUpDonation.css";

let url = "http://localhost:3030";




export const Form = () => {

    const [showPopup, setShowPopup] = useState(false);

    const [type, setType] = useState('');
    const [nit_cedula, setNitCed] = useState('');
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [destination, setDestination] = useState('');
    const [certification, setCertification] = useState('');
    const [aditional, setAditional] = useState('');
    const [persona, setPersona] = useState(false);
    const [money, setMoney] = useState(false);

    console.log(money);
    
    const handleNatural = () => {
        setPersona(true);
        console.log("handleNatu" ,persona);
    }
    const handleJuridica = () => {
        setPersona(false); 
        console.log("handleJuri" ,persona);       
    }    

    //Agregar usuario
    const addDonation = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(url+'/forms/new', {type: type, nit_cedula: nit_cedula, name: names, email: email, phone: phone, destination_don: destination, certification: certification, aditional: aditional});
            console.log(res);
            console.log("formulario agregado")
            setShowPopup(true);
        } catch (error) {
            console.log(error);
        }
    };

    

  return (
   <div>
    <div className='cont-form'>
        <form className='donation-form' onSubmit={addDonation}>


            <h1>¡Haz tu donación a Semillas de Esperanza hoy!</h1>
            <h2><strong>Tipo de persona</strong></h2>
            <div className='person-type'>
                <div>
                    <input className='radio-input' type="radio" id="html" name="person" onChange={e=>{setType(e.target.value)}} value={"Natural"} checked={type === "Natural"} onClick={handleNatural}></input> 
                    <label>Natural</label>
                </div>
                <div>
                    <input className='radio-input' type="radio" id="html" name="person" onChange={e=>{setType(e.target.value)}} value={"Jurídica"} checked={type === "Jurídica"} onClick={handleJuridica} ></input> 
                    <label>Jurídica</label>
                </div>
            </div>
            <div className='form-fields'>
               
                {persona?
                (<><div><input type='text' name='names' placeholder='Nombre' onChange={e=>{setNames(e.target.value)}} value={names}></input></div>
                <div><input type='text' name='nit_cedula' placeholder='Cédula' onChange={e=>{setNitCed(e.target.value)}} value={nit_cedula}></input></div></>):
                (<>                <div><input type='text' name='names' placeholder='Razón Social' onChange={e=>{setNames(e.target.value)}} value={names}></input></div>
                <div><input type='text' name='nit_cedula' placeholder='Nit' onChange={e=>{setNitCed(e.target.value)}} value={nit_cedula}></input></div></>)
                }

                <div><input type='text' name='email' placeholder='Email' onChange={e=>{setEmail(e.target.value)}} value={email}></input></div>
                <div><input type='text' name='phone' placeholder='Celular' onChange={e=>{setPhone(e.target.value)}} value={phone}></input></div>
                <div className='req'>Tipo de donación</div>
                <div>
                    <select onChange={(e) => setMoney(e.target.value)}>

                        <option value="2">Bienes</option>
                        <option value ="1">Dinero</option>
                        
                    </select>
                </div>
                {money == 1? 
                (<><div className='req'><strong>Cuenta Ahorros</strong></div>
                <div className='cuentaNum'><strong> ---- Bancolombia ----</strong> 008 - 017365 -05</div></>):
                    (<><div className='req'>Destino de la donación</div>
                    <select onChange={e=>{setDestination(e.target.value)}} value={destination}>
                        <option>Seleccione</option>
                        <option>Infrasestructura</option>
                        <option>Cocina</option>
                        <option>Comedor</option>
                        <option>Huerta</option>
                        <option>Otro</option>
                    </select>
                    </>)}
                
                <div className='req'>Requiere Certificado</div>
                <div className='certif'>
                     <div>
                        <input className='radio-input' type="radio" id="html" name="cert" onChange={e=>{setCertification(e.target.value)}} value={certification}></input> 
                        <label>Si</label>
                    </div>
                    <div>
                        <input  className='radio-input' type="radio" id="cert" name="cert" value="#" defaultChecked></input> 
                        <label>No</label>
                    </div>
                </div>
                
               
            </div>
            <div className='aditional-comments'>
                    <input placeholder='Comentario Adicional' type='text' onChange={e=>{setAditional(e.target.value)}} value={aditional}></input>
            </div>
            <div className='send-form'>
                <div className='terms-form'>
                    <input className='radio-input' type="checkbox" id="html" name="jp" value="#"></input> 
                    <label className='terms'>He leído y acepto el aviso de privacidad y política de protección de datos personales.</label>
                </div>
                <div>
                    <button onClick={setShowPopup} type='submit'>Enviar</button>
                </div>
            </div>
            <Link to= "/Session" className='admin-portal-link'><div className='admin-portal'>
                    <button><BsFillPersonFill  className='admin-icon'></BsFillPersonFill></button>
                    <span>Si eres Administrador ingresa aquí</span>
                </div>
            </Link>
        </form>
    </div>

    <div className="popup" style={{display: showPopup ? 'block' : 'none'}}>
     
     <div className="popup-content">
     <div className="continer-logo-slogan">
    <img className="img-logo" src={require("../images/LogoFundacionSemilla 2.png")} alt="logo"/>
    <span>Una propuesta para tiempos mejores</span>
</div>

<div className="description-gratitude">
    <p>¡Gracias por el interés en esta donación! Con su aporte continúa brotando esta semilla de vida en la comuna 3 de Medellín.</p>
    <p>¡Pronto estaremos en contacto contigo!</p>
</div>

         <button onClick={() => setShowPopup(false)}>Cerrar</button>
     </div>
 </div>
    </div>)
    }