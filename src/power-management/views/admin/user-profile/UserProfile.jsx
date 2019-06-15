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
import axios from "axios";
import ip_config from '../../../ip_config'
import InputNormal from "../../../components/InputNormal";
import DialogChangePassword from "./components/DialogChangePassword";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      open : false
    };
    this.logout = this.logout.bind(this);
  }
  async componentDidMount() {
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get(`http://${ip_config}/api/v1/user/${localStorage.getItem('userId')}`,{role:localStorage.getItem('role')})
    .then(
        res=>{
          console.log(res.data.userRecord.fullName);
          this.email.setValue(res.data.userRecord.emailAddress);
          this.name.setValue(res.data.userRecord.fullName);
          this.setState({
            userName : res.data.Name, 
            email : res.data.Email , 
            verifyEmail: res.data.verifyEmail
          })
        }
    )
  
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  
  handleCloseChangePassword = ()=>{
    this.setState({open : false});
  }
  OpenChangePassword = ()=>{
    this.setState({open : true});
  }
  UpdateProfile = () =>{
    axios.put(`http://${ip_config}/api/v1/account/update-profile`)
    .then(res=>{
      alert(`Updated!`);
    })
    .catch(error=>
      {
        alert(`Some errors happened!`);
      })
  }
  changePassword = (newpassword)=>{
    axios.put (`http://${ip_config}/api/v1/account/update-password`,{password : newpassword})
   .then(res=>{
       alert(`Success`);
   })
  }
  logout (){
    axios.post(`http://${ip_config}/api/v1/account/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    this.props.history.push("/");
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={6}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>My Profile</h4>                  
                </CardHeader>

                <CardBody>

                  <InputNormal 
                    placeholder="Email" 
                    ref={ref=>this.email = ref}
                  />
                  <InputNormal 
                    placeholder="Name" 
                    ref={ref=>this.name = ref}
                  />
                  <InputNormal 
                    placeholder="Organization Name"
                    ref={ref=>this.organization = ref} 
                  />
                  <InputNormal 
                    placeholder="Phone" 
                    ref={ref=>this.phone = ref}/>
                  <InputNormal 
                    placeholder="Hotline" 
                    ref={ref=>this.hotline = ref}
                  />
                  <InputNormal 
                    placeholder="Address"
                    ref={ref=>this.description = ref} 
                  />
                  
                </CardBody>

                <CardFooter className={classes.justifyContentCenter}>
                  
                  <Button color="rose" simple size="lg" block
                   onClick = {this.UpdateProfile}
                  >
                    Update Information
                  </Button>

                  <Button color="rose" simple size="lg" block
                    onClick = {this.OpenChangePassword}
                  >
                    Change password
                  </Button>
                  
                </CardFooter>
              </Card>
            </form>
          </GridItem>
          <GridItem>
            <Button 
            color="danger" 
            onClick={this.logout}
            style={{marginTop:"20%"}}
            >
              LOG OUT
            </Button>
          </GridItem>         
        </GridContainer>

        <DialogChangePassword
          open={this.state.open}
          onConfirm = {this.changePassword}
          onCancel={this.handleCloseChangePassword}
        />
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(UserProfile);

