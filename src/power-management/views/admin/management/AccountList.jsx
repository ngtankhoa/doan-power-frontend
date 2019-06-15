import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import withStyles from "@material-ui/core/styles/withStyles";
import ip_config from '../../../ip_config'
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Assignment from "@material-ui/icons/Assignment";
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  }
  componentDidMount() {
    axios.get(`http://${ip_config}/api/v1/user/?page=1&limit=20`).then(res => {
      console.log(res.data);
      const listAccount1 = res.data.userList;
      this.setState({ listAccount: listAccount1 });
      const datax = listAccount1.map((account, key) => {
        return [      
           account.fullName,
           account.role,
           account.emailAddress,
           account.emailStatus,         
        ];
      })
      this.setState({ data: datax });
    }).catch(error => {
      return <Redirect to={{ pathname: "/" }} />
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={3} />      
          <GridItem xs={6} >
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Account List</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHead={[
                    "Role",
                    "Name",
                    "Email",
                    "Confirm"
                  ]}
                  tableData={this.state.data}
                  customCellClasses={[
                    classes.center,
                    classes.center,
                    classes.center,
                    classes.center,
                  ]}
                  customClassesForCells={[0, 1,2,3]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.center,
                    classes.center,
                    classes.center,
                  ]}
                  customHeadClassesForCells={[0, 1,2,3]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={3} />
          
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(extendedTablesStyle)(AccountList);
