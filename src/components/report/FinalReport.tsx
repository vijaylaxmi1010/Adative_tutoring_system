'use client';

import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Trophy, TrendingUp, AlertTriangle, BookOpen, Star } from 'lucide-react';
import { AppState } from '@/types';
import { TOPICS } from '@/lib/mock-data';
import { getTopicProgressionConfig } from '@/lib/bkt';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface FinalReportProps {
  state: AppState;
}

export default function FinalReport({ state }: FinalReportProps) {
  const progresses = Object.values(state.topicProgress);

  // Radar chart data
  const radarData = TOPICS.map((topic) => ({
    topic: topic.name.split(' ').slice(0, 2).join(' '),
    fullName: topic.name,
    knowledge: Math.round((state.topicProgress[topic.id]?.pL || 0) * 100),
  }));

  // Bar chart data by track
  const barData = [
    {
      name: 'Geometry',
      score: Math.round(
        (TOPICS.filter((t) => t.track === 'geometry')
          .map((t) => state.topicProgress[t.id]?.pL || 0)
          .reduce((a, b) => a + b, 0) /
          TOPICS.filter((t) => t.track === 'geometry').length) *
          100
      ),
      color: '#6366f1',
    },
    {
      name: 'Construction',
      score: Math.round(
        (TOPICS.filter((t) => t.track === 'construction')
          .map((t) => state.topicProgress[t.id]?.pL || 0)
          .reduce((a, b) => a + b, 0) /
          TOPICS.filter((t) => t.track === 'construction').length) *
          100
      ),
      color: '#d97706',
    },
    {
      name: 'Capstone',
      score: Math.round(
        (TOPICS.filter((t) => t.track === 'capstone')
          .map((t) => state.topicProgress[t.id]?.pL || 0)
          .reduce((a, b) => a + b, 0) /
          TOPICS.filter((t) => t.track === 'capstone').length) *
          100
      ),
      color: '#059669',
    },
  ];

  // Weak subtopics
  const allWeakSubtopics = progresses.flatMap((p) => p.weakSubtopics);
  const uniqueWeak = [...new Set(allWeakSubtopics)];

  // Overall score (topic-weighted by progression settings)
  const weightedTotals = TOPICS.reduce(
    (acc, topic) => {
      const progress = state.topicProgress[topic.id];
      if (!progress) return acc;
      const progressionConfig = getTopicProgressionConfig(topic.id);
      const weight = progressionConfig.finalScoreWeight;

      const bonusApplies =
        progress.isCompleted &&
        progress.hintsUsed === 0 &&
        (progress.assessmentAttempts ?? 0) === 1;
      const extraRemedialRounds = Math.max(0, (progress.remedialAttempts ?? 0) - 1);

      acc.weightedScoreSum += progress.pL * weight;
      if (bonusApplies) {
        acc.weightedBonusSum += progressionConfig.bonusNoHintsFirstAttempt * weight;
      }
      acc.weightedPenaltySum += extraRemedialRounds * progressionConfig.penaltyPerExtraRemedialRound * weight;
      acc.weightSum += weight;
      return acc;
    },
    { weightedScoreSum: 0, weightedBonusSum: 0, weightedPenaltySum: 0, weightSum: 0 }
  );

  const overallScore =
    weightedTotals.weightSum > 0
      ? Math.round(
          Math.max(
            0,
            Math.min(
              100,
              ((weightedTotals.weightedScoreSum + weightedTotals.weightedBonusSum - weightedTotals.weightedPenaltySum) /
                weightedTotals.weightSum) *
                100
            )
          )
        )
      : 0;

  const completedCount = progresses.filter((p) => p.isCompleted).length;

  const getGrade = (score: number) => {
    if (score >= 85) return { grade: 'A', label: 'Excellent!', color: 'text-emerald-400' };
    if (score >= 70) return { grade: 'B', label: 'Good Job!', color: 'text-blue-400' };
    if (score >= 55) return { grade: 'C', label: 'Keep Going!', color: 'text-yellow-400' };
    return { grade: 'D', label: 'Need More Practice', color: 'text-red-400' };
  };

  const gradeInfo = getGrade(overallScore);

  return (
    <div className="space-y-6">
      {/* Overall score card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 border border-indigo-500/30 p-8"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Overall Performance</p>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-white">{overallScore}</span>
              <span className="text-slate-400 text-xl mb-2">/ 100</span>
            </div>
            <p className={`text-lg font-semibold mt-1 ${gradeInfo.color}`}>{gradeInfo.label}</p>
            <p className="text-slate-400 text-sm mt-1">
              {completedCount} of {TOPICS.length} topics completed
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mb-2">
              <Trophy size={36} className="text-yellow-400" />
            </div>
            <span className={`text-3xl font-black ${gradeInfo.color}`}>{gradeInfo.grade}</span>
          </div>
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400" />
            <h3 className="font-bold text-white">Knowledge by Topic</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar
                  name="Knowledge"
                  dataKey="knowledge"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar chart */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-indigo-400" />
            <h3 className="font-bold text-white">Performance by Track</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={48}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                  formatter={(val) => [`${val}%`, 'Score']}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Topic-wise breakdown */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-slate-400" />
          <h3 className="font-bold text-white">Topic Breakdown</h3>
        </div>
        <div className="space-y-3">
          {TOPICS.map((topic) => {
            const progress = state.topicProgress[topic.id];
            if (!progress) return null;
            const pct = Math.round(progress.pL * 100);
            const trackColors = {
              geometry: 'bg-indigo-500',
              construction: 'bg-amber-500',
              capstone: 'bg-emerald-500',
            };
            return (
              <div key={topic.id} className="flex items-center gap-3">
                <div className="w-36 flex-shrink-0">
                  <p className="text-xs text-slate-300 truncate">{topic.name}</p>
                </div>
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${trackColors[topic.track]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                {progress.isCompleted ? (
                  <Badge variant="success" className="text-[10px]">Done</Badge>
                ) : !progress.isUnlocked ? (
                  <Badge variant="default" className="text-[10px]">Locked</Badge>
                ) : (
                  <Badge variant="info" className="text-[10px]">Active</Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Weak areas */}
      {uniqueWeak.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-yellow-400" />
            <h3 className="font-bold text-white">Areas Needing Attention</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueWeak.map((subtopic) => (
              <Badge key={subtopic} variant="warning">
                {subtopic}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-indigo-400" />
          <h3 className="font-bold text-white">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {overallScore < 70 && (
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400 mt-0.5">→</span>
              Review the topics where your score is below 60% and try the assessments again.
            </li>
          )}
          {uniqueWeak.length > 0 && (
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400 mt-0.5">→</span>
              Practice the weak subtopics: {uniqueWeak.slice(0, 3).join(', ')}.
            </li>
          )}
          <li className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-indigo-400 mt-0.5">→</span>
            Try using fewer hints to improve your independent problem-solving skills.
          </li>
          {completedCount < TOPICS.length && (
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-emerald-400 mt-0.5">→</span>
              Continue with remaining topics to unlock the full concept map!
            </li>
          )}
          {overallScore >= 85 && (
            <li className="flex items-start gap-2 text-sm text-emerald-300">
              <span className="text-emerald-400 mt-0.5">★</span>
              Excellent work! You have demonstrated strong mastery of geometry concepts.
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
