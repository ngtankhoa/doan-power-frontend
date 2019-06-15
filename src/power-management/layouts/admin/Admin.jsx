import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
// import AdminNavbar from "components/Navbars/AdminNavbar.jsx";

import Sidebar from "components/Sidebar/Sidebar.jsx";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "./routers-admin-role/routes";
import routes_user from "./routers-user-role/routes_user";
import routes_sidebar from "./routers-admin-role/routes_sidebar"
import routes_sidebar_user from "./routers-user-role/routes_sidebar_user"

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

import { Redirect } from "react-router-dom";
// import axios from "axios";
// import ip_config from '../ip_config'

var ps;

class Adminlayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: true,
      image: image,
      color: "blue",
      bgColor: "black",
      hasImage: true,
      fixedClasses: "dropdown",
      data:[]
      
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
    
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleBgColorClick = bgColor => {
    this.setState({ bgColor: bgColor });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/admin/full-screen-maps";
  }
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  redirect = ()=>{
    if(localStorage.getItem('role') === null)
    return <Redirect to={{pathname: "/"}} />
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div>
      {this.redirect()}
      <div className={classes.wrapper}>    
        <Sidebar
          routes={ localStorage.getItem('role') === 'admin' ? routes_sidebar :routes_sidebar_user}
          logoText={"FIRST"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          bgColor={this.state.bgColor}
          miniActive={this.state.miniActive}
          // userName={this.state.data[0].name}
          {...rest}
        />
        
      
      
        <div className={mainPanel} ref="mainPanel">
        
          {/* <AdminNavbar
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            handleDrawerToggle={this.handleDrawerToggle}
            brandText="Power management"
            {...rest}
          />     */}
          {
             localStorage.getItem('role') === 'admin' ?
             <div>
               <Switch>{this.getRoutes(routes)}</Switch>
             </div> :(
                <div>
                 <Switch>{this.getRoutes(routes_user)}</Switch>
              </div>
             )
          }
          {/* <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleBgColorClick={this.handleBgColorClick}
            handleHasImage={this.handleHasImage}
            color={this.state["color"]}
            bgColor={this.state["bgColor"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
          /> */}
        </div>
      </div>
      </div>
    );
  }
}

Adminlayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Adminlayout);
