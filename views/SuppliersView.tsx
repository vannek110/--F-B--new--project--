
import React from 'react';
import { Supplier, Product, CartItem } from '../types';
import { Star, ChevronRight, Plus, Minus, ArrowLeft } from 'lucide-react';

interface SuppliersViewProps {
  suppliers: Supplier[];
  products: Product[];
  cart: CartItem[];
  onAddToCart: (p: Product, q: number) => void;
  selectedSupplierId: string | null;
  onSelectSupplier: (id: string) => void;
  onOpenCart: () => void;
}

const SuppliersView: React.FC<SuppliersViewProps> = ({ 
  suppliers, 
  products, 
  cart,
  onAddToCart, 
  selectedSupplierId, 
  onSelectSupplier 
}) => {
  if (selectedSupplierId) {
    const supplierProducts = products.filter(p => p.supplierId === selectedSupplierId);
    const supplier = suppliers.find(s => s.id === selectedSupplierId);
    
    return (
      <div className="animate-in slide-in-from-right duration-300 flex flex-col h-full">
        <div className="px-8 py-4 border-b border-slate-50 flex items-center gap-4">
           <button onClick={() => onSelectSupplier(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
           </button>
           <div className="flex items-center gap-3">
             <img src={supplier?.logo} className="w-10 h-10 rounded-xl object-cover shadow-sm bg-slate-50" />
             <div>
                <h2 className="text-lg font-bold tracking-tight">{supplier?.name}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                   <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Next Day
                   </div>
                   <div className="flex items-center gap-1 text-[9px] font-bold text-amber-600">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      {supplier?.rating}
                   </div>
                </div>
             </div>
           </div>
        </div>

        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-y-auto no-scrollbar">
          {supplierProducts.map(product => {
            const cartItem = cart.find(c => c.id === product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div 
                key={product.id}
                className={`group bg-white rounded-2xl p-3 border transition-all duration-200 flex flex-col gap-3 ${
                  quantity > 0 ? 'border-blue-500 ring-2 ring-blue-500/5' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                  <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  {quantity > 0 && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold">
                       {quantity}
                    </div>
                  )}
                </div>
                
                <div className="space-y-0.5">
                  <h3 className="font-bold text-[13px] text-slate-900 leading-tight truncate">{product.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{product.unit}</p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-1">
                  <p className="text-sm font-black text-slate-900">${product.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
                    {quantity > 0 && (
                      <button onClick={() => onAddToCart(product, quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm">
                        <Minus className="w-3 h-3" />
                      </button>
                    )}
                    <button onClick={() => onAddToCart(product, quantity + 1)} className={`w-6 h-6 flex items-center justify-center rounded-md ${quantity > 0 ? 'bg-white shadow-sm' : 'bg-slate-900 text-white'}`}>
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-300 h-full flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {suppliers.map(supplier => (
          <button 
            key={supplier.id}
            onClick={() => onSelectSupplier(supplier.id)}
            className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-300 transition-all flex flex-col items-center text-center gap-3 active:scale-95"
          >
            <div className="relative">
              <img src={supplier.logo} className="w-20 h-20 rounded-2xl object-cover border border-slate-50 shadow-sm group-hover:scale-105 transition-transform" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-50 flex items-center gap-1 text-[9px] font-black">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                {supplier.rating}
              </div>
            </div>
            <div className="min-w-0 w-full">
              <h4 className="font-bold text-sm text-slate-900 leading-tight truncate">{supplier.name}</h4>
              <p className="text-[9px] text-slate-400 uppercase font-bold mt-1 tracking-widest truncate">{supplier.category}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Mini Promotion Banner */}
      <div className="mt-auto bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden flex items-center justify-between">
         <div className="relative z-10 space-y-2 max-w-sm">
            <h3 className="text-xl font-bold leading-tight">Direct Farm Sourcing</h3>
            <p className="text-xs text-slate-400 font-medium">Save up to 15% on fresh produce sourced directly from local producers.</p>
            <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 mt-2">
               Marketplace <ChevronRight className="w-3 h-3" />
            </button>
         </div>
         <img src="https://picsum.photos/seed/veggies/300/200" className="w-48 rounded-xl shadow-lg z-10 hidden lg:block opacity-80" />
      </div>
    </div>
  );
};

export default SuppliersView;
