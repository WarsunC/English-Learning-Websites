import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import AppHeader from './components/Header';
import AppList from './container/List';
import Detail from './container/Detail';
import Login from './components/Login';
import Vip from './container/Vip';

const { Header, Footer, Content } = Layout;

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header className="header">
                        {/*num1,num2将作为参数传递到AppHeader中，可在AppHeader中通过props获取*/}
                        <Route path='/:num1?/:num2?' component={AppHeader}></Route>
                    </Header>
                    <Content className="content">
                        <Login />
                        <Switch>
                            <Route path='/detail/vip' component={Vip}></Route>
                            <Route path='/detail/:id' component={Detail}></Route>
                            <Route path='/:id?' component={AppList}></Route>
                        </Switch>
                    </Content>
                    <Footer className="footer">@copyright Warsun 2020</Footer>
                </Layout>
            </BrowserRouter>

        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));
