import React from 'react'
import Particles from 'particlesjs'

import './styles.scss'

export default class Background extends React.Component {
    componentDidMount () {
        setTimeout(() =>
            Particles.init({
                selector: '.background',
                color: ['#DA0463', '#404B69', '#DBEDF3'],
                connectParticles: false
            }),
            500
        )
    }

    render () {
        return <canvas className='background'/>
    }
}
