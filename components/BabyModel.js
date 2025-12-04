"use client";
import "@google/model-viewer";

export default function BabyModel() {
  return (
    <div className="flex justify-center my-10">
      <model-viewer
        src="/models/baby.glb"
        alt="3D Baby Model"
        auto-rotate
        camera-controls
        style={{ width: "300px", height: "300px" }}
      ></model-viewer>
    </div>
  );
}
