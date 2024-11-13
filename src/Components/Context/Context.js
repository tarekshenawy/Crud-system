import React, { createContext, useState ,useEffect} from 'react';
import axios from 'axios';

export const shopcontext = createContext();


const Shopcontextprovider =(props)=>{
    const [phones,setPhones]=useState([]);

    function getdata(){
        axios.get("http://localhost:3006/phones")
        .then((res)=>setPhones(res.data))

    }

    useEffect(()=>{
        getdata()

    },[])

    ///////////////////////delete product 
    function deleteproduct(productID){
      
        axios.delete(`http://localhost:3006/phones/${productID}`)
        .then(()=>getdata())
        
      }

const contextvalue ={phones,getdata,deleteproduct}


return(
    <shopcontext.Provider value={contextvalue}>
        {props.children}

    </shopcontext.Provider>


)
  
}
export default Shopcontextprovider;
   



