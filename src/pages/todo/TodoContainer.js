import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoInsert from './TodoInsert';
import S from './style';

const TodoContainer = () => {

    const [ todos , setTodos ] = useState([]);
    const [ error, setError ] = useState(false); 
    const [ isTodoUpdate, setIsTodoUpdate ] = useState(false)
    const accessToken = localStorage.getItem('accessToken')
    
    const getTodos = async () => {
      try {
        // 데이터 가져오기
        const response = await fetch('http://localhost:8000/todo/selectTodo/');
        const datas = await response.json();
        setTodos(datas);
      } catch (err) {
        setError(err);
      }
    };

    useEffect(() => {
        getTodos();
    }, [isTodoUpdate]); 

    return (
        <div>
            <TodoInsert todos={todos} isTodoUpdate={isTodoUpdate} setIsTodoUpdate={setIsTodoUpdate} />
            {<S.SubTitle>남은 할일: 🙂 <span>{todos && todos.length}</span></S.SubTitle>}
            {todos && todos.map((todo, i) => (
                  <Todo key={i} todo={todo} isTodoUpdate={isTodoUpdate} setIsTodoUpdate={setIsTodoUpdate} /> 
            ))}
        </div>
    );
};

export default TodoContainer;