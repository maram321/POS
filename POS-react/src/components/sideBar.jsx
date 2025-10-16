import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from "antd";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonAddOutline  } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TbCashRegister } from "react-icons/tb";
import { SlCalculator } from "react-icons/sl";
import logo from "./image.ico"
import "./sideBar.css"


const SideBar = ({user}) => {
    const navigate = useNavigate();
    return ( 
        <div>
            <div className='logo'>
                <img src={logo} className="logo" alt="Not Found" width="50" height="50" style={{cursor:'pointer'}} onClick={()=>navigate("/")}></img>
            </div>
            <Menu className='menu-bar' onClick={({key})=>navigate(key)}>
                {!user &&
                <React.Fragment>
                    <Menu.Item key="/login" icon={<RiAccountPinCircleLine style={{fontSize:30, marginInline:-6}}/>}>تسجيل دخول</Menu.Item>
                    <Menu.Item key="/signup" icon={<IoPersonAddOutline style={{fontSize:30, marginInline:-6}}/>}>إنشاء حساب</Menu.Item>
                </React.Fragment>}
                {user &&
                <React.Fragment>
                    <Menu.SubMenu key="subbill" icon={<LiaFileInvoiceDollarSolid style={{fontSize:35, marginInline:-6}} title="فواتير"/>} >
                        <Menu.Item key="/sales/bill/new" icon={<TbCashRegister style={{fontSize:30}}/>} style={{fontSize:20, direction:'rtl'}}>مبيعات</Menu.Item>
                        <Menu.Item key="/expenses/bill/new" icon={<BiPurchaseTagAlt style={{fontSize:30}}/>} style={{fontSize:20, direction:'rtl'}}>مشتريات</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sublist" icon={<CiViewList style={{fontSize:35, marginInline:-7}} title="أصناف"/>}>
                        <Menu.Item key="/sales/list" icon={<TbCashRegister style={{fontSize:30}}/>} style={{fontSize:20, direction:'rtl'}}>مبيعات</Menu.Item>
                        <Menu.Item key="/expenses/list" icon={<BiPurchaseTagAlt style={{fontSize:30}}/>} style={{fontSize:20, direction:'rtl'}}>مشتريات</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="subaccount" icon={<SlCalculator style={{fontSize:30, marginInline:-6}} title='حسابات'/>}>
                        <Menu.Item key="/sales/accounts" icon={<TbCashRegister style={{fontSize:30}}/>} style={{fontSize:20, direction:'rtl'}}>مبيعات</Menu.Item>
                        <Menu.Item key="/expenses/accounts" icon={<BiPurchaseTagAlt style={{fontSize:30}}/>} style={{fontSize:20, direction:'rtl'}}>مشتريات</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="/logout" icon={<IoMdLogOut style={{fontSize:30, marginInline:-6}}/>} danger="true">تسجيل خروج</Menu.Item>
                </React.Fragment>}
            </Menu>

        </div>
    );
}
 
export default SideBar;
