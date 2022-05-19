import { Component } from "react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form className="form-container w3-container w3-mobile w3-left-align w3-round w3-deep-purple" onSubmit={(e) => this.props.submit(this.state.text, e)}>
                <label htmlFor="city-input">Моля въведете името на града: </label> <br/>
                <input id="city-input" type="text" className="w3-mobile" onChange={this.handleChange} placeholder="Search for a city"/>
                <input type="submit" className="w3-btn w3-green w3-mobile w3-round w3-border" value="Search"/>
            </form>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
        console.log(this.state.text);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }

        this.props.onSubmit(this.state.text);
    }
}

export default Form;