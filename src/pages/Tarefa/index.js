import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { FiEdit} from 'react-icons/fi'
import { HiPlusCircle } from "react-icons/hi";

import api from '../../services/api'

import './styles.css';

import Sidebar from '../../components/Sidebar';


export default function Profile(){
    const [tarefas, setTarefas] = useState([]);
    const [sprints, setSprint] = useState([]);

    const idusuario = localStorage.getItem('idusuario')
    const idprojeto = localStorage.getItem('idprojeto')
    const tituloprojeto = localStorage.getItem('tituloprojeto')
    const history = useHistory();
    let IdSprint  = 0;
    let tarefasFiltradas = null ;

    useEffect(() => {
      if (!idusuario) {
        alert('Favor realizar o login!');
        localStorage.clear();
        history.push('/')
      }

      if (!idprojeto){
        alert('Favor selecionar o projeto!');
        history.push('/')
      }
    
    }, []);

    useEffect(() => {
      api.get(`sprint`, {
          headers:{
              Authorization: idprojeto,
          }
      }).then(Response => {
          setSprint( Response.data)
      });
  }, [idprojeto]);

    useEffect(() => {
        api.get(`tarefa`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => {
            setTarefas( Response.data)
        });
    }, [idusuario]);

    function handleEditarTarefa(id) {
      localStorage.setItem('idtarefa', id)
      console.log(id)
      history.push('/Sprint/EditarTarefa')
    }

    function addSprint(idsprint, ){
      if(idsprint != IdSprint){
        IdSprint = idsprint
      }
    
      return null;
    };

    function corrigeStatus(status){
      
        if(status == 'A'){
          return 'Analisando'
        }else if (status == 'B'){
          return 'Analisado'
        }else if (status == 'C'){
          return 'Desenvolvendo'
        }else if (status == 'D'){
          return 'Desenvolvido'
        }else if (status == 'E'){
          return 'Entregue'
        }else if (status == 'T'){
          return 'Testando'
        }
    }

    function corrigeStatusSpan(status){
      
      if(status == 'A'){
        return "inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      }else if (status == 'B'){
        return "inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      }else if (status == 'C'){
        return "inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      }else if (status == 'D'){
        return "inline-block bg-pink-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      }else if (status == 'E'){
        return "inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      }else if (status == 'T'){
        return "inline-block bg-purple-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      }
  }


    function handleNovaTarefa() {
        history.push('/Tarefa/Nova')
    }

    function filtrarTarefas( idSprint, titulo){

      if (idSprint == -1){
        tarefasFiltradas = tarefas.filter( element => element.idsprint == null);
        return "* Tarefas Não Priorizadas"
      }else{
        tarefasFiltradas = tarefas.filter( element => element.idsprint == idSprint);

        if (tarefasFiltradas.length > 0){
          return "Sprint: "+ titulo
        }
        
      }

      return "Sprint: "+ titulo + " -  Sem Tarefas Alocadas"
  }

    function handleProcessadorTarefas() {

        if(!(idprojeto)){
          history.push('/Projeto')
        }

        alert('Este processo consiste de alocar as tarefas nas sprints com base em seu nível de prioridade, isso pode demorar um pouco!');


      try{
         api.get(`processarSprints`, {
              headers:{
                  Authorization: idprojeto,
              }
          }).then(Response => {
            if(Response.err || Response.error){
              alert('Houve problemas na priorização das Tarefas!')
            }

            alert('Tarefas Priorizadas com sucesso!')
            window.location.reload(); 

          });
        }catch(err){
          alert('Houve problemas na priorização das Tarefas!')
        }
      
    }

    const Context = React.createContext({});

     return (
        
       <> 

        <Sidebar />
       <div className="profile-container">

            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h2 className="text-3xl font-bold text-gray-500">Tarefas</h2>
                  <h2 className="text-1xl text-gray-500">{tituloprojeto}</h2>
              </div>
            </header>

            <main>

              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <button onClick={() => handleProcessadorTarefas()} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded float-right">
                    Priorizar
                  </button>
                <button onClick={() => handleNovaTarefa()} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right">
                    <HiPlusCircle  size={21} color="White"/> 
                </button>
              </div>

              <div class="p-10 grid">
  
                {sprints.map((sprint) => (

                      <div class="mb-0 mb-2"> 

                        <div className="rounded overflow-hidden bg-white-00">
                            <div className=" mb-4">
                                <hr size="10" width="100%"/>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-650 mb-2" >{filtrarTarefas(sprint.idsprint,sprint.titulo)}</h1> 

                        <div class="p-10 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                          {tarefasFiltradas.map((tarefa) => ( 
                            
                              <button  onClick={()=> handleEditarTarefa(tarefa.idtarefa)} key={tarefa.idtarefa}> 
                                <div class="rounded shadow-lg bg-gray-300 hover:bg-gray-400 mb-5"> 
                                  <div class="px-6 py-4 ">
                                    <span class={corrigeStatusSpan(tarefa.status)}>{corrigeStatus(tarefa.status)}</span>
                                     
                                      <div class=" text mb-0 mb-2 "> <b>Tarefa:</b> <u>{tarefa.descricao}</u></div>
                                      <div class=" text mb-0 mb-2"><i>"Como {tarefa.persona}, desejo {tarefa.desejo}, para {tarefa.descreu}"</i> </div>
                              
                                  </div>
                                  </div>
                              </button>
                            
                          ))}

                        </div>
                        
                      </div>

                      
                ))}

                <div class="mb-0 mb-2"> 

                  <div className="rounded overflow-hidden bg-white-00">
                      <div className=" mb-4">
                          <hr size="10" width="100%"/>
                      </div>
                  </div>

                  <h1 className="text-2xl font-bold text-gray-650 mb-2" > {filtrarTarefas(-1, "* Tarefas Não Priorizada")}</h1> 

                  <div class="p-10 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                    {tarefasFiltradas.map((tarefa) => ( 
                      
                        <button  onClick={()=> handleEditarTarefa(tarefa.idtarefa)} key={tarefa.idtarefa}> 
                          <div class="rounded shadow-lg bg-gray-300 hover:bg-gray-400 mb-5"> 
                            <div class="px-6 py-4 ">
                              <span class={corrigeStatusSpan(tarefa.status)}>{corrigeStatus(tarefa.status)}</span>
                              
                                <div class=" text mb-0 mb-2 "> <b>Tarefa:</b> <u>{tarefa.descricao}</u></div>
                                <div class=" text mb-0 mb-2"><b>Funcionalidade:</b> <i>{tarefa.funcionalidade}</i></div>
                            </div>
                            </div>
                        </button>
                      
                    ))}
                  </div>

                </div>


              </div>
            </main>
         </div>                
      
      </>  
    );
 }