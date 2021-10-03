import  React from 'react';
import {Link} from 'react-router-dom';

const Dropdown = () => {
    return(
        <div className="grid grid-rows-4 text-center">
            <Link className="p-4" to="/">Projetos</Link>
            <Link className="p-4" to="/">Backlog</Link>
            <Link className="p-4" to="/">Sprints</Link>
            <Link className="p-4" to="/">Atividades</Link>
            <Link className="p-4" to="/">Log-out</Link>
      </div>
    )
}

export default Dropdown