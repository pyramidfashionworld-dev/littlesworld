import reviews from '@/data/reviews.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { productId } = req.query;
    const productReviews = reviews.filter(r => r.productId === parseInt(productId));
    res.status(200).json(productReviews);
  }
  
  if (req.method === 'POST') {
    const { productId, rating, comment, userName } = req.body;
    const newReview = {
      id: reviews.length + 1,
      productId,
      rating,
      comment,
      userName,
      date: new Date().toISOString()
    };
    reviews.push(newReview);
    res.status(201).json(newReview);
  }
}