import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { HiUserGroup} from 'react-icons/hi';

import api from '../../services/api'

import Sidebar from '../../components/Sidebar/index'

export default function Projeto(){
    const [projeto, setProjeto] = useState([]);
    const [titulo,setTitulo] = useState('');
    const [descricao,setDescricao]= useState('');
    const [personas,setPersonas]= useState('');

    const idusuario = localStorage.getItem('idusuario');
    const history = useHistory();
    const id = localStorage.getItem('idprojeto');

    useEffect(() => {
        api.get(`projeto/${id}`, {
            headers:{
                Authorization: idusuario,
            }
        }).then(Response => { 
            setProjeto( Response.data)
        });

    }, []);

    useEffect(() => {
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }
      
      }, []);

    useEffect(() => {
        {projeto.map((proj) => (
            setTitulo(proj.titulo),
            setDescricao(proj.descricao),
            setPersonas(proj.personas)
        ))}
    }, [projeto]);

    async function handleUpdateProjeto(e) {
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            personas,
        };

        try{

            await api.put(`projeto/${id}`, data, {
                headers: {
                    Authorization: idusuario,
                }
            })

            history.push('/Projeto')
        }catch(err){
            alert('Erro ao cadastrar novo Projeto!')
        }

    }


    return (

    <> 
        <div className="nova-eu-container">
        <Sidebar />
        
        <div className="content">
        <header className="bg-white shadow">
            
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                    <h2 className="text-3xl font-bold text-gray-500">Projeto</h2>
                    <h2 className="text-1xl text-gray-500">Aqui você pode cadastrar seus projetos!</h2>
                </div>
            </header>

        <form id="login" onSubmit={handleUpdateProjeto}>
            <div className="bg-gray-100 dark:bg-gray-800 ">
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Alteração de Projeto</p>
                        </div>
                    </div>
                    <div className="mx-auto pt-4 ">
                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6 ">
                                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Título
                                </label>
                                <input 
                                    type="text" 
                                    id="FirstName" 
                                    name="firstName" 
                                    value={titulo}    
                                    onChange={ e => setTitulo(e.target.value)}
                                    required 
                                    className="border border-gray-400 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" 
                                    placeholder="Título" />
                            </div>
                        </div>
                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Descrição
                                </label>
                                <textarea 
                                    id="descricao" 
                                    name="descricao" 
                                    limit="2000" 
                                    required 
                                    style={{height: 150 }}
                                    className="border border-gray-400 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" 
                                    placeholder="Descreva o seu projeto"
                                    value={descricao}    
                                    onChange={ e => setDescricao(e.target.value)} />
                            </div>
                            
                        </div> 
                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Personas
                                </label>
                                <textarea 
                                    id="descricao" 
                                    name="descricao"  
                                    limit="2000"
                                    style={{height: 150 }}
                                    required
                                    className="border border-gray-400 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" 
                                    placeholder="Descreva as personas do seu projeto"
                                    value={personas}    
                                    onChange={ e => setPersonas(e.target.value)} />
                            </div>
                        </div> 
                    </div>
                </div>

                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-center">
                        
                        <Link to="/Projeto">
                            <button className="bg-red-700 focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-8 py-2 text-sm ">
                                    Voltar
                            </button>
                        </Link>

                        <button className="bg-green-700 focus:outline-none transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-2 text-sm mx-2" type="submit">
                            Salvar
                        </button>

                        <Link to="/UsuarioProjeto">
                            <button className="bg-blue-700 focus:outline-none transition duration-150 ease-in-out hover:bg-blue-600 rounded text-white px-8 py-2 text-sm" >
                               Adicionar Time
                            </button>
                        </Link>
                       
                    </div>

                </div>
            </div>
        </form>
        </div>
    </div>
    </>
    );
 }