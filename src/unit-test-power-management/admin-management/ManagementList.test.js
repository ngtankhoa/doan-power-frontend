import React from "react";
import ManagementList from "../../power-management/views/admin/management/ManagementList";
import {shallow,mount} from "enzyme";

describe('Test case for testing ManagementList',() =>{
    let wrapper;
    wrapper = mount(shallow(<ManagementList />).get(0));
    const instance = wrapper.instance();
    it('unassign board ',()=>
    {  
        
    });

    it('activate board ',()=>{

    });   
    
    it('active board ',()=>{

    });

    it('pagination',()=>{

    });
    
    

    })
        
    