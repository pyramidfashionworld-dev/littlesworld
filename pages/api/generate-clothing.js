// FILE: pages/api/generate-clothing.js
// API endpoint to generate AI clothing images using Replicate

import Replicate from "replicate";
import sharp from "sharp";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, collection, count = 4 } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("Generating images with prompt:", prompt);

    // Use Replicate's FLUX model for high-quality image generation
    const output = await replicate.run(
      "black-forest-labs/flux-pro",
      {
        input: {
          prompt: prompt,
          num_outputs: count,
          quality: "hd",
          aspect_ratio: "1:1",
        },
      }
    );

    // Add Little's World watermark to each image
    const imagesWithWatermark = await Promise.all(
      output.map(async (imageUrl, idx) => {
        const watermarkedUrl = await addWatermark(imageUrl, collection, idx);
        return {
          url: watermarkedUrl,
          id: `${collection}-${Date.now()}-${idx}`,
          name: `${collection.charAt(0).toUpperCase() + collection.slice(1)} Outfit ${idx + 1}`,
          description: generateDescription(collection, idx),
          collection: collection,
          price: generatePrice(collection),
          sku: `LW-${collection.toUpperCase()}-${Date.now()}-${idx}`,
        };
      })
    );

    res.status(200).json({ 
      success: true, 
      images: imagesWithWatermark,
      collection: collection,
      count: count,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ 
      error: "Failed to generate images",
      details: error.message,
    });
  }
}

// Add watermark to image
async function addWatermark(imageUrl, collection, index) {
  try {
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.buffer();

    // Create watermark text
    const watermarkText = "👶 Little's World";
    const watermarkSvg = `
      <svg width="200" height="60">
        <rect width="200" height="60" fill="rgba(236, 72, 153, 0.8)" rx="8"/>
        <text x="100" y="40" font-size="16" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">
          ${watermarkText}
        </text>
      </svg>
    `;

    const watermarkBuffer = Buffer.from(watermarkSvg);

    // Composite watermark on bottom-right of image
    const watermarkedImage = await sharp(imageBuffer)
      .composite([
        {
          input: watermarkBuffer,
          gravity: "southeast",
          offset: { left: 10, top: 10 },
        },
      ])
      .toBuffer();

    // Convert to base64 data URL
    return `data:image/png;base64,${watermarkedImage.toString("base64")}`;
  } catch (error) {
    console.warn("Watermark failed, returning original:", error);
    return imageUrl;
  }
}

// Generate product description based on collection and index
function generateDescription(collection, index) {
  const winterDescriptions = [
    "Cozy knitted sweater perfect for winter comfort",
    "Warm jacket with soft lining for cold days",
    "Premium winter boots with non-slip sole",
    "Thermal leggings for ultimate warmth",
  ];

  const summerDescriptions = [
    "Lightweight cotton dress for hot summer days",
    "Breathable romper in vibrant summer colors",
    "Sun-protective summer hat with UV coating",
    "Cool sleeveless outfit perfect for playtime",
  ];

  const descriptions = collection === "winter" ? winterDescriptions : summerDescriptions;
  return descriptions[index % descriptions.length];
}

// Generate pricing based on collection
function generatePrice(collection) {
  if (collection === "winter") {
    return Math.floor(Math.random() * (1999 - 1299) + 1299); // ₹1299-1999
  } else {
    return Math.floor(Math.random() * (1499 - 799) + 799); // ₹799-1499
  }
}

// FILE: pages/api/save-clothing.js
// Save generated clothing to database

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { images, collection: collectionName } = req.body;

  if (!images || !Array.isArray(images)) {
    return res.status(400).json({ error: "Invalid images data" });
  }

  try {
    const clothingCollection = collection(db, "products");
    const savedProducts = [];

    for (const image of images) {
      const docRef = await addDoc(clothingCollection, {
        name: image.name,
        description: image.description,
        collection: collectionName,
        price: image.price,
        sku: image.sku,
        image: image.url,
        category: "clothing",
        season: collectionName,
        aiGenerated: true,
        status: "active",
        inventory: 50,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        tags: ["ai-generated", collectionName, "littlesworld"],
      });

      savedProducts.push({
        id: docRef.id,
        ...image,
      });
    }

    res.status(200).json({
      success: true,
      message: `${savedProducts.length} products saved successfully`,
      products: savedProducts,
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({
      error: "Failed to save products",
      details: error.message,
    });
  }
}

// FILE: pages/api/get-clothing.js
// Get all clothing by collection

import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const { collectionName } = req.query;

  if (!collectionName) {
    return res.status(400).json({ error: "Collection name required" });
  }

  try {
    const clothingCollection = collection(db, "products");
    const q = query(
      clothingCollection,
      where("collection", "==", collectionName),
      where("status", "==", "active")
    );

    const querySnapshot = await getDocs(q);
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({
      success: true,
      collection: collectionName,
      count: products.length,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message,
    });
  }
}

// FILE: package.json additions
// Add these to your package.json dependencies:
/*
"replicate": "^0.25.0",
"sharp": "^0.33.0"
*/