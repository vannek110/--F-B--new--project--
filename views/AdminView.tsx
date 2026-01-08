
import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  MoreVertical, 
  Plus,
  Search,
  Download,
  Printer,
  Trash2,
  Package,
  Utensils,
  Truck,
  CreditCard,
  Target
} from 'lucide-react';

interface AdminViewProps {
  onFullView: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onFullView }) => {
  // Mock data for F&B Procurement Waves
  const spendData = [18, 28, 12, 32, 18, 38, 14]; // Current Spend (Purple)
  const budgetData = [15, 22, 18, 28, 22, 30, 8];  // Budget Target (Orange)

  const getBezierPath = (data: number[], height: number = 100, width: number = 100) => {
    const points = data.map((val, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - (val / 40) * height
    }));

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      d += ` C ${cp1x},${p0.y} ${cp1x},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
  };

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-full space-y-6 no-scrollbar pb-20">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Procurement Overview</h1>
          <p className="text-xs text-slate-400 font-medium">Supply Chain & Cost Analytics</p>
        </div>
        <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <button className="hover:text-slate-900">Daily</button>
          <button className="hover:text-slate-900">Weekly</button>
          <button className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Monthly</button>
          <button className="hover:text-slate-900">Yearly</button>
          <div className="flex items-center gap-4 ml-6">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Planned</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400" /> Actual</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Spending Chart Section */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">$12,468.96</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Monthly Spend</p>
              <div className="pt-4">
                <h3 className="text-2xl font-black text-slate-800">142</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Delivery Receipts</p>
              </div>
              <button className="mt-6 px-5 py-2.5 bg-indigo-600 text-white text-[11px] font-bold rounded-lg shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95">
                Download P&L Report
              </button>
            </div>
            
            <div className="flex-1 h-48 relative ml-12">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="spendGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="budgetGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${getBezierPath(spendData)} L 100,100 L 0,100 Z`} fill="url(#spendGrad)" />
                <path d={`${getBezierPath(budgetData)} L 100,100 L 0,100 Z`} fill="url(#budgetGrad)" />
                <path d={getBezierPath(spendData)} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                <path d={getBezierPath(budgetData)} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
                
                {spendData.map((v, i) => (
                  <circle key={`s-${i}`} cx={(i / (spendData.length - 1)) * 100} cy={100 - (v / 40) * 100} r="1.5" fill="#6366f1" stroke="white" strokeWidth="0.5" />
                ))}
              </svg>
              <div className="flex justify-between mt-4 border-t border-slate-50 pt-2 text-[9px] font-bold text-slate-300 uppercase">
                <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 border-t border-slate-50 pt-6">
            <SmallMetric icon={<Package className="w-3.5 h-3.5" />} label="Inventory Value" value="$28,567.53" color="bg-indigo-100 text-indigo-600" />
            <SmallMetric icon={<Target className="w-3.5 h-3.5" />} label="Cost Saving" value="$1,245.10" color="bg-emerald-100 text-emerald-600" />
            <SmallMetric icon={<CreditCard className="w-3.5 h-3.5" />} label="Account Payable" value="$4,851.53" color="bg-rose-100 text-rose-600" />
            <SmallMetric icon={<Truck className="w-3.5 h-3.5" />} label="Wholesale Earning" value="$2,567.53" color="bg-orange-100 text-orange-600" />
          </div>
        </div>

        {/* Category Spend Donut */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800">Spend by Category</h3>
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#6366f1" strokeWidth="3.5" strokeDasharray="45 100" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="35 100" strokeDashoffset="-45" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="20 100" strokeDashoffset="-80" />
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-10 w-full text-center">
              <div>
                <p className="text-lg font-black text-slate-800">45%</p>
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Protein
                </div>
              </div>
              <div>
                <p className="text-lg font-black text-slate-800">35%</p>
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Produce
                </div>
              </div>
              <div>
                <p className="text-lg font-black text-slate-800">20%</p>
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Dry/Oil
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* F&B Insight Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GradientCard title="Wastage Rate" value="4.2 %" date="Avg. Monthly" color="bg-gradient-to-r from-rose-400 to-rose-600" isWave />
          <GradientCard title="Food Cost %" value="28.4 %" date="Standard: 30%" color="bg-gradient-to-r from-indigo-500 to-indigo-700" />
          <GradientCard title="Inventory Turnover" value="8.4x" date="Weekly Cycle" color="bg-gradient-to-r from-sky-400 to-sky-600" isWave />
          <GradientCard title="Supplier Rating" value="4.8/5" date="Quality Index" color="bg-gradient-to-r from-emerald-400 to-emerald-600" />
        </div>

        {/* F&B Activities & Latest POs */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Procurement Logs</h3>
          <div className="space-y-6">
            <ActivityItem time="10 Mins" icon={<Utensils className="w-4 h-4" />} iconColor="bg-orange-100 text-orange-600" title="Stock Alert" desc="Tomato stock reaching reorder level" />
            <ActivityItem time="2 Hours" icon={<Truck className="w-4 h-4" />} iconColor="bg-indigo-100 text-indigo-600" title="Order Arrived" desc="Prime Meat Cutters delivered #ORD-8832" />
            <ActivityItem time="4 Hours" icon={<CreditCard className="w-4 h-4" />} iconColor="bg-emerald-100 text-emerald-600" title="Payment Made" desc="Invoice paid for Ocean Direct Ltd" />
            <ActivityItem time="Yesterday" icon={<Plus className="w-4 h-4" />} iconColor="bg-rose-100 text-rose-600" title="New Supplier" desc="Dairy Dreams onboarded to system" />
            <ActivityItem time="Yesterday" icon={<Download className="w-4 h-4" />} iconColor="bg-sky-100 text-sky-600" title="Quote Received" desc="Veggie Co. sent seasonal price list" />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Purchase Order Status</h3>
              <p className="text-[10px] text-slate-400 font-medium">Tracking Recent F&B Orders</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded flex items-center gap-1.5 shadow-md shadow-indigo-600/10 hover:bg-indigo-700 active:scale-95 transition-all"><Plus className="w-3 h-3" /> New PO</button>
              <TableTool icon={<Printer className="w-3 h-3" />} />
              <TableTool icon={<Trash2 className="w-3 h-3" />} />
              <TableTool icon={<Download className="w-3 h-3" />} />
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
            <input type="text" placeholder="Search POs or Vendors..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-200" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-3 font-bold uppercase tracking-wider rounded-tl-lg">PO ID</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Vendor Name</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Category</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Total Cost</th>
                  <th className="p-3 font-bold uppercase tracking-wider rounded-tr-lg">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TableRow id="PO-7721" name="Fresh Veggies Co." from="Produce" price="$44.50" status="Shipped" statusColor="bg-indigo-500" />
                <TableRow id="PO-8832" name="Prime Meat Cutters" from="Meat" price="$350.00" status="Arrived" statusColor="bg-emerald-500" />
                <TableRow id="PO-9011" name="Ocean Direct" from="Seafood" price="$1,240.20" status="Pending" statusColor="bg-amber-500" />
                <TableRow id="PO-9204" name="Dairy Dreams" from="Dairy" price="$84.00" status="Draft" statusColor="bg-slate-400" />
                <TableRow id="PO-9311" name="Pantry Pros" from="Dry Goods" price="$210.15" status="Issue" statusColor="bg-rose-500" />
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-[10px] text-slate-400 font-bold">Showing 5 of 42 purchase orders</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(p => (
                <button key={p} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${p === 1 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SmallMetric({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${color}`}>{icon}</div>
      <div>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-xs font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function GradientCard({ title, value, date, color, isWave }: { title: string, value: string, date: string, color: string, isWave?: boolean }) {
  return (
    <div className={`${color} rounded-xl p-5 text-white shadow-lg relative overflow-hidden group`}>
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{title}</p>
        <div className="flex items-end justify-between mt-2">
          <h4 className="text-2xl font-black">{value}</h4>
          <div className="text-[9px] font-bold text-right leading-tight opacity-70">
            <p>{date}</p>
          </div>
        </div>
      </div>
      
      {/* Decorative background visual */}
      <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20">
        <svg viewBox="0 0 100 20" className="w-full h-full preserve-aspect-none">
          {isWave ? (
            <path d="M0,10 C20,20 40,0 60,10 C80,20 100,0 100,10 L100,20 L0,20 Z" fill="white" />
          ) : (
             <path d="M0,15 L10,12 L20,18 L30,10 L40,15 L50,8 L60,14 L70,10 L80,18 L90,12 L100,16 L100,20 L0,20 Z" fill="white" />
          )}
        </svg>
      </div>
    </div>
  );
}

function ActivityItem({ time, icon, iconColor, title, desc }: { time: string, icon: React.ReactNode, iconColor: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs shadow-sm ${iconColor}`}>{icon}</div>
        <div className="w-px h-full bg-slate-100 absolute top-8 bottom-0" />
      </div>
      <div className="flex-1 pb-5">
        <div className="flex justify-between items-start mb-0.5">
          <h4 className="text-xs font-bold text-slate-800">{title}</h4>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">{time}</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium leading-tight">{desc}</p>
      </div>
    </div>
  );
}

function TableTool({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-7 h-7 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all">
      {icon}
    </button>
  );
}

function TableRow({ id, name, from, price, status, statusColor }: { id: string, name: string, from: string, price: string, status: string, statusColor: string }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="p-3 text-slate-500 font-medium">{id}</td>
      <td className="p-3 text-slate-800 font-bold group-hover:text-indigo-600 transition-colors">{name}</td>
      <td className="p-3 text-slate-500">{from}</td>
      <td className="p-3 text-slate-800 font-black">{price}</td>
      <td className="p-3">
        <span className={`${statusColor} text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default AdminView;
