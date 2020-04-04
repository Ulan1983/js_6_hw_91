import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Link} from "react-router-dom";
import {apiURL} from "../../../constants";
import {useSelector} from "react-redux";

const UserMenu = ({user, logout}) => {
    const userPic = useSelector(state => state.users.user.image);
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                <img
                    src={apiURL + '/uploads/' + userPic}
                    alt=""
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "10px"
                    }}
                />
                <b>{user.displayName}</b>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    <Link
                        to={'/profile'}
                        style={{textDecoration: 'none', color: "#000"}}
                    >
                        Профиль
                    </Link>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={logout}>
                    Выход
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserMenu;