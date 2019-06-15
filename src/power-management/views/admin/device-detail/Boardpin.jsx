import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Add from "@material-ui/icons/Add";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeaderCustom from "../../../components/CardHeader"
import { Redirect } from "react-router-dom";
import axios from 'axios'
import Close from "@material-ui/icons/Close";
import Power from "@material-ui/icons/PowerSettingsNew"
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import DialogAddSocket from "./components/DialogAddSocket";
import DialogConFirmDeleteSocket from "./components/DialogConFirmDeleteSocket.jsx";
import CustomFormLabel from "../../../components/CustomFormLabel.jsx";
import CustomNavPills from "../../../components/CustomNavPills.jsx";
import ip_config from '../../../ip_config'
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

class Board_pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      tempo_arduino: [],
      check_back_to_list: false,
      state: [],
      miniActive: true,
      actives_socket: 0,
      numberOfSocket:0,
      pinSelected: null,
      openDialogAddSocket: false,
      openDialogConFirmDeleteSocket : false,

    };
    this.returnToBoard = this.returnToBoard.bind(this);
    this.pre_returnToBoard = this.pre_returnToBoard.bind(this);
  }
  async  componentWillMount() {
    if (this.props.location.arduino !== undefined) {
      let i = 0;
      for (let j = 0; j < this.props.location.arduino.pins.length; j++) {
        if (this.props.location.arduino.pins[j].isEnable === true)
          i++;
      }
      this.setState({ actives_socket: i });
      this.setState({ numberOfSocket: this.props.location.arduino.pins.length });
    } 
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  dataFormat = (pin)=>{
    return (<div className="actions-right">
    <Button
      justIcon
      round
      simple
      onClick={() => {
        let tempo_status = pin.isEnable;
        if (tempo_status === true) {
          tempo_status = 'off';
          this.setState((prevState) => {
            return { actives_socket: prevState.actives_socket - 1 }
          });
        }
        else if (tempo_status === false) {
          tempo_status = 'on';
          this.setState((prevState) => {
            return { actives_socket: prevState.actives_socket + 1 }
          });
        }
        axios.patch(`http://${ip_config}/api/v1/pin/${pin.id}/toggle`,
          { id: this.props.location.arduino.id, pinNumber: pin.Number, command: tempo_status });
        for (let i = 0; i < this.state.tempo_arduino.pins.length; i++) {
          if (this.state.tempo_arduino.pins[i][0] === pin.name)
            this.state.tempo_arduino.pins[i][2] = "active";
        }
        this.setState((prevState) => {
          return { tempo_arduino: prevState.tempo_arduino }
        });

      }}
      color="success"
      className="edit"
    ><Power /></Button>{""}
    <Button
      justIcon
      round
      simple
      onClick={() => {
        let tempo_status = pin.isEnable;
        if (tempo_status === true) {
          tempo_status = 'off';
          this.setState((prevState) => {
            return { actives_socket: prevState.actives_socket - 1 }
          });
        }
        else if (tempo_status === false) {
          tempo_status = 'on';
          this.setState((prevState) => {
            return { actives_socket: prevState.actives_socket + 1 }
          });
        }
        axios.patch(`http://${ip_config}/api/v1/pin/${pin.id}/toggle`,
          { id: this.props.location.arduino.id, pinNumber: pin.Number, command: tempo_status });
        for (let i = 0; i < this.state.tempo_arduino.pins.length; i++) {
          if (this.state.tempo_arduino.pins[i][0] === pin.name)
            this.state.tempo_arduino.pins[i][2] = "deactive";
        }
        this.setState((prevState) => {
          return { tempo_arduino: prevState.tempo_arduino }
        });

      }}
      color="danger"
      className="edit"
    >
      <Power />
    </Button>

    <Button
      justIcon
      round
      simple
      onClick={() => {
        this.setState({
          openDialogConFirmDeleteSocket: true, pinSelected: pin
        })

      }}
      color="warning"
      className="remove"
    >
      <Close />
    </Button>
  </div>);
  }
  returnToBoard() {
    if (this.state.check_back_to_list !== false)
      if (this.props.location.role === "admin" || localStorage.getItem("role") === "admin")
        return <Redirect to={{ pathname: '/admin/ManagementList', role: "admin" }} />;
      else
        return <Redirect to={{ pathname: '/admin/ManagementListUser', role: "user" }} />;
  }
  redirect = () => {
    if (localStorage.getItem('role') === null)
      return <Redirect to={{ pathname: '/' }} />;   
  }
  pre_returnToBoard() {
    this.setState({ check_back_to_list: true });
  }
  handleCloseDelete=()=> {
    this.setState({ openDialogConFirmDeleteSocket: false });
  }
  handleDeletePin=()=> {
    if (this.state.pinSelected.isEnable === true)
      this.setState((prevState) => {
        return { actives_socket: prevState.actives_socket - 1, numberOfSocket: prevState.numberOfSocket - 1 }
      });
    else
      this.setState((prevState) => {
        return { numberOfSocket: prevState.numberOfSocket - 1 }
      });

    axios.delete(`http://${ip_config}/api/v1/pin/${this.state.pinSelected.id}`);
    for (let i = 0; i < this.state.tempo_arduino.pins.length; i++) {
      if (this.state.tempo_arduino.pins[i][0] === this.state.pinSelected.name)
        this.state.tempo_arduino.pins.splice(i, 1);
    }
    this.setState((prevState) => {
      return { tempo_arduino: prevState.tempo_arduino }
    });
    this.setState({ openDialogConFirmDeleteSocket: false });
  }
  getDataSubmit = (data) =>{
    axios.get(`http://${ip_config}/pin/find?name=${data}`).then(
      res => {
        let status = res.data[0].isEnable === true ? "active" : "deactive";
        let pin = [
          res.data[0].name,
          res.data[0].pinNumber,
          status,
          res.data[0].id,
         this.dataFormat(pin)];
         this.state.tempo_arduino.pins.push(pin);       
         this.setState((prevState) => ({ actives_socket: prevState.actives_socket + 1, numberOfSocket: prevState.numberOfSocket + 1 }))
  })
 
  } 
  addSocket=(arduinoId,Name,PinNumber,IsEnable,LastCurrentValue)=>{
    console.log(arduinoId,Name,PinNumber,IsEnable,LastCurrentValue);
  axios.post(`http://${ip_config}/api/v1/pin`,
      {
        boardId: arduinoId,
        name: Name,
        pinNumber: PinNumber,
        isEnable: IsEnable,
        lastCurrentValue: LastCurrentValue
      })
      .then(res => {
        this.getDataSubmit(Name);           
      });
      this.handleClose();
      // .catch(error =>{
      //     if(error.response.status === 401)
      //     return <Redirect to = {{pathname : "/"}} />
      //     alert(`Can not add this socket
      //         `);
      //     })
  }
  async componentDidMount() {   
    if (this.props.location.arduino === undefined)
      this.setState({ tempo_arduino: { pins: [] } });
    else if (this.props.location.arduino !== undefined) {
    const data =   this.props.location.arduino.pins.map((pin) => {
      let status = pin.isEnable === true ? "active" : "deactive";
     return [
        pin.name,
        pin.pinNumber,
        status,
        pin.id,
        pin.actions = this.dataFormat(pin)
    ];
    });
    await this.setState({ tempo_arduino: {pins:data,id : this.props.location.arduino.id} });
    }
  }
  handleClose=()=> {
    this.setState({ openDialogAddSocket: false });
  }
  handleOpenModal() {
    this.setState({ openDialogAddSocket: true });
  }
  startAll() {
    axios.put(`http://${ip_config}/api/v1/board/${this.props.location.arduino.id}/toggle-all`,
      { id: this.props.location.arduino.id, command: 'on' });
    for (let i = 0; i < this.state.tempo_arduino.pins.length; i++) {
      this.state.tempo_arduino.pins[i].isEnable = true;
    }
    this.setState((prevState) => {
      return { tempo_arduino: prevState.tempo_arduino, actives_socket: this.props.location.arduino.pins.length }
    });
  }
  stopAll() {
    axios.put(`http://${ip_config}/api/v1/board/${this.props.location.arduino.id}/toggle-all`,
      { id: this.props.location.arduino.id, command: 'off' });
    for (let i = 0; i < this.state.tempo_arduino.pins.length; i++) {
      this.state.tempo_arduino.pins[i].isEnable = false;
    }
    this.setState((prevState) => {
      return {
        tempo_arduino: prevState.tempo_arduino,
        actives_socket: 0
      }
    });
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div >
        {this.redirect()}
        {this.returnToBoard()}
        <GridContainer>
          <GridContainer>
            <AdminNavbar
              sidebarMinimize={this.sidebarMinimize.bind(this)}
              miniActive={this.state.miniActive}
              {...rest}
            />
            <GridItem xs={2} sm={2} md={2} />

            <GridItem xs={4} sm={4} md={4}>
              <Card>
                <CardBody>

                  <CustomNavPills 
                    tabButton="Socket" 
                    content = {this.state.actives_socket +"/"+ this.state.numberOfSocket} 
                  />
                  
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={4} sm={4} md={4}>
              <Card>
                <CardBody>

                  <CustomNavPills 
                  tabButton="Current" 
                  content=""
                  />

                </CardBody>
              </Card>
            </GridItem>

          </GridContainer>

          <GridItem xs={12}>
            <Card>

              <CardHeaderCustom text="Information" />         
            
              <br />

              <GridContainer>
                <GridItem xs={1} />
               
                <GridItem xs={4}>
                  <CustomFormLabel text='Name' />
                </GridItem>

                <GridItem xs={4}>
                  <CustomFormLabel text='Provision code' />                 
                </GridItem>

                <GridItem xs={2}>
                  <CustomFormLabel text='Description' />                 
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem xs={1} />
              
                <GridItem xs={4}>
                  <h4 style={{ border: "groove", width: "90%" }}>
                    {this.props.location.arduino === undefined ? "":this.props.location.arduino.name}
                  </h4>
                </GridItem>

                <GridItem xs={4}>
                  <h4 style={{ border: "groove", width: "90%" }}>
                    {this.props.location.arduino === undefined ? "":this.props.location.arduino.provisionCode}
                  </h4>
                </GridItem>

                <GridItem xs={2}>
                  <h4 style={{ border: "groove", width: "90%" }}>
                    {this.props.location.arduino === undefined ? "":this.props.location.arduino.description}
                  </h4>
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem xs={1} />

                <GridItem xs={10}>
                  <Button 
                    color="rose" 
                    onClick={() => this.handleOpenModal()}
                  > 
                    Socket 
                    <br /> 
                    <Add />
                  </Button>
                  {""}                 
                </GridItem>

              </GridContainer>
              <CardBody>
                {/* <ReactTable
                  data={this.state.tempo_arduino === undefined ? [] : this.state.tempo_arduino.pins}
                  filterable
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name"
                    },
                    {
                      Header: "PinNumber",
                      accessor: "pinNumber",

                    },
                    {
                      Header: "Status",
                      accessor: "isEnable",
                      Cell: ({ value }) => String(value)
                    },
                    {
                      Header: "Current",
                      accessor: "id"
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                      style: { textAlign: "center" }
                    }
                  ]
                  }
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                /> */}
                <Table
                tableHead={[
                  "Name",
                  "PinNumber",                  
                  "Status",
                  "Current",
                  "Actions"
                ]}
                tableData={this.state.tempo_arduino.pins === undefined ? [] : this.state.tempo_arduino.pins}
                customCellClasses={[
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  
                ]}
                customClassesForCells={[0, 1,2,3,4]}
                customHeadCellClasses={[
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                ]}
                customHeadClassesForCells={[0,1,2,3,4]}
              />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer xs={12}>
          <Button color="rose" onClick={() => this.stopAll()}>Stop all</Button>
          <Button color="success" onClick={() => this.startAll()}>Start all</Button>
          <Button color="primary" onClick={this.pre_returnToBoard} >Back to list</Button>
        </GridContainer>

        <DialogAddSocket 
          tempo_arduino={this.state.tempo_arduino} 
          open={this.state.openDialogAddSocket}
          onCancel = {this.handleClose}
          onConfirm = {this.addSocket}
        />

        <DialogConFirmDeleteSocket  
          open={this.state.openDialogConFirmDeleteSocket}
          onConfirm={this.handleDeletePin} 
          onCancel={this.handleCloseDelete}
        />
      </div>

    )
  }
}
export default withStyles(extendedTablesStyle)(Board_pin);