import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { FiEdit} from 'react-icons/fi'
import { HiPlusCircle } from "react-icons/hi";
import dateFormat from 'dateformat';

import api from '../../services/api'

import './styles.css';

import logoremo from '../../assets/remo.png'
import Sidebar from '../../components/Sidebar';


export default function Sprint(){
    const [sprints, setSprint] = useState([]);

    const idusuario = localStorage.getItem('idusuario')
    const usuarioNome = localStorage.getItem('nome')
    const idprojeto = localStorage.getItem('idprojeto')
    const tituloprojeto = localStorage.getItem('tituloprojeto')
    const history = useHistory();

    useEffect(() => {
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
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

    function handleEditarSprint(id) {
        localStorage.setItem('idsprint', id)
        history.push('/Sprint/EditarSprint')
    }
    
    function handleNovaSprint() {
        history.push('/Sprint/Nova')
    }


     return (
        
       <> 

        <Sidebar />
       <div className="profile-container">

            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h2 className="text-3xl font-bold text-gray-500">Sprints</h2>
                  <h2 className="text-1xl text-gray-500">{tituloprojeto}</h2>
              </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <button onClick={() => handleNovaSprint()} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right">
                        <HiPlusCircle  size={21} color="White"/> 
                    </button>
                </div>

                <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">

                  {sprints.map((sprint) => (

                      <div class="rounded overflow-hidden shadow-lg bg-blue-400" key={sprint.idsprint}> 
                          <div class="px-6 py-4 ">
                              <div class="font-bold text-xl mb-2">{sprint.titulo}<button  onClick={()=> handleEditarSprint(sprint.idsprint)}> <FiEdit  size={20} color="#595959" /></button></div>
                          </div>
                          <div class="px-6 pt-4 pb-2 ">
                              <span class="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">De: {dateFormat(sprint.dataini, "dd/mm/yyyy")} - Até: {dateFormat(sprint.datafim, "dd/mm/yyyy")}</span>
                          </div>
                      </div>
                  ))}
            
            </div>
            
            </main>
         </div>
      </>  
    );
 }