import React from 'react'
import { withStyles } from '@material-ui/core';
import FormLabel from "@material-ui/core/FormLabel";
import PropTypes from "prop-types";

 function CustomFormLabel (props) {    
    return (
        <FormLabel
        className={
          props.labelHorizontal +
          " " +
          props.labelHorizontalRadioCheckbox
        }
      >
       {props.text}
       </FormLabel>
    )
  }
  CustomFormLabel.propTypes = {
    text :PropTypes.string.isRequired
  }
export default withStyles()(CustomFormLabel)