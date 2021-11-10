import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { FiEdit} from 'react-icons/fi';
import { HiOutlineUserAdd, HiOutlineX } from "react-icons/hi";

import api from '../../services/api'

import Sidebar from '../../components/Sidebar/index'

export default function Projeto(){
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState([]);

    const idusuario = localStorage.getItem('idusuario')
    const idprojeto = localStorage.getItem('idprojeto')
    const history = useHistory();

    useEffect(() => {
        if (!idusuario) {
          alert('Favor realizar o login!');
          localStorage.clear();
          history.push('/')
        }
      }, []);

    useEffect(() => {
        getUsuarios()
    }, []);


    function getUsuarios() {

        try{

            if(idprojeto == null || idprojeto < 0 ){
                history.push('/Projeto')
            }

            api.get(`projetousuario`, {
                headers: {
                    Authorization: idprojeto,
                }
            }).then(Response => {
                setUsuarios( Response.data)
            });
            
        }catch(err){
            alert('Erro ao buscar Usuarios!')
        }

    }

    async function deleteUsuario(id) {
        
        console.log(id)
    
        try{

            await api.delete(`projetousuario/${id}`, {
                headers: {
                    Authorization: idprojeto,
                }
            })

            alert('Usuário removido com sucesso!')
            window.location.reload(); 
            
        }catch(err){
            alert('Erro ao Deletar Usuario!')
        }
    }

    async function addUsuario(){

        const data = {
            idprojeto,
            email,
        };

        try{

            await api.post('/projetousuario', data, {
                headers: {
                    Authorization: idusuario,
                }
            }).then(Response => {
                if(Response.data.retorno){
                    alert(Response.data.retorno);
                    history.push('/UsuarioProjeto');
                }else{
                    alert('Usuário cadastrado com sucesso!');
                    history.push('/UsuarioProjeto');
                }
            });
                      
        }catch(err){
            alert('Erro ao cadastrar novo Usuario no Projeto! Verifique o e-mail e tente novamente!')
        }

    }


     return (

       <> 
       <Sidebar />
        <div className="profile-container bg-gray-50">

          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-1">
                  <h1 className="text-3xl font-bold text-gray-500">Usuários do Projeto</h1>
              </div>
          </header>

            <main>

                <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">

                    {usuarios.map((usuario) => (

                            <div class="rounded overflow-hidden shadow-lg bg-gray-300" key={usuario.idusuario}> 
                                <div class="px-2 py-2 ">
                                    <div class=" text mb-0"> <b>Nome:</b> {usuario.nome} <button className="bg-gray-400  transition duration-150 rounded ease-in-out hover:bg-red-200 px-3 py-0 " onClick={() => deleteUsuario(usuario.idusuario)}> <HiOutlineX  size={15} color="#423c3c" /></button></div> 
                                    <div class=" text mb-0"> <b>E-mail:</b> {usuario.email}</div>     
                                </div>
                            </div>
                    ))}
                </div>

                <form id="login" onSubmit={addUsuario}>

                        <div className="container mx-auto  flex justify-center">
                            <div className="xl:w-2/6 lg:w-4/6 md:w-4/6 flex flex-col mb-6 mx-2">
                                
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Adicionar Novo Usuário
                                </label>

                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}    
                                    onChange={ e => setEmail(e.target.value)}
                                    required 
                                    className="border border-gray-400 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" 
                                    placeholder="E-mail" />
                            </div>
                        </div>
                        <div className="container mx-auto  flex justify-center">
                            <button className="bg-blue-700 focus:outline-none transition duration-150 ease-in-out hover:bg-blue-600 rounded text-white px-8 py-1 text-sm mx-2" >
                                <HiOutlineUserAdd  size={20} color="White"/>
                            </button>
                            <Link to="/Projeto">
                                <button className="bg-red-700 focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-8 py-2 text-sm ">
                                        Voltar
                                </button>
                            </Link>
                        </div>
                        
                </form>
            </main>

        </div>
      </>  
    );
 }