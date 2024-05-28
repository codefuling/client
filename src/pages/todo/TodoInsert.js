import React, { useEffect, useState } from 'react';
import S from './style';
import useInput from '../../hooks/useInput';

const TodoInsert = ({todos, isTodoUpdate, setIsTodoUpdate}) => {
    const [value, onChange, setValue] = useInput("")

    // 추가 POST
    const onPressAddTodo = (e) => {
        setValue(e.target.value)
        console.log(value)
        if(e.key === 'Enter'){ 
            if(!window.confirm('이대로 추가 하시겠습니까?')) return;
            fetch('http://localhost:8000/todo/insertTodo/', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    title : value,
                    isChecked : false
                })

            }).then( (response) => {
                console.log('리스폰스',response)
                if(!response.ok) return console.log(`Error ${response}`)
                setValue("")
                setIsTodoUpdate(!isTodoUpdate)
            }
            )
        }
    }

    return (
        <S.Input type="text" placeholder='할 일을 추가해 볼까요?' value={value} onChange={onChange} onKeyPress={onPressAddTodo}/>
    );
};

export default TodoInsert;