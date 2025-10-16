import React, { Component } from 'react';
import Swal from "sweetalert2"
import { getExpenses } from '../services/expensesListService';
import { saveExpenseBill } from '../services/expensesBillService';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import auth from "../services/authService"
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import "./bill.css"


 class ExpensesBill extends Component {
    state = { 
        expenses: [],
        products:[],
        catagories: [],
        selectedCatagory: "كل الأصناف",
        searchQuery: "",
        user: {},
        discount: 0
    } 

    async componentDidMount() {
        const {data : expenses} = await getExpenses();
        this.setState({ expenses });

        const allCatagories = expenses.map(expense => expense.catagory)
        const filteredCatagories = allCatagories.filter(function onlyUnique(value, index, array) {return array.indexOf(value) === index})
        const catagories = ["كل الأصناف", ...filteredCatagories]
        this.setState({ catagories });

        const user = auth.getCurrentUser();
        this.setState({ user });

    }

    handleAddItem =(expense,quantity) => {
        const products =[...this.state.products]; 
        if (!products.some(e => e.expense === expense)) {
            products.push({
                "expense":expense,
                "quantity":quantity
            });
        }
        this.setState({ products })
    }

    handleCatagorySelect = (catagory) => {
        this.setState({ selectedCatagory: catagory, searchQuery:""})
    }

    handleSearch = (query) => {
        this.setState({searchQuery:query, selectedCatagory:"كل الأصناف"});
    }

    handleIncrement = product => {
        const products = [...this.state.products];
        const index = products.indexOf(product);
        products[index] = {...product};
        products[index].quantity++;
        this.setState({ products });
    };

    handleDecrement = product => {
        const products = [...this.state.products];
        const index = products.indexOf(product);
        products[index] = {...product};
        if (products[index].quantity === 1) {
            products.splice(index,1)
            this.setState({ products });
        } else {
            products[index].quantity--;
            this.setState({ products });
        }
    };

    calculateSubTotal = () => {
        let sum = 0
        for (let item of this.state.products)
            sum+= (item.expense.price*item.quantity)
        return sum;
    }

    handleChangeDiscount = (e) => {
        let discount = this.state.discount;
        discount = e.currentTarget.value;
        this.setState({ discount });
    }

    calculateTotal = () => {
        const total = this.calculateSubTotal() - this.state.discount
        return total;
    }

    handleSaveBill = async() => {
        let expensesList = []
        for (let product of this.state.products)
            expensesList.push({
                "itemId": product.expense._id,
                "quantity": product.quantity
        })
        const discount= this.state.discount
        const subTotal= this.calculateSubTotal()
        const total= this.calculateTotal()
        const expensesBill = {
           "list": expensesList,
           "subTotal" : subTotal,
           "discount": discount,
           "total": total
        }
        
        await saveExpenseBill(expensesBill)

        Swal.fire({
            icon: "success",
            title: "تم حفظ الفاتورة بنجاح"
        }).then((result) => {
            if (result.isConfirmed) {
            window.location.replace("/expenses/bill/new");
            }
        });
    }

    render() { 
        const userFilter = this.state.user._id ? this.state.expenses.filter(e => e.userId === this.state.user._id) : this.state.expenses;
        let filtered = userFilter;
        if(this.state.searchQuery)
            filtered = userFilter.filter(e=> e.itemName.toLowerCase().startsWith(this.state.searchQuery.toLowerCase()));
        else if (this.state.selectedCatagory && this.state.selectedCatagory !== "كل الأصناف")
            filtered = userFilter.filter(e => e.catagory === this.state.selectedCatagory);
        const expenses = filtered
        
        return (
        <div className='requires-no-scroll' style={{height:610}}>
            <div className='bill'>
            <h4>فاتورة مشتريات</h4>
            <div className='items-container'>
                {this.state.products.map((item,index) => 
                    <div className='item' key={index}>
                        <div className='img'>
                            <img src={"http://localhost:3900/images/"+item.expense.image} className="img-top" alt="not-found" />
                        </div>
                        <div className='information'>
                            <div className='information-name'>
                                <p className='name'>{item.expense.itemName}</p>
                            </div>
                            <div className='details'>
                            <p className='price'>{item.expense.price} ₪</p>
                            <div className='button'>
                                <a href="#" className="btn btn-dark" onClick={()=>this.handleIncrement(item)}><IoMdAdd style={{fontSize:22, marginInline:-8}}/></a>
                                <h6>{item.quantity}</h6>
                                <a href="#" className="btn btn-secondary" onClick={()=>this.handleDecrement(item)}><FaMinus style={{fontSize:22, marginInline:-8}}/></a>                                    </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className='bill-bottom'>
                <div className='bill-total'>
                    <div>
                        <div className='bill-total-details'>
                            <p>المجموع الفرعي</p>
                            <p>{this.calculateSubTotal()}</p>
                        </div>
                        <div className='bill-total-details'>
                            <p>الخصم</p>
                            <input className="input-discount" type="number" name='discount' id='discount' value={this.state.discount} onChange={this.handleChangeDiscount} />
                        </div>
                        <hr />
                        <div className='bill-total-details ' style={{fontWeight:600}}>
                            <p>المجموع</p>
                            <p>{this.calculateTotal()} ₪</p>
                        </div>
                    </div>
                </div>
                <button onClick={this.handleSaveBill}>حفظ</button>
            </div>
            </div>
            <div className='bill-top' style={{display:"flex" , marginTop: -30}}>
                <p>قائمة الأصناف</p>
                <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} /> 
            </div>
            <ListGroup items={this.state.catagories} selectedItem={this.state.selectedCatagory} onItemSelect={this.handleCatagorySelect} />
            <h5> يوجد {filtered.length} عناصر في القائمة </h5>
            <div className='bill-list-container'>
                { expenses.map(expense =>
                <div className='bill-item-container' key={expense._id}>
                    <div className='bill-img-container'>
                        <img src={"http://localhost:3900/images/"+expense.image} className="img-top" alt="not-found" />
                    </div>
                    <div className='item-info'>
                        <div className='info'>
                            <p className='item-name'>{expense.itemName}</p>
                            <p className='item-price'>{expense.price} ₪</p>
                        </div>
                        <div className='buttons'>
                            <a href="#" className="btn btn-dark" onClick={()=>this.handleAddItem(expense,1)}><IoMdAdd style={{fontSize:22, marginInline:-4, marginBottom:1}}/></a>
                        </div>
                    </div>
                </div>)}  
            </div>
        </div>
        );
    }
 }
  
 export default ExpensesBill;