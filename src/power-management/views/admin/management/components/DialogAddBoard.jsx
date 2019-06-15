import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import { Redirect } from "react-router-dom";
import InputNormal from '../../../../components/InputNormal';
import PropTypes from "prop-types";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
class DialogActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
  
  handleAddBoard=()=>{
    const provisionCode = this.provisioncode.getValue();
    const maxPins = this.maxSocket.getValue();
    this.props.onConfirm(provisionCode,maxPins);   
    this.props.onCancel()
  }
 
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        classes={{
          root: classes.center + " " + classes.modalRoot,
          paper: classes.modal
        }}
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description">
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>ADD DEVICE</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <InputNormal 
                  ref={ref=>this.provisioncode = ref}  
                  placeholder = "Provision Code"
                />
                <InputNormal 
                  ref={ref=>this.maxSocket = ref}  
                  placeholder = "Max Socket"
                />
              </CardBody>             
            </Card>
          </GridItem>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button 
            onClick={() => this.props.onCancel()}
            color="transparent"
            simple
          >
            BACK
          </Button>
          <Button
            color="success"
            onClick={() => this.handleAddBoard()}
            
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
DialogActive.propTypes = {
  open:PropTypes.bool,
  onConfirm : PropTypes.func,
  onCancel : PropTypes.func

}
export default withStyles(styles)(DialogActive)
