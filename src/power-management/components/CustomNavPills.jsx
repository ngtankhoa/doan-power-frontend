import React from 'react'
import { withStyles } from '@material-ui/core';
import NavPills from "components/NavPills/NavPills.jsx";
import Dashboard from "@material-ui/icons/Dashboard";
import PropTypes from "prop-types";
function CustomNavPills (props) {
 
    return (
        <NavPills
        color="rose"
        horizontal={{
          tabsGrid: { xs: 4, sm: 4, md: 4 },
          contentGrid: { xs: 8, sm: 8, md: 8 }
        }}
        tabs={[
          {
            tabButton: props.tabButton,
            tabIcon: Dashboard,
            tabContent: (
              <h1 style={{ textAlign: "center" }}>
                {props.content}
              </h1>
            )
          }
        ]}
      />
    )
  
}
CustomNavPills.propTypes = {
  content :PropTypes.string,
  tabButton : PropTypes.string
}
CustomNavPills.defaultProps = {
  content:'0/0',
  tabButton:''
}
export default withStyles()(CustomNavPills)
