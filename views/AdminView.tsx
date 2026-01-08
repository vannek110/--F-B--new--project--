
import React from 'react';
import { TrendingUp, ShieldAlert, ArrowUpRight, ArrowDownRight, FileBarChart, PieChart, Activity } from 'lucide-react';

interface AdminViewProps {
  onFullView: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onFullView }) => {
  // Mock data for the trend chart
  const data = [30, 45, 35, 60, 55, 90, 70, 85, 65, 80, 75, 95];
  const maxVal = Math.max(...data);
  const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val / maxVal) * 80}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="p-6 grid grid-cols-12 gap-5 animate-in fade-in duration-300 no-scrollbar pb-20">
      {/* Hero Analytics - Enhanced with SVG Trend Chart */}
      <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <div className="flex justify-between items-start mb-4">
           <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Procurement Analytics</p>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">$42,985.60</h3>
           </div>
           <div className="flex flex-col items-end gap-1">
              <button className="bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:bg-emerald-100 transition-colors" onClick={() => alert("Viewing detailed growth report...")}>
                 <ArrowUpRight className="w-3 h-3" /> +12.4%
              </button>
              <span className="text-[9px] font-bold text-slate-300">vs last month</span>
           </div>
        </div>
        
        {/* SVG Area Chart Illustration */}
        <div className="flex-1 relative h-48 mt-4 group">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                 <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                 </linearGradient>
              </defs>
              <polyline
                 fill="url(#gradient)"
                 points={areaPoints}
              />
              <polyline
                 fill="none"
                 stroke="#3b82f6"
                 strokeWidth="1.5"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 points={points}
                 className="drop-shadow-sm"
              />
              {/* Highlight Point for Current Month */}
              <circle cx="100" cy={100 - (data[11] / maxVal) * 80} r="1.5" fill="#3b82f6" />
              <circle cx="100" cy={100 - (data[11] / maxVal) * 80} r="3" fill="#3b82f6" fillOpacity="0.2" />
           </svg>
           
           {/* Chart Labels */}
           <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 pt-2 border-t border-slate-50">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                <span key={i} className={`text-[8px] font-bold uppercase tracking-tighter ${i === 11 ? 'text-blue-600' : 'text-slate-300'}`}>{m}</span>
              ))}
           </div>
           
           {/* Float Tooltip Simulation */}
           <div className="absolute top-4 right-4 bg-slate-900 text-white p-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Projection</p>
              <p className="text-xs font-black">+$4,200 <span className="text-emerald-400 text-[8px]">est.</span></p>
           </div>
        </div>
      </section>

      {/* Side Widgets */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        <section className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert className="w-20 h-20 rotate-12" />
           </div>
           <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inventory Health</h3>
              <ShieldAlert className="w-4 h-4 text-amber-500" />
           </div>
           <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-baseline">
                 <span className="text-xl font-black">82%</span>
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Optimal Level</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-[82%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="flex gap-2">
                 <button className="flex-1 h-8 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all" onClick={() => alert("Audit in progress...")}>Run Audit</button>
                 <button className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all" onClick={() => alert("Restock list...")}>
                    <Plus className="w-3.5 h-3.5" />
                 </button>
              </div>
           </div>
        </section>

        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
           <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Spend by Category</h3>
              <PieChart className="w-4 h-4 text-purple-500" />
           </div>
           
           {/* Mini Distribution Chart */}
           <div className="space-y-2">
              <CategoryBar label="Meat & Poultry" percentage={45} color="bg-rose-500" />
              <CategoryBar label="Fresh Produce" percentage={30} color="bg-emerald-500" />
              <CategoryBar label="Dairy & Eggs" percentage={15} color="bg-amber-500" />
              <CategoryBar label="Dry Goods" percentage={10} color="bg-blue-500" />
           </div>

           <button className="w-full mt-4 h-9 bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center gap-2" onClick={() => alert("Generating savings breakdown...")}>
              <FileBarChart className="w-3.5 h-3.5" /> View Detailed Savings
           </button>
        </section>
      </div>

      {/* Market Intelligence Grid */}
      <section className="col-span-12 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-10">
         <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Price Intelligence</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Real-time market volatility tracking</p>
            </div>
            <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline px-3 py-1 bg-blue-50 rounded-lg transition-all active:scale-95" onClick={onFullView}>Explore Trends</button>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Lemons', change: '+15%', trend: 'up', price: '$45.00/cs', color: 'text-rose-600', bg: 'bg-rose-100' },
              { name: 'Fryer Oil', change: '+8%', trend: 'up', price: '$62.50/can', color: 'text-rose-600', bg: 'bg-rose-100' },
              { name: 'Ribeye', change: '-3%', trend: 'down', price: '$34.00/kg', color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { name: 'Avocados', change: '-4%', trend: 'down', price: '$22.00/bx', color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { name: 'Large Eggs', change: '+2%', trend: 'up', price: '$18.00/cs', color: 'text-rose-600', bg: 'bg-rose-100' },
              { name: 'Whole Milk', change: '0%', trend: 'neut', price: '$12.00/cs', color: 'text-slate-500', bg: 'bg-slate-200' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group active:scale-95" onClick={() => alert(`Showing history for ${item.name}`)}>
                <div className="flex items-center justify-between">
                   <div className={`p-1.5 rounded-lg transition-colors ${item.bg} ${item.color}`}>
                      {item.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : item.trend === 'neut' ? <TrendingUp className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                   </div>
                   <span className={`text-[10px] font-black tracking-tighter ${item.color}`}>{item.change}</span>
                </div>
                <div>
                   <p className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600 transition-colors">{item.name}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.price}</p>
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

function CategoryBar({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return <PlusIcon className={className} />;
}
import { Plus as PlusIcon } from 'lucide-react';

export default AdminView;
