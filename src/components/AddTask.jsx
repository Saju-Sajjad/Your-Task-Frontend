import{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending', // Default status
    customFields: [] // Array to store custom fields
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleCustomFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCustomFields = [...taskData.customFields];
    updatedCustomFields[index] = { ...updatedCustomFields[index], [name]: value };
    setTaskData({ ...taskData, customFields: updatedCustomFields });
  };

  const addCustomField = () => {
    setTaskData({
      ...taskData,
      customFields: [...taskData.customFields, { name: '', value: '' }]
    });
  };

  const removeCustomField = (index) => {
    const updatedCustomFields = [...taskData.customFields];
    updatedCustomFields.splice(index, 1);
    setTaskData({ ...taskData, customFields: updatedCustomFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!taskData.title.trim() || !taskData.description.trim() || !taskData.dueDate.trim()) {
        toast.error('Please provide all task details.');
        return;
      }

      await axios.post('https://your-task-backend.vercel.app//api/tasks', taskData);
      toast.success('Task added successfully!');
      // Redirect to the task list page after successful addition
      navigate('/task');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Due Date"
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {taskData.customFields.map((field, index) => (
              <Grid container item xs={12} spacing={2} key={index}>
                <Grid item xs={6}>
                  <TextField
                    label="Field Name"
                    name="name"
                    value={field.name}
                    onChange={(e) => handleCustomFieldChange(index, e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Field Value"
                    name="value"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(index, e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary" onClick={() => removeCustomField(index)}>Remove Field</Button>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={addCustomField}>Add Custom Field</Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddTask;
