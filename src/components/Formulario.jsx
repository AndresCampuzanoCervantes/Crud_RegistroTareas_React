import React from 'react'
import { firebase } from '../firebase'


const Formulario = () => {
    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const [modoEdicion, setModoEdicion] = React.useState(false);
    const [error, setError] = React.useState('');
    const [id, setId] = React.useState('');
    const [tarea, setTarea] = React.useState('');
    const [responsable, setResponsable] = React.useState('');
    const [supervisor, setSupervisor] = React.useState('');
    const [fechaRegistro, setFechaRegistro] = React.useState(formatDate(new Date()));
    const [fechaOptima, setFechaOptima] = React.useState('');
    const [fechaLimite, setFechaLimite] = React.useState('');
    const [descripcion, setDescripcion] = React.useState('');
    const [listaTareas, setListaTareas] = React.useState([]);
    const [banderaCrear,setBanderaCrear] = React.useState(0);

    React.useEffect(() => {
        const obtenerListaTareas = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('ListaTareas').get()
                const arrayData = data.docs.filter(item => !item.completado).map(item => ({
                    id: item.id, ...item.data()
                }))
                console.log(arrayData)
                setListaTareas(arrayData);
            } catch (error) {
                console.error(error)
            }
        }
        obtenerListaTareas();
    }, [banderaCrear])

    const cancelar = () => {
        setModoEdicion(false)
        setId('')
        setError('')
        setTarea('')
        setResponsable('')
        setSupervisor('')
        setFechaRegistro(formatDate(new Date()))
        setFechaOptima('')
        setFechaLimite('')
        setDescripcion('')
    }

    const editar = (tarea) => {
        setModoEdicion(true)
        setId(tarea.id)
        setTarea(tarea.tarea)
        setResponsable(tarea.responsable)
        setSupervisor(tarea.supervisor)
        setFechaRegistro(tarea.fechaRegistro)
        setFechaOptima(tarea.fechaOptima)
        setFechaLimite(tarea.fechaLimite)
        setDescripcion(tarea.descripcion)
    }

    const editarTareas = async (e) => {
        e.preventDefault()
        if (tarea === '' || tarea.trim() === '') {
            setError('Debe ingresar la tarea a registrar')
            return;
        }
        if (responsable === '' || responsable.trim() === '') {
            setError('Debe ingresar la persona a cargo de la tarea')
            return;
        }
        if (supervisor === '' || supervisor.trim() === '') {
            setError('Debe ingresar la persona que reporta la incidencia')
            return;
        }
        if (fechaRegistro === '' || fechaRegistro.trim() === '') {
            setError('Debe ingresar la fecha de registro')
            return;
        }
        if (fechaOptima === '' || fechaOptima.trim() === '') {
            setError('Debe ingresar la fecha optima')
            return;
        }
        if (fechaLimite === '' || fechaLimite.trim() === '') {
            setError('Debe ingresar la fecha limite')
            return;
        }
        if (descripcion === '' || descripcion.trim() === '') {
            setError('Debe ingresar la descripcion')
            return;
        }

        setError('')
        try {
            const tareaEditada = {
                tarea,
                responsable,
                supervisor,
                fechaRegistro,
                fechaOptima,
                fechaLimite,
                descripcion,
                completado: false
            }
            const db = firebase.firestore()
            await db.collection('ListaTareas').doc(id).update(tareaEditada)

            const arrayEditado = listaTareas.map(
                item => item.id === id ? tareaEditada : item
            )

            setListaTareas(arrayEditado)
            setTarea('')
            setResponsable('')
            setSupervisor('')
            setFechaRegistro(formatDate(new Date()))
            setFechaOptima('')
            setFechaLimite('')
            setDescripcion('')
            setModoEdicion(false)
        } catch (error) {
            console.error(error)
        }
    }

    const eliminarTareas = async (id) => {
        try {
            const db = firebase.firestore()
            await db.collection('ListaTareas').doc(id).delete()
            const aux = listaTareas.filter(item => item.id !== id)
            setListaTareas(aux)
        } catch (error) {
            console.error(error)
        }
    }

    const registrarTarea = async (e) => {
        e.preventDefault()
        if (tarea === '' || tarea.trim() === '') {
            setError('Debe ingresar la tarea a registrar')
            return;
        }
        if (responsable === '' || responsable.trim() === '') {
            setError('Debe ingresar la persona responsable de la tarea')
            return;
        }
        if (supervisor === '' || supervisor.trim() === '') {
            setError('Debe ingresar la persona que reporta la incidencia')
            return;
        }

        if (fechaRegistro === '' || fechaRegistro.trim() === '') {
            setError('Debe ingresar la fecha de registro')
            return;
        }

        if (fechaOptima === '' || fechaOptima.trim() === '') {
            setError('Debe ingresar la fecha optima')
            return;
        }
        if (fechaLimite === '' || fechaLimite.trim() === '') {
            setError('Debe ingresar la fecha limite')
            return;
        }
        if (descripcion === '' || descripcion.trim() === '') {
            setError('Debe ingresar la descripcion')
            return;
        }

        setError('')
        try {
            const db = firebase.firestore()
            const NuevaTarea = {
                tarea,
                responsable,
                supervisor,
                fechaRegistro,
                fechaOptima,
                fechaLimite,
                descripcion,
                completado: false
            }

            await db.collection('ListaTareas').add(NuevaTarea);
            setBanderaCrear((banderaCrear+1))

            setTarea('')
            setResponsable('')
            setSupervisor('')
            setFechaRegistro(formatDate(new Date()))
            setFechaOptima('')
            setFechaLimite('')
            setDescripcion('')

        } catch (error) {
            console.error(error)
        }


    }

    const completarTarea = async (tareaCompletada) => {
        try {
            const tareaEditada = {
                tarea: tareaCompletada.tarea,
                responsable: tareaCompletada.responsable,
                supervisor: tareaCompletada.supervisor,
                fechaRegistro: tareaCompletada.fechaRegistro,
                fechaOptima: tareaCompletada.fechaOptima,
                fechaLimite: tareaCompletada.fechaLimite,
                descripcion: tareaCompletada.descripcion,
                completado: true
            }

            const db = firebase.firestore()
            await db.collection('ListaTareas').doc(tareaCompletada.id).update(tareaEditada)

            const arrayEditado = listaTareas.map(
                item => item.id === id ? tareaEditada : item
            )

            setListaTareas(arrayEditado)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center mt-4'>Registro de Tareas</h1>
            <div className="row ">
                <div className='bg col-3 align-self-start position-fixed rounded py-2 px-3 fondo' >
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarTareas : registrarTarea}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <label htmlFor="tarea" className='col-12'> <h5>Tarea:</h5> </label>
                        <input id="tarea"
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese la Tarea a Registrar'
                            onChange={(e) => setTarea(e.target.value)}
                            value={tarea}
                        />
                        <label htmlFor="responsable" className='col-12'> <h5>Responsable: </h5></label>
                        <input id='responsable'
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese la Persona Responsable'
                            onChange={(e) => setResponsable(e.target.value)}
                            value={responsable}
                        />
                        <label htmlFor="supervisor" className='col-12'> <h5>Supervisado por: </h5></label>
                        <input id='supervisor'
                            className='form-control mb-2'
                            placeholder='Ingrese el Supervisor a Cargo'
                            type="text"
                            onChange={(e) => setSupervisor(e.target.value)}
                            value={supervisor}
                        />
                        <label htmlFor="fechaRegistro" className='col-12'> <h5>Fecha de Registro: </h5></label>
                        <input id='fechaRegistro'
                            className='form-control mb-2'
                            placeholder='Ingrese Fecha de Registro'
                            type="date"
                            onChange={(e) => setFechaRegistro(e.target.value)}
                            value={fechaRegistro}

                        />
                        <label htmlFor="fechaOptima" className='col-12'> <h5>Fecha Optima de Entrega: </h5></label>
                        <input id='fechaOptima'
                            className='form-control mb-2'
                            type="date"
                            placeholder='Ingrese la Fecha Optima de Entrega'
                            onChange={(e) => setFechaOptima(e.target.value)}
                            value={fechaOptima}
                        />
                        <label htmlFor="fechaLimite" className='col-12'> <h5>Fecha Limite de Entrega: </h5></label>
                        <input id="fechaLimite"
                            className='form-control mb-2'
                            placeholder='Fecha Limite de Entrega'
                            type="date"
                            onChange={(e) => setFechaLimite(e.target.value)}
                            value={fechaLimite}
                        />
                        <label htmlFor="descripcion" className='col-12'> <h5>Descripción: </h5></label>
                        <textarea id='descripcion'
                            className='form-control mb-2'
                            placeholder='Ingrese Descripción'
                            type="textarea"
                            onChange={(e) => setDescripcion(e.target.value)}
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
                <div className="col-4 offset-md-9">
                    <h1 className='text-center mt-4'>Tareas Registradas</h1>
                    <ul className='list-group text-white'>
                        {
                            listaTareas.filter(tarea => !tarea.completado).map(tarea => (
                                <div className='py-2 row ' key={tarea.id}>
                                    <li className='list-group-item fondo' >
                                        <p className="fw-bold fs-5">Tarea: <span className='lead'>{tarea.tarea}</span></p>
                                        <p className="fw-bold fs-5">Responsable: <span className='lead'>{tarea.responsable}</span></p>
                                        <p className="fw-bold fs-5">Supervisor: <span className='lead'>{tarea.supervisor}</span></p>
                                        <p className="fw-bold fs-5">Fecha de Registro: <span className='lead'>{tarea.fechaRegistro}</span></p>
                                        <p className="fw-bold fs-5">Fecha Optima de Entrega: <span className='lead'>{tarea.fechaOptima}</span></p>
                                        <p className="fw-bold fs-5">Fecha Limite de Entrega: <span className='lead'>{tarea.fechaLimite}</span></p>
                                        <p className="fw-bold fs-5">Descripcion: <span className='lead'>{tarea.descripcion}</span></p>
                                        <button className='btn btn-danger btn-sm float-end mx-2 fw-bold ' onClick={() => eliminarTareas(tarea.id)}>
                                            Eliminar
                                        </button>
                                        <button className='btn btn-warning btn-sm float-end fw-bold ' onClick={() => editar(tarea)}>
                                            Editar
                                        </button>
                                        <button className='btn btn-success btn-sm float-end mx-2 fw-bold ' onClick={() => completarTarea(tarea)}>
                                            Completar
                                        </button>
                                    </li>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Formulario