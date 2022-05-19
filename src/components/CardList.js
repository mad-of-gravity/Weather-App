import React from 'react';
import Card from './Card';

class CardList extends React.Component {
    render() {
        return(
            <ul>
                {
                    this.props.items.map(item => (
                        <li key={item.id}> 
                            <Card 
                                city={item.city}
                                country={item.country} 
                                temp={item.temp} 
                                feelsLike={item.feelsLike} 
                                desc={item.desc}
                                icon={item.icon}  
                            />
                        </li>
                    ))}
            </ul>
        );
    }
}

export default CardList;