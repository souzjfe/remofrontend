import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import dateFormat from 'dateformat';

import Sidebar from '../../components/Sidebar';

export default function NovaSprint() {

    const [sprints, setSprint] = useState([]);
    const [titulo,setTitulo] = useState('');
    const [dataini,setDataini]= useState('');
    const [datafim,setDatafim]= useState('');
    const [estimativa,setEstimativa]= useState('');

    const idprojeto = localStorage.getItem('idprojeto')
    const idusuario = localStorage.getItem('idusuario')
    const id = localStorage.getItem('idsprint')
    const history = useHistory();

    useEffect(() => {
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }
      
      }, []);

    useEffect(() => {
        api.get(`sprint/${id}`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => {
            setSprint( Response.data)
        });
    }, []);

    useEffect(() => {
        {sprints.map((sprint) => (

            setTitulo(sprint.titulo),
            setDataini(dateFormat(sprint.dataini, "yyyy-mm-dd")),
            setDatafim(dateFormat(sprint.datafim, "yyyy-mm-dd")),
            setEstimativa(sprint.estimativa)
        ))}
    }, [sprints]);

    async function arquivarSprint() {

        await api.delete(`arquivar/${id}`, {
            headers:{
                Authorization: idusuario,
            }
        }).then(Response => {
            alert( Response.data.retorno)
        });

         history.push('/sprint')
    };

    async function handleNovaSprint(e) {
        e.preventDefault();

        if (dataini > datafim){
            alert('Oops! Data Final não pode ser menor que a Data Inicial. Por favor, verifique!')
            return
        }

        const data = {
            titulo,
            dataini,
            datafim,
            estimativa,
            idusuario
        };

        try{

            await api.put(`sprint/${id}`, data, {
                headers: {
                    Authorization: idprojeto,
                }
            })

            history.push('/sprint')
        }catch(err){
            alert('Erro ao cadastrar nova Sprint!')
        }

    }

    return (
        
        <div className="nova-eu-container">
             <Sidebar />
             
        <div className="content">
        <header className="bg-white shadow">
           
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h2 className="text-3xl font-bold text-gray-500">Sprint</h2>
                  <h2 className="text-1xl text-gray-500">Hora do desenvolvimento!</h2>
              </div>
            </header>

        
            <div className="bg-gray-100 dark:bg-gray-800 ">
            
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Cadastro de Sprint</p>
                        </div>
                    </div>

                    
                    <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                        <button onClick={() =>  arquivarSprint()}  className="bg-blue-500 focus:outline-none transition duration-150 ease-in-out hover:bg-blue-600 rounded text-white px-2 py-2 text-sm mt-2" >
                            Arquivar Sprint
                        </button>
                    </div>
                    

                    <form id="login" onSubmit={handleNovaSprint}>
                  
                        <div className="mx-auto pt-4 ">
                            <div className="container mx-auto  flex justify-center">
                                <div className="xl:w-3/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 ">
                                    <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100 ">
                                        Título
                                    </label>
                                    <input 
                                    type="text" 
                                    id="Titulo" 
                                    name="titulo" 
                                    required 
                                    value={titulo}    
                                    onChange={ e => setTitulo(e.target.value)}
                                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Título" />
                                </div>
                            </div>

                            <div className="container mx-auto  flex justify-center">

                                <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Data Início
                                    </label>
                                    <input 
                                        type="date" 
                                        id="DataIni" 
                                        name="dataIni" 
                                        required 
                                        value={dataini}   
                                        onChange={ e => setDataini(e.target.value)}
                                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                                </div>
                                <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Data Fim
                                    </label>
                                    <input 
                                        type="date" 
                                        id="DataFim" 
                                        name="dataFim" 
                                        required 
                                        value={datafim}    
                                        onChange={ e => setDatafim(e.target.value)}
                                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                                </div>
                                <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Estimativa
                                    </label>
                                    <input 
                                        type="number" 
                                        id="Estimativa" 
                                        name="setEstimativa" 
                                        required 
                                        value={estimativa}   
                                        onChange={ e => setEstimativa(e.target.value)}
                                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Hrs Estimadas" />
                                </div>

                            </div> 
                        </div>


                        <div className="container mx-auto w-11/12 xl:w-full">
                            <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-center">
                                
                                <Link to="/Sprint">
                                    <button className="bg-red-700 focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-8 py-2 text-sm mx-2">
                                            Voltar
                                    </button>
                                </Link>
                                
                                <button className="bg-green-700 focus:outline-none transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-2 text-sm" type="submit">
                                    Salvar
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    );
    
}