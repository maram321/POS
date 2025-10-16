import React from 'react';
import { useParams } from "react-router-dom";
import Joi from 'joi-browser';
import Form from "./common/form"
import Swal from "sweetalert2"
import { IoMdClose } from "react-icons/io";
import { getExpense, editExpense } from '../services/expensesListService';
import "./form.css"


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
  

class ExpenseItemEditForm extends Form {
    state = {
        data:{
            itemName: "",
            price: "",
            catagory: "",
        },
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        itemName : Joi.string().required().min(3).max(30).label("اسم الصنف"),
        price : Joi.number().required().label("السعر"),
        catagory : Joi.string().required().label("التصنيف"),
    };

    async componentDidMount() {
        try{
            const expenseId = this.props.params.id;
            if (expenseId === "new") return;
            const { data : expense } = await getExpense(expenseId);
            this.setState({ data:this.mapToViewModel(expense) });
        }
        catch(ex) {
            if(ex.response && ex.response.status === 404)  window.location.replace("/not-found");
        }  
    }

    mapToViewModel(expense) {
        return {
            _id: expense._id,
            itemName: expense.itemName,
            price: expense.price,
            catagory: expense.catagory
        }
    }


    doSubmit = async () => {

        await editExpense(this.state.data);

        Swal.fire({
            icon: "success",
            title: "تم التعديل بنجاح",
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/expenses/list");
            }
          });
        
    }

    handleClose =() => {
        window.location.replace("/expenses/list");
    }

    render() { 
        return (
            <div className='edit-form requires-no-scroll'>
            <div className='wrapper'>
                <div className='title'>
                <h1>تعديل صنف</h1>
                <h1 onClick={this.handleClose} style={{cursor:'pointer'}}><IoMdClose /></h1>
                </div>
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
                    <button className="btn" disabled={this.validate()} >تعديل</button>
                </form>
            </div>

            </div>
        );
    }
}
 
export default withParams(ExpenseItemEditForm);