import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from "antd";
import './App.css';

import Home from './components/home';
import Header from './components/header';
import SalesList from './components/salesList';
import SaleItemForm from './components/saleItemForm';
import SaleItemEditForm from './components/saleItemEditForm';
import SalesBill from './components/salesBill';
import SalesAccounts from './components/salesAccounts';
import ExpensesList from './components/expensesList';
import ExpenseItemForm from './components/expenseItemForm';
import ExpenseItemEditForm from './components/expenseItemEditForm';
import ExpensesBill from './components/expensesBill';
import ExpensesAccounts from './components/expensesAccounts';
import NotFound from './components/notFound';
import SideBar from './components/sideBar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import Logout from './components/logout';
import auth from "./services/authService"

const {Content, Sider} = Layout;

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
 
  render() {
    return (
      <Layout style={{direction: 'rtl'}}>
        <Sider className='sidebar' collapsed="true">
          <SideBar user={this.state.user}/>
        </Sider>
        <Layout>
          <Header user={this.state.user}/>
          <Content className='content' >
              <Routes>
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/sales/list" element={<SalesList />} />
                <Route path="/sales/list/new" element={<SaleItemForm />} />
                <Route path="/sales/list/:id" element={<SaleItemEditForm />} />
                <Route path="/sales/bill/new" element={<SalesBill />} />
                <Route path="/sales/accounts" element={<SalesAccounts />} />
                <Route path="/expenses/list" element={<ExpensesList />} />
                <Route path="/expenses/list/new" element={<ExpenseItemForm />} />
                <Route path="/expenses/list/:id" element={<ExpenseItemEditForm />} />
                <Route path="/expenses/bill/new" element={<ExpensesBill />} />
                <Route path="/expenses/accounts" element={<ExpensesAccounts />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/" element={<Home />} />
              </Routes>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;

