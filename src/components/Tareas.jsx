import React from 'react'

const Tareas = ({tarea,eliminar,editar}) => {

  return (
    <>
        <ul className='list-group text-white'>
                            <li className='list-group-item fondo' key={tarea.id}>
                                <p className="fw-bold fs-5">Tarea: <span className='lead'>{tarea.tarea}</span></p>
                                <p className="fw-bold fs-5">Persona a Cargo: <span className='lead'>{tarea.personaCargo}</span></p>
                                <p className="fw-bold fs-5">Reportado por: <span className='lead'>{tarea.creadoPor}</span></p>
                                <p className="fw-bold fs-5">Fecha de Registro: <span className='lead'>{tarea.fechaRegistro}</span></p>
                                <p className="fw-bold fs-5">Fecha Optima de Entrega: <span className='lead'>{tarea.fechaOptima}</span></p>
                                <p className="fw-bold fs-5">Fecha Limite de Entrega: <span className='lead'>{tarea.fechaLimite}</span></p>
                                <p className="fw-bold fs-5">Descripcion: <span className='lead'>{tarea.descripcion}</span></p>
                                <button className='btn btn-danger btn-sm float-end mx-2 fw-bold ' onClick={()=> eliminar(tarea.id)}>
                                Eliminar
                                </button>
                                <button className='btn btn-warning btn-sm float-end fw-bold 'onClick={()=>editar(tarea)}>
                                Editar
                                </button>
                            </li>      
         </ul>
    </>
  )
}

export default Tareas