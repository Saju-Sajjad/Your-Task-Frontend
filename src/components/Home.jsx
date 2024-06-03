
import { useState } from 'react';
import taskImage1 from '../images/task.jpg';
import taskImage2 from '../images/to.jpg';
import taskImage3 from '../images/do.jpg';
import './Css/TaskCarousel.css';

const TaskCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tasks = [
    {
      image: taskImage1,
      title: 'Complete Project Report',
      description: 'Compile all findings and draft the final report for the project, ensuring all sections are thoroughly reviewed.',
      dueDate: '2024-06-01',
    },
    {
      image: taskImage2,
      title: 'Team Meeting',
      description: 'Conduct a team meeting to discuss the progress of ongoing tasks and address any blockers.',
      dueDate: '2024-06-15',
    },
    {
      image: taskImage3,
      title: 'Client Presentation',
      description: 'Prepare and deliver a presentation to the client, highlighting the key milestones and upcoming phases.',
      dueDate: '2024-07-01',
    },
  ];


  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? tasks.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === tasks.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {tasks.map((task, index) => (
            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`} data-bs-interval="10000">
              <img src={task.image} className="d-block carousel-image" alt={`Task ${index + 1}`} />
              <div className="carousel-caption">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <small>Due Date: {task.dueDate}</small>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" onClick={handlePrev}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" onClick={handleNext}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <footer className="footer">
  <div className="footer-content">
      <p>&copy; All rights reserved 2024.</p>
    </div>
</footer>

    </div>
  );
};

export default TaskCarousel;
