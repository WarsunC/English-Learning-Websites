import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UsergroupDeleteOutlined, IdcardOutlined, DingdingOutlined, GoogleOutlined, WechatOutlined, DribbbleOutlined} from '@ant-design/icons';
import logo from './logo.png';
import { Menu } from 'antd';
import './style.css';

class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            current: ''
        }
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    getIcon (id){
        switch(id){
            case 1:
                return (
                    <UsergroupDeleteOutlined />
                )
            case 2:
                return (
                    <IdcardOutlined />
                )
            case 3:
                return (
                    <DingdingOutlined />
                )
            case 4:
                return (
                    <GoogleOutlined />
                )
            case 5:
                return (
                    <WechatOutlined />
                )
            case 6:
                return (
                    <DribbbleOutlined />
                )
            default:
                return;
        }
    }

    getMenuItems() {
        return this.state.list.map(item => {
            return (
                <Menu.Item key={item.id}>
                    <Link to={`/${item.id}`}>
                        {this.getIcon(item.id)}
                        {item.title}
                    </Link>
                </Menu.Item>
            )
        })
    }

    componentDidMount() {
        let num = this.props.match.params;

        //保证刷新的时候，导航栏能准确地高亮显示
        if(!num.num2) {
            this.setState({current: num.num1});
        }
        axios.get('http://www.dell-lee.com/react/api/header.json')
            .then(res => {
                this.setState({
                    list: res.data.data
                })
            })
    }

    render() {
        return (
            <Fragment>
                <Link to={'/'}>
                    <img src={logo} alt="" className={'app-header-logo'}/>
                </Link>
                <Menu selectedKeys={this.state.current} mode={'horizontal'} onClick={this.handleClick}>
                    { this.getMenuItems() }
                </Menu>
            </Fragment>
        )
    }
}

export default AppHeader;
