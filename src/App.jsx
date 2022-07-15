import {useState, useEffect} from 'react'
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({});

  
  // local storage
  useEffect(() => {
    const obtenerLs = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [] // si no hay nada en local storage se agrega un arreglo vacio 
      setPacientes(pacientesLS)
    }

    obtenerLs();
  }, []) // se ejecuta una sola vez cuando el componente este listo 

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])



  // eliminar paciente
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados)
  }
  

  return (
    <div className="container mx-auto mt-20">
      <Header 
        
      />

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        
        />
      </div>
    </div>
  )
}

export default App
