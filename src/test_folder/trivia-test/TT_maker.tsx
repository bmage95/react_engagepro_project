import React from "react";
import './TT_maker.scss'

class TriviaBuilder extends React.Component<{}, { questions: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      questions: [{ title: "", options: ["", ""] }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addClick() {
    this.setState((prevState) => ({
      questions: [...prevState.questions, { title: "", options: [] }]
    }));
  }

  removeClick(i: number) {
    let questions = [...this.state.questions];
    questions.splice(i, 1);
    this.setState({ questions });
  }
  removeOption(qi: number, i: number) {
    let questions = [...this.state.questions];
    let options = [...questions[qi].options];
    options.splice(i, 1);
    questions[qi] = { ...questions[qi], options };
    console.log(options);
    this.setState({ questions });
  }

  handleSubmit(event: any) {
    alert("A name was submitted: " + JSON.stringify(this.state.questions));
    event.preventDefault();
  }

  handleChange(i: number, e: any) {
    const { name, value } = e.target;
    let questions = [...this.state.questions];
    questions[i] = { ...questions[i], [name]: value };
    this.setState({ questions });
  }

  handleOptions(qi: number, i: number, e: any) {
    const { name, value } = e.target;
    let questions: any = [...this.state.questions];
    let options = [...questions[qi].options];
    options[i] = { ...options[i], [name]: value };
    questions[qi] = { ...questions[qi], options };
    this.setState({ questions });
  }

  addOption(i: number) {
    let questions = [...this.state.questions];
    questions[i] = {
      ...questions[i],
      options: [...this.state.questions[i].options, { title: "" }]
    };
    this.setState({ questions });
  }

  createQuestions() {
    console.log(this.state);
    return this.state.questions.map((el: any, i: number) => (
      <div className="d-flex flex-row bd-highlight mb-3" key={i}>
        <input
          placeholder="Title"
          name="title"
          value={el.title || ""}
          onChange={(e) => this.handleChange(i, e)}
        />
        <div className="pl-4">{this.createOptions(i)}</div>
        <input
          type="button"
          value="add options"
          onClick={() => this.addOption(i)}
        />
        <input
          type="button"
          value="remove"
          onClick={() => this.removeClick(i)}
        />
      </div>
    ));
  }

  createOptions(qi: number) {
    return this.state.questions[qi].options.map((el: any, i: number) => (
      <div key={i}>
        <input
          placeholder="Title"
          name="title"
          value={el.title || ""}
          onChange={(e) => this.handleOptions(qi, i, e)}
        />
        <input
          type="button"
          value="remove"
          onClick={() => this.removeOption(qi, i)}
        />
      </div>
    ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="TTmaker">
        {this.createQuestions()}
        <input
          type="button"
          value="add more"
          onClick={this.addClick.bind(this)}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TriviaBuilder;
