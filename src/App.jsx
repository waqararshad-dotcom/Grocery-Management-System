import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // ✅ Order History
  const [view, setView] = useState('shop');

  // ✅ LOGIN STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const API = 'http://localhost:5000/api';

  const getData = () =>
    axios.get(`${API}/items/all`).then(res => setItems(res.data));

  useEffect(() => {
    getData();
  }, []);

  // --- 📸 PICTURE LOGIC ---
  const getPic = (name) => {
    if (!name)
      return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400';

    const n = name.toLowerCase().trim();

    if (n.includes('milk'))
      return 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_354060824-1024x683.jpeg?w=400';

    if (n.includes('apple'))
      return 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Fuji_apple.jpg?w=400';

    if (n.includes('tomato'))
      return 'https://www.alimentarium.org/sites/default/files/media/image/2016-10/AL001-02%20tomate_0.jpg?w=400';

    if (n.includes('bread'))
      return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400';

    if (n.includes('egg'))
      return 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg?w=400';

    if (n.includes('chicken') || n.includes('meat'))
      return 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400';

    if (n.includes('rice'))
      return 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_195457011-1024x683.jpeg?w=400';

    if (n.includes('toothpaste'))
      return 'https://domf5oio6qrcr.cloudfront.net/medialibrary/10048/GettyImages-983312054.jpg?w=400';

    if (n.includes('oil'))
      return 'https://www.healthyishandhappy.com/wp-content/uploads/2021/08/4e8cb2a7-80e7-4f22-b44a-49cc1cfff67c-1536x864.jpg?w=400';

    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400';
  };

  // --- 🔐 LOGIN FUNCTION ---
  const handleLogin = (e) => {
    e.preventDefault();

    if (user.username === 'admin' && user.password === '123') {
      setIsLoggedIn(true);
    } else {
      alert("Wrong Username or Password!");
    }
  };

  // --- 🛒 CONFIRM ORDER ---
  const confirmOrder = () => {
    if (cart.length === 0) {
      return alert("Cart is empty!");
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((s, i) => s + i.price, 0),
      date: new Date().toLocaleString()
    };

    setOrders([newOrder, ...orders]);

    setCart([]);

    alert("Order Placed Successfully!");
  };

  // --- ❌ DELETE ITEM ---
  const deleteItem = (id) => {
    axios.delete(`${API}/items/delete/${id}`).then(() => {
      alert("Deleted!");
      getData();
    });
  };

  // --- 🔐 LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div style={loginOverlay}>
        <div style={loginBox}>
          <h1 style={{ color: '#27ae60' }}>GROCERY-MAX</h1>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value
                })
              }
              required
            />

            <button type="submit" style={confirmBtn}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: 'Arial',
        background: '#f8f9fa',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <nav
        style={{
          background: '#27ae60',
          color: 'white',
          padding: '15px 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2 style={{ margin: 0 }}>GROCERY-MAX</h2>

        <div>
          <button
            onClick={() => setView('shop')}
            style={navBtn}
          >
            Shop
          </button>

          <button
            onClick={() => setView('orders')}
            style={navBtn}
          >
            Orders
          </button>

          <button
            onClick={() => setView('admin')}
            style={navBtn}
          >
            Manage Inventory
          </button>

          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              ...navBtn,
              background: '#e74c3c',
              color: 'white'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: '30px' }}>

        {/* SHOP VIEW */}
        {view === 'shop' && (
          <div style={{ display: 'flex', gap: '20px' }}>

            {/* Items */}
            <div
              style={{
                flex: 3,
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '20px'
              }}
            >
              {items.map(i => (
                <div key={i._id} style={cardStyle}>
                  <img
                    src={getPic(i.name)}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover'
                    }}
                    alt="product"
                  />

                  <div style={{ padding: '15px', textAlign: 'center' }}>
                    <h3
                      style={{
                        textTransform: 'capitalize',
                        margin: '5px 0'
                      }}
                    >
                      {i.name}
                    </h3>

                    <h2
                      style={{
                        color: '#27ae60',
                        margin: '10px 0'
                      }}
                    >
                      Rs. {i.price}
                    </h2>

                    <button
                      onClick={() => setCart([...cart, i])}
                      style={addBtn}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart */}
            <div style={sidebar}>
              <h3 style={{ textAlign: 'center' }}>
                🛒 Cart ({cart.length})
              </h3>

              <hr />

              {cart.map((c, idx) => (
                <p key={idx}>
                  {c.name} - Rs. {c.price}
                </p>
              ))}

              <h3>
                Total: Rs.{' '}
                {cart.reduce((s, i) => s + i.price, 0)}
              </h3>

              <button
                style={confirmBtn}
                onClick={confirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}

        {/* ORDERS VIEW */}
        {view === 'orders' && (
          <div
            style={{
              maxWidth: '800px',
              margin: 'auto',
              background: 'white',
              padding: '20px',
              borderRadius: '15px'
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                color: '#27ae60'
              }}
            >
              All Orders
            </h2>

            {orders.length === 0 ? (
              <p style={{ textAlign: 'center' }}>
                No Orders Yet
              </p>
            ) : (
              orders.map(order => (
                <div key={order.id} style={orderCard}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <b>{order.date}</b>

                    <b style={{ color: '#27ae60' }}>
                      Rs. {order.total}
                    </b>
                  </div>

                  <hr />

                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.name} - Rs. {item.price}
                    </p>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {/* ADMIN VIEW */}
        {view === 'admin' && (
          <div
            style={{
              maxWidth: '800px',
              margin: 'auto',
              background: 'white',
              padding: '20px',
              borderRadius: '15px'
            }}
          >
            <h3 style={{ textAlign: 'center' }}>
              Inventory Management
            </h3>

            {items.map(i => (
              <div key={i._id} style={listRow}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  <img
                    src={getPic(i.name)}
                    width="50"
                    height="50"
                    style={{ borderRadius: '5px' }}
                    alt="small-pic"
                  />

                  <b style={{ textTransform: 'capitalize' }}>
                    {i.name}
                  </b>
                </div>

                <button
                  onClick={() => deleteItem(i._id)}
                  style={delBtn}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- CSS ---
const navBtn = {
  background: 'white',
  color: '#27ae60',
  border: 'none',
  padding: '8px 15px',
  marginLeft: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const cardStyle = {
  background: 'white',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
};

const addBtn = {
  width: '100%',
  padding: '10px',
  background: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const delBtn = {
  background: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const sidebar = {
  flex: 1,
  background: 'white',
  padding: '20px',
  borderRadius: '15px',
  height: 'fit-content',
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
};

const confirmBtn = {
  width: '100%',
  padding: '12px',
  background: '#f39c12',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px'
};

const listRow = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  borderBottom: '1px solid #eee',
  justifyContent: 'space-between'
};

const loginOverlay = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#27ae60'
};

const loginBox = {
  background: 'white',
  padding: '40px',
  borderRadius: '20px',
  width: '350px',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '10px',
  border: '1px solid #ddd',
  boxSizing: 'border-box'
};

const orderCard = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '15px',
  marginBottom: '15px',
  background: '#fafafa'
};

export default App;