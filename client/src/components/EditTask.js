import React, { useState } from 'react';
import './addtask.css';
import { useNavigate, useParams } from 'react-router-dom';

export const EditTask = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [editedTask, setEditedTask] = useState('');

    const gotoHomePage = () => {
        navigate('/');
    };

    const editTaskFunction = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await fetch(`http://localhost:8080/edittask/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskname: editedTask,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                navigate('/');
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    return (
        <div className='formContainer'>
            <form onSubmit={editTaskFunction}>
                <input
                    type='text'
                    name='taskname'
                    placeholder='edit your task here'
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                />
                <button type='submit'>Edit</button>
                <button type='button' id='cancelbtn' onClick={gotoHomePage}>Cancel</button>

            </form>
            {/* <button type='button' id='cancelbtn' onClick={gotoHomePage}>Cancel</button> */}
        </div>
    );
};
