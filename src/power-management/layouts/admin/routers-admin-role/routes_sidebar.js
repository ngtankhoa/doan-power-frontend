import DashboardIcon from "@material-ui/icons/Dashboard";
import Face from "@material-ui/icons/Face";
// import Power from "@material-ui/icons/PowerSettingsNew"
import Assessment from "@material-ui/icons/Assessment";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import ManagementList from "../../../views/admin/management/ManagementList"
import ProvisioningList from "../../../views/admin/management/ProvisioningList"
import AccountList from "../../../views/admin/management/AccountList"
// import Boardpin from "../device-detail/Boardpin"
import UserProfile from "../../../views/admin/user-profile/UserProfile";
// import Login from "../auth/Login";

var dashRoutes = [
    {
      path: "/ProvisioningList",
      name: "Provisioning list",
      icon: Assessment,
      component: ProvisioningList,   
      layout: "/admin"
    },
    {
      path: "/ManagementList",
      name: "Management list",
      icon: DashboardIcon,
      component: ManagementList,     
      layout: "/admin"
    },
    {
      path: "/ListAccount",
      name: "Account list",
      icon: AssignmentInd,
      component: AccountList,     
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
export default dashRoutes;