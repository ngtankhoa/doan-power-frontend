import React from "react";
import ProvisioningList from "../../power-management/views/admin/management/ProvisioningList";
import {shallow,mount} from "enzyme";
// import shallowToJson from "enzyme-to-json";



const mockdata = [[1,'ARD-001',(
    <div >
            
    </div>
  )]]
const mock_isDeleting = 1;  
describe('Test case for testing ProvisioningList',() =>{
    let wrapper;
    wrapper = mount(shallow(<ProvisioningList />).get(0));
    const instance = wrapper.instance();
    it('delete board check',()=>
    {  
    wrapper.setState({data:mockdata,isDeleting:mock_isDeleting});
    instance.getDataDelete(); 
    expect(wrapper.state('data').length).toBe(0);    
    });

    it('add board check',()=>{

    });     
    it('pagination check',()=>{

    });
    
    

    })
        
    