
import React, { useState } from 'react';
import { Order, Supplier } from '../types';
import { CheckCircle2, AlertCircle, Package, Truck, ChevronRight, Camera } from 'lucide-react';

interface ReceivingViewProps {
  orders: Order[];
  suppliers: Supplier[];
  onComplete: (orderId: string, status: Order['status']) => void;
}

const ReceivingView: React.FC<ReceivingViewProps> = ({ orders, suppliers, onComplete }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, 'ok' | 'issue'>>({});

  // Active deliveries are those that are confirmed but not yet fully received (Delivered)
  const activeDeliveries = orders.filter(o => o.status === 'Confirmed');

  if (selectedOrder) {
    const supplier = suppliers.find(s => s.id === selectedOrder.supplierId);
    
    return (
      <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col">
        <div className="p-4 bg-white border-b flex items-center gap-3">
           <button onClick={() => setSelectedOrder(null)} className="p-1 -ml-1 hover:bg-slate-100 rounded-lg">
             <ChevronRight className="w-6 h-6 rotate-180 text-slate-400" />
           </button>
           <div className="flex-1">
              <h2 className="font-bold text-base leading-tight">Verify Delivery</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">#{selectedOrder.id} • {supplier?.name}</p>
           </div>
           <button className="bg-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 uppercase tracking-widest" onClick={() => alert("Report missing delivery?")}>Help</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 no-scrollbar">
           {selectedOrder.items.map(item => {
              const status = checkedItems[item.id];
              return (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
                   <div className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-blue-600 text-xs">
                         {item.quantity}x
                      </div>
                      <div className="flex-1">
                         <h4 className="font-bold text-xs text-slate-800 leading-tight">{item.name}</h4>
                         <p className="text-[10px] text-slate-400 font-medium">{item.unit}</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-2">
                      <button 
                        onClick={() => setCheckedItems(prev => ({...prev, [item.id]: 'ok'}))}
                        className={`flex-1 h-10 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                           status === 'ok' 
                           ? 'bg-emerald-600 text-white shadow-lg' 
                           : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                         <CheckCircle2 className="w-4 h-4" /> Correct
                      </button>
                      <button 
                        onClick={() => setCheckedItems(prev => ({...prev, [item.id]: 'issue'}))}
                        className={`flex-1 h-10 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                           status === 'issue' 
                           ? 'bg-rose-600 text-white shadow-lg' 
                           : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                         <AlertCircle className="w-4 h-4" /> Issue
                      </button>
                   </div>

                   {status === 'issue' && (
                     <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 animate-in fade-in zoom-in duration-200">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                           <div className="bg-white border border-rose-100 p-2 rounded-lg">
                              <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Reason</p>
                              <select className="bg-transparent text-[10px] font-bold w-full focus:outline-none">
                                 <option>Missing</option>
                                 <option>Damaged</option>
                                 <option>Wrong Item</option>
                              </select>
                           </div>
                           <div className="bg-white border border-rose-100 p-2 rounded-lg">
                              <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Actual Qty</p>
                              <input type="number" defaultValue={item.quantity} className="bg-transparent text-[10px] font-bold w-full focus:outline-none" />
                           </div>
                        </div>
                        <button className="w-full h-8 bg-white border border-rose-200 text-rose-600 rounded-lg flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-wider" onClick={() => alert("Opening camera...")}>
                           <Camera className="w-3.5 h-3.5" /> Photo Evidence
                        </button>
                     </div>
                   )}
                </div>
              );
           })}
        </div>

        <div className="p-4 bg-white border-t">
           <button 
             disabled={Object.keys(checkedItems).length < selectedOrder.items.length}
             onClick={() => {
               onComplete(selectedOrder.id, 'Delivered');
               alert("Order confirmed! Receiving record generated.");
               setSelectedOrder(null);
             }}
             className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800 disabled:opacity-50 transition-all uppercase tracking-widest"
           >
              Complete Check-in
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center gap-3">
         <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center relative">
            <Truck className="w-8 h-8 text-blue-600" />
            <div className="absolute top-0 right-0 w-5 h-5 bg-blue-600 border-4 border-white rounded-full flex items-center justify-center text-[9px] text-white font-black">
               {activeDeliveries.length}
            </div>
         </div>
         <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Delivery Hub</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">Review incoming goods</p>
         </div>
      </div>

      <section>
         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Pending Verify</h3>
         <div className="space-y-2">
            {activeDeliveries.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                 <Package className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No pending deliveries</p>
              </div>
            ) : (
              activeDeliveries.map(order => {
                 const supplier = suppliers.find(s => s.id === order.supplierId);
                 return (
                    <button 
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="w-full bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 active:scale-[0.98] transition-all text-left group"
                    >
                       <img src={supplier?.logo} className="w-10 h-10 rounded-xl border border-slate-50" />
                       <div className="flex-1">
                          <div className="flex justify-between items-center">
                             <h4 className="font-bold text-xs text-slate-900 truncate">{supplier?.name}</h4>
                             <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-1.5 py-0.5 rounded">En Route</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">#{order.id} • {order.items.length} items</p>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                 );
              })
            )}
         </div>
      </section>
    </div>
  );
};

export default ReceivingView;
