import React from 'react';
import { useParams } from "react-router-dom";
import Joi from 'joi-browser';
import Form from "./common/form"
import Swal from "sweetalert2"
import { IoMdClose } from "react-icons/io";
import { getSale, editSale } from '../services/salesListService';
import "./form.css"


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
  

class SaleItemEditForm extends Form {
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
            const saleId = this.props.params.id;
            if (saleId === "new") return;
            const { data : sale } = await getSale(saleId);
            this.setState({ data:this.mapToViewModel(sale) });
        }
        catch(ex) {
            if(ex.response && ex.response.status === 404)  window.location.replace("/not-found");
        }  
    }

    mapToViewModel(sale) {
        return {
            _id: sale._id,
            itemName: sale.itemName,
            price: sale.price,
            catagory: sale.catagory
        }
    }


    doSubmit = async () => {

        await editSale(this.state.data);

        Swal.fire({
            icon: "success",
            title: "تم التعديل بنجاح",
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/sales/list");
            }
          });
        
    }

    handleClose =() => {
        window.location.replace("/sales/list");
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
 
export default withParams(SaleItemEditForm);