import axios from 'axios';
import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopcontext } from '../Context/Context';
import uploadimage from "../IMages/upload.jpg";

export default function Addproduct() {
  const[name,setName]=useState("");
  const[brand,setBrand]=useState("");
  const[category,setCategory]=useState("");
  const[price,setPrice]=useState("");
  const[created,setCreated]=useState("");
  const[image,setIMage]=useState("");

  const{getdata}=useContext(shopcontext);

  const navigate = useNavigate();


  /////////////////////////////////////////Add image 

  async function addimage(e){

    let file = e.target.files[0];

    function convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    const base64Image = await convertImageToBase64(file);

    setIMage(base64Image)
  }


  ////////////////////////////////////////Add product 
  function addproduct(e){
    e.preventDefault(); 
    let Data = {
      name:name,
      Brand:brand,
      category:category,
      price:price,
      image:image,
      created_at:created,
    }
axios.post("http://localhost:3006/phones",Data)
.then(()=>{getdata()
navigate('/');}
).catch((res)=>alert(res.message))



  }
  return (
    <div className='container bg-info p-3 rounded mt-5' style={{width:"40%"}}>
<h2 style={{textAlign:"center",marginBottom:"20px"}}>Add product</h2>

<form onSubmit={addproduct}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setName(e.target.value) } required></input>
  
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Brand</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setBrand(e.target.value)} required></input>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Category</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setCategory(e.target.value)} required></input>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Price</label>
    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setPrice(e.target.value)} required></input>
   
  </div>
  <div class="mb-3">
  
    <p>upload image </p>
       <label  for="file_input">
      <img src={image ? image : uploadimage}   style={{width:"120px",borderRadius:"20px",display:"block"}} alt=''></img>
      </label>
    
    <input type="file" onChange={addimage}  class="form-control" hidden  aria-describedby="emailHelp" id="file_input"  required></input>
   
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Created At</label>
    <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setCreated(e.target.value)} required></input>
   
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>



    </div>
  )
}
