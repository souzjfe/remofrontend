import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import './styles.css'

import Sidebar from '../../components/Sidebar';

export default function NovoEU() {

    const [nome,setNome] = useState('');
    const [status,setStatus]= useState('I');
    const [persona,setPersona]= useState('');
    const [desejo,setDesejo]= useState('');
    const [descricao,setDescricao]= useState('');

    const idUsuario = localStorage.getItem('idusuario')
    const idprojeto = localStorage.getItem('idprojeto')
    const history = useHistory();

    useEffect(() => {
        const idusuario = localStorage.getItem('idusuario')
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }
      
      }, []);

    async function handleNovaEU(e) {
        
        e.preventDefault();
        
        const data = {
            nome,
            status,
            persona,
            desejo,
            descricao,
            idprojeto,
        };

        try{

            await api.post('estoria_usuario', data, {
                headers: {
                    Authorization: idUsuario,
                }
            }).then(Response => {
                if (Response.data.sucesso){
                    alert(Response.data.sucesso)
                    alert("Estoria de Usuário cadastrado com sucesso! Agora é possível cadastrar os critérios de aceite na Estoria!");
                    localStorage.setItem('idestoria', Response.data.sucesso);
                    history.push('/Estoria_Usuario/EditarEU')
                }else{
                    alert('Erro ao cadastrar nova Estoria de Usuário!');
                }
            });
            
        }catch(err){
            alert('Erro ao cadastrar nova Estoria de Usuário!')
        }

    }

    return (

        <div className="nova-eu-container">
        <Sidebar />
        
        <div className="content">
        <header className="bg-white shadow">
            
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                    <h2 className="text-3xl font-bold text-gray-500">Estória de Usuário</h2>
                    <h2 className="text-1xl text-gray-500">Aqui você pode cadastrar seus requisitos por meio de Estórias de Usuário!</h2>
                </div>
            </header>

        <form id="login" onSubmit={handleNovaEU}>
            <div className="bg-gray-100 dark:bg-gray-800 ">
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Cadastro de Estória de Usuário</p>
                        </div>
                    </div>
                    <div className="mx-auto pt-4 ">
                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-3/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6 ">
                                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Funcionalidade
                                </label>
                                <input 
                                    type="text" 
                                    id="FirstName" 
                                    name="firstName" 
                                    limit="200"
                                    required 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    value={nome}    
                                    onChange={ e => setNome(e.target.value)} />
                            </div>
                        
                            
                            <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Status
                                </label>
                                <select name="status" 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Status"
                                    value={status}    
                                    onChange={ e => setStatus(e.target.value)}>
                                    <option value="I">Iniciar</option>
                                    <option value="D">Desenvolvendo</option>
                                    <option value="F">Finalizado</option>
                                </select>   
                            </div>
                        </div>

                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <hr size="10" width="100%"/>
                            </div>
                        </div>

                        <div className="container mx-auto  flex justify-center">
                            <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Estória de Usuário
                            </label>
                        </div>
                        
                        <div className="container mx-auto  flex justify-center">

                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                   Estória de Usuário: "Como..."
                                </label>
                                <textarea 
                                    id="persona" 
                                    name="persona" 
                                    limit="2000"
                                    required 
                                    style={{height: 50 }}
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Descreva aqui especificando a persona dessa funcionalidade"
                                    value={persona}    
                                    onChange={ e => setPersona(e.target.value)} 
                                    />
                            </div> 
                        </div>
                           
                        <div className="container mx-auto  flex justify-center">                            
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    "Desejo..."
                                </label>
                                <textarea 
                                    id="desejo" 
                                    name="desejo" 
                                    limit="2000"
                                    required 
                                    style={{height: 50 }}
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Descreva aqui especificando a necessidade dessa funcionalidade"
                                    value={desejo}    
                                    onChange={ e => setDesejo(e.target.value)} 
                                    />
                            </div>  
                        </div>

                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    "Para..."
                                </label>
                                <textarea 
                                    id="descricao" 
                                    name="descricao" 
                                    limit="2000"
                                    required 
                                    style={{height: 50 }}
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Descreva aqui especificando o porque da necessidade dessa funcionalidade"
                                    value={descricao}    
                                    onChange={ e => setDescricao(e.target.value)} 
                                    />
                            </div>  


                        </div> 

                    </div>
                </div>

                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-center">
                        
                        <Link to="/Profile">
                            <button className="bg-red-700 focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-8 py-2 text-sm mx-2">
                                    Voltar
                            </button>
                        </Link>

                        <button className="bg-green-700 focus:outline-none transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-2 text-sm" type="submit">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </form>
        </div>
    </div>
    );
    
}