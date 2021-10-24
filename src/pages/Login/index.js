import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi';

import './styles.css'

import NovoImg from '../../assets/Novo_Icone_Login2.png'
import logoImg from '../../assets/remo.png'
import api from '../../services/api';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const crypto = require("crypto");
    const secret = 'remoutfpr';

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {

            const hash = crypto.createHmac('sha256', secret).update(senha).digest('hex')

            const response = await api.post('sessions', {email,hash})

            //arrumar aqui
            localStorage.setItem('idusuario', response.data.idusuario);
            localStorage.setItem('nome', response.data.nome);
            history.push('/Projeto')
        } catch (err){
            alert("Falha ao realizar login. Verifique seu email e senha e tente novamente!")
        }

    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}></input>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/registro">
                        <FiLogIn size={16} color="#00CED1"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={NovoImg} alt="Heroes" />
        </div>
    )
}