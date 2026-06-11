import React, { Component } from 'react';
import Joi from 'joi-browser';


class Form extends Component {
    state = { 
        data: {},
        errors: {}
    } 

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly : false})
        console.log(result)

        if(!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };
   
    validateProperty = input => {
        const obj = { [input.name] : input.value};
        const schema = { [input.name] : this.schema[input.name]};
        const result = Joi.validate(obj, schema);

        if(!result.error) return null;
        return result.error.details[0].message;
    };

    
    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };


    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors });
    };
}
 
export default Form;