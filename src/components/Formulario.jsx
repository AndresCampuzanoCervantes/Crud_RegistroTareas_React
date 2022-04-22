import React from 'react'

const Formulario = () => {
    const [modoEdicion,setModoEdicion] = React.useState(false);
    const [error,setError] = React.useState('');
    const [tarea,setTarea] = React.useState('');
    const [personaCargo,setPersonaCargo] = React.useState('');
    const [creadoPor,setCreadoPor] = React.useState('');
    const [fechaRegistro,setFechaRegistro] = React.useState('');
    const [fechaOptima,setFechaOptima] = React.useState('');
    const [fechaLimite,setFechaLimite] = React.useState('');
    const [descripcion,setDescripcion] = React.useState('');

    const cancelar = ()=>{
        setModoEdicion(false)
    }
    
    const editarTareas = ()=>{

    }

    const registrarTarea = (e)=>{
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
    }
  return (
    <>
        <div className='container mt-3'>
            <h1 className='text-center'>Registro de Tareas</h1>
            <div className='row'>
                <div className='col-4 bg bg-info text-dark rounded py-2 my-2'>
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
                                    className='btn btn-warning btn-block mx-2 col-5'
                                    type='submit'
                                    >Editar</button>
                                    <button 
                                    className='btn btn-danger btn-block mx-2 col-5'
                                    onClick={() => cancelar()}
                                    >Cancelar</button>
                                </div>
                            )
                            :

                            <button 
                            className='btn btn-primary btn-block my-2 col-12'
                            type='submit'
                            >Agregar</button>

                        }
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Formulario