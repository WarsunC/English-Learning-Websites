import React, { Component } from 'react';
import { Modal, Button, Input, message } from 'antd';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            visible: false,
            user: '',
            passage: '',
            checked: false
        }
    }

    //显示登录框
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    //注销
    logout = () => {
        axios.get('http://www.dell-lee.com/react/api/logout.json', { withCredentials: true })
            .then(res => {
                const data = res.data.data;
                if(data.logout){
                    this.setState({
                        login: false
                    })
                }
            })
    }

    //检查账号密码是否正确
    checkLogin = () => {
        const { user, password } = this.state;
        const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
        axios.get(url, { withCredentials: true })
            .then(res => {
                if(res.data.data.login){
                    this.setState({
                        visible: false,
                        login: true
                    });
                    message.success("登录成功");
                }else{
                    message.error("用户名或密码有误");
                }
            })
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    // 将输入框输入的账号密码保存到state中
    changeUsername = (e) => {
        this.setState({user : e.target.value})
    }
    changePassage = (e) => {
        this.setState({password : e.target.value})
    }

    componentDidMount() {
        axios.get('http://www.dell-lee.com/react/api/isLogin.json',{withCredentials: true})
            .then(res => {
                const login = res.data.data.login;
                this.setState({
                    login,
                    checked: true
                });
            })
    }

    render() {
        const { login, checked } = this.state;
        return (
            <div>
                {
                    checked && login ?
                        <Link to={'/'}><Button type="primary" onClick={this.logout} className="login">退出</Button></Link>
                        :
                        <Button type="primary" onClick={this.showModal} className='login'>登录</Button>
                }
                <Link to={`/detail/vip`}><Button type="primary" className="vip">Vip</Button></Link>
                <Modal
                    title="登录"
                    visible={this.state.visible}
                    onOk={this.checkLogin.bind(this)}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="请输入用户名" className='username' onBlur={this.changeUsername.bind(this)} />
                    <br />
                    <Input.Password placeholder="请输入密码" onBlur={this.changePassage.bind(this)} />
                </Modal>
            </div>
        );
    }
}

export default Login;
