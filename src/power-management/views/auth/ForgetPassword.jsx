import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
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
import axios from "axios";
import ip_config from '../../ip_config'


class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
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
  
  forget = () => {
    if(this.email.verifyInput() === false ) return
    
    axios.post(`http://${ip_config}/api/v1/entrance/send-password-recovery-email`,{
      emailAddress : this.email.getValue()
    }).then(
      this.props.history.push('emailconfirm')
    );
    
    
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
                  <h4 className={classes.cardTitle}>Forget Password</h4>                  
                </CardHeader>

                <CardBody>

                  <EmailInput 
                    ref = {ref=>this.email = ref}
                  />  

                </CardBody>

                <CardFooter className={classes.justifyContentCenter}>

                  <Button color="rose" simple size="lg" block onClick={this.forget}>
                    Send
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

ForgetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(ForgetPassword);
