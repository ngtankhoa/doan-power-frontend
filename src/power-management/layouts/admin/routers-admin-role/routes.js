import DashboardIcon from "@material-ui/icons/Dashboard";
import ManagementList from "../../../views/admin/management/ManagementList"
import ProvisioningList from "../../../views/admin/management/ProvisioningList"
import AccountList from "../../../views/admin/management/AccountList"
import Boardpin from "../../../views/admin/device-detail/Boardpin"
import UserProfile from "../../../views/admin/user-profile/UserProfile";

var dashRoutes = [
    {
      path: "/ProvisioningList",
      name: "Provisioning list",
      icon: DashboardIcon,
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
      icon: DashboardIcon,
      component: AccountList,     
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
export default dashRoutes;