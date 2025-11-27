'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, CreditCard, QrCode, Smartphone } from 'lucide-react';

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
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  upiId: string;
}

interface Errors {
  [key: string]: string;
}

type PaymentMethod = 'upi' | 'qr' | 'card' | 'debit' | null;

export default function CheckoutFlow() {
  const [step, setStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [formData, setFormData] = useState<FormData>({
    items: [
      { id: 1, name: 'Product 1', price: 999, qty: 1 },
      { id: 2, name: 'Product 2', price: 1999, qty: 1 },
    ],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
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
      if (!paymentMethod) newErrors.paymentMethod = 'Select payment method';

      if (paymentMethod === 'card' || paymentMethod === 'debit') {
        if (!formData.cardName) newErrors.cardName = 'Cardholder name required';
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number required';
        if (!formData.expiry) newErrors.expiry = 'Expiry date required';
        if (!formData.cvv) newErrors.cvv = 'CVV required';
      } else if (paymentMethod === 'upi') {
        if (!formData.upiId) newErrors.upiId = 'UPI ID required';
      }
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

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        const orderRes = await fetch('/api/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: orderTotal,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            description: `Little's World Order - ${paymentMethod?.toUpperCase()}`,
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            method: paymentMethod,
          }),
        });

        const orderData = await orderRes.json();

        if (!orderData.success) {
          alert('❌ Failed to create payment order. Try again.');
          return;
        }

        const options: any = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: orderData.orderId,
          amount: orderData.amount,
          currency: 'INR',
          name: "Little's World",
          description: 'Order Payment',
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          method: {
            upi: paymentMethod === 'upi',
            netbanking: false,
            card: paymentMethod === 'card' || paymentMethod === 'debit',
            wallet: false,
          },
          theme: { color: '#2563EB' },
          handler: async (response: any) => {
            const verifyRes = await fetch('/api/razorpay', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert(
                `✅ Payment Successful!\n\nOrder ID: ${response.razorpay_order_id}\nPayment Method: ${paymentMethod?.toUpperCase()}\n\nThank you for your order!`
              );
              setStep(1);
              setPaymentMethod(null);
              setFormData(prev => ({
                ...prev,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                cardName: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                upiId: '',
              }));
            } else {
              alert('❌ Payment verification failed. Please contact support.');
            }
          },
        };

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error('Payment error:', error);
        alert('❌ An error occurred. Please try again.');
      }
    }
  };

  const cartTotal = formData.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = 100;
  const tax = Math.round(cartTotal * 0.1);
  const orderTotal = cartTotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Fast and secure payment</p>
        </div>

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

        <div className="flex justify-between mb-12 text-sm font-semibold">
          <span className={step >= 1 ? 'text-blue-600' : 'text-gray-500'}>Cart Review</span>
          <span className={step >= 2 ? 'text-blue-600' : 'text-gray-500'}>Shipping</span>
          <span className={step >= 3 ? 'text-blue-600' : 'text-gray-500'}>Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Review Cart</h2>
                  {formData.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-lg text-blue-600">₹{item.price * item.qty}</p>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Payment Method</h2>
                  {errors.paymentMethod && <p className="text-red-500 text-sm mb-4">{errors.paymentMethod}</p>}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* UPI Option */}
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                        paymentMethod === 'upi'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <Smartphone size={32} className="text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold">UPI Payment</p>
                        <p className="text-sm text-gray-600">Google Pay, PhonePe, etc</p>
                      </div>
                    </button>

                    {/* QR Code Option */}
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                        paymentMethod === 'qr'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <QrCode size={32} className="text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold">Scan QR Code</p>
                        <p className="text-sm text-gray-600">Quick & Easy</p>
                      </div>
                    </button>

                    {/* Credit Card Option */}
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                        paymentMethod === 'card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <CreditCard size={32} className="text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold">Credit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard</p>
                      </div>
                    </button>

                    {/* Debit Card Option */}
                    <button
                      onClick={() => setPaymentMethod('debit')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                        paymentMethod === 'debit'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <CreditCard size={32} className="text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold">Debit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                      </div>
                    </button>
                  </div>

                  {/* Payment Details Form */}
                  {(paymentMethod === 'card' || paymentMethod === 'debit') && (
                    <div className="space-y-4 mt-6 pt-6 border-t">
                      <h3 className="font-semibold text-gray-900">Card Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.expiry ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 mt-6 pt-6 border-t">
                      <h3 className="font-semibold text-gray-900">UPI Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                        <input
                          type="text"
                          name="upiId"
                          placeholder="yourname@upi"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.upiId ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'qr' && (
                    <div className="space-y-4 mt-6 pt-6 border-t text-center">
                      <h3 className="font-semibold text-gray-900">Scan QR Code</h3>
                      <div className="bg-gray-100 p-8 rounded-lg inline-block">
                        <QrCode size={150} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Scan with any UPI app</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b">
                {formData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} x{item.qty}</span>
                    <span className="font-semibold text-gray-900">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">₹{shippingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-8 pb-8 border-b">
                <span>Total</span>
                <span className="text-blue-600">₹{orderTotal}</span>
              </div>

              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                )}
                {step < 3 && (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                )}
                {step === 3 && (
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Pay ₹{orderTotal}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}