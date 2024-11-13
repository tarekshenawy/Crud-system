
import React, { useContext} from 'react'
import { Link } from 'react-router-dom';
import { shopcontext } from '../Context/Context';

export default function Home() {
   const {phones,deleteproduct}=useContext(shopcontext);
    let i=0;

    const handleRefresh = () => {
      window.location.reload(); 
    };

  return (
    

  
    <div className="pt-5">
        <h1 className="text-center">Products</h1>

        <div  className="d-flex p-2 justify-content-between align-items-center container" style={{width:"90%"}}>

                <div className="d-flex ">
                        <button type="button" className="btn btn-primary mx-1"><Link to="/createproduct" style={{textDecoration:"none",color:"white"}}>Create product</Link></button>
                    <button type="button" className="btn btn-outline-success" onClick={handleRefresh}>Refresh</button>
                </div>
            
                 <form className="d-flex">
                  <input type="text" className="form-control me-2" placeholder="Search" aria-label="Search"></input>
                  <button className="btn btn-primary" type="submit">Search</button>
                </form>

        </div>

        <table className="table container mt-5" style={{width:"85%"}}>
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Brand</th>
      <th scope="col">Category</th>
      <th scope="col">Price</th>
      <th scope="col">Image</th>
      <th scope="col">Created </th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        phones.map((el,index)=>{
            return(
                <tr key={index}>
                <th scope="row" >{i+=1}</th>
                <td>{el.name}</td>
                <td>{el.Brand}</td>
                <td>{el.category}</td>
                <td>{el.price}</td>
                <td><img src={el.image} alt='' style={{width:"100px"}}></img></td>
                <td>{el.created_at}</td>
                <td><button type="button" className="btn btn-primary mx-1" ><Link to={`/updateproduct/${el.id}`} style={{textDecoration:"none",color:"white"}}>update</Link></button></td>
                <td><button type="button" className="btn btn-danger" onClick={()=>deleteproduct(el.id)}>Delete</button></td>
             
              </tr>

            )
        })
    }
   

  </tbody>
</table>


    </div>

  )
}
