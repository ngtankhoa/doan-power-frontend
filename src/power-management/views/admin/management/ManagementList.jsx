import React from "react";
import Grid from "@material-ui/core/Grid";
// import Favorite from "@material-ui/icons/Favorite";
import Power from "@material-ui/icons/PowerSettingsNew";
import FlashOn from "@material-ui/icons/FlashOn";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeaderCustom from "../../../components/CardHeader.jsx";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import Close from "@material-ui/icons/Close";
import DialogActivateBoard from "./components/DialogActivateBoard.jsx";
import DialogConfirmUnassign from "./components/DialogConfirmUnassign";
import InputNormal from "../../../components/InputNormal";
import ip_config from '../../../ip_config'
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

class ManagementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArduino: [],
      data: [],
      tempo_arduino: [],
      checkPin: false,
      openDialogActive:false,
      openDialogConfirmDelete: false,     
      isDeleting: null,
      seacrh_provisionCode: null, 
      isSearching : true  ,
      currentPage : 1,
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }
  // Định dạng dữ liệu sau khi lấy data từ server về
  dataFormat = (arduino)=>{
    return (
      <div className="actions-right">
        <Button  justIcon  round simple color="info" className="like"
          onClick={() => {        
            this.setState({ tempo_arduino: arduino });
            this.setState({ checkPin: true });
          }}                  
        >
          <FlashOn />
        </Button>{" "}
        {
          <Button justIcon color="success" round simple
            onClick={
            async () => {
                await  axios.patch(`http://${ip_config}/api/v1/board/${arduino.id}`, {id:arduino.id, status: "active" });
                const list = await this.state.data.map((item) => {
                  if (item[0] === arduino.provisionCode) {
                    item[3] = "active";
                  }
                  return item;
                });
                await this.setState({ data: list });
              }
            }>
            <Power />
          </Button>
        }
        {" "}
        {
          <Button  justIcon color="danger" round  simple
            onClick={
            async () => {                                      
                await axios.patch(`http://${ip_config}/api/v1/board/${arduino.id}`, { status: "deactive" });
                const list = await this.state.data.map((item) => {
                  if (item[0] === arduino.provisionCode) {
                    item[3] = "deactive";
                  }
                  return item;
                });
                await this.setState({ data: list });
              }
            }>
            <Power/>
          </Button>
        }
        {" "}
        <Button justIcon round simple color="danger" className="remove"
          onClick={async() => {
             
          await axios.get(`http://${ip_config}/api/v1/board/${arduino.id}`).then(
              async res =>{  
              console.log(res.data.boardRecord)                          
              this.setState({isDeleting:res.data.boardRecord});
              this.setState({ openDialogConfirmDelete: true });             
            }
          )                                                                  
          }}            
        >
          <Close />
        </Button>{" "}
      </div>
    )
  }
  componentWillMount(){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  }
  componentDidMount() {    
    axios.get(`http://${ip_config}/api/v1/board?page=1&limit=5&isAssigned=true&role=admin`)
      .then(async res => { 
        console.log(res.data.boardList);
        await this.setState({ listArduino: res.data.boardList });
        console.log(this.state.listArduino)
        const datax = this.state.listArduino.map( (arduino, key) => { 
          let date = new Date(arduino.updatedAt).toLocaleString('vi-VN');
          console.log(date);     
          return [
             arduino.provisionCode,
             arduino.name,
             arduino.description,
             arduino.status, 
             date,       
             arduino.ownedBy.fullName,
             this.dataFormat(arduino),
            //  arduino.pins,             
          ];
        })
        if(datax.length >=5)
        this.setState({ data: datax.slice(0,5) });
        else
        this.setState({ data: datax });
      }).catch(error =>{
        return <Redirect to ={{ pathname : "/"}} />     
      });;
    
  } 
  //chuyển trang để xem pin
  renderRedirect() { 
    if (this.state.checkPin !== false)
    if(localStorage.getItem('role') === "admin")
    return <Redirect to={{
      pathname: '/admin/boardpin',
      arduino: this.state.tempo_arduino,
      role: "admin",
    }} />
    else return <Redirect to={{
      pathname: '/admin/boardpin',
      arduino: this.state.tempo_arduino,
      role: "user",
    }} />
  }
  // search 1 thiết bị
  search = () => {   
    let getIdFromProvisioncode;
    if(this.seacrh_provisionCode.getValue() === "") return;
    console.log(this.seacrh_provisionCode.getValue());
    console.log(this.state.listArduino);
    for(let i=0;i<this.state.listArduino.length;i++)
      if(this.state.listArduino[i].provisionCode === this.seacrh_provisionCode.getValue() )
       getIdFromProvisioncode = this.state.listArduino[i].id;
    if(getIdFromProvisioncode === undefined)    
    {
      alert(`You do not have this device in list`)
      return;
    }  
    else this.setState({isSearching : false});
    axios.get(`http://${ip_config}/api/v1/board/${getIdFromProvisioncode}`,{role:localStorage.getItem('role')}).then(
      res => {
        console.log(res.data)
        let arduino = res.data.boardRecord;  
        arduino.ownedBy = arduino.ownedBy.fullName;      
        arduino.actions = this.dataFormat(arduino);
        let date = new Date(arduino.updatedAt).toLocaleString('vi-VN');
        let new_data = [arduino.provisionCode,arduino.name,arduino.description,arduino.status,date,arduino.ownedBy,arduino.actions];
        this.setState({data:[]});
        this.state.data.push(new_data);
        this.setState((prevState)=>({data:prevState.data}));
      }
    )
  }
  // trở lại danh sách sau khi xem 1 thiết bị
  back = ()=>{
    this.setState({isSearching : true});
    axios.get(`http://${ip_config}/api/v1/board?page=1&limit=5&isAssigned=true&role=admin`)
      .then(async res => { 
        console.log(res.data.boardList);
        await this.setState({ listArduino: res.data.boardList });
        
        const datax = this.state.listArduino.map( (arduino, key) => { 
          let date = new Date(arduino.updatedAt).toLocaleString('vi-VN');          
          return [
             arduino.provisionCode,
             arduino.name,
             arduino.description,
             arduino.status, 
             date,       
             arduino.ownedBy.fullName,
             this.dataFormat(arduino),
            //  arduino.pins,
          ];
        })
        this.setState({ data: datax });
      }).catch(error =>{
        return <Redirect to ={{ pathname : "/"}} />     
      });;
  }
  // hiển thị nút search hoặc back
  handleSearch = ()=>{
    if(this.state.isSearching === true)
    return (<GridItem xs={1}>
      <Button 
    style={{marginTop:"5%"}} 
    onClick={this.search} 
    color="success"    
    >
      Search
    </Button>
    </GridItem>);
    else if(this.state.isSearching === false)
    return (<GridItem xs={1}> 
      <Button 
      style={{marginTop:"5%"}} 
      onClick={this.back} 
      color="success"
      >
        Back to list
      </Button>
      </GridItem>);
  }
  // mở dialog activate 1 thiết bị
  handleOpenModal() {  
    this.setState({ openDialogActive: true });  
  }
  // xử lí activate 1 thiết bị
  getDataSubmit = (data) => {  
    axios.get(`http://${ip_config}/api/v1/board?page=1&limit=50&isAssigned=true&role=admin`)
    .then(async res=>{
        await this.setState({ listArduino: res.data.boardList });
        for(let i=0;i<res.data.boardList.length;i++)
        if(res.data.boardList[i].provisionCode === data)
        {
          let date = new Date(res.data.boardList[i].updatedAt).toLocaleString('vi-VN');
          res.data.boardList[i].ownedBy = res.data.boardList[i].ownedBy.fullName
          res.data.boardList[i].actions =  this.dataFormat(res.data.boardList[i]);
          let new_data = [res.data.boardList[i].provisionCode,
          res.data.boardList[i].name,                 
          res.data.boardList[i].description,
          res.data.boardList[i].status,
          date,
          res.data.boardList[i].ownedBy,
          res.data.boardList[i].actions,
          // res.data.boardList[i].pins
        ];
          this.state.data.unshift(new_data);
          if(this.state.data.length >= 5)
          this.setState({ data: this.state.data.slice(0,5) });  
          else
          this.setState({ data: this.state.data});

        }       
    }).catch(error =>{
      alert(`Some error happened`)
    }) ;
  }
  activateBoard = (ProvisionCode,SocketQuantity,Name,Description)=>{
    axios.put(`http://${ip_config}/api/v1/board/assign`,{
      provisionCode :ProvisionCode,
      socketQuantity :SocketQuantity,
      name:Name,
      description :Description ,
    }).then(async()=>{
      await this.getDataSubmit(ProvisionCode);
       
    }
    ).catch(error =>{
      if(error.response.status === 401)
      return <Redirect to = {{pathname : "/"}} />
      alert(`Can not activate this board
         `);
    });
  }
  handleCloseDialogActivate = ()=>{
    this.setState({ openDialogActive: false }); 
  }
  // xử lí unassign 1 thiết bị
  getDataDelete = ()=>{
    for(let i=0;i<this.state.data.length;i++)
      if(this.state.isDeleting.provisionCode === this.state.data[i][0])
        this.state.data.splice(i,1)   
    this.setState((prevState)=>({data:prevState.data}));
  }
  handleDelete=()=>{
    
    if (this.state.isDeleting.status === 'deactive') {     
      for (let i = 0; i < this.state.isDeleting.pins.length; i++)
        axios.delete(`http://${ip_config}/api/v1/pin/${this.state.isDeleting.pins[i].id}`);
      axios.put(`http://${ip_config}/api/v1/board/unassign`,{id : this.state.isDeleting.id}).then(()=>{
        this.getDataDelete();      
      this.handleCloseDelete();
    } );}
    else {
      alert(
        "Can not delete activating board \n" +
        "Please turn off before deleting"
      )
    }
  }
  handleCloseDelete = ()=> {
    this.setState({ openDialogConfirmDelete: false });
  }

  // xem prev
  prev(){
    axios.get(`http://${ip_config}/api/v1/board?page=${this.state.currentPage - 1}&limit=5&isAssigned=true&role=admin`)
    .then(async res => { 
      this.setState({currentPage:this.state.currentPage - 1});
      const datax = res.data.boardList.map( (arduino, key) => { 
        let date = new Date(arduino.updatedAt).toLocaleString('vi-VN');
        console.log(date);     
        return [
           arduino.provisionCode,
           arduino.name,
           arduino.description,
           arduino.status, 
           date,       
           arduino.ownedBy.fullName,
           this.dataFormat(arduino),
          //  arduino.pins,             
        ];
      })
      this.setState({ data: datax });
    }).catch(error =>{
      return <Redirect to ={{ pathname : "/"}} />     
    });;
  }
  // xem next 
  next(){
    axios.get(`http://${ip_config}/api/v1/board?page=${this.state.currentPage + 1}&limit=5&isAssigned=true&role=admin`)
    .then(async res => { 
      this.setState({currentPage:this.state.currentPage + 1});           
      const datax = res.data.boardList.map( (arduino, key) => { 
        let date = new Date(arduino.updatedAt).toLocaleString('vi-VN');    
        return [
           arduino.provisionCode,
           arduino.name,
           arduino.description,
           arduino.status, 
           date,       
           arduino.ownedBy.fullName,
           this.dataFormat(arduino),
          //  arduino.pins,             
        ];
      })
      this.setState({ data: datax });
    }).catch(error =>{
      return <Redirect to ={{ pathname : "/"}} />     
    });;
  }
  render() { 
    const { classes } = this.props;
    return (
      <div>
        {this.renderRedirect()}
          <Grid container justify="center">
            <Card>
              <CardHeaderCustom text="Management List" />         
              <br></br>
              <GridContainer>
                
                <GridItem xs={5}>
                  <Button 
                  style={{ marginTop: "2%", marginLeft: "8%" }} 
                  onClick={() => this.handleOpenModal()}
                  color="success" 
                  >
                    Activate device
                  </Button>
                </GridItem>
                <Grid item xs={3}> 
                  {this.state.currentPage !== 1 ? <Button onClick={this.prev}>Prev</Button> : null} 
                  {this.state.data.length !== 0 ? <Button style={{marginLeft:"2%"}} onClick={this.next}>Next</Button> : null}        
                            
                </Grid>
                <GridItem xs={2}>
                  <InputNormal 
                  placeholder="Provision Code" 
                  ref={ref=>this.seacrh_provisionCode = ref}
                  center 
                  />
                </GridItem> 

                {this.handleSearch()}

              </GridContainer>

              <CardBody>
                <Table
                tableHead={[
                  "Provision code",
                  "Name",                  
                  "Description",
                  "Status",
                  "Last updated",
                  "Owned by",
                  "Detail/Active/Deactive/Unassign"
                ]}
                tableData={this.state.data}
                customCellClasses={[
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  
                ]}
                customClassesForCells={[0,1,2,3,4,5,6]}
                customHeadCellClasses={[
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.center, 
                  classes.center,       
                ]}
                customHeadClassesForCells={[0,1,2,3,4,5,6]}
                />
              </CardBody>
            </Card>
          </Grid>

          <DialogActivateBoard           
          open={this.state.openDialogActive} 
          onConfirm={this.activateBoard} 
          onCancel={this.handleCloseDialogActivate} 
          />
                                                  
          <DialogConfirmUnassign 
          open = {this.state.openDialogConfirmDelete}
          onConfirm={this.handleDelete} 
          onCancel={this.handleCloseDelete}
          />
                                                      
      </div>
    );
  }
}
export default withStyles(extendedTablesStyle)(ManagementList);


