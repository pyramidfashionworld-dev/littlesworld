'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface FormData {
  items: CartItem[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAsBilling: boolean;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface Errors {
  [key: string]: string;
}

export default function CheckoutFlow() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    items: [
      { id: 1, name: 'Wireless Headphones', price: 99.99, qty: 1 },
      { id: 2, name: 'USB-C Cable', price: 19.99, qty: 2 },
    ],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    sameAsBilling: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Errors = {};

    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name required';
      if (!formData.lastName) newErrors.lastName = 'Last name required';
      if (!formData.email) newErrors.email = 'Email required';
      if (!formData.phone) newErrors.phone = 'Phone required';
      if (!formData.address) newErrors.address = 'Address required';
      if (!formData.city) newErrors.city = 'City required';
      if (!formData.state) newErrors.state = 'State required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code required';
    } else if (step === 3) {
      if (!formData.cardName) newErrors.cardName = 'Cardholder name required';
      if (!formData.cardNumber)
        newErrors.cardNumber = 'Card number required';
      if (!formData.expiry) newErrors.expiry = 'Expiry date required';
      if (!formData.cvv) newErrors.cvv = 'CVV required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      alert(
        'Order placed successfully!\n\nOrder Summary:\n' +
          JSON.stringify(formData, null, 2)
      );
    }
  };

  const cartTotal = formData.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shippingCost = 10;
  const tax = cartTotal * 0.1;
  const orderTotal = cartTotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Fast and secure payment process</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  num < step
                    ? 'bg-green-500 text-white'
                    : num === step
                    ? 'bg-blue-600 text-white ring-4 ring-blue-300'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {num < step ? <Check size={24} /> : num}
              </div>
              {num < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    num < step ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mb-12 text-sm font-semibold">
          <span className={step >= 1 ? 'text-blue-600' : 'text-gray-500'}>
            Cart Review
          </span>
          <span className={step >= 2 ? 'text-blue-600' : 'text-gray-500'}>
            Shipping & Billing
          </span>
          <span className={step >= 3 ? 'text-blue-600' : 'text-gray-500'}>
            Payment
          </span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Step 1: Cart Review */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Review Your Cart
                  </h2>
                  <div className="space-y-4">
                    {formData.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-4 border-b"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                        </div>
                        <p className="font-bold text-lg text-blue-600">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping & Billing */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>