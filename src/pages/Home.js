import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);


  const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
};
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.category}>{product.category_name}</p>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>₹{product.price}</p>
            <p style={styles.stock}>Stock: {product.stock}</p>
            <button style={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#1a1a2e',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  name: {
    color: '#1a1a2e',
    marginBottom: '0.5rem',
  },
  category: {
    color: '#888',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  description: {
    color: '#555',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  price: {
    color: '#e94560',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  stock: {
    color: '#888',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.7rem',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Home;