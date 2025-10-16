import React, { Component } from 'react';
import Swal from "sweetalert2"
import { getSales, deleteSale } from '../services/salesListService';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import SaleItemForm from './saleItemForm';
import auth from "../services/authService"
import { RxCross2 } from "react-icons/rx";
import { FiEdit3 } from "react-icons/fi";
import "./list.css"

 class SalesList extends Component {
    state = { 
        sales: [],
        catagories: [],
        selectedCatagory: "كل الأصناف",
        searchQuery: "",
        user: {},
        showItemForm: false
    } 

    async componentDidMount() {
        const {data : sales} = await getSales();
        this.setState({ sales });

        const allCatagories = sales.map(sale => sale.catagory)
        const filteredCatagories = allCatagories.filter(function onlyUnique(value, index, array) {return array.indexOf(value) === index})
        const catagories = ["كل الأصناف", ...filteredCatagories]
        this.setState({ catagories });

        const user = auth.getCurrentUser();
        this.setState({ user });

    }

    handleDelete = async(sale) => {
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
                const sales = this.state.sales.filter(s => s._id !== sale._id);
                this.setState({ sales });
                await deleteSale(sale._id);
            }
          });

    };

    handleCatagorySelect = (catagory) => {
        this.setState({ selectedCatagory: catagory, searchQuery:""})
    }

    handleShowItemForm =()=>{
        (!this.state.showItemForm) ? this.setState({showItemForm:true}) : this.setState({showItemForm:false})
    }

    handleEditItem = (sale) => {
        window.location.replace("/sales/list/" + sale._id);
    }
    handleSearch = (query) => {
        this.setState({searchQuery:query, selectedCatagory:"كل الأصناف"});
    }

    render() { 

        const userFilter = this.state.user._id ? this.state.sales.filter(s => s.userId === this.state.user._id) : this.state.sales;
        let filtered = userFilter;
        if(this.state.searchQuery)
            filtered = userFilter.filter(s=> s.itemName.toLowerCase().startsWith(this.state.searchQuery.toLowerCase()));
        else if (this.state.selectedCatagory && this.state.selectedCatagory !== "كل الأصناف")
            filtered = userFilter.filter(s => s.catagory === this.state.selectedCatagory);
        const sales = filtered;
        
        return (
        <div className='requires-no-scroll' style={{minHeight:610}}>
            <SaleItemForm />
            <div className='top' style={{display:"flex" , marginTop: -30}}>
                <p>قائمة الأصناف</p>
                <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} /> 
            </div>
            <ListGroup items={this.state.catagories} selectedItem={this.state.selectedCatagory} onItemSelect={this.handleCatagorySelect} />
            <h5 className='count-item'> يوجد {filtered.length} عناصر في القائمة </h5>
            <div className='container'>
                { sales.map(sale =>
                <div className='item-container' key={sale._id}>
                    <div className='img-container'>
                        <img src={"http://localhost:3900/images/"+sale.image} className="img-top" alt="not-found" />
                    </div>
                    <div className='item-info'>
                        <div className='info'>
                        <p className='item-name'>{sale.itemName}</p>
                        <p className='item-price'> ₪{sale.price}</p>
                        </div>
                        <div className='buttons'>
                            <a href="#" className="btn btn-dark" onClick={()=>this.handleEditItem(sale)}><FiEdit3 /></a>
                            <a href="#" className="btn me-2" onClick={() => this.handleDelete(sale)} style={{background:'#d32929'}}><RxCross2 style={{color:'white', fontSize:20, marginInline:-2, marginBottom:1}}/></a>
                        </div>
                    </div>
                </div>)}  
            </div>
        </div>
        );
    }
 }
  
 export default SalesList;