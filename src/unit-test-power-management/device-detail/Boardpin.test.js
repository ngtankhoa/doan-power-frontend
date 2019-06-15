import React from "react";
import Boardpin from "../../power-management/views/admin/device-detail/Boardpin";
import {shallow,mount} from "enzyme";

describe('Test case for testing Boardpin',() =>{
    let wrapper;
    wrapper = mount(shallow(<Boardpin />).get(0));
    const instance = wrapper.instance();
    it('delete socket ',()=>
    {  
      
    });

    it('add socket ',()=>{

    });     
    it('active pin',()=>{

    });
    
    

    })
        
    