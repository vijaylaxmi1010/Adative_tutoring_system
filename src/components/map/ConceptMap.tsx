'use client';

import { useRouter } from 'next/navigation';
import { TOPICS } from '@/lib/mock-data';
import { TopicProgress } from '@/types';
import TopicNode from './TopicNode';

interface ConceptMapProps {
  topicProgress: Record<string, TopicProgress>;
}

const LAYERS: { layer: number; topicIds: string[] }[] = [
  { layer: 1, topicIds: ['LA-01'] },
  { layer: 2, topicIds: ['LA-02', 'PC-01'] },
  { layer: 3, topicIds: ['LA-03', 'PC-02'] },
  { layer: 4, topicIds: ['LA-05', 'LA-04'] },
  { layer: 5, topicIds: ['PC-03'] },
  { layer: 6, topicIds: ['PC-04'] },
  { layer: 7, topicIds: ['PC-05'] },
];

export default function ConceptMap({ topicProgress }: ConceptMapProps) {
  const router = useRouter();
  const topicMap = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  let nodeIndex = 0;

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full min-h-full flex flex-col items-center justify-start py-10 px-4 gap-8">
        {LAYERS.map(({ layer, topicIds }) => (
          <div key={layer} className="relative flex items-center justify-center w-full">
            {/* Layer label — absolutely positioned so nodes stay perfectly centered */}
            <div className="absolute left-4 text-[11px] text-slate-600 font-bold uppercase tracking-widest select-none">
              L{layer}
            </div>

            <div className="flex items-center gap-12">
              {topicIds.map((id) => {
                const topic = topicMap[id];
                const progress = topicProgress[id];
                const idx = nodeIndex++;
                if (!topic || !progress) return null;
                return (
                  <TopicNode
                    key={id}
                    topic={topic}
                    progress={progress}
                    index={idx}
                    onClick={() => router.push(`/topic/${id}`)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
