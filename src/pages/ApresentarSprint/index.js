import React, {useState, useEffect} from 'react';
import{Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg'
import logoremo from '../../assets/remo.png'
import Sidebar from '../../components/Sidebar/index'

export default function Profile(){
    const [sprint, setSprint] = useState([]);

    const id_usuario = localStorage.getItem('id_usuario')
    const usuarioNome = localStorage.getItem('nome')
    const history = useHistory();

    useEffect(() => {
        api.get('sprint', {
            headers:{
                Authorization: id_usuario,
            }
        }).then(Response => {
            setSprint( Response.data)
        });
    }, [id_usuario]);


    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }


     return (

       <> 

        <div className="profile-container">

            <Sidebar />
            <header>

            <img src={logoremo} alt="logo" />
            <span> Bem Vindo(a), {usuarioNome}</span>
            
            <Link className="button" to="/sprint/Nova">Nova Sprint
            </Link>

            <button onClick={handleLogout} type='button'>
                <FiPower size={18} color="#a8a8b3"></FiPower>
            </button>

            </header>

            <h1>Sprints</h1>

            <ul>
                {sprint.map( eu => (
                    <li key={eu.id}>
                            
                        
                            <div className="li__nome">
                                <strong>Nome</strong>
                                <p>{eu.nome}</p>
                            </div>
                            <div className="li__status">
                                <strong>Data Inicio</strong>
                                <p>{eu.dataini}</p>
                            </div>
                        

                        <div className="prioridade"> 
                            <strong>Data Fim</strong>
                            <p>{eu.datafim}</p>
                        </div> 
                        


                        <button type="button">
                            <FiTrash2  size={20} color="#a8a8b3" />
                        </button>
                </li>
                ))}

            </ul>
        </div>
      </>  
    );
 }