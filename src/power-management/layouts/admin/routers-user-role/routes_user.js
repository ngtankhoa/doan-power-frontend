
import DashboardIcon from "@material-ui/icons/Dashboard";
import ManagementListUser from "../../../views/admin/management/ManagementList_User";
import Boardpin from "../../../views/admin/device-detail/Boardpin"
import UserProfile from "../../../views/admin/user-profile/UserProfile";

var routes_user = [
    {
      path: "/ManagementListUser",
      name: "Your Management List",
      rtlName: "لوحة القيادة",
      icon: DashboardIcon,
      // component: Dashboard,
      component : ManagementListUser,
      layout: "/admin"
    },     
    {
      path: "/boardpin",
      name :"Device detail",
      icon: DashboardIcon,
      component : Boardpin,
      layout :"/admin"
    },
    {
      path: "/UserProfile",
      name: "User Profile",
      icon: DashboardIcon,
      component: UserProfile,     
      layout: "/admin"
    },  
      
     
   
    ]
    export default routes_user;    