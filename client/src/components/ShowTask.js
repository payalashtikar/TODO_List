import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './showtask.css';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const ShowTask = ({ updateTasks }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/readtask');
            setTasks(response?.data?.readtasks || []);
        } catch (error) {
            console.error(error);
        }
    };

    //MULTIPLE DELETION
    const deleteSelectedTasks = async (id) => {
        try {
            for (const id of selectedTasks) {
                await axios.delete(`http://localhost:8080/deteletask/${id}`);
            }
            setTasks(tasks.filter(task => !selectedTasks.includes(task._id)))
            setSelectedTasks([]);
        }
        catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    const handleCheckboxChange = (taskId) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    // SINGLE DELETION
    const deleteTaskFunction = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/deteletask/${id}`);
            // After deletion, update the tasks list without refreshing
            setTasks(tasks.filter(task => task._id !== id));
        }
        catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [updateTasks]); // Trigger fetch data when updateTasks callback is called

    return (
        <>
            <button onClick={deleteSelectedTasks} >Delete Selected<DeleteOutlined style={{ padding: '0 5px' }} /></button>
            {/* <DeleteOutlined onClick={deleteSelectedTasks } style={{width:'100px',float:'right'}}/> */}
            {tasks.map((task, index) => (
                <div className='showTaskcContainer' key={index}>
                    <input
                        type="checkbox"
                        className='check'
                        id={`check-${index}`}
                        checked={selectedTasks.includes(task._id)}
                        onChange={() => handleCheckboxChange(task._id)}
                    />
                    <div className="showdata">{task.taskname}</div>
                    <div className='icons'>
                        <Link to={'/edittask/' + task._id}>
                            <EditOutlined style={{ padding: '0 10px' }} />
                        </Link>
                        <DeleteOutlined onClick={() => deleteTaskFunction(task._id)} />
                    </div>
                </div>
            ))}
        </>
    );
};

