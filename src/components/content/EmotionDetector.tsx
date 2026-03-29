'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, HelpCircle, X, Smile } from 'lucide-react';
import Button from '@/components/ui/Button';

interface EmotionDetectorProps {
  onConfusionDetected: () => void;
  isActive: boolean;
  onToggle: () => void;
  hidden?: boolean;
}

type Emotion = 'happy' | 'focused' | 'confused' | 'bored';

const MOCK_EMOTIONS: Emotion[] = ['focused', 'happy', 'focused', 'confused', 'focused', 'bored', 'confused'];

export default function EmotionDetector({ onConfusionDetected, isActive, onToggle, hidden }: EmotionDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('focused');
  const [showConfusionAlert, setShowConfusionAlert] = useState(false);
  useEffect(() => {
    if (!isActive || hidden) {
      if (!hidden) stopCamera();
      return;
    }
    startCamera();
    return () => stopCamera();
  }, [isActive, hidden]);

  // Mock emotion detection cycle
  useEffect(() => {
    if (!isActive) return;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % MOCK_EMOTIONS.length;
      const emotion = MOCK_EMOTIONS[index];
      setCurrentEmotion(emotion);
      if (emotion === 'confused') {
        if (hidden) {
          onConfusionDetected();
        } else {
          setShowConfusionAlert(true);
        }
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 160, height: 120 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCamera(true);
      setCameraError(false);
    } catch {
      setCameraError(true);
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setHasCamera(false);
  };

  const handleConfusionHelp = () => {
    setShowConfusionAlert(false);
    onConfusionDetected();
  };

  const emotionConfig = {
    happy: { emoji: '😊', label: 'Great!', color: 'text-emerald-400' },
    focused: { emoji: '🎯', label: 'Focused', color: 'text-blue-400' },
    confused: { emoji: '🤔', label: 'Confused?', color: 'text-yellow-400' },
    bored: { emoji: '😐', label: 'Bored?', color: 'text-orange-400' },
  };

  const config = emotionConfig[currentEmotion];

  if (hidden) return null;

  return (
    <div className="w-full">
      {/* Camera toggle */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-medium">Emotion Tracker</span>
        <button
          onClick={onToggle}
          className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
        >
          {isActive ? <CameraOff size={11} /> : <Camera size={11} />}
          {isActive ? 'Disable' : 'Enable'}
        </button>
      </div>

      {isActive ? (
        <div className="space-y-2">
          {/* Video feed or placeholder */}
          <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video border border-slate-700">
            {hasCamera ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
                {cameraError ? (
                  <>
                    <CameraOff size={18} className="text-slate-600" />
                    <p className="text-[10px] text-slate-500 text-center">Camera unavailable</p>
                  </>
                ) : (
                  <>
                    <Camera size={18} className="text-slate-600 animate-pulse" />
                    <p className="text-[10px] text-slate-500">Connecting...</p>
                  </>
                )}
              </div>
            )}

            {/* Emotion overlay */}
            {isActive && (
              <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-sm">{config.emoji}</span>
                <span className={`text-[10px] font-medium ${config.color}`}>{config.label}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-500 text-center">
            Mock emotion detection
          </p>
        </div>
      ) : (
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col items-center gap-2">
          <Smile size={20} className="text-slate-600" />
          <p className="text-[10px] text-slate-500 text-center">
            Enable to track your emotions while learning
          </p>
        </div>
      )}

      {/* Confusion alert popup */}
      <AnimatePresence>
        {showConfusionAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/40 rounded-xl"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <HelpCircle size={14} className="text-yellow-400 flex-shrink-0" />
                <p className="text-xs text-yellow-300 font-medium">You look confused!</p>
              </div>
              <button
                onClick={() => setShowConfusionAlert(false)}
                className="text-yellow-600 hover:text-yellow-400"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Do you need help understanding this topic?
            </p>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleConfusionHelp}
              className="w-full text-xs py-1"
            >
              Switch content type
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
