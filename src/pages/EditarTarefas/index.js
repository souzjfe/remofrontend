import React, {useState,useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';

export default function NovaTarefa() {

    const [tarefas, setTarefa] = useState([]);
    const [idestoria,setIdEU] = useState('');
    const [status,setStatus]= useState('A');
    const [prioridade,setPrioridade]= useState('1');
    const [descricao,setDescricao]= useState('');
    const [estimativa,setEstimativa] = useState('');
    const [idsprint,setIdSprint] = useState('');
    const [frequenciauso,setFrequenciaUso] = useState('1');

    const idUsuario = localStorage.getItem('idusuario')
    const idprojeto = localStorage.getItem('idprojeto')
    const id = localStorage.getItem('idtarefa')
    const history = useHistory();

    const [estoriausuario, setEstoriaUsuario] = useState([]);
    const [sprints, setSprint] = useState([]);

    useEffect(() => {
        const idusuario = localStorage.getItem('idusuario')
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }
      
      }, []);

    useEffect(() => {
        api.get(`tarefa/${id}`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => {
            setTarefa( Response.data)
        });
    }, []);

    useEffect(() => {
        {tarefas.map((tarefa) => (
            setIdEU(tarefa.idestoria),
            setStatus(tarefa.status),
            setPrioridade(tarefa.prioridade),
            setDescricao(tarefa.descricao),
            setEstimativa(tarefa.estimativa),
            setIdSprint(tarefa.idsprint),
            setFrequenciaUso(tarefa.frequenciauso)
        ))}
    }, [tarefas]);

    useEffect(() => {
        api.get(`sprint`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => {
            setSprint( Response.data)
        });
    }, [tarefas])

    useEffect(() => {
        api.get(`estoria_usuario`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => {
            setEstoriaUsuario( Response.data)
        });
    }, [tarefas]);

    async function handleNovaTarefa(e) {
        
        e.preventDefault();
        
        const data = {
            descricao,
            status,
            estimativa,
            prioridade,
            frequenciauso,
            idestoria,
            idsprint
        };

        try{

            await api.put(`tarefa/${id}`, data, {
                headers: {
                    Authorization: idUsuario,
                }
            })
            
            history.push('/Tarefa')
        }catch(err){
            alert('Erro ao cadastrar nova Tarefa!')
        }

    }

    return (

        <div className="nova-eu-container">
        <Sidebar />
        
        <div className="content">
        <header className="bg-white shadow">
            
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                    <h2 className="text-3xl font-bold text-gray-500">Tarefas</h2>
                    <h2 className="text-1xl text-gray-500">Aqui você pode especificar seus requisitos por meio de Tarefas!</h2>
                </div>
            </header>

        <form id="login" onSubmit={handleNovaTarefa}>
            <div className="bg-gray-100 dark:bg-gray-800 ">
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Cadastro de Tarefas</p>
                        </div>
                    </div>
                    <div className="mx-auto pt-4 ">
                        
                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-4/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Descrição
                                </label>
                                <textarea 
                                    id="descricao" 
                                    name="descricao" 
                                    required 
                                    style={{height: 150 }}
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Descreva aqui sua tarefa"
                                    value={descricao}    
                                    onChange={ e => setDescricao(e.target.value)} 
                                    />
                            </div>
                            
                        </div> 

                        <div className="container mx-auto  flex justify-center">

                            <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Status
                                </label>
                                <select name="status" 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Status"
                                    value={status}    
                                    onChange={ e => setStatus(e.target.value)}>
                                    <option value="A">Analisando</option>
                                    <option value="B">Analisado</option>
                                    <option value="C">Desenvolvendo</option>
                                    <option value="D">Desenvolvido</option>
                                    <option value="E">Entregue</option>
                                    <option value="T">Testando</option>
                                </select>   
                            </div>
                            <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Valor de Negócio
                                </label>
                                <select 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    name="Prioridade"  
                                    placeholder="Prioridade"
                                    value={prioridade}    
                                    onChange={ e => setPrioridade(e.target.value)}>

                                    <option value="5">Alto</option>
                                    <option value="3">Médio</option>
                                    <option value="1">Baixo</option>
                                </select>

                            </div>

                            <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Frequência de Uso
                                </label>
                                <select 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    name="frequenciauso"  
                                    placeholder="frequenciauso"
                                    value={frequenciauso}    
                                    onChange={ e => setFrequenciaUso(e.target.value)}>

                                    <option value="5">Hora a Hora</option>
                                    <option value="4">Diário</option>
                                    <option value="3">Semanal</option>
                                    <option value="2">Mensal</option>
                                    <option value="1">Trimestral</option>
                                </select>

                            </div>

                            <div className="xl:w-1/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Estimativa
                                </label>
                                <input 
                                    type="number" 
                                    id="FirstName" 
                                    name="firstName" 
                                    required 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    placeholder="Horas Estimadas - Ex: 5,5"
                                    value={estimativa}    
                                    onChange={ e => setEstimativa(e.target.value)} />
                            </div>
                        </div> 

                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-2/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Sprint
                                </label>
                                <select 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    name="Prioridade"  
                                    placeholder="Prioridade"
                                    value={idsprint}    
                                    onChange={ e => setIdSprint(e.target.value)}>
                                    <option  value={null}></option>

                                    {sprints.map((sprint) => (
                                         <option key={sprint.idsprint} value={sprint.idsprint}>{sprint.titulo}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="xl:w-2/6 lg:w-1/2 md:w-1/2 flex flex-col mb-6 mx-2">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Estoria Usuário
                                </label>
                                <select 
                                    className="border border-gray-500 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-700 dark:text-gray-400" 
                                    name="Estoria Usuario"  
                                    placeholder="Estoria Usuario"
                                    value={idestoria}    
                                    onChange={ e => setIdEU(e.target.value)}>

                                    {estoriausuario.map((eu) => (
                                         <option key={eu.idestoria} value={eu.idestoria}>{eu.nome}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        

                    </div>
                </div>

                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-center">
                        
                        <Link to="/Tarefa">
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