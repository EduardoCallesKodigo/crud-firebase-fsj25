import React, { useEffect, useState } from 'react'   
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config/firebase'

//Para que funcione Swet Alert 2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const Show = () => {

  // 1. Creamos nuestra variable para capturar los datos usando un useSatate
  const [products, setProducts] = useState( [] )

  // 2. Creamos una referencia de nuestra base de datos con la collection(products)
  const productsCollection = collection(db, "products")

  // 5. Funcion para eliminar un registro
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
  }

  // 6. Funcion para confirmar eliminacion con Swet Alert 2
  const confirmDelete = (id, description) => {
    Swal.fire({
      title: `Are you sure you want to remove the product: ${description}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire({
          title: "Deleted!",
          text: `${description} has been deleted.`,
          icon: "success"
        });
      }
    });
  }

  // 3. Creamos una funcion para leer (Read) todos los productos
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log(data.docs);
    
    setProducts(
      data.docs.map( (doc) => ( {...doc.data(), id:doc.id} ) )
    )
  }

  // 4 Necesitamos un hook useEffect para que llame los datos
  useEffect( () => {
    getProducts()
    // console.log(products)
  } , [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            
            <div className="d-grid gap-2">
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'><i class="fa-solid fa-file-circle-plus"></i> Create</Link>
            </div>

            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { products.length > 0 ? 
                    products.map( (product) => (
                      <tr key={ product.id }>
                        <td>{ product.description }</td>
                        <td>{ product.price }</td>
                        <td>
                          <Link to={`/edit/${product.id}`} className='btn btn-light me-2'>Edit</Link>
                          <button onClick={ () => { confirmDelete(product.id, product.description) } } className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    )) : <tr><td><h3>Loading...</h3></td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show