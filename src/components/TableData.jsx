import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Header } from "./Header";
import { FaUserLock } from "react-icons/fa";
import { FaUserPlus} from "react-icons/fa";
import { Link } from "react-router-dom";


let url = "https://corporacionbackend.vercel.app";

function TableData() {
  const [listForms, setListForms] = useState([]);
  const [isUpd, setIsUpdating] = useState('');

  const [form, setForm] = useState({
    type: "",
    nit_cedula: "",
    name: "",
    email: "",
    phone: "",
    destination: "",
    certification: "",
    aditional: "",
    state: ""
  });

  const handleInput = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...form, [name]: value };
    setForm(newDatos);
  };
  
  useEffect(() =>{
    const getForms = async () =>{
      try {
        const res = await axios.get(url+ '/forms/table');
        setListForms(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getForms();
  }, []);

  const deleteForm = async (id) => {
    try {
      const res = await axios.delete(url + `/forms/delete/${id}`);
      const newListForms = listForms.filter(form => form._id !== id);
      setListForms(newListForms);
      console.log('form eliminado')
    } catch (error) {
      console.log(error);
    }
  }

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(url + `/forms/modify/${isUpd}`, form);
      console.log(res.data);
      const updateFormIndex = listForms.findIndex(form => form._id === isUpd);
      // const updateType = listForms[updateFormIndex].type = form.type;
      // const updatenit = listForms[updateFormIndex].nit_cedula = form.nit_cedula;
      // const updatename = listForms[updateFormIndex].name = form.name;
      // const updatemail = listForms[updateFormIndex].email = form.email;
      // const updatephone = listForms[updateFormIndex].phone = form.phone;
      // const updatedest = listForms[updateFormIndex].destination = form.destination;
      // const updatecert = listForms[updateFormIndex].certification = form.certification;
      // const updatead = listForms[updateFormIndex].aditional = form.aditional;
      const updastate = listForms[updateFormIndex].state = form.state;
      setIsUpdating('');
    } catch (error) {
      console.log(error);
    }
  }

  const renderUpdateForm = () => (
    <div className="form-edit-table">
         
        <form onSubmit={updateForm}>
        
       {/* <input type="text" name="type" onChange={handleInput} value={form.type}></input>
       <input type="text" name="nit_cedula" onChange={handleInput} value={form.nit_cedula} />
       <input type="text" name="name" onChange={handleInput} value={form.name} />
        <input type="text" name="email" onChange={handleInput} value={form.email} />
       <input type="text" name="phone" onChange={handleInput} value={form.phone} />
        <input type="text" name="destination" onChange={handleInput} value={form.destination} />
        <input type="text" name="certification" onChange={handleInput} value={form.certification} />
        <input type="text" name="aditional" onChange={handleInput} value={form.aditional} /> */}
      
        <select type="text" name="state" onChange={handleInput} value={form.state} placeholder='Estado Donación'>
          <option>Verificando</option>
          <option>Aprobado</option>
          <option>Rechazado</option>
        </select>
        
        <button>Editar</button>
      </form>
    
    </div>
  );

  return (
    <>
    <Header></Header>
    
     <div className="container-tab">
      <div className="tal-tit">
          <h1>Resumen Donaciones</h1>
          <div className="icos-cont-tab">
            <div className="cont-ico-tab"><Link><FaUserLock className="ico-pass"></FaUserLock></Link></div>
            <div className="cont-ico-tab"><Link to='/NewUser'><FaUserPlus className="ico-new"></FaUserPlus></Link></div>
          </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Tipo de persona </th>
            <th>C.C o NIT</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Destino de donación</th>
            <th>Certif</th>
            <th>Comentarios</th>      
            <th>Fecha de creación</th>    
            <th>Estado de la donación</th>  
            <th></th>            
            <th></th>            
          </tr>
        </thead>
        
          { 
            listForms.map(form =>(
            <tbody>{
              isUpd === form._id
                ? renderUpdateForm() :                    
            <tr>
              <td>{form.type}</td>
              <td>{form.nit_cedula}</td>
              <td>{form.name}</td>
              <td>{form.email}</td>
              <td>{form.phone}</td>
              <td>{form.destination_don}</td>
              <td>{form.certification}</td>
              <td>{form.aditional}</td>
              <td>{form.createdAt}</td>
              <td>{form.state}</td>              
              <th scope="row" onClick={() => { setIsUpdating(form._id) }}><AiFillEdit /></th>
              <th scope="row" onClick={() => { deleteForm(form._id) }}><BsFillTrashFill /></th>              
       
            </tr>

            }</tbody>
  
          ))
        }
      </table>
    </div>
    </>
   
  );
}

export default TableData;
