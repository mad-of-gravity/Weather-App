import React, { Component } from "react";
import '../style.css';

/**Represents the Card component */
class Card extends React.Component {

    render() {
        const currentDate = new Date().toLocaleDateString();
        const daysOfWeek = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
        const dayOfWeek = daysOfWeek[new Date().getDay()];

        return (
            <div className="w3-card-4 w3-third card-container w3-mobile" style={{display: this.props.display}}> 
                <header className="w3-container w3-left-align w3-deep-purple">
                    <h2>{this.props.city}</h2>
                </header>

                <div className="w3-container">
                    <div className="day-of-week">{dayOfWeek}</div>
                    <div className="date">{currentDate}</div>
                    <img className='weather-icon' src={this.props.icon} alt="Weather icon"/>
                    <div className="temp-container">{this.props.temp}&deg;C</div>
                    <div className="desc-container">{this.props.desc}</div>
                </div>
            </div>
        );
    }
}

export default Card;