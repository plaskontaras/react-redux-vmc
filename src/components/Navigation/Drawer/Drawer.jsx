import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }


        const links = [
            { to: '/', label: 'Список', exact: true }
        ];

        console.log(this.props);
        

        if (this.props.isAuthenticated) {
            links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false })
            // links.push({ to: '/quiz-creator', label: 'Создать тест', exact: true })
            links.push({ to: '/logout', label: 'Log out', exact: false })
        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: true });
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </>
        )
    }
}

export default Drawer;