import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

let url = "https://corporacionbackend.vercel.app";

export const Form = () => {
    /*const [type, setType] = useState('');*/
    const [showPopup, setShowPopup] = useState(false);
    const [persona, setPersona] = useState(false);
    const [money, setMoney] = useState(2);
    const [form, setForm] = useState({
        type: "",
        nit_cedula: "",
        name: "",
        email: "",
        phone: "",
        destination_don: "",
        certification: "",
        aditional: "",
    });


    useEffect(() => {
        if (money == 1) {
            form.destination_don = "dinero"
        }
    }, [money]);

    const handleInput = (e) => {
        let { name, value } = e.target;
        let newForm = { ...form, [name]: value };
        setForm(newForm);
    };


    const handleNatural = () => {
        setPersona(true);
        console.log("handleNatu", persona);
    }
    const handleJuridica = () => {
        setPersona(false);
        console.log("handleJuri", persona);
    }

    //Agregar Formulario
    const addDonation = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url + '/forms/new', form);
            console.log(res);
            console.log("formulario agregado");
            setShowPopup(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='cont-form'>
            <form className='donation-form' onSubmit={addDonation}>

                <h1>¡Haz tu donación a Semillas de Esperanza hoy!</h1>
                <h2>Tipo de personas</h2>
                <div className='person-type'>
                    <div>
                        <input className='radio-input' type="radio" name="type" onChange={handleInput} value='natural' onClick={handleNatural}></input>
                        <label>Natural</label>
                    </div>
                    <div>
                        <input className='radio-input' type="radio" name="type" onChange={handleInput} value='juridica' onClick={handleJuridica} ></input>
                        <label>Jurídica</label>
                    </div>
                </div>
                <div className='form-fields'>

                    {persona ?
                        (<><div><input type='text' name='name' placeholder='Nombre' onChange={handleInput} value={form.name} required></input></div>
                            <div><input type='text' name='nit_cedula' placeholder='Cédula' onChange={handleInput} value={form.nit_cedula} required></input></div></>) :
                        (<><div><input type='text' name='name' placeholder='Razón Social' onChange={handleInput} value={form.name} required></input></div>
                            <div><input type='text' name='nit_cedula' placeholder='Nit' onChange={handleInput} value={form.nit_cedula} required></input></div></>)
                    }

                    <div><input type='text' name='email' placeholder='Email' onChange={handleInput} value={form.email}></input></div>
                    <div><input type='number' name='phone' placeholder='Celular' onChange={handleInput} value={form.phone}></input></div>
                    <div>Tipo de donación</div>
                    <div>
                        <select onChange={(e) => setMoney(e.target.value)}>

                            <option value="2">Bienes</option>
                            <option value="1">Dinero</option>

                        </select>
                    </div>
                    {money == 1 ?
                        (<><div className='req'><strong>Cuenta Ahorros</strong></div>
                            <div className='cuentaNum'><label> ---- Bancolombia ----</label> 008 - 017365 -05</div></>) :
                        (<><div className='req'>Destino de la donación</div>
                            <select name='destination_don' onChange={handleInput} value={form.destination_don}>
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
                            <input className='radio-input' type="radio" id="html" name="certification" onChange={handleInput} value='SI'></input>
                            <label>Si</label>
                        </div>
                        <div>
                            <input className='radio-input' type="radio" id="html" name="certification" onChange={handleInput} value='NO'></input>
                            <label>No</label>
                        </div>
                    </div>
                </div>
                <div className='aditional-comments'>
                    <input placeholder='Comentario Adicional' name='aditional' type='text' onChange={handleInput} value={form.aditional}></input>
                </div>
                <div className='send-form'>
                    <div className='terms-form'>
                        <input className='radio-input' type="checkbox" id="html" name="jp" value="" required></input>
                        <label>He leído y acepto el aviso de privaciodad y política de protección de datos personales.</label>
                    </div>
                    <div>
                        <button onClick={setShowPopup} type='submit'> Enviar</button>
                    </div>
                </div>
                <Link to="/Session" className='admin-portal-link'><div className='admin-portal'>
                    <button><BsFillPersonFill className='admin-icon'></BsFillPersonFill></button>
                    <span>Si eres Administrador ingresa aquí</span>
                </div>
                </Link>
            </form>
            <div className="popup" style={{ display: showPopup ? 'block' : 'none' }}>
                <div className="popup-content">
                    <div className="continer-logo-slogan">
                        <img className="img-logo" src={require("../images/LogoFundacionSemilla 2.png")} alt="logo" />
                        <span>Una propuesta para tiempos mejores</span>
                    </div>

                    <div className="description-gratitude">
                        <p>¡Gracias por el interés en esta donación! Con su aporte continúa brotando esta semilla de vida en la comuna 3 de Medellín.</p>
                        <p>¡Pronto estaremos en contacto contigo!</p>
                    </div>

                    <button onClick={() => setShowPopup(false)}>Cerrar</button>
                </div>
            </div>

        </div>
    )
}