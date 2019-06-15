import Login from "../../views/auth/Login.jsx";
import ForgetPassword from "../../views/auth/ForgetPassword.jsx";
import Register from "../../views/auth/Register.jsx";
import ResetPassword from "../../views/auth/ResetPassword.jsx";
import EmailConFirm from "../../views/auth/EmailConFirm";
var routes = [
    {
      collapse: true,
      name: "Auth",    
      icon: Image,
      state: "pageCollapse",
      views: [
        {
          path: "/login",
          name: "Login Page",
          mini: "l",
          component: Login,
          layout: "/auth"
        },
        {
          path: "/register",
          name: "Register Page",
          mini: "r",
          component: Register,
          layout: "/auth"
        },
        {
          path: "/forgetpassword",
          name: "Forgetpassword Page",
          mini: "f",
          component: ForgetPassword,
          layout: "/auth"
        },
        {
          path: "/resetpassword",
          name: "ResetPassword Page",
          mini: "rs",
          component: ResetPassword,
          layout: "/auth"
        },
        {
          path: "/emailconfirm",
          name: "EmailConfirm Page",
          mini: "rs",
          component: EmailConFirm,
          layout: "/auth"
        },          
      ]
    }   
]
export default routes;