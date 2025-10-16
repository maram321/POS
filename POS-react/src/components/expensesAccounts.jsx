import React, { Component } from 'react';
import Swal from "sweetalert2"
import { TiDeleteOutline } from "react-icons/ti";
import Pagination from './common/pagination';
import { paginate } from './common/pagination';
import auth from "../services/authService"
import { getExpensesBills, deleteExpenseBill } from '../services/expensesBillService';
import "./accounts.css"


class ExpensesAccounts extends Component {
    state = {
        bills: [],
        selectedBill: null,
        user: {},
        dateFrom : "",
        dateTo : "",
        pageSize: 10,
        currentPage: 1
    } 

    async componentDidMount() {
        const {data : bills} = await getExpensesBills();
        this.setState({ bills });

        const user = auth.getCurrentUser();
        this.setState({ user });

    }

    handleDelete = (bill) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "!هذه العملية غير قابلة للتراجع",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d32929",
            confirmButtonText: "حذف",
            cancelButtonText: "إلغاء"
          }).then(async(result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "!تم الحذف",
                    text: "تم حذف الصنف بنجاح",
                    icon: "success"
                });
                const bills = this.state.bills.filter(b => b._id !== bill._id);
                this.setState({ bills });
                await deleteExpenseBill(bill._id);
            }
          });
    }
    
    handleDateFrom = (e) => {
        const dateFrom = e.currentTarget.value
        this.setState({dateFrom})
    }

    handleDateTo = (e) => {
        const dateTo = e.currentTarget.value
        this.setState({dateTo})
    }

    handlePageChange = (page) => {
        this.setState({ currentPage : page });
    }

    handleBillSelection = (bill) => {
        this.setState({ selectedBill: bill })
    }

    render() { 
        const userFilter = this.state.user._id ? this.state.bills.filter(b => b.userId === this.state.user._id) : this.state.bills;
        const dateFilter = userFilter.filter((bill) => {return (bill.date >= this.state.dateFrom && bill.date <= this.state.dateTo)})
        const filtered = paginate(dateFilter, this.state.currentPage, this.state.pageSize)
        const bills = filtered
        return (
            <div className='requires-no-scroll' style={{minHeight:600}}>
            <div className='accounts-bill'>
                <h6>فاتورة مشتريات رقم</h6>
            {this.state.selectedBill && <h4>{this.state.selectedBill._id.substring(0,10)} </h4>}
                {this.state.selectedBill && 
                            <div className='bill-table'> 
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">الصنف </th>
                                        <th scope="col">السعر</th>
                                        <th scope="col">الكمية </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.selectedBill.list.map((item,index) =>
                                    <tr key={index}>
                                        <td>{item.itemName}</td>
                                        <td>{item.price} ₪</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>  
                }
                {this.state.selectedBill && <div className='bottom-bill'>
                            <div className='total-bill'>
                                <div>
                                    <div className='total-details'>
                                        <p>المجموع الفرعي</p>
                                        <p>{this.state.selectedBill.subTotal}</p>
                                    </div>
                                    <div className='total-details'>
                                        <p>الخصم</p>
                                        <p>{this.state.selectedBill.discount}</p>
                                    </div>
                                    <hr />
                                    <div className='total-details ' style={{fontWeight:600}}>
                                        <p>المجموع</p>
                                        <p>{this.state.selectedBill.total} ₪</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
            </div>   
            <div className='accounts-content'>
            
            <div className="range-container">
                <div>
                <span className="from" >من : </span>
                <input className="dateFrom" type="date" style={{marginLeft:25}} value={this.state.dateFrom} onChange={this.handleDateFrom}></input>
                </div>
                <div>
                <span className="to" >إلى : </span>
                <input className="dateTo" type="date" value={this.state.dateTo} onChange={this.handleDateTo}></input>
                </div>
            </div>
            <div className='table-container'> 
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">الرقم التسلسلي</th>
                            <th scope="col">التاريخ</th>
                            <th scope="col">المجموع الفرعي</th>
                            <th scope="col">الخصم</th>
                            <th scope="col">المجموع</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill =>
                        <tr key={bill._id} onClick={()=>this.handleBillSelection(bill)} style={{cursor:'pointer'}}>
                            <td>{bill._id.substring(0,10)}</td>
                            <td>{bill.date.substring(0,10)}</td>
                            <td>{bill.subTotal}</td>
                            <td>{bill.discount}</td>
                            <td>{bill.total} ₪</td>
                            <td><a onClick={()=>this.handleDelete(bill)}><TiDeleteOutline style={{color:"#d32929"}}/></a></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>  
            <div className='pagination'>
                <Pagination
                itemsCount={this.state.bills.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
                />     
                </div> 
            </div>         
            </div>
        );
    }
}
 
export default ExpensesAccounts;