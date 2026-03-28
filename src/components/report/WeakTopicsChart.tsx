'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface WeakTopicsChartProps {
  weakSubtopics: { subtopic: string; count: number }[];
}

export default function WeakTopicsChart({ weakSubtopics }: WeakTopicsChartProps) {
  if (!weakSubtopics.length) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
        No weak topics identified — great work!
      </div>
    );
  }

  const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weakSubtopics} layout="vertical" barSize={16}>
          <XAxis
            type="number"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="subtopic"
            width={120}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '12px',
            }}
            formatter={(val) => [`${val} mistakes`, 'Count']}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {weakSubtopics.map((_, i) => (
              <Cell key={i} fill={colors[Math.min(i, colors.length - 1)]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
