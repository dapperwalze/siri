import React, { Component } from "react";
import TaskInputField from "./TaskInputField";
import Rodal from "rodal";
import { CreateTaskButton } from "./CreateTaskButton";

class NewTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.defaultTitle || "",
      deadline: this.props.defaultDeadline || "",
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(taskTitle) {
    this.setState({
      title: taskTitle,
    });
  }

  handleDeadlineChange(deadline) {
    this.setState({
      deadline: deadline,
    });
  }

  handleSubmit(e) {
    const { title, deadline } = this.state;

    e.preventDefault();
    this.props.onSubmit({ title, deadline });
    this.props.hideModal();
    this.setState({ title: "", deadline: "" });
  }
  render() {
    return (
      <Rodal
        className={"rodal"}
        visible={this.props.modalIsVisible}
        onClose={this.props.hideModal}
      >
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <TaskInputField
              name={"Title"}
              labelName={"Title"}
              id={"addTaskInputField"}
              type={"text"}
              className={"taskInputField"}
              handleChange={this.handleTitleChange}
              inputValue={this.state.title}
            />
          </div>
          <div className="row">
            <TaskInputField
              name={"Deadline"}
              labelName={"Title"}
              id={"task-deadline"}
              type={"time"}
              className={"task-deadline"}
              handleChange={this.handleDeadlineChange}
              inputValue={this.state.deadline}
            />
          </div>

          <div className="row">
            <CreateTaskButton
              disabled={
                this.state.title.trim() === "" || this.state.deadline === ""
                  ? true
                  : false
              }
              type={"submit"}
              value={"Create Task"}
              className={"create-task-button"}
            />
          </div>
        </form>
      </Rodal>
    );
  }
}
export default NewTaskModal;
