import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/remo.png'

export default function Registro(){

    const [nome, setNome ] = useState('');
    const [senha, setSenha ] = useState('');
    const [nomeusuario, setNomeUsuario ] = useState('');
    const [email, setEmail ] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({
        nome,
        senha,
        nomeusuario,
        email
    });

        try{
            await api.post('/usuario', data);
            alert(`Novo usuário cadastradro!`);

            history.push('/')
        }catch(err){
            alert(`Erro ao cadastrar novo usuário!`)
        }
    }


    return (

        <div className="registro-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <h1>Cadastro</h1>
                    <p>Realize seu cadastro para poder acessar a plataforma e começar a definir seus requisitos!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#00CED1"/>
                        Voltar para login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}/>

                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}/>

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>

                    <input 
                        placeholder="Nome de Usuário"
                        value={nomeusuario}
                        onChange={e => setNomeUsuario(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
                
            </div>
        </div>
    )
}