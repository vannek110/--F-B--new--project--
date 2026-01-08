
import React, { useState, useEffect, useRef } from 'react';
import { Supplier, Message, Order } from '../types';
import { 
  Send, 
  Camera, 
  Mic, 
  Package, 
  Search, 
  MoreVertical, 
  Plus, 
  Phone, 
  Video, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ExternalLink,
  Maximize2,
  Minimize2,
  ArrowLeft,
  FileText,
  ShoppingBag,
  Info
} from 'lucide-react';

interface ChatViewProps {
  suppliers: Supplier[];
  messages: Record<string, Message[]>;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onAddMessage: (supplierId: string, message: Message) => void;
  onNavigate: (tab: 'admin' | 'suppliers' | 'chat' | 'orders' | 'receiving') => void;
}

const ChatView: React.FC<ChatViewProps> = ({ suppliers, messages, onUpdateOrderStatus, onAddMessage, onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(suppliers[0].id);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedSupplier = suppliers.find(s => s.id === selectedId) || suppliers[0];
  const chatHistory = messages[selectedId] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, selectedId]);

  const createNewOrder = () => {
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newOrderId,
      supplierId: selectedId,
      status: 'Pending',
      timestamp: new Date().toISOString(),
      total: 84.20,
      items: [
        { id: 'p1', supplierId: selectedId, name: 'Roma Tomatoes', unit: '5kg Crate', price: 12.50, image: 'https://picsum.photos/seed/tomato/150/150', category: 'Veg', quantity: 2 },
        { id: 'p3', supplierId: selectedId, name: 'Avocados (Hass)', unit: 'Box of 12', price: 24.00, image: 'https://picsum.photos/seed/avo/150/150', category: 'Fruits', quantity: 1 }
      ]
    };

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      type: 'order',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderId: newOrderId,
      orderData: newOrder
    };

    onAddMessage(selectedId, newMessage);
  };

  return (
    <div className="flex h-full animate-in fade-in duration-500 overflow-hidden relative bg-white">
      {/* Contact List */}
      <div className={`transition-all duration-300 ease-in-out border-r border-slate-100 flex flex-col bg-white overflow-hidden ${isExpanded ? 'w-0 opacity-0' : 'w-80'}`}>
        <div className="p-5 pb-3">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold tracking-tight">Messages</h2>
              <button className="p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors" onClick={() => onNavigate('suppliers')}>
                <Plus className="w-4 h-4" />
              </button>
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Filter chats..." className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-slate-900/5 transition-all outline-none" />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1 pb-4">
          {suppliers.map(supplier => {
            const supplierHistory = messages[supplier.id] || [];
            const lastMsg = supplierHistory[supplierHistory.length - 1];
            const isActive = selectedId === supplier.id;
            return (
              <button 
                key={supplier.id}
                onClick={() => setSelectedId(supplier.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  isActive ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={supplier.logo} className={`w-10 h-10 rounded-xl object-cover ${isActive ? 'ring-2 ring-white/20' : 'border border-slate-200'}`} />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-bold text-xs truncate">{supplier.name}</h3>
                    <span className={`text-[9px] font-bold ${isActive ? 'text-white/40' : 'text-slate-400'}`}>{lastMsg?.timestamp || '10:45'}</span>
                  </div>
                  <p className={`text-[10px] truncate font-medium ${isActive ? 'text-white/60' : 'text-slate-500'}`}>
                    {lastMsg?.type === 'order' ? '🛒 Order request' : lastMsg?.text || 'No messages'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 flex flex-col bg-[#f8f9fa]">
        {/* Header */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm z-20 h-16">
           <div className="flex items-center gap-3">
              {isExpanded && (
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors mr-1"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                </button>
              )}
              <div className="relative" onClick={() => setIsExpanded(!isExpanded)}>
                <img src={selectedSupplier.logo} className="w-9 h-9 rounded-lg object-cover border border-slate-100 shadow-sm" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                 <h3 className="font-bold text-sm text-slate-900">{selectedSupplier.name}</h3>
                 <p className="text-[9px] font-bold uppercase text-emerald-600 tracking-widest leading-none">Vendor Support Online</p>
              </div>
           </div>

           <div className="flex items-center gap-1.5">
              <HeaderAction icon={<Phone className="w-4 h-4" />} onClick={() => alert("Calling vendor...")} />
              <HeaderAction icon={<Video className="w-4 h-4" />} onClick={() => alert("Initiating video call...")} />
              <div className="w-px h-4 bg-slate-200 mx-1" />
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                title={isExpanded ? "Collapse view" : "Expand view"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <HeaderAction icon={<MoreVertical className="w-4 h-4" />} onClick={() => alert("Options...")} />
           </div>
        </div>

        {/* Stream */}
        <div 
          ref={scrollRef}
          className={`flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar scroll-smooth ${isExpanded ? 'max-w-4xl mx-auto w-full' : ''}`}
        >
          {chatHistory.map((msg) => {
            const isUser = msg.senderId === 'user';
            
            if (msg.type === 'order' && msg.orderData) {
              const order = msg.orderData;
              const isConfirmed = order.status === 'Confirmed';
              const isCancelled = order.status === 'Cancelled';
              const isPending = order.status === 'Pending';

              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} py-2 animate-in zoom-in-95 duration-200`}>
                  <div className={`bg-white border rounded-[1.5rem] p-4 shadow-md w-[300px] flex flex-col gap-3 relative overflow-hidden ${
                    isConfirmed ? 'border-emerald-100' : isCancelled ? 'border-rose-100' : 'border-slate-200'
                  }`}>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                           <div className={`p-2 rounded-lg ${isConfirmed ? 'bg-emerald-500 text-white' : isCancelled ? 'bg-rose-500 text-white' : 'bg-slate-800 text-white'}`}>
                              <ShoppingBag className="w-4 h-4" />
                           </div>
                           <div>
                              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Reference</p>
                              <p className="text-sm font-extrabold text-slate-900">{order.id}</p>
                           </div>
                        </div>
                        <div className={`px-2 py-1 rounded-md flex items-center gap-1 text-[8px] font-black uppercase tracking-tight ${
                          isConfirmed ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                          isCancelled ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                          'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                           {isConfirmed ? <CheckCircle2 className="w-3 h-3" /> : isCancelled ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3 animate-pulse" />}
                           {order.status}
                        </div>
                     </div>

                     <div className="space-y-1.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-[10px]">
                             <span className="font-bold text-slate-700">{item.quantity}x {item.name}</span>
                             <span className="font-extrabold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="h-px bg-slate-200 my-1.5" />
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</span>
                           <span className="text-sm font-black text-slate-900">${order.total.toFixed(2)}</span>
                        </div>
                     </div>

                     <div className="flex gap-2 pt-1">
                        {isPending ? (
                          <>
                            <button 
                              onClick={() => onUpdateOrderStatus(order.id, 'Confirmed')}
                              className="flex-1 h-8 bg-slate-900 text-white rounded-xl font-bold text-[9px] uppercase tracking-wider hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                               <CheckCircle2 className="w-3 h-3" /> Confirm
                            </button>
                            <button 
                              onClick={() => onUpdateOrderStatus(order.id, 'Cancelled')}
                              className="w-8 h-8 bg-white border border-slate-200 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-50 active:scale-95 transition-all"
                            >
                               <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => alert("Invoice generated. Starting download...")}
                            className="flex-1 h-8 bg-slate-50 text-slate-600 rounded-xl font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-all"
                          >
                             <FileText className="w-3 h-3" /> {isConfirmed ? 'Invoice' : 'Details'}
                          </button>
                        )}
                     </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} group/msg animate-in fade-in duration-200`}>
                <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-xs font-semibold leading-normal relative ${
                  isUser 
                  ? 'bg-slate-900 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text}
                  <div className={`text-[8px] mt-1 opacity-0 group-hover/msg:opacity-40 transition-opacity font-bold uppercase tracking-widest ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 bg-white border-t border-slate-100 ${isExpanded ? 'max-w-4xl mx-auto w-full border-x shadow-2xl' : ''}`}>
          {/* Quick Actions */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar scroll-smooth">
             <button 
                onClick={createNewOrder}
                className="whitespace-nowrap h-9 px-4 bg-blue-600 text-white rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 shadow-md hover:bg-blue-700 active:scale-95 transition-all shrink-0"
             >
                <Plus className="w-3.5 h-3.5" /> New Order Draft
             </button>
             <button 
                onClick={() => onNavigate('receiving')}
                className="whitespace-nowrap h-9 px-4 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-100 transition-all shrink-0"
             >
                <Package className="w-3.5 h-3.5 text-blue-500" /> Track Logistics
             </button>
             <button 
                onClick={() => onNavigate('orders')}
                className="whitespace-nowrap h-9 px-4 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-100 transition-all shrink-0"
             >
                <Clock className="w-3.5 h-3.5 text-amber-500" /> History
             </button>
             <button 
                onClick={() => alert("Opening supplier document vault...")}
                className="whitespace-nowrap h-9 px-4 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-100 transition-all shrink-0"
             >
                <Info className="w-3.5 h-3.5 text-slate-400" /> Supplier Docs
             </button>
          </div>

          {/* Input Box */}
          <form className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900/5 transition-all border border-slate-100" onSubmit={(e) => { e.preventDefault(); alert("Sending message...") }}>
            <button type="button" className="text-slate-400 hover:text-slate-900 p-1" onClick={() => alert("Open camera...")}><Camera className="w-5 h-5" /></button>
            <button type="button" className="text-slate-400 hover:text-slate-900 p-1" onClick={() => alert("Recording voice...")}><Mic className="w-5 h-5" /></button>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-slate-900 font-semibold text-sm placeholder:text-slate-300"
            />
            <button type="submit" className="bg-slate-900 text-white w-9 h-9 rounded-xl shadow-lg flex items-center justify-center active:scale-90 transition-transform">
               <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function HeaderAction({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all active:scale-90">
       {icon}
    </button>
  );
}

export default ChatView;
