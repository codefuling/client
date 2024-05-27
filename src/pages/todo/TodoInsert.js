import React, { useEffect, useState } from 'react';
import S from './style';
import useInput from '../../hooks/useInput';

const TodoInsert = ({getTodos, todos}) => {
    const [value, onChange, setValue] = useInput("")

    // 추가 POST
    const onPressAddTodo = (e) => {
        setValue(e.target.value)
        console.log(value)
        if(e.key === 'Enter'){ 
            if(!window.confirm('이대로 추가 하시겠습니까?')) return;
            fetch('http://localhost:4000/todo/', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    id : (todos.length + 1).toString(),
                    title : value,
                    isChecked : false
                })

            }).then( (response) => {
                console.log('리스폰스',response)
                if(!response.ok) return console.log(`Error ${response}`)
                getTodos();
                setValue("")
            }
            )
        }
    }

    return (
        <S.Input type="text" placeholder='할 일을 추가해 볼까요?' value={value} onChange={onChange} onKeyPress={onPressAddTodo}/>
    );
};

export default TodoInsert;