import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { usePageTitle } from '../hooks/usePageTitle'

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  unit: string
}

interface Order {
  id: string
  created_at: string
  company: string
  cif: string | null
  contact: string
  phone: string
  email: string
  city: string
  address: string
  county: string
  notes: string | null
  items: OrderItem[]
  subtotal: number
}

interface ContactMessage {
  id: string
  created_at: string
  name: string
  phone: string
  company: string | null
  message: string
}

export function AdminPage() {
  usePageTitle('Admin – Comenzi')
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders')
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoadingBtn, setAuthLoadingBtn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { email: session.user.email || '' } : null)
      setAuthLoading(false)
    })
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email || '' } : null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ]).then(([ordersRes, messagesRes]) => {
      setOrders(ordersRes.error ? [] : (ordersRes.data as Order[]) || [])
      setMessages(messagesRes.error ? [] : (messagesRes.data as ContactMessage[]) || [])
      setLoading(false)
    })
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoadingBtn(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setAuthLoadingBtn(false)
    if (error) {
      setAuthError(error.message === 'Invalid login credentials' ? 'Email sau parolă incorectă.' : error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (authLoading) {
    return (
      <div className="admin-page">
        <p>Se încarcă...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="admin-page">
        <div className="admin-login-card">
          <h1>Comenzi RoofLVL</h1>
          <p className="admin-login-subtitle">Autentificare admin</p>
          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="admin-password">Parolă</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {authError && <p className="admin-error">{authError}</p>}
            <button type="submit" className="btn-primary" disabled={authLoadingBtn} style={{ marginTop: '0.75rem', boxShadow: 'none', borderRadius: '6px' }}>
              {authLoadingBtn ? 'Se conectează...' : 'Conectare'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' })
  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON', minimumFractionDigits: 2 }).format(n)

  return (
    <div className="admin-page">
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Admin – Comenzi</span>
      </div>
      <header className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h1 className="page-title">Admin</h1>
          <div className="admin-tabs">
            <button
              type="button"
              className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Comenzi ({orders.length})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              Mesaje contact ({messages.length})
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="admin-user-email">{user.email}</span>
          <button type="button" className="btn-ghost" onClick={handleLogout}>
            Deconectare
          </button>
        </div>
      </header>

      {loading ? (
        <p>Se încarcă...</p>
      ) : activeTab === 'orders' ? (
        orders.length === 0 ? (
          <p className="admin-empty">Nicio comandă încă.</p>
        ) : (
          <div className="admin-orders-list">
            {orders.map((order) => (
            <div key={order.id} className="admin-order-card">
              <div className="admin-order-header">
                <span className="admin-order-id">#{order.id.slice(0, 8)}</span>
                <span className="admin-order-date">{formatDate(order.created_at)}</span>
                <span className="admin-order-total">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="admin-order-details">
                <div><strong>{order.company}</strong></div>
                <div>{order.contact} · {order.phone}</div>
                <div>{order.email}</div>
                <div>{order.address}, {order.city}, {order.county}</div>
                {order.notes && <div className="admin-order-notes">Observații: {order.notes}</div>}
              </div>
              <div className="admin-order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="admin-order-item">
                    {item.productName} — {item.quantity} {item.unit} × {formatCurrency(item.price)} = {formatCurrency(item.quantity * item.price)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        )
      ) : messages.length === 0 ? (
        <p className="admin-empty">Niciun mesaj de contact încă.</p>
      ) : (
        <div className="admin-orders-list">
          {messages.map((msg) => (
            <div key={msg.id} className="admin-order-card">
              <div className="admin-order-header">
                <span className="admin-order-id">#{msg.id.slice(0, 8)}</span>
                <span className="admin-order-date">{formatDate(msg.created_at)}</span>
              </div>
              <div className="admin-order-details">
                <div><strong>{msg.name}</strong></div>
                <div>{msg.phone}</div>
                {msg.company && <div>Firmă: {msg.company}</div>}
                <div className="admin-order-notes">{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
