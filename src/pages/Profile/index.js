import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { FiEdit} from 'react-icons/fi'
import { HiPlusCircle } from "react-icons/hi";

import api from '../../services/api'

import './styles.css';

import Sidebar from '../../components/Sidebar';


export default function Profile(){
    const [estoriausuario, setEstoriaUsuario] = useState([]);

    const idprojeto = localStorage.getItem('idprojeto')
    const idusuario = localStorage.getItem('idusuario')
    const tituloprojeto = localStorage.getItem('tituloprojeto')
    const history = useHistory();


    useEffect(() => {
      validaLogin()
  }, [idprojeto]);

    useEffect(() => {
        api.get(`estoria_usuario`, {
            headers:{
                Authorization: idprojeto,
            }
        }).then(Response => {
            setEstoriaUsuario( Response.data)
        });
    }, [idusuario]);
    

    function validaLogin(){

        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }

      if(!(idprojeto)){
        history.push('/Projeto')
      }
    }

    async function handleDeleteEstoriaUsuario(id) {
        try{
            await api.delete(`estoria_usuario/${id}`,{
                headers:{
                    Authorization: idusuario,
                }
            });

            setEstoriaUsuario(estoriausuario.filter( eu => eu.id !== id));

        }catch(err) {
            alert('Erro ao deletar caso, tente novamente!')
        }
    }

    function handleEditEU(id) {
      localStorage.setItem('idestoria', id);
      history.push('/Estoria_Usuario/EditarEU')
    }

    function handleNovoEU() {
        history.push('/EstoriaUsuario/Nova')
    }

    function corrigeStatus(status){
      
      if(status == 'I'){
        return 'Iniciar'
      }else if (status == 'D'){
        return 'Desenvolvendo'
      }else if (status == 'F'){
        return 'Finalizado'
      }
  }

  function corrigeStatusSpan(status){
    
    if(status == 'I'){
      return "inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
    }else if (status == 'D'){
      return "inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
    }else if (status == 'F'){
      return "inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
    }

}
 
     return (
        
       <> 

        <Sidebar />
       <div className="profile-container">

            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h2 className="text-3xl font-bold text-gray-500">Backlog</h2>
                  <h2 className="text-1xl text-gray-500">{tituloprojeto}</h2>
              </div>
            </header>

            <main>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <button onClick={() => handleNovoEU()} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right">
                <HiPlusCircle  size={20} color="White"/> 
            </button>
            </div>

            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
              {estoriausuario.map((eu) => (
                <button  onClick={()=> handleEditEU(eu.idestoria)} key={eu.idestoria}> 
                  <div class="rounded shadow-lg bg-gray-300 hover:bg-gray-400"> 
                    
                      <div class="px-6 py-4 ">
                      <span class={corrigeStatusSpan(eu.status)}>{corrigeStatus(eu.status)}</span>
                          <div class=" text mb-0 mb-2"><b>Funcionalidade:</b> <i>{eu.nome}</i></div>
                          <div class=" text mb-0 mb-2">"<i>Como {eu.persona}, desejo {eu.desejo}, para {eu.descricao}"</i> </div>
                      </div>
                  </div>
                  </button>
                
              ))}
            
            </div>


            </main>
         </div>
                      
      </>  
    );
 }