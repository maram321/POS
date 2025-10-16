import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form"
import Swal from "sweetalert2"
import { saveExpense } from '../services/expensesListService';
import "./itemForm.css"

class ExpenseItemForm extends Form {
    state = {
        data:{
            itemName: "",
            price: "",
            catagory: "",
        },
        image:false,
        errors: {}
    };

    schema = {
        itemName : Joi.string().required().min(3).max(30).label("اسم الصنف"),
        price : Joi.number().required().label("السعر"),
        catagory : Joi.string().required().label("التصنيف"),
    };

    doSubmit = async () => {
        const formData = new FormData();
        formData.append("itemName", this.state.data.itemName)
        formData.append("price", this.state.data.price)
        formData.append("catagory", this.state.data.catagory)
        formData.append("image", this.state.image)
        await saveExpense(formData);

        Swal.fire({
            icon: "success",
            title: "تم إضافة الصنف بنجاح"
        }).then((result) => {
            if (result.isConfirmed) {
            window.location.replace("/expenses/list");
            }
        });
    
    }

    render() { 
        return (
            <div className='item-form'>
                <h4>إضافة صنف</h4>
            <div className='item-form-detalis'>
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <input 
                        value={this.state.data.itemName} 
                        onChange={this.handleChange} 
                        name='itemName' 
                        id='itemName' 
                        type="text" 
                        className="form-control" />
                        <label htmlFor="itemName" for="">اسم الصنف</label>
                    </div>
                    {this.state.errors.itemName && <p className='error'>{this.state.errors.itemName}</p>}
                    <div className="form">
                        <input 
                        value={this.state.data.price} 
                        onChange={this.handleChange} 
                        name='price' 
                        id='price' 
                        type="text" 
                        className="form-control" />
                        <label htmlFor="price" for="">السعر</label>
                    </div>
                    {this.state.errors.price && <p className='error'>{this.state.errors.price}</p>}
                    <div className="form">
                        <input 
                        value={this.state.data.catagory} 
                        onChange={this.handleChange} 
                        name='catagory' 
                        id='catagory' 
                        type="text" 
                        className="form-control" />
                        <label htmlFor="catagory" for="">التصنيف</label>
                    </div>
                    {this.state.errors.catagory && <p className='error'>{this.state.errors.catagory}</p>}
                    <div className="form">
                        <input 
                        onChange={(e)=>this.setState({image:e.target.files[0]})} 
                        name='image' 
                        id='image' 
                        type="file" 
                        className="form-control" />
                        <label htmlFor="image" for="">صورة</label>
                    </div>
                    {this.state.errors.image && <p className='error'>{this.state.errors.image}</p>}
                    <button className="btn" disabled={this.validate()} >حفظ</button>
                </form>
            </div>

            </div>
        );
    }
}
 
export default ExpenseItemForm;