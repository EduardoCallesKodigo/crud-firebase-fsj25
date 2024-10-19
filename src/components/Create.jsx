import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { db } from '../firebase-config/firebase'

const Create = () => {

  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()
  
  const productsCollection = collection(db, "products")

  //Funcion para guardar un registro nuevo
  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, {description: description, price: price})
    navigate('/')
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col">

          <h1>Craete Product</h1>
          
          <div className="card">
            <div className="card-body">
                
                <form onSubmit={store}>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Description</label>
                    <input
                      value={description}
                      onChange={ (e) => setDescription(e.target.value) }
                      type="text"
                      className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Price</label>
                    <input
                      value={price}
                      onChange={ (e) => setPrice(e.target.value) }
                      type="number"
                      className='form-control'
                    />
                  </div>

                  <button type='submit' className='btn btn-primary'>Save</button>
                </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Create