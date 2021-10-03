import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login'
import Registro from './pages/Registro'
import Profile from './pages/Profile'
import NovoEU from './pages/NovoEU'
import NovaSprint from './pages/NovaSprint'
import Sprint from './pages/Sprint'
import Projeto from './pages/Projeto'
import NovoProjeto from './pages/NovoProjeto'
import NovaTarefa from './pages/NovaTarefa'
import Tarefa from './pages/Tarefa'
import EditarProjeto from './pages/EditarProjeto'
import EditarEU from './pages/EditarEstoriaUsuario'
import EditarSprint from './pages/EditarSprint'
import EditarTarefa from './pages/EditarTarefas'
import Logs from './pages/ApresentarLogs'
import ResultadoLogs from './pages/ResultadoLogs'
import UsuarioProjeto from './pages/UsuarioProjeto'
import GerarDocumento from './pages/ImprimirDocumento'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/Registro" component={Registro}/>
                <Route path="/Projeto" exact component={Projeto}/>
                <Route path="/Projeto/Novo" exact component={NovoProjeto}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/EstoriaUsuario/Nova" component={NovoEU}/>
                <Route path="/sprint/nova" component={NovaSprint}/>
                <Route path="/sprint" exact component={Sprint}/>
                <Route path="/projeto/new"  component={NovaSprint}/>
                <Route path="/tarefa/nova"  exact component={NovaTarefa}/>
                <Route path="/tarefa"  component={Tarefa}/>
                <Route path="/Projeto/Editar" component={EditarProjeto}/>
                <Route path="/Estoria_Usuario/EditarEU" component={EditarEU}/>
                <Route path="/Sprint/EditarSprint" component={EditarSprint}/>
                <Route path="/Sprint/editartarefa" component={EditarTarefa}/>
                <Route path="/Logs" exact component={Logs}/>
                <Route path="/ResultadoLogs" exact component={ResultadoLogs}/>
                <Route path="/UsuarioProjeto" exact component={UsuarioProjeto}/>
                <Route path="/GerarDocumento" exact component={GerarDocumento}/>
                
            </Switch>
        </BrowserRouter>
    )
}