import React, { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Wedding Cake', strain: 'Hybrid', thc: '24%', cbd: '<1%', price: 45, type: 'hybrid', gram: '3.5g' },
  { id: 2, name: 'Blue Dream', strain: 'Sativa', thc: '20%', cbd: '<1%', price: 40, type: 'sativa', gram: '3.5g' },
  { id: 3, name: 'OG Kush', strain: 'Indica', thc: '22%', cbd: '<1%', price: 42, type: 'indica', gram: '3.5g' },
  { id: 4, name: 'Sour Diesel', strain: 'Sativa', thc: '19%', cbd: '<1%', price: 38, type: 'sativa', gram: '3.5g' },
  { id: 5, name: 'Girl Scout Cookies', strain: 'Hybrid', thc: '23%', cbd: '<1%', price: 48, type: 'hybrid', gram: '3.5g' },
  { id: 6, name: 'Purple Kush', strain: 'Indica', thc: '21%', cbd: '<1%', price: 44, type: 'indica', gram: '3.5g' },
  { id: 7, name: 'Sunset Sherbert', strain: 'Hybrid', thc: '25%', cbd: '<1%', price: 50, type: 'hybrid', gram: '3.5g' },
  { id: 8, name: 'Charlotte\'s Web', strain: 'CBD', thc: '<1%', cbd: '18%', price: 60, type: 'cbd', gram: '3.5g' },
  { id: 9, name: 'Jack Herer', strain: 'Sativa', thc: '20%', cbd: '<1%', price: 42, type: 'sativa', gram: '3.5g' },
  { id: 10, name: 'Granddaddy Purple', strain: 'Indica', thc: '18%', cbd: '<1%', price: 46, type: 'indica', gram: '3.5g' },
  { id: 11, name: 'Pineapple Express', strain: 'Hybrid', thc: '21%', cbd: '<1%', price: 43, type: 'hybrid', gram: '3.5g' },
  { id: 12, name: 'Northern Lights', strain: 'Indica', thc: '16%', cbd: '<1%', price: 40, type: 'indica', gram: '3.5g' },
]

const STRAIN_BADGES = {
  indica: { class: 'badge-indica', label: 'Indica' },
  sativa: { class: 'badge-sativa', label: 'Sativa' },
  hybrid: { class: 'badge-hybrid', label: 'Hybrid' },
  cbd: { class: 'badge-cbd', label: 'CBD' },
}

export default function App() {
  const [cart, setCart] = useState([])
  const [checkedOut, setCheckedOut] = useState(false)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  if (checkedOut) {
    return (
      <div className="app">
        <div className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Sale Complete</h1>
            <p style={{ color: '#6b7280', marginBottom: 24 }}>Total: ${total.toFixed(2)} • {totalItems} items</p>
            <div className="notice" style={{ maxWidth: 400, margin: '0 auto' }}>
              <strong>Note:</strong> This is a demo of Canopy POS by Vantaire Systems. 
              The full version includes Metrc integration, OMMA compliance, inventory management, 
              customer loyalty, and website sync — all for $99-199/month.
            </div>
            <button 
              className="checkout-btn" 
              style={{ marginTop: 24, maxWidth: 200 }}
              onClick={() => { setCheckedOut(false); setCart([]) }}
            >
              New Sale
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="logo">C</div>
          <h1>Canopy POS</h1>
        </div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>
          Vantaire Systems • Demo v1.0
        </div>
      </div>

      <div className="notice">
        ✅ <strong>Built on modern cloud infrastructure</strong> — Supabase + Vercel. No crashes during peak hours. 
        Offline mode available. OMMA-compliant by default.
      </div>

      <div className="main">
        <div>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>Products</h2>
          <div className="products">
            {PRODUCTS.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => addToCart(product)}
              >
                <div style={{ marginBottom: 8 }}>
                  <span className={`badge ${STRAIN_BADGES[product.type].class}`}>
                    {STRAIN_BADGES[product.type].label}
                  </span>
                </div>
                <div className="name">{product.name}</div>
                <div className="strain">{product.gram}</div>
                <div className="thc">THC: {product.thc} {product.cbd !== '<1%' && `• CBD: ${product.cbd}`}</div>
                <div className="price">${product.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart">
          <h2>Cart ({totalItems})</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div style={{ fontSize: 40, marginBottom: 8 }}>🛒</div>
              <p>Tap products to add</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <div className="name">{item.name}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>
                        {item.qty > 1 && `${item.qty} × `}{item.gram}
                      </div>
                    </div>
                    <div className="price">${(item.price * item.qty).toFixed(0)}</div>
                    <button onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span className="label">Total</span>
                <span className="amount">${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={() => setCheckedOut(true)}>
                Complete Sale
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
