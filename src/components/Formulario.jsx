import React from 'react'
import {firebase} from '../firebase'
import Tareas from './Tareas';


const Formulario = () => {
    const [modoEdicion,setModoEdicion] = React.useState(false);
    const [error,setError] = React.useState('');
    const [id,setId] = React.useState('');
    const [tarea,setTarea] = React.useState('');
    const [personaCargo,setPersonaCargo] = React.useState('');
    const [creadoPor,setCreadoPor] = React.useState('');
    const [fechaRegistro,setFechaRegistro] = React.useState('');
    const [fechaOptima,setFechaOptima] = React.useState('');
    const [fechaLimite,setFechaLimite] = React.useState('');
    const [descripcion,setDescripcion] = React.useState('');
    const [listaTareas,setListaTareas] = React.useState([]);

    React.useEffect(() => {
        const obtenerListaTareas = async()=> {
            try {
                const db = firebase.firestore()
                const data = await db.collection('ListaTareas').get()
                const arrayData= data.docs.map(item => ({
                    id:item.id,...item.data()}))
                
                setListaTareas(arrayData);
            } catch (error) {
                console.error(error)
            }
        }
        obtenerListaTareas();
    },[])

    const cancelar = ()=>{
        setModoEdicion(false)
        setId('')
        setError('')
        setTarea('')
        setPersonaCargo('')
        setCreadoPor('')
        setFechaRegistro('')
        setFechaOptima('')
        setFechaLimite('')
        setDescripcion('')
    }
    
    const editar = (tarea)=>{
        setModoEdicion(true)
        setId(tarea.id)
        setTarea(tarea.tarea)
        setPersonaCargo(tarea.personaCargo)
        setCreadoPor(tarea.creadoPor)
        setFechaRegistro(tarea.fechaRegistro)
        setFechaOptima(tarea.fechaOptima)
        setFechaLimite(tarea.fechaLimite)
        setDescripcion(tarea.descripcion)
    }
    const editarTareas = ()=>{

    }

    const eliminarTareas = async (id)=>{
        try {
            const db = firebase.firestore()
            await db.collection('ListaTareas').doc(id).delete()
            const aux = listaTareas.filter(item =>item.id!==id)
            setListaTareas(aux)
        } catch (error) {
            console.error(error)
        }
    }

    const registrarTarea = async (e)=>{
        e.preventDefault()
        if (tarea==='' || tarea.trim()==='') {
            setError('Debe ingresar la tarea a registrar')
            return;
        }
        if (personaCargo==='' || personaCargo.trim()==='') {
            setError('Debe ingresar la persona a cargo de la tarea')
            return;
        }
        if (creadoPor==='' || creadoPor.trim()==='') {
            setError('Debe ingresar la persona que reporta la incidencia')
            return;
        }
        if (fechaRegistro==='' || fechaRegistro.trim()==='') {
            setError('Debe ingresar la fecha de registro')
            return;
        }
        if (fechaOptima==='' || fechaOptima.trim()==='') {
            setError('Debe ingresar la fecha optima')
            return;
        }
        if (fechaLimite==='' || fechaLimite.trim()==='') {
            setError('Debe ingresar la fecha limite')
            return;
        }
        if (descripcion==='' || descripcion.trim()==='') {
            setError('Debe ingresar la descripcion')
            return;
        }

        setError('')
        try {
            const db=firebase.firestore()
            const NuevaTarea = {
                tarea,
                personaCargo,
                creadoPor,
                fechaRegistro,
                fechaOptima,
                fechaLimite,
                descripcion
            }

            await db.collection('ListaTareas').add(NuevaTarea);
            setListaTareas([...listaTareas,NuevaTarea])

            setTarea('')
            setPersonaCargo('')
            setCreadoPor('')
            setFechaRegistro('')
            setFechaOptima('')
            setFechaLimite('')
            setDescripcion('')

        } catch (error) {
            console.error(error)
        }
       
        
    }
  return (
    <>
        <div className='container mt-3'>
            <h1 className='text-center'>Registro de Tareas</h1>
            <div className='d-flex flex-row'>
                <div className='col-4 bg  rounded py-2 my-2 px-3 mx-3 fondo' >
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h4>
                    <form onSubmit ={modoEdicion ? editarTareas: registrarTarea}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <label htmlFor="tarea" className='col-12'> <h5>Tarea:</h5> </label>
                        <input id="tarea"
                        className='form-control mb-2'
                        type = "text"
                        placeholder='Ingrese la Tarea a Registrar'
                        onChange={(e)=> setTarea(e.target.value)}
                        value = {tarea}
                        />
                        <label htmlFor="personaCargo" className='col-12'> <h5>Persona a Cargo: </h5></label>
                        <input id='personaCargo'
                        className='form-control mb-2'
                        type = "text"
                        placeholder='Ingrese la Persona a Cargo'
                        onChange={(e)=> setPersonaCargo(e.target.value)}
                        value = {personaCargo}
                        />
                        <label htmlFor="reportadoPor" className='col-12'> <h5>Reportado por: </h5></label>
                        <input id='reportadoPor'
                        className='form-control mb-2'
                        placeholder='Incidencia reportada por'
                        type="text"
                        onChange={(e)=> setCreadoPor(e.target.value)}
                        value={creadoPor}
                        />
                        <label htmlFor="fechaRegistro" className='col-12'> <h5>Fecha de Registro: </h5></label>
                        <input id='fechaRegistro'
                        className='form-control mb-2'
                        placeholder='Ingrese Fecha de Registro'
                        type="date"
                        onChange={(e)=> setFechaRegistro(e.target.value)}
                        value={fechaRegistro}
                        />
                        <label htmlFor="fechaOptima" className='col-12'> <h5>Fecha Optima de Entrega: </h5></label>
                        <input id='fechaOptima'
                        className='form-control mb-2'
                        type = "date"
                        placeholder='Ingrese la Fecha Optima de Entrega'
                        onChange={(e)=> setFechaOptima(e.target.value)}
                        value = {fechaOptima}
                        />
                        <label htmlFor="fechaLimite" className='col-12'> <h5>Fecha Limite de Entrega: </h5></label>
                        <input id="fechaLimite"
                        className='form-control mb-2'
                        placeholder='Fecha Limite de Entrega'
                        type="date"
                        onChange={(e)=> setFechaLimite(e.target.value)}
                        value={fechaLimite}
                        />
                        <label htmlFor="descripcion" className='col-12'> <h5>Descripción: </h5></label>
                        <textarea id='descripcion'
                        className='form-control mb-2'
                        placeholder='Ingrese Descripción'
                        type="textarea"
                        onChange={(e)=> setDescripcion(e.target.value)}
                        value={descripcion}
                        />
                        {
                        modoEdicion ?
                            (
                                <div className='text-center'>
                                    <button 
                                    className='btn btn-warning btn-block mx-2 col-5 my-2'
                                    type='submit'
                                    >Editar</button>
                                    <button 
                                    className='btn btn-danger btn-block mx-2 col-5 my-2'
                                    onClick={() => cancelar()}
                                    >Cancelar</button>
                                </div>
                            )
                            :

                            <button 
                            className='btn btn-dark btn-block my-2 col-12'
                            type='submit'
                            >Agregar</button>

                        }
                    </form>
                </div>
                <div className="col-7 bg rounded my-2 float-end">
                {
                    listaTareas.map( item=>(
                        
                            <Tareas
                            tarea={item}
                            eliminar={eliminarTareas}
                            editar={editar}
                            />
                        
                    ))
                }
                </div>
            </div>
        </div>
    </>
  )
}

export default Formulario