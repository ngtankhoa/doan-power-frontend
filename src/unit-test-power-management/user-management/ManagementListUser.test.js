import React from "react";
import ManagementListUser from "../../power-management/views/admin/management/ManagementList_User";
import {shallow,mount} from "enzyme";

 
describe('Test case for testing ManagementListUser',() =>{
    let wrapper;
    wrapper = mount(shallow(<ManagementListUser />).get(0));
    const instance = wrapper.instance();
    it('delete board check',()=>
    {  
        
    });

    it('add board check',()=>{

    });  
    
    it('active board check',()=>{

    });

    it('pagination check',()=>{

    });
    
    })
        
    