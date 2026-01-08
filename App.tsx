
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Store, 
  MessageSquare, 
  ClipboardList, 
  PackageCheck, 
  Settings, 
  Bell, 
  Search,
  ShoppingCart,
  ChevronRight,
  Moon,
  Calendar,
  HelpCircle,
  LogOut,
  MoreVertical,
  Plus
} from 'lucide-react';
import { SUPPLIERS, PRODUCTS, MOCK_ORDERS, MOCK_CHATS } from './mockData';
import { CartItem, Product, Supplier, Order, Message } from './types';
import SuppliersView from './views/SuppliersView';
import ChatView from './views/ChatView';
import OrdersView from './views/OrdersView';
import ReceivingView from './views/ReceivingView';
import AdminView from './views/AdminView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'admin' | 'suppliers' | 'chat' | 'orders' | 'receiving'>('admin');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Lifted state to sync between Chat, Orders, and Receiving
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_CHATS);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (quantity <= 0) return prev.filter(item => item.id !== product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity } : item);
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    
    // Also update order status inside chat messages if they exist
    setMessages(prev => {
      const newMessages = { ...prev };
      Object.keys(newMessages).forEach(supplierId => {
        newMessages[supplierId] = newMessages[supplierId].map(msg => {
          if (msg.type === 'order' && msg.orderId === orderId && msg.orderData) {
            return { ...msg, orderData: { ...msg.orderData, status: newStatus } };
          }
          return msg;
        });
      });
      return newMessages;
    });
  };

  const handleAddMessage = (supplierId: string, message: Message) => {
    setMessages(prev => ({
      ...prev,
      [supplierId]: [...(prev[supplierId] || []), message]
    }));
    
    // If it's an order message, add it to the global orders list too
    if (message.type === 'order' && message.orderData) {
      setOrders(prev => [message.orderData!, ...prev]);
    }
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'admin': return <AdminView onFullView={() => setActiveTab('orders')} />;
      case 'suppliers': return (
        <SuppliersView 
          suppliers={SUPPLIERS} 
          products={PRODUCTS} 
          cart={cart}
          onAddToCart={addToCart} 
          selectedSupplierId={selectedSupplierId}
          onSelectSupplier={setSelectedSupplierId}
          onOpenCart={() => setIsCartOpen(true)}
        />
      );
      case 'chat': return (
        <ChatView 
          suppliers={SUPPLIERS} 
          messages={messages} 
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddMessage={handleAddMessage}
          onNavigate={setActiveTab}
        />
      );
      case 'orders': return <OrdersView orders={orders} suppliers={SUPPLIERS} onAddOrder={() => setActiveTab('suppliers')} />;
      case 'receiving': return <ReceivingView orders={orders} suppliers={SUPPLIERS} onComplete={handleUpdateOrderStatus} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <aside className="w-60 glass-sidebar flex flex-col p-4 border-r border-slate-200/50">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-white rounded-full"></div>
              <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1"></div>
              <div className="w-0.5 h-4 bg-white/40 rounded-full -mt-0.5"></div>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight">KitchenFlow</span>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Main Menu</p>
            <nav className="space-y-0.5">
              <SidebarItem active={activeTab === 'admin'} icon={<LayoutDashboard />} label="Overview" onClick={() => setActiveTab('admin')} />
              <SidebarItem active={activeTab === 'suppliers'} icon={<Store />} label="Suppliers" onClick={() => setActiveTab('suppliers')} badge="New" />
              <SidebarItem active={activeTab === 'chat'} icon={<MessageSquare />} label="Messages" onClick={() => setActiveTab('chat')} count={2} />
              <SidebarItem active={activeTab === 'orders'} icon={<ClipboardList />} label="Purchase Orders" onClick={() => setActiveTab('orders')} />
              <SidebarItem active={activeTab === 'receiving'} icon={<PackageCheck />} label="Receiving" onClick={() => setActiveTab('receiving')} />
            </nav>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">System</p>
            <nav className="space-y-0.5">
              <SidebarItem active={false} icon={<Bell />} label="Notifications" onClick={() => {}} />
              <SidebarItem active={false} icon={<Calendar />} label="Schedule" onClick={() => {}} />
              <SidebarItem active={false} icon={<HelpCircle />} label="Help Center" onClick={() => {}} />
              <SidebarItem active={false} icon={<Settings />} label="Settings" onClick={() => {}} />
            </nav>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-200/50">
          <div className="bg-white/50 rounded-xl p-2 flex items-center gap-2 border border-white/40 shadow-sm">
            <img src="https://picsum.photos/seed/chef/80/80" className="w-8 h-8 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Josiah B.</p>
              <p className="text-[10px] text-slate-500 font-medium">Executive Chef</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1" onClick={() => alert("Logging out...")}>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 flex items-center justify-between px-6 bg-transparent">
          <div>
            <h2 className="text-base font-bold text-slate-900">Welcome back, Josiah 👋</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group hidden lg:block">
              <Search className="absolute inset-y-0 left-3 flex items-center pointer-events-none w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Quick search commands..." className="w-64 h-9 pl-9 pr-3 bg-white/80 border border-slate-200/50 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/5 shadow-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              <HeaderIcon icon={<Moon className="w-4 h-4" />} />
              <HeaderIcon icon={<Bell className="w-4 h-4" />} dot />
              <div className="w-px h-5 bg-slate-300 mx-1" />
              <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-1.5 bg-slate-900 text-white px-3 h-9 rounded-lg font-bold text-xs shadow-md hover:bg-slate-800 transition-all active:scale-95">
                <ShoppingCart className="w-3.5 h-3.5" />
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 pt-0 overflow-hidden">
          <div className="h-full bg-white/95 rounded-2xl border border-white shadow-xl main-canvas overflow-hidden flex flex-col">
             <div className="px-6 pt-4 pb-2 flex items-center gap-6 border-b border-slate-100">
               <SubNavItem label="Dashboard" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
               <SubNavItem label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
               <SubNavItem label="Suppliers" active={activeTab === 'suppliers'} onClick={() => setActiveTab('suppliers')} />
               <SubNavItem label="Receiving" active={activeTab === 'receiving'} onClick={() => setActiveTab('receiving')} />
               
               <div className="ml-auto flex items-center gap-2">
                 <button onClick={() => setActiveTab('suppliers')} className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors shadow-lg shadow-slate-900/10">
                    <Plus className="w-3.5 h-3.5" />
                    New Order
                 </button>
                 <button className="p-1.5 bg-slate-100 text-slate-400 rounded-lg hover:text-slate-600" onClick={() => alert("Context menu...")}>
                   <MoreVertical className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <div className="flex-1 overflow-y-auto no-scrollbar relative">
                {renderActiveView()}
             </div>
          </div>
        </main>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-96 bg-white h-screen shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Review Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-[10px]">Your cart is empty</p>
                </div>
              ) : (
                SUPPLIERS.filter(s => cart.some(item => item.supplierId === s.id)).map(supplier => (
                  <div key={supplier.id} className="space-y-2">
                    <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">{supplier.name}</h3>
                    {cart.filter(item => item.supplierId === supplier.id).map(item => (
                      <div key={item.id} className="bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                        <img src={item.image} className="w-9 h-9 rounded-lg object-cover bg-white" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-500">{item.quantity} x {item.unit}</p>
                        </div>
                        <p className="font-bold text-xs text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Order Amount</span>
                <span className="text-xl font-black">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={() => {
                  const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
                  const newOrder: Order = {
                    id: newOrderId,
                    supplierId: cart[0].supplierId, // Simplified for demo
                    status: 'Pending',
                    timestamp: new Date().toISOString(),
                    total: cartTotal,
                    items: [...cart]
                  };
                  setOrders(prev => [newOrder, ...prev]);
                  
                  // Add to chat too
                  const newMessage: Message = {
                    id: `msg-${Date.now()}`,
                    senderId: 'user',
                    type: 'order',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    orderId: newOrderId,
                    orderData: newOrder
                  };
                  handleAddMessage(cart[0].supplierId, newMessage);

                  alert(`Order ${newOrderId} placed successfully!`);
                  setCart([]);
                  setIsCartOpen(false);
                  setActiveTab('chat');
                }}
                className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ active, icon, label, onClick, count, badge }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void, count?: number, badge?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full group flex items-center gap-3 px-3 py-2 rounded-xl transition-all relative ${
        active 
        ? 'bg-white shadow-sm border border-slate-200/50 text-slate-900' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
      }`}
    >
      <div className={`${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
      </div>
      <span className="text-[13px] font-bold tracking-tight">{label}</span>
      {count && (
        <span className="ml-auto bg-slate-900 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-md">
          {count}
        </span>
      )}
      {badge && (
        <span className="ml-auto bg-blue-100 text-blue-600 text-[9px] font-black px-1.5 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </button>
  );
}

function HeaderIcon({ icon, dot }: { icon: React.ReactNode, dot?: boolean }) {
  return (
    <button className="relative p-2 bg-white/80 border border-slate-200/50 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white transition-all shadow-sm active:scale-90" onClick={() => alert("Notification clicked")}>
      {icon}
      {dot && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 border-2 border-white rounded-full"></span>}
    </button>
  );
}

function SubNavItem({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-2 text-[13px] font-bold tracking-tight transition-all relative ${
        active ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      {label}
      {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />}
    </button>
  );
}
