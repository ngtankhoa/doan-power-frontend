import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import EmailInput from "../../components/CustomInputEmail";
import CustomInputPassword from "../../components/CustomInputPassword";
import axios from "axios";
import ip_config from '../../ip_config'
var jwt = require('jsonwebtoken');
class LoginPage extends React.Component {
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
    return this.emailInput.verifyInput() && this.passwordInput.verifyInput();
  }
  submit =async ()=>{
    if(!this.verifyData()) return
    let role, token;
    await axios({
      method: "put",
      //api
      url: `http://${ip_config}/api/v1/entrance/login`,
      data: {
        emailAddress: this.emailInput.getValue(),
        password: this.passwordInput.getValue(),
      },
    }).then(async (res) => {
      let x = jwt.decode(res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
      role = x.role;
      token = res.data.token;
      await localStorage.setItem('role', role);
      await localStorage.setItem('userId',x.userId);
      await localStorage.setItem('token', token);
    }).catch(error=>{
      alert(`Email or password is not valid`)
    });
    

    //chuyển hướng
    if(role === "admin")
    this.props.history.push("/admin/ProvisioningList");
    else  if(role === "user")
    this.props.history.push("/admin/ManagementListUser");
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
                  <h4 className={classes.cardTitle}>Log in</h4>                  
                </CardHeader>

                <CardBody>

                 <EmailInput 
                  ref={ref => this.emailInput = ref}
                 />

                 <CustomInputPassword 
                  ref={ref => this.passwordInput = ref}
                  />
                  
                </CardBody>

                <CardFooter className={classes.justifyContentCenter}>
                  
                  <Button color="rose" simple size="lg" block
                  onClick={this.submit}>
                    Let's Go
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
