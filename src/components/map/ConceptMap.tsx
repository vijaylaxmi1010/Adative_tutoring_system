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
      <div className="min-w-[700px] min-h-full flex flex-col items-center justify-start py-8 px-6 gap-5">
        {LAYERS.map(({ layer, topicIds }) => (
          <div key={layer} className="flex items-center gap-8 justify-center w-full">
            {/* Layer label */}
            <div className="text-[10px] text-slate-600 font-semibold w-8 text-right flex-shrink-0 uppercase tracking-widest">
              L{layer}
            </div>

            <div className="flex items-center gap-10 flex-1 justify-center">
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

            <div className="w-8 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
