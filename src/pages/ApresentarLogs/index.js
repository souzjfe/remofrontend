import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';

export default function NovaSprint() {

    const [dataini,setDataini]= useState('');
    const [datafim,setDatafim]= useState('');
    const [tabela,setTabela]= useState('1');

    const idprojeto = localStorage.getItem('idprojeto')
    const history = useHistory();

    async function handleBuscarLogs(e) {
        e.preventDefault();


        localStorage.setItem('parm1', dataini);
        localStorage.setItem('parm2', datafim);
        localStorage.setItem('parm3', tabela);
        history.push('/ResultadoLogs')
    }

    return (
        
        <div className="nova-eu-container">
             <Sidebar />
             
        <div className="content">
        <header className="bg-white shadow">
           
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h2 className="text-3xl font-bold text-gray-500">Histórico de Mudanças</h2>
                  <h2 className="text-1xl text-gray-500">Logs e registros das mudanças que ocoreram no projeto</h2>
              </div>
            </header>

        <form id="login" onSubmit={handleBuscarLogs}>
            <div className="bg-gray-100 dark:bg-gray-800 ">
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Buscar pelo Histório de Mudanças</p>
                        </div>
                    </div>
                    <div className="mx-auto pt-4 ">
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
                            <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
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
                            
                            <div className="xl:w-2/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Módulo
                                </label>
                                <select 
                                        className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                        name="tabela"  
                                        placeholder="tabela"
                                        value={tabela}    
                                        onChange={ e => setTabela(e.target.value)}>

                                        <option value="1">Projetos</option>
                                        <option value="2">Estorias de Usuário</option>
                                        <option value="3">Sprints</option>
                                        <option value="4">Tarefas</option>
                                    </select>
                            </div>
                            
                        </div> 
                    </div>
                </div>
                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-center">
                        
                        <button className="bg-green-700 focus:outline-none transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-2 text-sm" type="submit">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </form>

        </div>
    </div>

    );
    
}