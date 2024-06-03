import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, Paper, MenuItem, Select, Modal, TextField, Grid } from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskStatus, setEditTaskStatus] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find(task => task._id === taskId);
    if (taskToEdit) {
      setEditTaskId(taskId);
      setEditTaskTitle(taskToEdit.title);
      setEditTaskDescription(taskToEdit.description);
      setEditTaskStatus(taskToEdit.status); // Set default status
      setEditModalOpen(true);
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditTaskId(null);
    setEditTaskTitle('');
    setEditTaskDescription('');
    setEditTaskStatus('');
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${editTaskId}`, {
        title: editTaskTitle,
        description: editTaskDescription,
        status: editTaskStatus // Include status in the submit
      });
      // After successful edit, update the tasks list by refetching the tasks
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
      handleEditModalClose();
      toast.success('Task edited successfully!');
    } catch (error) {
      console.error('Error editing task:', error);
      toast.error('Failed to edit task. Please try again.');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, { status: newStatus });
      // After successful status update, update the tasks list by refetching the tasks
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
      toast.success('Task status updated successfully!');
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status. Please try again.');
    }
  };

  const handleDelete = async (taskId) => { // Define handleDelete function
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      // After successful deletion, update the tasks list by refetching the tasks
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Custom Fields</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      style={{ minWidth: 120 }}
                    >
                      <MenuItem value="To-Do">To-Do</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {task.customFields.map((field) => (
                      <div key={field._id}>
                        <strong>{field.name}:</strong> {field.value}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(task._id)} variant="contained" color="primary" style={{ marginRight: 8 }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(task._id)} variant="contained" color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-task-modal-title"
        aria-describedby="edit-task-modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20, minWidth: 400 }}>
          <h2 id="edit-task-modal-title">Edit Task</h2>
          <TextField
            label="Title"
            fullWidth
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Description"
            multiline
            fullWidth
            value={editTaskDescription}
            onChange={(e) => setEditTaskDescription(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Select
            label="Status"
            fullWidth
            value={editTaskStatus}
            onChange={(e) => setEditTaskStatus(e.target.value)}
            style={{ marginBottom: 16 }}
          >
            <MenuItem value="To-Do">To-Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            {/* Add more status options as needed */}
          </Select>
          <Button onClick={handleEditSubmit} variant="contained" color="primary" style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button onClick={handleEditModalClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </Modal>
      </Grid>
  );
};

export default TaskTable;
