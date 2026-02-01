'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Play, AlertCircle, Search } from 'lucide-react';

// Mock data for initial implementation
const INITIAL_JOBS = [
  { id: '1', customer: 'James Wilson', vehicle: 'Porsche 911 GT3', service: 'Ceramic Pro', status: 'IN_PROGRESS', time: '14:30' },
  { id: '2', customer: 'Sarah Miller', vehicle: 'Tesla Model S Plaid', service: 'Signature Polish', status: 'PENDING', time: '16:00' },
  { id: '3', customer: 'Michael Chen', vehicle: 'Ferrari F8', service: 'Ceramic Pro', status: 'COMPLETED', time: '10:00' },
  { id: '4', customer: 'Elena Rodriguez', vehicle: 'Lamborghini Urus', service: 'Interior Revival', status: 'IN_PROGRESS', time: '15:15' },
];

const STATUS_COLORS = {
  PENDING: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  IN_PROGRESS: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  COMPLETED: 'text-green-500 bg-green-500/10 border-green-500/20',
  CANCELLED: 'text-red-500 bg-red-500/10 border-red-500/20',
};

export default function AdminDashboard() {
  const [jobs] = useState(INITIAL_JOBS);

  return (
    <main className="min-h-screen pt-32 px-8 pb-20 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif mb-2">Operations Command</h1>
            <p className="text-silver/40 uppercase tracking-[0.2em] text-xs font-bold">Live Job Status Tracking</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <Search size={18} className="text-white/20" />
            <input 
              type="text" 
              placeholder="Filter by VIN, Owner, or Detailer..." 
              className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Jobs', value: '12', icon: Play },
            { label: 'Pending', value: '4', icon: Clock },
            { label: 'Completed Today', value: '28', icon: CheckCircle },
            { label: 'Wait Time', value: '1.2h', icon: AlertCircle },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-luxury-charcoal silver-border">
              <div className="flex justify-between items-start mb-4">
                <stat.icon size={20} className="text-gold" />
                <span className="text-xs text-green-500">+12%</span>
              </div>
              <div className="text-3xl font-serif mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-luxury-charcoal rounded-2xl silver-border overflow-hidden">
          <div className="grid grid-cols-5 px-8 py-4 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            <div>Owner & Vehicle</div>
            <div>Service Package</div>
            <div>Status</div>
            <div>Time Slot</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-white/5">
            {jobs.map((job) => (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="grid grid-cols-5 px-8 py-6 items-center hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <div className="font-medium">{job.customer}</div>
                  <div className="text-xs text-white/30">{job.vehicle}</div>
                </div>
                <div className="text-sm text-gold font-light">{job.service}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${STATUS_COLORS[job.status as keyof typeof STATUS_COLORS]}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm font-mono text-white/50">{job.time}</div>
                <div className="text-right">
                  <button className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Details</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
