import { db } from "../../lib/firebase";
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