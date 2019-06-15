import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput";
import iconInputStyle from "assets/jss/material-dashboard-pro-react/components/iconInputStyle";

export default class PasswordConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          helpText: undefined,
          value: ""
        };
      }
   
    getValue = () => this.state.value;
    render() {
        const {inputProps } = this.props;
        return (
            <CustomInput
                labelText="Confirm Password"
                id="confirm_password"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    ...inputProps,
                    type: "password",
                    onChange:
                      event => this.setState({
                        value: event.target.value,
                        helpText: undefined
                      }),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icon className={iconInputStyle.inputAdornmentIcon}>
                                lock_outline
                             </Icon>
                        </InputAdornment>
                    )
                }}
            />

        )
    }
}
