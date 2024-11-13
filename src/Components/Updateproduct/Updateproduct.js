/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shopcontext } from '../Context/Context';

import axios from 'axios';

export default function Updateproduct() {
  const [upload,setUpload]=useState(false);
  const{productId}=useParams();
  const [phonedetails,setPhonedetails]=useState([]);
  const[image,setIMage]=useState("");
  const{getdata}=useContext(shopcontext);
  const navigate = useNavigate();

  let name = useRef();
  let brand = useRef();
  let category = useRef();
  let price = useRef();
  let imageurl = useRef();
  let created = useRef();

  //////////////////////////////////////////////filter product by id
function filterProductById(){
  axios.get("http://localhost:3006/phones/"+productId)
  .then((res)=>setPhonedetails(res.data))
}

useEffect(()=>{
  filterProductById()

},[])

  ///////////////////////////////////////////////////add image 

  async function addimage(e){
    setUpload(true)
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

  ////////////////////////////////////////////////// update product

  function updateproduct(e){
    e.preventDefault(); 
    
    let Data = {
      name:name.current.value,
      Brand:brand.current.value,
      category:category.current.value,
      price:price.current.value,
      image:upload ? image:phonedetails.image,
      created_at:created.current.value,
    }
  
    axios.put("http://localhost:3006/phones/" + productId,Data)
    .then(()=>{
      getdata()
      navigate("/")})
    .catch((res)=>alert(res.message))
 

  }




  return (
    <div>
          <div className='container bg-info p-3 rounded mt-5' style={{width:"40%"}}>
<h2 style={{textAlign:"center",marginBottom:"20px"}}>Update product</h2>

<form onSubmit={updateproduct}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1"  aria-describedby="emailHelp" ref={name}  defaultValue={phonedetails.name}  required></input>
  
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Brand</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={brand} required defaultValue={phonedetails.Brand}  ></input>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Category</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={category}  required defaultValue={phonedetails.category} ></input>
    
  </div>
  <div class="mb-3">
    <label  class="form-label">Price</label>
    <input type="number" class="form-control"  aria-describedby="emailHelp"  ref={price}  required defaultValue={phonedetails.price}></input>
   
  </div>
  <div class="mb-3">
    <p>Upload image</p>
    <label  for="file_input">
      <img src={upload ? image : phonedetails.image}   style={{width:"120px",borderRadius:"20px",display:"block"}} alt=''></img>
      </label>
    
    <input type="file" onChange={addimage} ref={imageurl}  class="form-control" hidden  aria-describedby="emailHelp" id="file_input"  ></input>
   
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Created At</label>
    <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  ref={created} defaultValue={phonedetails.created_at}></input>
   
  </div>
  <button type="submit" class="btn btn-primary">Update</button>
</form>


    </div>

    </div>
  )
}
