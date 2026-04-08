'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Smile } from 'lucide-react';

const MODEL_URL = '/models';
const DETECTION_INTERVAL_MS = 3000;
const CONSECUTIVE_THRESHOLD = 2;

interface EmotionDetectorProps {
  onConfusionDetected: () => void;
  isActive: boolean;
  onToggle: () => void;
  hidden?: boolean;
  alertThresholdFrames?: number; // kept for API compatibility
  onCameraError?: () => void;
}

export default function EmotionDetector({
  onConfusionDetected,
  isActive,
  onToggle,
  hidden,
  onCameraError,
}: EmotionDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const consecutiveRef = useRef({ confused: 0, frustrated: 0 });
  const faceapiRef = useRef<any>(null);
  const modelsLoadedRef = useRef(false);
  const onConfusionDetectedRef = useRef(onConfusionDetected);
  onConfusionDetectedRef.current = onConfusionDetected;
  const onCameraErrorRef = useRef(onCameraError);
  onCameraErrorRef.current = onCameraError;

  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [modelsReady, setModelsReady] = useState(false);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setHasCamera(false);
      return;
    }

    let mounted = true;

    const setup = async () => {
      // ── 1. Start camera first — don't wait for models ──────────────────────
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 160, height: 120 },
          audio: false,
        });
        if (!mounted) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        if (mounted) setHasCamera(true);
      } catch (err) {
        console.warn('[EmotionDetector] Camera access denied:', err);
        if (mounted) {
          setCameraError(true);
          onCameraErrorRef.current?.();
        }
        return; // can't detect without camera
      }

      // ── 2. Load face-api.js models in parallel ─────────────────────────────
      if (!modelsLoadedRef.current) {
        try {
          const faceapi = await import('face-api.js');
          faceapiRef.current = faceapi;
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          ]);
          modelsLoadedRef.current = true;
          if (mounted) setModelsReady(true);
        } catch (err) {
          console.warn('[EmotionDetector] Failed to load models:', err);
          return;
        }
      } else {
        if (mounted) setModelsReady(true);
      }

      if (!mounted) return;

      // ── 3. Run emotion detection on interval ───────────────────────────────
      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || !faceapiRef.current || !modelsLoadedRef.current) return;
        const faceapi = faceapiRef.current;
        try {
          const result = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

          if (!result) return;

          const { expressions } = result;

          // Track dominant emotion for visible UI
          const dominant = (Object.entries(expressions as Record<string, number>)
            .sort((a, b) => b[1] - a[1])[0][0]) as string;
          if (mounted) setCurrentEmotion(dominant);

          // confused = fearful + sad; frustrated = angry + disgusted
          const confusedScore = (expressions.fearful ?? 0) + (expressions.sad ?? 0);
          const frustratedScore = (expressions.angry ?? 0) + (expressions.disgusted ?? 0);

          if (confusedScore > 0.25) {
            consecutiveRef.current.confused++;
            consecutiveRef.current.frustrated = 0;
            if (consecutiveRef.current.confused >= CONSECUTIVE_THRESHOLD) {
              consecutiveRef.current = { confused: 0, frustrated: 0 };
              onConfusionDetectedRef.current();
            }
          } else if (frustratedScore > 0.25) {
            consecutiveRef.current.frustrated++;
            consecutiveRef.current.confused = 0;
            if (consecutiveRef.current.frustrated >= CONSECUTIVE_THRESHOLD) {
              consecutiveRef.current = { confused: 0, frustrated: 0 };
              onConfusionDetectedRef.current();
            }
          } else {
            consecutiveRef.current = { confused: 0, frustrated: 0 };
          }
        } catch {
          // silent — detection errors must not interrupt learning
        }
      }, DETECTION_INTERVAL_MS);
    };

    setup();

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [isActive]);

  // Hidden mode: video has real dimensions so face-api.js can analyse frames,
  // but is visually hidden via visibility:hidden (opacity:0 still takes layout space,
  // visibility:hidden removes it from view without affecting detection).
  if (hidden) {
    return (
      <video
        ref={videoRef}
        muted
        playsInline
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 160,
          height: 120,
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    );
  }

  // Visible mode UI
  const emotionEmoji: Record<string, string> = {
    happy: '😊', neutral: '😐', sad: '😢',
    angry: '😠', fearful: '😨', disgusted: '😒', surprised: '😲',
  };

  return (
    <div className="w-full">
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
            <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between bg-black/60 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-sm">{emotionEmoji[currentEmotion] ?? '🎯'}</span>
              <span className="text-[10px] font-medium text-slate-300 capitalize">{currentEmotion}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${modelsReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col items-center gap-2">
          <Smile size={20} className="text-slate-600" />
          <p className="text-[10px] text-slate-500 text-center">
            Enable to track your emotions while learning
          </p>
        </div>
      )}
    </div>
  );
}
