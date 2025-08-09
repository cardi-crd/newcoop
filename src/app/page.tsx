'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from "../components/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'food' | 'drinks'>('food');
  const [showCateringForm, setShowCateringForm] = useState(false);
  const [cateringForm, setCateringForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: '',
    eventType: '',
    additionalInfo: ''
  });

  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create email body
    const emailBody = `
Name: ${cateringForm.name}
Email: ${cateringForm.email}
Phone: ${cateringForm.phone}
Date of Event: ${cateringForm.date}
Number of People: ${cateringForm.people}
Type of Event: ${cateringForm.eventType}
Additional Information: ${cateringForm.additionalInfo}
    `;
    
    // Open email client with pre-filled information
    const mailtoLink = `mailto:owner@coopxcowpig.com?subject=Catering Request - ${cateringForm.eventType}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    
    // Reset form and close modal
    setCateringForm({ name: '', email: '', phone: '', date: '', people: '', eventType: '', additionalInfo: '' });
    setShowCateringForm(false);
  };

  const bgClass = theme === 'bagel' ? 'bg-[#46bafc]' : 'bg-black';

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col items-center py-16 px-4 pb-32`}>
      {/* Main Container */}
      <div className="max-w-md mx-auto min-h-screen">
        
        {/* Coop Logo */}
        <div className="text-center pt-2 pb-6">
          <Link href="/" className="inline-block hover:scale-105 transition-transform duration-200 cursor-pointer">
            <Image
              src="/cooplogo.png"
              alt="Coop Logo - Click to go home"
              width={400}
              height={160}
              className="h-40 w-auto mx-auto"
              priority
            />
          </Link>
        </div>

        {/* Catering Section */}
        <div className="px-6 mb-8">
          <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Image
                  src="/coopTIM2.png"
                  alt="Coop Catering"
                  width={300}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 text-center">
                <p className="font-mockeyclown text-2xl text-white-outline mb-4">
                  Let us cater your next event!
                </p>
                <button
                  onClick={() => setShowCateringForm(true)}
                  className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Toggle */}
        <div className="px-6 mb-4">
          <div className="bg-gray-200 rounded-full p-1 shadow-inner w-48 mx-auto">
            <div className="relative flex">
              <button
                onClick={() => setActiveSection('food')}
                className={`flex-1 py-3 px-6 rounded-full font-margarine text-lg transition-all duration-300 relative z-10 ${
                  activeSection === 'food' 
                    ? 'bg-white text-red-600 shadow-md transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Food
              </button>
          <button
                onClick={() => setActiveSection('drinks')}
                className={`flex-1 py-3 px-6 rounded-full font-margarine text-lg transition-all duration-300 relative z-10 ${
                  activeSection === 'drinks' 
                    ? 'bg-white text-red-600 shadow-md transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Drinks
          </button>
              {/* Sliding indicator */}
              <div 
                className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-md transition-transform duration-300 z-0 ${
                  activeSection === 'food' ? 'translate-x-0' : 'translate-x-full'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="px-6 pb-24">
          {activeSection === 'food' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Coop Combo */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/coop-combo.png"
                    alt="Coop Combo"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Coop Combo</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Three chicken tenders—classic, spicy, or lemon pepper—served with crispy fries, Texas toast, our house-made buttermilk ranch, and our signature CowPig sauce
                  </p>
                </div>
              </div>

              {/* The Cluck Box */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/cluckbox.png"
                    alt="The Cluck Box"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">The Cluck Box</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our menu sampler: The Cluck Box, includes your choice of sandwich, two chicken tenders, a mini order of buffalo fries or a waffle, and a drink. Perfect for sharing!
                  </p>
                </div>
              </div>

              {/* Tendies & a Waffle */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/tendieswaffle.png"
                    alt="Tendies & a Waffle"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Tendies & a Waffle</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our take on chicken and waffles: Three spicy or classic chicken tenders served with a freshly made waffle, topped with butter and your choice of maple or spicy chiltepin agave syrup
                  </p>
                </div>
              </div>

              {/* Coop Melt */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/coopmelt.png"
                    alt="Coop Melt"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Coop Melt</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Marinated chicken paired with roasted hatch green chiles, crispy bacon, melted onions, our signature CowPig sauce and cheddar cheese, all served up on some buttery Texas toast
                  </p>
                </div>
              </div>

              {/* BBQ Chicken Sandwich */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/BBQSANDO.png"
                    alt="BBQ Chicken Sandwich"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">BBQ Chicken Sandwich</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Marinated chicken topped with crispy bacon, tangy BBQ sauce, and melted cheddar cheese, served on buttery Texas toast.
                  </p>
                </div>
              </div>

              {/* Spicy Chicken Sandwich */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/spicysando.png"
                    alt="Spicy Chicken Sandwich"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Spicy Chicken Sandwich</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Marinated chicken topped with rotating hot sauce, fresh pico de gallo, melted cheese, and served with a side of crispy fries
                  </p>
                </div>
              </div>

              {/* Classic Chicken Sandwich */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/classicsando.png"
                    alt="Classic Chicken Sandwich"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Classic Chicken Sandwich</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Marinated chicken with shredded lettuce, pickles, melted cheese, and CowPig sauce, all served on buttery Texas toast
                  </p>
                </div>
              </div>

              {/* Buffalo Ranch Fries */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/buffaloranchfries.png"
                    alt="Buffalo Ranch Fries"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Buffalo Ranch Fries</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Crispy fries smothered with chopped Coop chicken tenders, cheddar cheese, tangy buffalo sauce, house-made buttermilk ranch, and CowPig sauce
                  </p>
                </div>
              </div>

              {/* Tucson Fries */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/tucsonfries.png"
                    alt="Tucson Fries"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Tucson Fries</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A hearty serving of crispy fries, loaded with chopped chicken, hatch green chiles, crispy bacon, melted onions, cheddar cheese, our house-made buttermilk ranch, and CowPig sauce.
                  </p>
                </div>
              </div>

              {/* Elote Fries */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/elotefries.png"
                    alt="Elote Fries"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Elote Fries</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A Crispy bed of fries topped with roasted sweet corn, roasted hatch green chiles, melted onions, cheddar cheese, our in house-made buttermilk ranch, and our specialty CowPig sauce
                  </p>
                </div>
              </div>

              {/* Bourdain Burger */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/Bourdain.png"
                    alt="Bourdain Burger"
                    width={400}
                    height={192}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Bourdain Burger</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A double cheeseburger featuring white cheddar, sharp cheddar, crispy bacon, and our signature CowPig sauce, all served on buttery Texas toast
                  </p>
                </div>
              </div>

              {/* Mac and Cheese */}
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/mac1.png"
                    alt="Mac and Cheese"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 md:px-6 lg:px-7 shadow-lg">
                  <h3 className="font-margarine text-xl mb-3 text-gray-800">Mac and Cheese</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A classic mac and cheese with perfectly cooked pasta and a creamy blend of white cheddar and sharp cheddar cheeses
                  </p>
                </div>
              </div>

            </div>
          )}

          {activeSection === 'drinks' && (
            <div className="space-y-8">
              {/* Beverage Options */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200">
                <h3 className="font-margarine text-2xl mb-4 text-blue-800">Beverages</h3>
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <Image
                    src="/drpng.png"
                    alt="Drink"
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                  <Image
                    src="/starry.png"
                    alt="Starry"
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                  <Image
                    src="/pepsi.png"
                    alt="Pepsi"
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-blue-700 font-semibold">🍺 Rotating Tap Selection</p>
                  <p className="text-blue-600">🥤 Pepsi Products</p>
                  <p className="text-blue-600">🍵 Sweet Tea</p>
                </div>
              </div>

              {/* Classic Cocktails Section */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-margarine text-2xl mb-4 text-gray-800 border-b-2 border-red-500 pb-2">Classic Cocktails</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">House Margarita</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Cadillac Margarita</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Tequila Sunrise</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Old Fashioned</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Mojito</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Cosmopolitan</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Dirty Shirley</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Lemon Drop</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Whisky Sour</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Mule</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Martini</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Long Island</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">AMF</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Strawberry Daiquiri</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Michelada</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Bloody Mary</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Happy Hour Section */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 shadow-lg border border-red-200">
                <h3 className="font-margarine text-2xl mb-2 text-red-800">Happy Hour!</h3>
                <p className="text-red-700 font-semibold">$1 off all cocktails</p>
                <p className="text-red-600">12-6 pm everyday</p>
              </div>

              {/* Mocktails Section */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-margarine text-2xl mb-4 text-gray-800 border-b-2 border-red-500 pb-2">Mocktails</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Sober Sipper</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Zerorita</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Maui Waui</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Shirley Temple</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Michenada</span>
                  </div>
                </div>
              </div>

              {/* Shots Section */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-margarine text-2xl mb-4 text-gray-800 border-b-2 border-red-500 pb-2">Shots</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Gummy Bear</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Mexican Candy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Green Tea</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Pickle Juice</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Cinnamon Toast</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Goldfish</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Catering Form Modal */}
        {showCateringForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-4 max-w-sm w-full shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-margarine text-lg text-gray-800">Catering Request</h2>
                <button
                  onClick={() => setShowCateringForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleCateringSubmit} className="space-y-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={cateringForm.name}
                    onChange={(e) => setCateringForm({...cateringForm, name: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={cateringForm.email}
                    onChange={(e) => setCateringForm({...cateringForm, email: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={cateringForm.phone}
                    onChange={(e) => setCateringForm({...cateringForm, phone: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date of Event *</label>
                  <input
                    type="date"
                    required
                    value={cateringForm.date}
                    onChange={(e) => setCateringForm({...cateringForm, date: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Number of People *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={cateringForm.people}
                    onChange={(e) => setCateringForm({...cateringForm, people: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    placeholder="How many people?"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Type of Event *</label>
                  <select
                    required
                    value={cateringForm.eventType}
                    onChange={(e) => setCateringForm({...cateringForm, eventType: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Team Lunch">Team Lunch</option>
                    <option value="Backyard Party">Backyard Party</option>
                    <option value="Reception">Reception</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Additional Info (optional)</label>
                  <textarea
                    value={cateringForm.additionalInfo}
                    onChange={(e) => setCateringForm({...cateringForm, additionalInfo: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    rows={2}
                    placeholder="Any specific requests or details"
                  />
                </div>
                
                <div className="bg-blue-50 p-2 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>You bring the people. We'll bring the chicken!</strong><br/>
                    Custom menu options available - just let us know in additional info!
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                >
                  Send Catering Request
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}