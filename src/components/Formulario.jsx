import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    } 

  }, [paciente])


  const generarId = () =>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha; 

  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    // validacion de formulario 

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      

      setError(true)
      return;
    } 

    setError(false)
    
    // objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,

    }

    if(paciente.id) {
      // editando el registro
      objetoPaciente.id = paciente.id
      console.log(objetoPaciente)

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else { 
      // nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])



    }


    // reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    
  }


  return (
    <div className="md:w-1/2 lg:w-2/5">

      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
 
      <p className='text-lg mt-5 text-center mb-10'>

        Agrega Pacientes y {''}
        <span className="text-indigo-700 font-bold  ">Administralos</span>
      </p>

      <form action="" 
            onSubmit={handleSubmit}
            className='mx-3 bg-white shadow-md rounded-md py-10 px-5'>
        
        {error && <Error mensaje='Todos los campos son obligatorios'/>}
        <div className='mb-5'> 
          <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input type="text"
                 placeholder='Nombre de la mascota'
                 className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 id='mascota'
                 value={nombre}
                 // cuando el usuario escriba se ejecutara el modificador 
                 // y asignara el valor a la variable nombre               
                 onChange={(e) => setNombre(e.target.value)}
                
          />
        </div>

        <div className='mb-5'> 
          <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>Propietario</label>
          <input type="text"
                 placeholder='Nombre del propietario'
                 className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 id='propietario'
                 value={propietario}
                 onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'> 
          <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>Email</label>
          <input type="email"
                 placeholder='Email de contacto'
                 className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 id='email'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'> 
          <label htmlFor="fecha" className='block text-gray-700 uppercase font-bold'>Alta</label>
          <input type="date"
                 className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 id='fecha'
                 value={fecha}
                 onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'> 
          <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>Sintomas</label>
          <textarea 
                placeholder='Describe los sintomas'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                name="" 
                id="sintomas"
                value={sintomas}
                onChange={(e) => setSintomas(e.target.value)}
                
                >
                </textarea>
                
        </div>

        <input type="submit" 
               className="bg-indigo-700 w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer hover:bg-indigo-900 transition-all"
               value={paciente.id? 'Guardar Cambios' : 'Agregar Paciente'} // cambiando el nombre del input de manera condicional
        
        />
               


      </form>
    </div>
  )
}

export default Formulario 

