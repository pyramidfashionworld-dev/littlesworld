import { db } from "../../lib/firebase";
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