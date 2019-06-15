import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import ip_config from '../../../ip_config';
import DialogAddBoard from "./components/DialogAddBoard";
import Close from "@material-ui/icons/Close";
import DialogConfirmDeleteBoard from "./components/DialogConfirmDeleteBoard";
import InputNormal from "../../../components/InputNormal.jsx";
import Grid from "@material-ui/core/Grid";

import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Assignment from "@material-ui/icons/Assignment";
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

class ProvisioningList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArduino: [],
      data: [],      
      provisionCode: null,
      openDialogAdd : false,
      openDialogConfirmDelete : false,
      isDeleting : {}  ,
      isSearching : true,
      currentPage : 1,
       
    };

    this.getDataSubmit = this.getDataSubmit.bind(this);
    this.handleCloseDialogAddBoard = this.handleCloseDialogAddBoard.bind(this);
    this.getDataDelete = this.getDataDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDeleteBoard = this.handleDeleteBoard.bind(this);
    this.search = this.search.bind(this);
    this.back = this.back.bind(this);
    this.searchHandle = this.searchHandle.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }
  formatData(arduino){
    return (
      <div className="actions-right">
        <Button 
        justIcon round simple color="danger" className="remove"
        onClick={()=>{         
              this.setState({openDialogConfirmDelete:true});
              this.setState({isDeleting:arduino})      
        }}
        >
          <Close />
        </Button>       
      </div>
    )
  }
  componentWillMount(){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  }
  componentDidMount() { 
    
    axios.get(`http://${ip_config}/api/v1/board?page=1&limit=50&isAssigned=false&role=admin`).then(res => {             
        this.setState({ listArduino: res.data.boardList });
        const datax = res.data.boardList.map((arduino, key) => {
          return [
            arduino.id,
            arduino.provisionCode,
            this.formatData( arduino.id)        
          ];
        });
        if(datax.length >=5)
        this.setState({ data: datax.slice(0,5) });
        else
        this.setState({ data: datax });
        console.log(datax);
      }).catch(error =>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
       this.props.history.push('/');     
      });
  }
  // search hoặc back to list sau khi search
  search = () => {
    let getIdFromProvisioncode;
    if(this.provisioncode.getValue() === ""){ alert(`Please give ProvsionCode`); return;}
    this.setState({isSearching:false});
    for(let i=0;i<this.state.data.length;i++)
      if(this.state.listArduino[i].provisionCode === this.provisioncode.getValue() )
       getIdFromProvisioncode = this.state.listArduino[i].id;
       if(getIdFromProvisioncode === undefined)    
       {
         alert(`You do not have this device in list`)
         return;
       }
    axios.get(`http://${ip_config}/api/v1/board/${getIdFromProvisioncode}`,{role:localStorage.getItem('role')}).then(
      res => {
        console.log(res.data)
        let arduino = res.data.boardRecord;       
        arduino.action = this.formatData(arduino);
        let new_data = [arduino.id,arduino.provisionCode,arduino.action];
        this.setState({data:[]});
        this.state.data.push(new_data);
        this.setState((prevState)=>({data:prevState.data}));
      }
    )
  }
  back(){
    const datax = this.state.listArduino.map((arduino, key) => {
      return [
         arduino.id,
         arduino.provisionCode,
         this.formatData( arduino.provisionCode)        
      ];
    })
    this.setState({ data: datax,isSearching:true });
    
  } 

  // xử lí thêm thiết bị
  getDataSubmit(data){
    axios.get(`http://${ip_config}/api/v1/board?page=1&limit=50&isAssigned=false&role=admin`).then(
      res=>{
        console.log(res.data);
        this.setState({listArduino:res.data.boardList});
        for(let i=0;i<res.data.boardList.length;i++)
        if(res.data.boardList[i].provisionCode === data)
        {
          res.data.boardList[i].actions =  this.formatData(res.data.boardList[i].id);
          let new_data = [res.data.boardList[i].id,
          res.data.boardList[i].provisionCode,                 
          res.data.boardList[i].actions];
          // xử lí lấy 5 thằng đầu
          this.state.data.unshift(new_data);
          if(this.state.data.length >= 5)
          this.setState({ data: this.state.data.slice(0,5) });  
          else
          this.setState({ data: this.state.data});
        }      
      }
    )  
    
  }
  addBoard = (provisionCode,maxPins)=>{
    axios.post(`http://${ip_config}/api/v1/board`,{
      provisionCode :provisionCode,
      maxPins :maxPins,
    }).then(()=>{
       this.getDataSubmit(provisionCode);
    }
    ).catch(error=>{
        alert(`Can not add this provision code`);
    });
  }
  handleCloseDialogAddBoard(){
    this.setState({openDialogAdd:false});
  }

  // xử lí xóa thiết bị
  handleCloseDelete(){
    this.setState({openDialogConfirmDelete:false});
  }
  getDataDelete(){
    for(let i=0;i<this.state.data.length;i++)
      if(this.state.isDeleting === this.state.data[i][0])
        this.state.data.splice(i,1)   
    this.setState((prevState)=>({data:prevState.data}));
  }
  handleDeleteBoard() { 
    axios.delete(`http://${ip_config}/api/v1/board/${this.state.isDeleting}`).then(res=>{
        this.getDataDelete(); 
    });
         
    this.handleCloseDelete();
   
  }
  
  //pagination
  searchHandle (){
    if(this.state.isSearching === true)
    return (<Button 
    style={{marginTop:"5%"}} 
    onClick={this.search}
    color="success"   
    >
      Search
    </Button>
   );
    else if(this.state.isSearching === false)
    return (<Button 
    style={{marginTop:"5%"}} 
    onClick={this.back}
    color="success" 
    >
      Back to list
    </Button>
    );
  }
  prev(){
    axios.get(`http://${ip_config}/api/v1/board?page=${this.state.currentPage - 1}&limit=5&isAssigned=false&role=admin`).then(async res => {             
      await this.setState({currentPage:this.state.currentPage - 1});
      const datax = res.data.boardList.map((arduino, key) => {
        return [
          arduino.id,
          arduino.provisionCode,
          this.formatData( arduino.id)        
        ];
      })
      this.setState({ data: datax });
      console.log(datax);
    }).catch(error =>{
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
     this.props.history.push('/');     
    });
  }
  next(){      
    axios.get(`http://${ip_config}/api/v1/board?page=${this.state.currentPage + 1}&limit=5&isAssigned=false&role=admin`).then(async res => {             
      await this.setState({currentPage:this.state.currentPage + 1});
      const datax = res.data.boardList.map((arduino, key) => {
        return [
          arduino.id,
          arduino.provisionCode,
          this.formatData( arduino.id)        
        ];
      })
      this.setState({ data: datax });
      console.log(datax);
    }).catch(error =>{
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
     this.props.history.push('/');     
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={3}>
            
          </GridItem>
          <GridItem xs={6} >
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Provisioning List</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Id",
                  "Provision Code",                  
                  "Delete"
                ]}
                tableData={this.state.data}
                customCellClasses={[
                  classes.center,
                  classes.center,
                  
                ]}
                customClassesForCells={[0, 1]}
                customHeadCellClasses={[
                  classes.center,
                  classes.center,
        
                ]}
                customHeadClassesForCells={[0,1]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={3}>
          <div style={{marginTop:"10%"}}> 
            <Button 
              color="success"
              
              onClick={()=>{this.setState({openDialogAdd : true})}}
            >
              Add Device
            </Button>
            <hr />
            <hr />
            {this.searchHandle()}
            <InputNormal
              ref={ref=>this.provisioncode = ref}  
              placeholder = "Provision Code"
              
            /> 
          </div>
        </GridItem>
        <DialogAddBoard
          open={this.state.openDialogAdd}
          onConfirm= {this.addBoard}
          onCancel= {this.handleCloseDialogAddBoard}
        />

        <DialogConfirmDeleteBoard
          open = {this.state.openDialogConfirmDelete}
          onConfirm = {this.handleCloseDelete}
          onCancel = {this.handleDeleteBoard}
        />
        </GridContainer>
        <Grid container justify = "center"> 
        {this.state.currentPage !== 1 ? <Button onClick={this.prev}>Prev</Button> : null}
          
        {this.state.data.length !== 0 ? <Button onClick={this.next}>Next</Button> : null}                                       
        </Grid>
      </div>
    );
  }
}

export default withStyles(extendedTablesStyle)(ProvisioningList);
