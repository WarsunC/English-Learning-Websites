import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class Vip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            checked: false
        }
    }
    render() {
        //仅当获取完登录状态，且登录状态位true时显示VIP内容
        if(this.state.checked){
            if(this.state.login) {
                return (
                    <div className='vip-content'>vip</div>
                )
            }else{
                return (
                    <div>请先登录</div>
                )
            }
        }else{
            return (
                <div>正在检查登录状态...</div>
            )
        }
    }
    componentDidMount() {
        // 获取登录状态
        axios.get('http://www.dell-lee.com/react/api/isLogin.json', { withCredentials:true })
            .then(res => {
                const login = res.data.data.login;
                this.setState({
                    login,
                    checked: true
                });
            })
    }
}

export default Vip;
