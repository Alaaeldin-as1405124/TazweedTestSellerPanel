import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Tazweed Admin panel</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to={'/appointments'} className="nav-link"> Appointments </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/addTimeSlot'} className="nav-link">Add Time slot</Link>
                    </li>

                    <li className="nav-item">
                        <Link to={'/Logout'} className="nav-link">Logout</Link>
                    </li>

                </ul>
            </nav>
        </div>

    )
}
