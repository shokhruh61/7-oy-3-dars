import React, { Children, useContext } from 'react'
import { Link } from 'react-router-dom'

function MainLayout(children) {
    return (
        <div>
            <Link to='/digitalClock'>DigitalClock</Link>

            {children}
        </div>
    )
}

export default MainLayout