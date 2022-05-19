import React from 'react';
import {createRoot} from 'react-dom/client';
import Form from './components/Form';
import CardList from './components/CardList';
import './style.css';

/**
 * @class Main class of the app
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.apiKey = 'fd6e13ce9fb4b8e6e5e39e02cfea7f5d';
    this.state = { 
      displayAlert: 'none', 
      city: '', 
      country: '', 
      temp: '', 
      feelsLike: '',
      desc: '', 
      icon: '',
      items: []
    }


    //Bind functions with the keyword 'this' 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initWeatherStates = this.initWeatherStates.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }


  /** А rendering function that render the component*/
  render() {
    return(
      <div className='w3-container w3-center main'>
        <h1>Weather App</h1>
        <Form submit={this.handleSubmit}/>
        <div className="w3-panel w3-red w3-display-container" style={{display: this.state.displayAlert}}>
          <span className='w3-button w3-display-topright' onClick={this.closeAlert}>&times;</span>
          <h3>Грешни входни данни</h3>
          <p>Не е намерена информация за посоченото населено място!</p>
        </div>

        <div className='w3-row'>
          <CardList items={this.state.items}/>
        </div>
      </div>
    );
  }


  /** This function handles event from Form component and his submit event
   * @param {string} city - Тhe city you are looking for
   * @param {object} e - Event object
   */
  handleSubmit(city, e) {
    e.preventDefault();

    if (!city.length) {
        return;
    }

    if (this.state.displayAlert === 'block') {
      this.closeAlert();
    }

    this.initWeatherStates(city);
  }


  /** Asynchronous function that initializes states of the component
   *  and retrieves data from OpenWeather API */
  async initWeatherStates(city) {
    console.log('From initLocationState --> ' + city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=bg&appid=${this.apiKey}`;

    try {
      let response = await fetch(url);
      const httpStatusCode = response.status;

      //Check the returned http response
      switch(httpStatusCode) {
        case 200: 
          let data = await response.json();

          const {main, name, sys, weather} = data;  

          //Creating an item that corresponds to the meteorological state
          const newItem = {
            id: Date.now(),
            city: name,
            country: sys.country.toUpperCase(),
            temp: Math.round(main.temp),
            feelsLike: Math.round(main.feels_like),
            desc: weather[0].description.toUpperCase(),
            icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`
          }

          this.setState(state => ({items: state.items.concat(newItem)}));
          break;
        case 404: 
          this.setState({displayAlert: 'block'});
          break;
      }
    } catch(error) {
      console.log(error);
    }
  }


  /**Function that closes the error message */
  closeAlert() {
    this.setState({
      displayAlert: 'none'
    });
  }

}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);