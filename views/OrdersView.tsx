
import React, { useState } from 'react';
import { Order, Supplier } from '../types';
import { Search, ChevronDown, MoreHorizontal, Filter, Download, Plus } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  suppliers: Supplier[];
  onAddOrder: () => void;
}

const OrdersView: React.FC<OrdersViewProps> = ({ orders, suppliers, onAddOrder }) => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Delivered' | 'Confirmed'>('All');

  const filteredOrders = orders.filter(o => {
    if (filter === 'All') return true;
    return o.status === filter;
  });

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300 h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between shrink-0">
         <div className="flex items-center gap-2">
            <button 
              onClick={onAddOrder}
              className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
            >
               New Order <Plus className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <button className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg font-bold text-[10px] text-slate-600 uppercase tracking-wider" onClick={() => alert("Change date range...")}>
               This Month <ChevronDown className="w-3 h-3" />
            </button>
         </div>

         <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Find PO..." className="bg-slate-100 border-none rounded-lg pl-8 pr-3 py-1.5 text-xs font-semibold w-32 focus:ring-1 focus:ring-slate-900/10" />
            </div>
            <button className="p-1.5 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-100" onClick={() => alert("Filter options...")}>
               <Filter className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-100" onClick={() => alert("Exporting list as CSV...")}>
               <Download className="w-3.5 h-3.5" />
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar border border-slate-50 rounded-2xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-slate-100">
              <th className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">ID</th>
              <th className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Vendor</th>
              <th className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Items</th>
              <th className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Total</th>
              <th className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                   <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No matching orders found</p>
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const supplier = suppliers.find(s => s.id === order.supplierId);
                return (
                  <tr key={order.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer" onClick={() => alert(`Opening details for ${order.id}`)}>
                    <td className="py-3 px-4">
                      <span className="font-bold text-xs text-slate-900 tracking-tight">#{order.id.split('-')[1]}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img src={supplier?.logo} className="w-7 h-7 rounded-lg object-cover border border-slate-100 shadow-sm" />
                        <span className="font-bold text-xs text-slate-800 truncate max-w-[120px]">{supplier?.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md text-[9px] font-black">{order.items.length} SKU</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-xs text-slate-900">${order.total.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1.5 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); alert("Order options..."); }}>
                         <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: 'text-emerald-500 bg-emerald-50 border border-emerald-100',
    Confirmed: 'text-blue-500 bg-blue-50 border border-blue-100',
    Pending: 'text-amber-500 bg-amber-50 border border-amber-100',
    Cancelled: 'text-rose-500 bg-rose-50 border border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tight ${styles[status] || 'text-slate-500 bg-slate-100'}`}>
       {status}
    </span>
  );
}

export default OrdersView;
