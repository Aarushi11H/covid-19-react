import React from 'react'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="stats">
            <a className="navbar-brand">HealthUp<img src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-inactive.png?v=1590593304405" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default NavBar;