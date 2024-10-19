import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config/firebase'

const Show = () => {

  // 1. Creamos nuestra variable para capturar los datos usando un useSatate
  const [products, setProducts] = useState( [] )

  // 2. Creamos una referencia de nuestra base de datos con la collection(products)
  const productsCollection = collection(db, "products")

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
    <div>
      { 
        products.length > 0 ? products.map( (product, index) => {
          return <h3 key={index}>{product.description}</h3>
        }) : <h3>Loadin.... </h3>
      }
    </div>
  )
}

export default Show