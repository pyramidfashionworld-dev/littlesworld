"use client";

import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <model-viewer
      src="/models/baby.glb"
      alt="3D Baby Clothing Model"
      auto-rotate
      camera-controls
      shadow-intensity="1"
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "20px",
        background: "linear-gradient(to bottom right, #ffe4e6, #e0f2fe)",
      }}
    ></model-viewer>
  );
}
