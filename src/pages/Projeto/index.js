import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { FiEdit} from 'react-icons/fi';
import { HiPlusCircle } from "react-icons/hi";

import api from '../../services/api'

import Sidebar from '../../components/Sidebar/index'

export default function Projeto(){
    const [projeto, setProjeto] = useState([]);

    const idusuario = localStorage.getItem('idusuario')
    const history = useHistory();

    useEffect(() => {
      if (!idusuario) {
        alert('Favor realizar o login!');
        localStorage.clear();
        history.push('/')
      }
    
    }, []);

    useEffect(() => {
        api.get('projeto', {
            headers:{
                Authorization: idusuario,
            }
        }).then(Response => {
            setProjeto( Response.data)
        });
    }, [idusuario]);

    function handleNovoProjeto() {
        history.push('/Projeto/Novo')
    }

    function editProject(id, titulo) {
      localStorage.setItem('idprojeto', id);
      localStorage.setItem('tituloprojeto', titulo);
      history.push('/Projeto/Editar')
    }

    function handleEU(id, titulo) {
      localStorage.setItem('idprojeto', id);
      localStorage.setItem('tituloprojeto', titulo);
      history.push('/Profile')
    }

    const Context = React.createContext({});
    function Accordion({ children }) {
      const [selected, setSelected] = React.useState();
      const toggleItem = React.useCallback(
        (id) => () => {
          setSelected((prevState) => (prevState !== id ? id : ''));
        },
        [],
      );
      return (
        <Context.Provider value={{ selected, toggleItem }}>
          {children}
        </Context.Provider>
      );
    }
    //custom hook to consume all accordion values
    const useAccordion = () => React.useContext(Context);
    const style = {
      item: `block focus:outline-none bg-blue-400 text-white border-b my-2 p-3`,
      panel: `overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600`,
    };
    function AccordionItem({ toggle, children }) {
      const { selected, toggleItem } = useAccordion();
      return (
        <div role="button" onClick={toggleItem(toggle)} className={style.item}>
          {children}
          <span className="float-right">
            {selected === toggle ? <AngleUpIcon /> : <AngleDownIcon />}
          </span>
        </div>
      );
    }
    function AccordionPanel({ children, id }) {
      const { selected } = useAccordion();
      const ref = React.useRef();
      const inlineStyle =
        selected === id ? { height: ref.current?.scrollHeight } : { height: 0 };
      return (
        <div ref={ref} id={id} className={style.panel} style={inlineStyle}>
          {children}
        </div>
      );
    }
    const AngleUpIcon = () => (
      <svg
        fill="white"
        strokeWidth="0"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1 h-4"
      >
        <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
      </svg>
    );
    const AngleDownIcon = () => (
      <svg
        stroke="currentColor"
        fill="white"
        strokeWidth="0"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1 h-4"
      >
        <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
      </svg>
    );

     return (

       <> 
       <Sidebar />
        <div className="profile-container bg-gray-50">

          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h1 className="text-3xl font-bold text-gray-500">Projetos</h1>
              </div>
          </header>

          <main>

          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <button onClick={() => handleNovoProjeto()} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right">
              <HiPlusCircle  size={20} color="White"/> 
            </button>
          </div>

          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {projeto.map((proj) => (
                    <Accordion>
                    <AccordionItem toggle="section-1" key={proj.idprojeto}>  <button onClick={() => handleEU(proj.idprojeto, proj.titulo)}> <u> {proj.titulo}</u> </button> <button onClick={() => editProject(proj.idprojeto, proj.titulo)}> <FiEdit  size={20} color="#595959" /></button></AccordionItem>
                      <AccordionPanel id="section-1">
                        <p className="font-bold">
                          {proj.titulo}
                        </p>
                        <p className="mb-4">
                          {proj.descricao}
                        </p>
                        <p className="font-bold">
                          Personas
                        </p>
                        <p className="mb-4">
                          {proj.personas}
                        </p>
                      </AccordionPanel>
                  </Accordion>
          ))}
            
            </div>
          </main>

        </div>
      </>  
    );
 }