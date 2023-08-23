import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addtask.css';
import { ShowTask } from './ShowTask';

export const AddTask = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState('');

    const postTaskFunction = async () => {
        try {
            const response = await fetch('http://localhost:8080/createtask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskname: task }),
            });
            const data = await response.json();
            console.log(data);
            setTask('');
        } catch (error) {
            console.error('Error posting task:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postTaskFunction();
    };

    return (
        <>
            <div className='formContainer'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='taskname'
                        placeholder='add your task here'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button type='submit'>Add</button>
                </form>
            </div>
            <ShowTask updateTasks={postTaskFunction} /> {/* Pass the callback */}
        </>
    );
};
