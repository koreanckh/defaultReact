import React, { Component } from 'react';
import ApiService from '../../ApiService';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class UserListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: null
        }

    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList = () => {
        console.log('reloadUserList :: ', this);
        ApiService.fetchUsers().then(rst => {
            console.log('rst :: ', rst.data);
            this.setState({
                users: rst.data
            })
            console.log('this.state.users :: ', this.state);
        }).catch(err => {
            console.log('reloadUserList() Error :: ', err);
        });
    }

    deleteUser = (userID) => {
        ApiService.deleteUser(userID).then(
            res => {
                this.setState({
                    message: 'User Deleted Successfully !'
                });
                this.setState({
                    users: this.state.users.filter(
                        user => user.id !== userID
                    )
                })

            }
        ).catch(
            err => console.log('Delete User Error :: ', err)
        );
    }

    editUser = (userID) => {
        console.log('editUser :: ', userID);
        window.localStorage.setItem('userID', userID);
        this.props.history.push('/edit-user');
    }

    adduser = () => {
        window.localStorage.removeItem("userID");
        this.props.history.push('/add-user');
    }

    render() {

        return (
            <div>
                <Typography variant='h4' style={style}>User List</Typography>
                <Button variant='contained' color='primary' onClick={this.adduser}>Add User</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>ID</TableCell>
                            <TableCell align='center'>FirstName</TableCell>
                            <TableCell align='center'>LastName</TableCell>
                            {/* <TableCell align='right'>UserName</TableCell> */}
                            <TableCell align='center'>Age</TableCell>
                            <TableCell align='center'>Salary</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(user => {
                            console.log('ddd', user);

                            return (<TableRow key={user.id}>
                                <TableCell align='center'>{user.id}</TableCell>
                                <TableCell align='center'>{user.firstName}</TableCell>
                                <TableCell align='center'>{user.lastName}</TableCell>
                                <TableCell align='center'>{user.age}</TableCell>
                                <TableCell align='center'>{user.salary}</TableCell>
                                <TableCell align='center' onClick={() => this.editUser(user.id)}>
                                    <CreateIcon />
                                </TableCell>
                                <TableCell align='center' onClick={() => this.deleteUser(user.id)}>
                                    <DeleteIcon />
                                </TableCell>
                            </TableRow>)
                        }
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default UserListComponent;