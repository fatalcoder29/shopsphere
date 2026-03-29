import React, { useState } from 'react';
import { placeOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const items = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      }));
      await placeOrder({ items });
      localStorage.removeItem('cart');
      setCart([]);
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      alert('Failed to place order. Please login first!');
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty!</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={styles.card}>
              <div>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.price}>₹{item.price} x {item.quantity}</p>
              </div>
              <button
                style={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={styles.total}>
            <h2>Total: ₹{getTotalPrice()}</h2>
            <button style={styles.orderBtn} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    minHeight: '90vh',
  },
  title: {
    color: '#1a1a2e',
    marginBottom: '2rem',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1.2rem',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  name: {
    color: '#1a1a2e',
    marginBottom: '0.3rem',
  },
  price: {
    color: '#e94560',
    fontWeight: 'bold',
  },
  removeBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    marginTop: '1rem',
  },
  orderBtn: {
    padding: '0.8rem 2rem',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default Cart;