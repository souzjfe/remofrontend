import React, {useState, useEffect} from 'react';
import{useHistory} from 'react-router-dom';
import { HiOutlinePrinter,HiOutlineArrowNarrowLeft } from "react-icons/hi";


import api from '../../services/api'

export default function Projeto(){
    const [projeto, setProjeto] = useState([]);
    const [estorias, setEstorias] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [criterios, setCriterios] = useState([]);
    
    let tarefasFiltradas ;
    let criteriosFiltrados ;
    let NumTar = 0;
    let NumEu = 0;
    let NumCrit = 0;

    const idusuario = localStorage.getItem('idusuario')
    const id = localStorage.getItem('idprojeto')
    const idprojeto = localStorage.getItem('idprojeto')
    const history = useHistory();

    useEffect(() => {
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        } else if(!id){
            alert('Favor selecionar o projeto!');
            localStorage.clear();
            history.push('/projeto')
        }
      
      }, []);

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
        api.get(`doc`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => { 
            setTarefas( Response.data)
        });

    }, []);

    useEffect(() => {
        api.get(`estoria_usuario_doc`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => { 
            setEstorias( Response.data)
        });

    }, []);

    useEffect(() => {
        api.get(`criterioaceitedoc`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => { 
            setCriterios( Response.data)
        });

    }, []);

    function numeroEu( idEstoria){
        NumEu = NumEu + 1;
        NumTar  = 0;
        NumCrit = 0;

        tarefasFiltradas = tarefas.filter( element => element.idestoria == idEstoria);
        criteriosFiltrados = criterios.filter( element => element.idestoria == idEstoria);

        return NumEu
    }

    function voltarHome(){
        history.push('/projeto')
    }


    function verificaTarefa(descr, idtar, status) {

        NumTar++

        if(status == 'A'){
            return "Tarefa "+NumTar+ ": " + descr + " (Status: Analisando)"
        }else if(status == 'B'){
            return "Tarefa "+NumTar+ ": " + descr + " (Status: Analisado)"
        }else if(status == 'C'){
            return "Tarefa "+NumTar+ ": " + descr + " (Status: Desenvolvendo)"
        }else if(status == 'D'){
            return "Tarefa "+NumTar+ ": " + descr + " (Status: Desenvolvido)"
        }else if(status == 'E'){
            return "Tarefa "+NumTar+ ": " + descr + " (Status: Entregue)"
        }else{
            return "Tarefa "+NumTar+ ": " + descr + " (Status: Testando)"
        }

    }

    function verificaCriterio(cenario, dado, quando, entao) {

        NumCrit++
        return "Critério Aceite "+NumCrit+ " -  Cenário: " + cenario + ", Dado: "+dado+", Quando: "+quando+", Então: "+entao+"."
        
    }


     return (

       <> 
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
            <h1 className="text-2xl font-bold text-gray-500">Documento de Requisitos</h1>
        </div>

        <div className="profile-container bg-gray-50">

          <header className="bg-white">
            

          </header>

          <main>


          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">

            {projeto.map((proj) => (

                <div class=" bg-white-00 " key={proj.idprojeto}> 
                    <div class="mb-0 mb-2 text-3xl"> 
                        <h1><b>{proj.titulo} </b></h1> 
                    </div>
                     
                    <div class=" text mb-0 mb-2"> 
                        <h2><b>Visão do Produto:</b> {proj.descricao} </h2> 
                    </div>

                    <div class=" text mb-0 mb-2"> 
                        <h2><b>Personas:</b> {proj.personas} </h2> 
                    </div>
                    
                </div>
            ))}

                <div className="rounded overflow-hidden bg-white-00">
                    <div className=" mb-1">
                        <hr size="10" width="100%"/>
                    </div>
                </div>

                <div  className="text-3xl">
                    <b><h1>Funcionalidades</h1></b>
                </div>

                <div className="rounded overflow-hidden bg-white-00">
                    <div className=" mb-4">
                        <hr size="10" width="100%"/>
                    </div>
                </div>

                {estorias.map((eu) => (

                    <div class="rounded overflow-hidden bg-white-00 " key={eu.idestoria}> 
                        <div class="mb-0 mb-2"> 
                            <h1>Funcionalidade {numeroEu(eu.idestoria)}: <b>{eu.nome}</b> </h1> 
                        </div>
                        
                        <div class=" text mb-0 mb-2"> 
                            <h2>Estória de Usuario: <b><i>"Como {eu.persona}, desejo {eu.desejo}, para {eu.descricao }"</i></b></h2> 
                        </div>

                        
                        {tarefasFiltradas.map((tarefa) => (
                            <div class=" text mb-0 mb-2 self-center items-center" key={tarefa.idtarefa}> 
                                <li><i> * {verificaTarefa(tarefa.descricao,eu.idestoria,tarefa.status)}</i></li> 
                            </div>
                        ))}
                         
                        {criteriosFiltrados.map((criterio) => (
                            <div class=" text mb-0 mb-2 self-center items-center" key={criterio.idcriterio}> 
                                <li><i> - {verificaCriterio(criterio.cenario,criterio.dado,criterio.quando, criterio.entao)}</i></li> 
                            </div>
                        ))}


                        <div className="rounded overflow-hidden bg-white-00">
                            <div className=" mb-4">
                                <hr size="10" width="100%"/>
                            </div>
                        </div>
                            
                    </div>
                ))}


            <div className="rounded overflow-hidden bg-white-00">
                <button onClick={() =>  window.print()} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded float-right">
                    <HiOutlinePrinter  size={21} color="White"/> 
                </button>
                <button onClick={() =>  voltarHome()} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                    <HiOutlineArrowNarrowLeft  size={21} color="White"/> 
                </button>
            </div> 

          </div>

          </main>

        </div>
      </>  
    );
 }