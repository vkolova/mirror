import React from 'react'

import './styles.scss'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

Date.prototype.getDOY = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((this - onejan) / 86400000);
}

export default class Clock extends React.Component {
    state = { time: new Date() }

    componentDidMount () {
        this.timer = setInterval(this.tick, 500)
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    tick = () => this.setState({ time: new Date() })

    render () {
        const t = this.state.time
        const h = t.getHours()
		const m = t.getMinutes()
        const day = days[t.getDay()]
        const month = months[t.getMonth()]
        const date = t.getDate()

        return (
            <div className='module clock-module'>
                <span className='clock'>
                    <span className='time'>
                        { `${h % 12 < 10 ? '0' + h % 12 : h % 12}:${m < 10 ? '0' + m : m}` }
                    </span>
                    <span className='part-of-day'>{ h < 12 ? 'AM' : 'PM' }</span>
                </span>
                <div className='date'>{ `${day}, ${month} ${date}` }</div>
                {/*
                { `${t.getDOY()} / 365` }
                */}
            </div>
        );
    }
}
