"use client";

import { useState, useRef, useEffect } from "react";
import { X, Move, Check } from "lucide-react";
import { toast } from "sonner";

type FocalPointEditorProps = {
  mediaId: string;
  imageUrl: string;
  initialX?: number;
  initialY?: number;
  onClose: () => void;
  onSave: (x: number, y: number) => void;
};

export function FocalPointEditor({
  mediaId,
  imageUrl,
  initialX = 50,
  initialY = 50,
  onClose,
  onSave,
}: FocalPointEditorProps) {
  const [focalX, setFocalX] = useState(initialX);
  const [focalY, setFocalY] = useState(initialY);
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    updateFocalPoint(e);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      updateFocalPoint(e);
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleTouchStart(e: React.TouchEvent) {
    setIsDragging(true);
    updateFocalPointFromTouch(e);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (isDragging) {
      updateFocalPointFromTouch(e);
    }
  }

  function handleTouchEnd() {
    setIsDragging(false);
  }

  function updateFocalPoint(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setFocalX(Math.round(x));
    setFocalY(Math.round(y));
  }

  function updateFocalPointFromTouch(e: React.TouchEvent) {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
    setFocalX(Math.round(x));
    setFocalY(Math.round(y));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/media/${mediaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focalX, focalY }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Focal point saved");
      onSave(focalX, focalY);
      onClose();
    } catch {
      toast.error("Failed to save focal point");
    } finally {
      setSaving(false);
    }
  }

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-4 rounded-lg bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <Move className="h-5 w-5 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">Set Focal Point</h3>
              <p className="text-sm text-gray-400">Click or drag to set the focus area</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Image with focal point */}
        <div className="relative p-4">
          <div
            ref={containerRef}
            className="relative cursor-crosshair overflow-hidden rounded-lg max-h-[50vh]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Set focal point"
              className="w-full max-h-[50vh] object-contain select-none"
              draggable={false}
            />

            {/* Crosshair overlay */}
            <div
              className="pointer-events-none absolute h-full w-px bg-red-500/70"
              style={{ left: `${focalX}%` }}
            />
            <div
              className="pointer-events-none absolute w-full h-px bg-red-500/70"
              style={{ top: `${focalY}%` }}
            />

            {/* Focal point indicator */}
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${focalX}%`, top: `${focalY}%` }}
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-red-500/50 shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Dim areas outside focal point */}
            <div className="pointer-events-none absolute inset-0 bg-black/30" />
          </div>

          {/* Preview boxes showing how it will look */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="mb-2 text-xs text-gray-400">Square (1:1)</p>
              <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="absolute h-full w-full object-cover"
                  style={{ objectPosition: `${focalX}% ${focalY}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="mb-2 text-xs text-gray-400">Portrait (3:4)</p>
              <div className="relative mx-auto aspect-[3/4] w-20 overflow-hidden rounded bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="absolute h-full w-full object-cover"
                  style={{ objectPosition: `${focalX}% ${focalY}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="mb-2 text-xs text-gray-400">Wide (16:9)</p>
              <div className="relative mx-auto aspect-video w-28 overflow-hidden rounded bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="absolute h-full w-full object-cover"
                  style={{ objectPosition: `${focalX}% ${focalY}%` }}
                />
              </div>
            </div>
          </div>

          {/* Coordinates display */}
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>X: {focalX}%</span>
            <span>Y: {focalY}%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-gray-800 p-4">
          <button
            onClick={() => {
              setFocalX(50);
              setFocalY(50);
            }}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
          >
            Reset to Center
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            {saving ? "Saving..." : "Save Focal Point"}
          </button>
        </div>
      </div>
    </div>
  );
}
