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
import GridContainer from "components/Grid/GridContainer.jsx";
import PropTypes from "prop-types";
import InputNormal from '../../../../components/InputNormal';
// import axios from "axios";
// import ip_config from '../../../../ip_config'



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

 class DialogAddSocket extends Component {
  onCancel = ()=>{
    this.props.onCancel();
  } 
  confirm = ()=>{
    const Id = this.props.tempo_arduino.id;
    const name = this.name.getValue();
    const pinNumber = this.pinNumber.getValue();
    const lastCurrentValue = this.lastCurrentValue.getValue();
    this.props.onConfirm(Id,
      name,
      pinNumber,
      true,
      lastCurrentValue
      );
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
          onClose={() => this.onCancel()}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <h4 className={classes.modalTitle}>Add device</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <form>                  
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <InputNormal 
                        ref={ref=>this.pinNumber = ref} 
                        placeholder="Pin Number"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={6}>
                      <InputNormal 
                        ref={ref=>this.name = ref} 
                        placeholder="Name"
                      />
                    </GridItem>
                  </GridContainer>
                  <br></br>
                 
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <InputNormal 
                        ref={ref=>this.lastCurrentValue = ref} 
                        placeholder="Last Current Value"
                      />
                    </GridItem>
                  </GridContainer>

                </form>
              </CardBody>
            </Card>
          </GridItem>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button 
            onClick={() => this.onCancel()}
            color="danger"
            simple
          >
            Close
          </Button>
          <Button
            color="success" 
            onClick={this.confirm}
            simple
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
DialogAddSocket.propTypes={
  tempo_arduino : PropTypes.object,
  open : PropTypes.bool,
  onCancel : PropTypes.func,
  onConfirm : PropTypes.func
}
export default withStyles(styles)(DialogAddSocket)
