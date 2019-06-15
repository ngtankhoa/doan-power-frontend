import DashboardIcon from "@material-ui/icons/Dashboard";
import ManagementListUser from "../../../views/admin/management/ManagementList_User";
import UserProfile from "../../../views/admin/user-profile/UserProfile";
// import Login from "../auth/Login";
import Face from "@material-ui/icons/Face";
// import Power from "@material-ui/icons/PowerSettingsNew"

var routes_sidebar_user = [
     {
            path: "/ManagementListUser",
            name: "Your Management List",
            rtlName: "لوحة القيادة",
            icon: DashboardIcon,
            component : ManagementListUser,
            layout: "/admin"
      },
      {
            path: "/UserProfile",
            name: "User Profile",
            icon: Face,
            component: UserProfile,     
            layout: "/admin"
      }, 
      
    
]
export default routes_sidebar_user;