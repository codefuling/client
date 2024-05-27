import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoInsert from './TodoInsert';
import S from './style';

// const getTodos = async () => {
//     // 데이터 가져오기
//     const response = await fetch('http://localhost:4000/todo');
//     const datas = await response.json();
//     return datas;
// };

const TodoContainer = () => {

    const [ todos , setTodos ] = useState([]);
    const [ error, setError ] = useState(false); 

    const getTodos = async () => {
      try {
        // 데이터 가져오기
        const response = await fetch('http://localhost:4000/todo');
        const datas = await response.json();
        setTodos(datas);
      } catch (err) {
        setError(err);
      }
    };

    useEffect(() => {
        getTodos();
    }, []); 

    return (
        <div>
            <TodoInsert getTodos={getTodos} todos={todos}/>
            {<S.SubTitle>남은 할일: 🙂 <span>{todos.length}</span></S.SubTitle>}
            {todos.map( (todo, i) => (
                  <Todo key={i} todo={todo} getTodos={getTodos} /> 
            ))}
        </div>
    );
};

export default TodoContainer;