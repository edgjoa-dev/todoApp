import React, { useEffect, useReducer } from 'react'
import { addReducer } from './addReducer';
import { useForm } from './useForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

import '../Styles/main.scss'


const init = ( ) => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}



export const Hero = () => {

    const [todos, dispatch] = useReducer(addReducer, [], init)


    const [{description}, handleInputChange, reset] = useForm({
        description: ' '
    })
    console.log(description);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);
    
    const handleDelete = (todoId ) => {
        const action ={
            type: 'delete',
            payload: todoId
        }
    
        dispatch( action );
    };
    


    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (description.trim().length <= 2) {
            return;
        };

        const newTodo = {
            id: new Date().getTime(),
            desc: description
        };

        const action ={
            type: 'add',
            payload: newTodo
        }

            dispatch( action );
            reset();

    };
    



    return (
        
            <div className="cont__todo" >

                <div className="todo__list" >
                    <div className=" cont__head " ><h1>TodoApp</h1><hr/></div>
                    <ol>
                        {
                            todos.map( todo =>(
                                <li key={todo.id} >
                                <p>{todo.desc}</p>
                                <button
                                onClick={()=> handleDelete(todo.id)}
                                ><DeleteForeverIcon /></button>
                                </li>
                            ) )
                        }
                    </ol>
                </div>

                <div className=" cont__add " >
                    <form onSubmit={handleSubmit} >
                        <input
                        autoComplete="on"
                        name= "description"
                        onChange={handleInputChange}
                        placeholder=" Introduce una nueva tarea..."
                        value={description}
                        type="text" />
                        <button>Add</button>
                    </form>
                </div>

                <footer>
                    <div className="redes__contact">
                        <div className="social__fb" ><a href="https://www.facebook.com/edgarjoaquin.floresgonzalez"><FacebookIcon/></a></div>
                        <div className="social__ig" ><a href="https://www.instagram.com/flow_joa/"><InstagramIcon/></a></div>
                        <div className="social__gh" ><a href="https://github.com/edgjoa-dev"><GitHubIcon/></a></div>
                    </div>
                    <div className="footer__info" >  Desarrollado por Edgar Joaquin Flores Copyright © 2021</div>
                </footer>
                
                </div>
                )
}
