import React from 'react'
import axios from 'axios'

import './styles.scss'

const jsUcfirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const isItDay = (sunrise, sunset) => {
    const now = new Date().getTime() / 1000

    return now > sunrise && now < sunset
        ? 'd'
        : 'n'
}

export default class Weather extends React.Component {
    state = {
        data: null
    }
    componentDidMount () {
        this.update();
        this.timer = setInterval(this.update, 1000 * 60 * 5)
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    update = () => {
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                id: '727011',
                appid: '90ed698b1f3e47cf572fc4e4cbe2462c',
                lang: 'en',
                units: 'metric'
            }
        })
        .then(response => {
            this.setState({ data: response.data })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render () {
        const { data } = this.state
        if (!data) return null

        const icon = data.cod
        const weather = data.weather[0]
        const { description } = weather
        const { sunrise, sunset } = data.sys
        const d = isItDay(sunrise, sunset)
        const temp = data.main.temp

        return <div className='module weather-module'>
            <h1 className='main-info'>
                <span className='temperature'>{ `${2}°C` }</span>
                <i className={`owf owf-${icon}-${d}`}></i>
            </h1>
            <h2 className='description'>{ jsUcfirst(description) }</h2>
        </div>
    }
}
