import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput";
import PropTypes from "prop-types";
class InputNormal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          helpText: undefined,
          value: ""
        };
      }
    
    getValue = () => this.state.value;
    resetValue = () =>{this.setState({value :""});}
    setValue = (data)=>{this.setState({value : data}); console.log(data)}
    render() {
        const {inputProps } = this.props;
        return (
            <CustomInput
                center = {this.props.center}
                labelText={this.props.placeholder}
                id=""
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    ...inputProps,
                    value:this.state.value,
                    type: "",
                    onChange:
                      event => this.setState({
                        value: event.target.value,
                        helpText: undefined
                      }),
                      
                    // endAdornment: (
                    //     <InputAdornment position="end">
                            
                    //     </InputAdornment>
                    // )
                }}
            />

        )
    }
}
InputNormal.propTypes = {
  inputProps : PropTypes.object,
  placeholder : PropTypes.string,
  value :PropTypes.string,
  center : PropTypes.bool
}
InputNormal.defaultProps = {
  center :false
}

export default InputNormal;