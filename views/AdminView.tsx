
import React from 'react';
import { TrendingUp, ShieldAlert, ArrowUpRight, ArrowDownRight, FileBarChart } from 'lucide-react';

interface AdminViewProps {
  onFullView: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onFullView }) => {
  return (
    <div className="p-6 grid grid-cols-12 gap-5 animate-in fade-in duration-300 no-scrollbar">
      {/* Hero Analytics */}
      <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <div className="flex justify-between items-start mb-6">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Operating Spend</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">$42,985.60</h3>
           </div>
           <button className="bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:bg-emerald-100 transition-colors" onClick={() => alert("Viewing detailed growth report...")}>
              <ArrowUpRight className="w-3 h-3" /> +12.4%
           </button>
        </div>
        
        <div className="flex-1 flex items-end justify-between gap-2 px-1 mb-2 h-40">
           {[35, 50, 40, 85, 45, 100, 60, 40, 75, 55, 90, 70].map((h, i) => (
             <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative">
                  <div className={`w-full rounded-lg transition-all duration-300 ${i === 5 ? 'bg-slate-900 shadow-lg' : 'bg-slate-100 group-hover:bg-slate-200'}`} style={{height: `${h}%`}} />
                  {i === 5 && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
                       $12.4k
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Side Widgets */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        <section className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert className="w-20 h-20 rotate-12" />
           </div>
           <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inventory Status</h3>
              <ShieldAlert className="w-4 h-4 text-amber-500" />
           </div>
           <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-baseline">
                 <span className="text-xl font-black">82%</span>
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Optimal Stock</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-[82%]" />
              </div>
              <button className="w-full h-8 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all" onClick={() => alert("Audit in progress...")}>Run Audit</button>
           </div>
        </section>

        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
           <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Savings Target</h3>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
           </div>
           <div>
              <div className="text-2xl font-black text-slate-900">$1,240</div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Recovered this month</p>
           </div>
           <button className="w-full mt-4 h-9 bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center gap-2" onClick={() => alert("Generating savings breakdown...")}>
              <FileBarChart className="w-3.5 h-3.5" /> View Savings
           </button>
        </section>
      </div>

      {/* Market Watch */}
      <section className="col-span-12 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900">Price Intelligence</h3>
            <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline px-3 py-1 bg-blue-50 rounded-lg" onClick={onFullView}>Explore Trends</button>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Lemons', change: '+15%', trend: 'up', price: '$45.00/cs' },
              { name: 'Fryer Oil', change: '+8%', trend: 'up', price: '$62.50/can' },
              { name: 'Ribeye', change: '-3%', trend: 'down', price: '$34.00/kg' },
              { name: 'Avocados', change: '-4%', trend: 'down', price: '$22.00/bx' },
              { name: 'Large Eggs', change: '+2%', trend: 'up', price: '$18.00/cs' },
              { name: 'Whole Milk', change: '0%', trend: 'neut', price: '$12.00/cs' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all cursor-pointer" onClick={() => alert(`Showing history for ${item.name}`)}>
                <div className="flex items-center justify-between">
                   <div className={`p-1.5 rounded-lg ${item.trend === 'up' ? 'bg-rose-100 text-rose-600' : item.trend === 'neut' ? 'bg-slate-200 text-slate-500' : 'bg-emerald-100 text-emerald-600'}`}>
                      {item.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : item.trend === 'neut' ? <TrendingUp className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                   </div>
                   <span className={`text-[10px] font-bold ${item.trend === 'up' ? 'text-rose-600' : item.trend === 'neut' ? 'text-slate-500' : 'text-emerald-600'}`}>{item.change}</span>
                </div>
                <div>
                   <p className="font-bold text-xs text-slate-900 truncate">{item.name}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.price}</p>
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default AdminView;
