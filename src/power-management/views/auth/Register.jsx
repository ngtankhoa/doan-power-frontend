import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import InputNormal from "../../components/InputNormal";
import EmailInput from "../../components/CustomInputEmail";
import CustomInputPassword from "../../components/CustomInputPassword";
import PasswordConfirm from "../../components/PasswordConfirm";
import axios from "axios";
import ip_config from '../../ip_config'

var jwt = require('jsonwebtoken');

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  verifyData = () =>{
    return this.emailInput.verifyInput() && this.password.verifyInput();
  }
   register =async ()=>{
    if(!this.verifyData()) return
    if(this.password.getValue() !== this.passwordConfirm.getValue())
     return alert(`Password does not match`);
    else{
      let role, token;
      await axios({
        method: "post",
        url: `http://${ip_config}/api/v1/entrance/signup`,
        data: {
          fullName : this.name.getValue(),
          emailAddress: this.emailInput.getValue(),
          password: this.password.getValue(),
        },
      }).then(async (res) => {       
        let x = jwt.decode(res.data.token);      
        axios.defaults.headers.common['Authorization'] = res.data.token;
        role = x.role;
        token = res.data.token;
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', x.userId);
        this.props.history.push("/admin/ManagementListUser");
        
      }).catch(error=>{      
        alert(`Can not connect to server`);
      });  
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Register</h4>                
                </CardHeader>

                <CardBody>
                  <InputNormal 
                    ref={ref => this.name = ref} 
                    placeholder = "Full Name"
                  />

                  <EmailInput 
                    ref={ref => this.emailInput = ref}
                  />

                  <CustomInputPassword 
                    ref={ref => this.password = ref}
                  />

                  <PasswordConfirm 
                    ref={ref => this.passwordConfirm = ref}
                  />
                </CardBody>

                <CardFooter className={classes.justifyContentCenter}>

                  <Button color="rose" simple size="lg" block onClick={this.register}>
                    Register
                  </Button>
                  
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(RegisterPage);
