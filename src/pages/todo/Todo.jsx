import React, { useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faX} from '@fortawesome/free-solid-svg-icons';
import useInput from '../../hooks/useInput';


const Todo = ({todo, isTodoUpdate, setIsTodoUpdate}) => {
    // 비구조화 할당
    const {id, title} = todo;

    // 타이틀 수정
    const [isEdit, setisEdit] = useState(false);
    const [value, onChange, setValue] = useInput(title);

    const handleIsEdit = () => {
        setisEdit(!isEdit)
    }

    // CRUD
    // 수정 
    // 체크 상태관리
    const [ isChecked, setIsChecked ] = useState(todo.isChecked)
    const handleChecked = () => {
        // setIsChecked(!isChecked)
        fetch(`http://localhost:4000/todo/${id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                ...todo,
                isChecked : !isChecked
            })
        }).then( (response) => {
            console.log('리스폰스',response)
            if(!response.ok) return console.log(`Error ${response}`)
            setIsChecked(!isChecked)
        }
        )
    }

    // 삭제
    // 투두리스트 삭제
    const handleRemoveTodo = () => {
        if(window.confirm('삭제 하시겠습니까?')){
            fetch(`http://localhost:4000/todo/${id}`,{
                method : 'DELETE',
            }).then((response) => {
                console.log('리스폰스 받기', response)
                if(!response.ok) return console.log(`Error ${response}`)
                    setIsTodoUpdate(!isTodoUpdate)
            })
        }
    }

    // 수정
    // 타이틀 수정
    const onChangeInsertTodo = () => {
        // setIsChecked(!isChecked)
        fetch(`http://localhost:4000/todo/${id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                ...todo,
                title : value
            })
        }).then( (response) => {
            console.log('리스폰스',response)
            if(!response.ok) return console.log(`Error ${response}`)
            setisEdit(false)
            setIsTodoUpdate(!isTodoUpdate)
        }
        )
    }

    return (
        <S.Li>
            <S.Wrapper>
                <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
                { isEdit ? ( 
                    <input className="update-input" type="text" value={value} onChange={onChange}/>
                ) : (
                    <S.Title className={ isChecked ? "complete" : ""}>
                        {title}
                    </S.Title>
                )}
            </S.Wrapper>
            <S.Wrapper>
                
                    { isEdit ? (
                            <>
                                <S.Button><FontAwesomeIcon icon={faCheck} onClick={onChangeInsertTodo} className='check'/></S.Button>
                                <S.Button><FontAwesomeIcon icon={faX} onClick={handleIsEdit} className='exit'/></S.Button>
                            </>
                        ) : (
                            <S.Button><FontAwesomeIcon onClick={handleIsEdit} icon={faPen} className='pen'/></S.Button>
                        )
                    }
                
                <S.Button onClick={handleRemoveTodo}><FontAwesomeIcon icon={faTrash} className='trash' /></S.Button>
            </S.Wrapper>
        </S.Li>
    );
};

export default Todo;