import React, { Component } from 'react';
import ApiService from '../../ApiService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
    };

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        ApiService.fetchUserByID(window.localStorage.getItem('userID'))
            .then(res => {
                let user = res.data;

                this.setState({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    salary: user.salary
                })
            })
            .catch(err => {
                console.log('loadUser() Error :: ', err);
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSave = (e) => {
        e.preventDefault();

        let user = {
            id: this.state.id,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary
        };

        ApiService.editUser(user)
            .then(res => {
                this.setState({
                    message: user.lastName + "님의 정보가 수정되었습니다."
                })
                this.props.history.push('/users');
            })
            .catch(err => {
                console.log('onSave() Error :: ', err);
            })
    }

    render() {

        return (
            <div>
                <Typography variant='h4' style={style}>Edit User</Typography>
                <form>
                    <TextField type='text' placeholder='please input your username' name='username'
                        fullWidth margin='normal' value={this.state.username} onChange={this.onChanege} />
                    <TextField placeholder='please input your firstName' name='firstName'
                        fullWidth margin='normal' value={this.state.firstName} onChange={this.onChanege} />
                    <TextField placeholder='please input your lastName' name='lastName'
                        fullWidth margin='normal' value={this.state.lastName} onChange={this.onChanege} />
                    <TextField type='number' placeholder='please input your age' name='age'
                        fullWidth margin='normal' value={this.state.age} onChange={this.onChanege} />
                    <TextField type='number' placeholder='please input your salary' name='salary'
                        fullWidth margin='normal' value={this.state.salary} onChange={this.onChanege} />

                    <Button variant='contained' color='primary' onClick={() => this.onSave}>Save</Button>
                    
                </form>
            </div>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;