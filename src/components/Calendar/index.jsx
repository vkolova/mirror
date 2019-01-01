import React from 'react'
import Particles from 'particlesjs'

import './styles.scss'

class Header extends React.Component {
    render () {
        return <div className='r-row r-head'>
            { `${this.props.monthNames[this.props.month]} ${this.props.year}` }
        </div>
    }
}

class Calendar extends React.Component {
    constructor () {
        super()
        this.state = this.getInitialState()
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.onSelect && prevState.selectedDt != this.state.selectedDt) {
            this.props.onSelect.call(this.getDOMNode(), this.state);
        }
    }

    componentDidMount () {
        this.timer = setInterval(() => {
            this.setState(this.getInitialState())
        }), 1000 * 60)
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    calc = (year, month) => {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth != month || this.state.selectedYear != year) {
                this.state.selectedElement.classList.remove('r-selected');
            } else {
                this.state.selectedElement.classList.add('r-selected');
            }
        }
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month + 1, 0).getDate()
        }
    }

    getInitialState = () => {
        var date = new Date()

        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            selectedYear: date.getFullYear(),
            selectedMonth: date.getMonth(),
            selectedDate: date.getDate(),
            selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            startDay: 1,
            weekNumbers: false,
            minDate: new Date(date.getFullYear(), date.getMonth(), 1),
            disablePast: false,
            dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthNamesFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstOfMonth: date,
            daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        }
    }

    render () {
        return <div className='module calendar-module'>
            <Header
                monthNames={this.state.monthNamesFull}
                month={this.state.month}
                year={this.state.year}
            />
            <WeekDays
                dayNames={this.state.dayNames}
                startDay={this.state.startDay}
                weekNumbers={this.state.weekNumbers}
            />
            <MonthDates
                month={this.state.month}
                year={this.state.year}
                daysInMonth={this.state.daysInMonth}
                firstOfMonth={this.state.firstOfMonth}
                startDay={this.state.startDay}
                onSelect={this.selectDate}
                weekNumbers={this.state.weekNumbers}
                disablePast={this.state.disablePast}
                minDate={this.state.minDate}
            />
        </div>
    }
}

class WeekDays extends React.Component {
    render () {
        var haystack = Array.apply(null, { length: 7 }).map(Number.call, Number);

        return <div className='r-row r-weekdays'>
            {
                this.props.weekNumbers &&
                    <div className='r-cell r-weeknum'>{ 'wn' }</div>
            }
            {
                haystack.map((item, i) =>
                    <div className='r-cell' key={i}>{ this.props.dayNames[(this.props.startDay + i) % 7] }</div>
                )
            }
        </div>
    }
}

class MonthDates extends React.Component {
    statics = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    }

    render () {
        var haystack,
            day,
            d,
            current,
            onClick,
            isDate,
            className,
            weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            janOne = new Date(that.props.year, 0, 1),
            rows = 5;

        if (startDay == 5 && this.props.daysInMonth == 31 || startDay == 6 && this.props.daysInMonth > 29) {
            rows = 6;
        }

        className = rows === 6 ? 'r-dates' : 'r-dates r-fix';
        haystack = Array.apply(null, { length: rows }).map(Number.call, Number);
        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;

        const now = new Date()

        return <div>
            {
                haystack.map(function (item, i) {
                    d = day + i * 7;
                    return <div className='r-row'>
                        {
                            weekStack.map(function (item, i) {
                                d += 1;
                                isDate = d > 0 && d <= that.props.daysInMonth;

                                if (isDate) {
                                    current = new Date(that.props.year, that.props.month, d);
                                    className = now.getDate() != d ? 'r-cell r-date' : 'r-cell r-date r-today';
                                    if (that.props.disablePast && current < that.constructor.today) {
                                        className += ' r-past';
                                    } else if (that.props.minDate !== null && current < that.props.minDate) {
                                        className += ' r-past';
                                    }

                                    return <div className={className}>{d}</div>
                                }

                                return <div className='r-cell'></div>
                            })
                        }
                    </div>
                })
            }
        </div>
    }
}

export default Calendar
