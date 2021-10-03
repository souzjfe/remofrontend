import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import dateFormat from 'dateformat';

import api from '../../services/api'

import Sidebar from '../../components/Sidebar/index'

export default function Projeto(){
    const [logs, setLogs] = useState([]);

    const idusuario = localStorage.getItem('idusuario')
    const idprojeto = localStorage.getItem('idprojeto')
    const history = useHistory();
    const dataini = localStorage.getItem('parm1')
    const datafim = localStorage.getItem('parm2')
    const tabela = localStorage.getItem('parm3')

    const data = {
        dataini,
        datafim,
        idusuario
    };

    useEffect(() => {
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }
      }, []);

    useEffect(() => {
        getLogs()
    }, [idusuario]);


    function imprimir() {
        Window.print()
        window.print()
    }

    function getLogs() {

       
        try{

            if(tabela == 1 ){
                console.log('tabela aqui')
                 api.put(`logprojetos`, data, {
                    headers: {
                        Authorization: idprojeto,
                    }
                }).then(Response => {
                    setLogs( Response.data)
                });
            }else if(tabela == 2 ){
                api.put(`logseu`, data, {
                    headers: {
                        Authorization: idprojeto,
                    }
                }).then(Response => {
                    setLogs( Response.data)
                });
            }if(tabela == 3 ){
                 api.put(`logsprint`, data, {
                    headers: {
                        Authorization: idprojeto,
                    }
                }).then(Response => {
                    setLogs( Response.data)
                });
            }if(tabela == 4 ){
                 api.put(`logstarefas`, data, {
                    headers: {
                        Authorization: idprojeto,
                    }
                }).then(Response => {
                    setLogs( Response.data)
                });
            }
            
        }catch(err){
            alert('Erro ao buscar Logs!')
        }

    }
     return (

       <> 
       <Sidebar />
        <div className="profile-container bg-gray-50">

          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h1 className="text-3xl font-bold text-gray-500">Logs</h1>
              </div>
          </header>

          <main>

          
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">

          {logs.map((registro) => (

                <div class="rounded overflow-hidden shadow-lg bg-gray-200" key={registro.idlog}> 
                    <div class="px-2 py-2 ">
                        <div class=" text mb-0">Data: {dateFormat(registro.dt_alteracao, "dd/mm/yyyy")} - Hora: {registro.hr_alteracao}</div>
                        
                    </div>
                    <div class="px-2 pt-2 pb-2 ">
                    <div class="text mb-2">{registro.alteracao} </div>
                        
                    </div>
                </div>
          ))}

      

            </div>
          </main>

        </div>
      </>  
    );
 }