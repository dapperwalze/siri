import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import FloatButton from "./components/FloatButton";
import TaskItem from "./components/TaskItem";
import moment from "moment";
import "rodal/lib/rodal.css";
import "./normalize.css";
import "./App.css";
import NewTaskModal from "./components/NewTaskModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: uuidv4(),
          title: "",
          deadline: "",
          isTaskComplete: false,
          isFavorite: false,
        },
      ],
      modalIsVisible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.handleTaskStatus = this.handleTaskStatus.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
  }

  showModal() {
    this.setState({
      modalIsVisible: true,
      value: "",
    });
  }

  hideModal() {
    this.setState({
      modalIsVisible: false,
      input: "",
    });
  }

  createNewTask({ title, deadline }) {
    this.setState({
      tasks: this.state.tasks.concat([
        {
          id: uuidv4(),
          title,
          deadline,
          isTaskComplete: false,
          isFavorite: false,
        },
      ]),
    });

    this.hideModal();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.hideModal();
    this.props.onUpdate(this.props.task, this.state.input);
  }

  handleTaskStatus(taskId) {
    this.setState({
      tasks: this.state.tasks.map((taskItem) =>
        taskItem.id === taskId
          ? { ...taskItem, isTaskComplete: !taskItem.isTaskComplete }
          : taskItem
      ),
    });
  }

  handleFavorite(taskId) {
    this.setState({
      tasks: this.state.tasks.map((taskItem) =>
        taskItem.id === taskId
          ? { ...taskItem, isFavorite: !taskItem.isFavorite }
          : taskItem
      ),
    });
  }
  handleDeleteTask(taskId) {
    const deleteTask = this.state.tasks.filter(
      (taskItem) => taskItem.id !== taskId
    );
    this.setState({
      tasks: deleteTask,
    });
  }

  handleTaskUpdate(taskId, update) {
    this.setState({
      tasks: this.state.tasks.map((taskItem) =>
        taskItem.id === taskId ? { ...taskItem, ...update } : taskItem
      ),
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="task-display-card">
          <div className="task-display-card-header">
            <h2>
              {moment().format("dddd")} {moment().format("LL")}
            </h2>
          </div>
          {this.state.tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                id={task.id}
                time={task.deadline}
                title={task.title}
                isComplete={task.isTaskComplete}
                isFavorite={task.isFavorite}
                onCompleteToggle={this.handleTaskStatus}
                onFavoriteToggle={this.handleFavorite}
                onDelete={this.handleDeleteTask}
                onUpdate={this.handleTaskUpdate}
              />
            );
          })}
          <NewTaskModal
            hideModal={this.hideModal}
            modalIsVisible={this.state.modalIsVisible}
            onSubmit={this.createNewTask}
          />

          <FloatButton createNewTask={this.showModal}>+</FloatButton>
        </div>
      </div>
    );
  }
}

export default App;
