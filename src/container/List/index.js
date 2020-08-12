import React, { Component } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AppList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    render() {
        return (
            <List
                bordered
                style={{background: '#fff'}}
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <Link to={`/detail/${item.id}`}>{item.title}</Link>
                    </List.Item>
                )}
            />
        )
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        id = (id ? id : 1);
        axios.get('http://www.dell-lee.com/react/api/list.json?id='+id)
            .then(res => {
                this.setState({
                    data: res.data.data
                })
            })
    }

    //此处的使用componentWillReceiveProps会有警告，但是在尝试用其他的生命周期函数，如shouldComponentUpdate或者componentWillUpdate，则会重复执行代码
    UNSAFE_componentWillReceiveProps(nextProps, nextState, nextContext) {
        const id = nextProps.match.params.id;
        axios.get('http://www.dell-lee.com/react/api/list.json?id='+id)
            .then(res => {
                this.setState({
                    data: res.data.data
                })
            })
    }

}

export default AppList;
