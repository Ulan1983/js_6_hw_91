import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import {logoutUser} from "../../../store/actions/usersActions";
import logo from '../../../logo.png';

const Toolbar = () => {

    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/"><img src={logo} alt="" className="col-7"/></NavbarBrand>

            <Nav className="ml-auto" navbar>
                {user ? (
                    <UserMenu user={user} logout={() => dispatch(logoutUser())}/>
                ) : null}
            </Nav>
        </Navbar>
    );
};

export default Toolbar;