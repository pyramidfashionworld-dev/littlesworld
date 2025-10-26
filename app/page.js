// app/page.js
export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to Little World!</h2>
      <p>Explore adorable 3D baby clothes.</p>
      {/* Example 3D model placeholder */}
      <div style={{ marginTop: '30px' }}>
        <model-viewer
          src="/models/baby_clothes.glb"
          alt="3D Baby Clothes"
          auto-rotate
          camera-controls
          style={{ width: '300px', height: '300px' }}
        ></model-viewer>
      </div>
    </div>
  );
}
