/* ============================================
   Stackly - Main JavaScript (Shared)
   ============================================ */
'use strict';

// ========== PRODUCTS DATA ==========
const products = [
  { id: 1, name: 'Smart Oven Pro X3', category: 'kitchen', price: 1299, originalPrice: 1599, rating: 4.8, reviews: 234, badge: 'hot', featured: true, description: 'AI-powered smart oven with precise temperature control, voice commands, and 50+ preset recipes. Transform your cooking experience.', specs: ['50L Capacity', 'WiFi & Bluetooth', 'Voice Control', 'Self-Cleaning', 'Energy Class A++'], image: 'images/oven.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="20" y="25" width="80" height="70" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="28" y="33" width="64" height="44" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="55" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="60" y1="45" x2="60" y2="65" stroke="#c7a254" stroke-width="1.5"/><line x1="50" y1="55" x2="70" y2="55" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="14" width="10" height="16" rx="2" fill="#c7a254" opacity="0.5"/><rect x="66" y="14" width="10" height="16" rx="2" fill="#c7a254" opacity="0.5"/><rect x="28" y="77" width="64" height="12" rx="2" fill="#c7a254" opacity="0.2"/></svg>` },
  { id: 2, name: 'UltraWash 5000', category: 'laundry', price: 899, originalPrice: null, rating: 4.7, reviews: 189, badge: 'new', featured: true, description: 'High-efficiency washing machine with steam cleaning, 16 wash cycles, and smart detergent dispensing.', specs: ['9kg Capacity', '1400 RPM Spin', 'Steam Clean', '16 Programs', 'Quiet Mark'], image: 'images/washingmachine.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="22" y="30" width="76" height="54" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="26" y="14" width="14" height="22" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="80" y="14" width="14" height="22" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="57" r="14" fill="none" stroke="#c7a254" stroke-width="1.5"/><path d="M54 57h12M60 51v12" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><rect x="26" y="76" width="68" height="6" rx="2" fill="#c7a254" opacity="0.3"/></svg>` },
  { id: 3, name: 'FrostFree Cooler X2', category: 'cooling', price: 1599, originalPrice: 1899, rating: 4.9, reviews: 312, badge: 'sale', featured: true, description: 'Smart refrigerator with dual cooling system, touch display, and auto-stocking reminders.', specs: ['650L Capacity', 'Dual Cooling', 'Touch Screen', 'Ice Maker', 'Energy Class A+++'], image: 'images/frostfree.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="28" y="18" width="64" height="84" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="32" y="24" width="56" height="44" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="32" y="74" width="56" height="22" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="30" width="32" height="32" rx="3" fill="#c7a254" opacity="0.15"/><circle cx="60" cy="46" r="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="36" y1="85" x2="84" y2="85" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 4, name: 'AeroCool AC-9000', category: 'cooling', price: 699, originalPrice: null, rating: 4.6, reviews: 156, badge: 'new', featured: true, description: 'Smart air conditioner with AI temperature control, air purifier, and energy-saving mode.', specs: ['12000 BTU', 'Smart WiFi', 'Air Purifier', 'Inverter Tech', 'Sleep Mode'], image: 'images/aerocool.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="30" y="20" width="60" height="80" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="28" width="52" height="36" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="34" width="32" height="24" rx="2" fill="#c7a254" opacity="0.15"/><line x1="34" y1="72" x2="86" y2="72" stroke="#c7a254" stroke-width="1.5"/><line x1="34" y1="80" x2="86" y2="80" stroke="#c7a254" stroke-width="1.5"/><line x1="34" y1="88" x2="86" y2="88" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="74" width="52" height="22" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 5, name: 'ChefMaster Cooktop', category: 'kitchen', price: 749, originalPrice: 849, rating: 4.5, reviews: 98, badge: 'sale', featured: true, description: 'Premium induction cooktop with 5 cooking zones, touch controls, and auto-pot detection.', specs: ['5 Zones', 'Induction', 'Touch Controls', 'Boost Function', 'Safety Lock'], image: 'images/chefmastercooktop.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="16" y="20" width="88" height="80" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="22" y="28" width="76" height="28" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="42" cy="42" r="7" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="78" cy="42" r="7" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="22" y="62" width="76" height="32" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="28" y="68" width="28" height="20" rx="2" fill="#c7a254" opacity="0.15"/><rect x="64" y="68" width="28" height="20" rx="2" fill="#c7a254" opacity="0.15"/></svg>` },
  { id: 6, name: 'HomeHub Smart Display', category: 'smart', price: 349, originalPrice: null, rating: 4.4, reviews: 267, badge: 'hot', featured: true, description: 'Smart home hub with 10" touch display, voice assistant, and full home automation control.', specs: ['10" Display', 'Voice Assistant', 'Zigbee Hub', 'Camera', 'Smart Alarms'], image: 'images/homehubsmart.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="30" y="16" width="60" height="72" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="20" width="52" height="56" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="38" y="24" width="44" height="48" rx="2" fill="#c7a254" opacity="0.1"/><circle cx="60" cy="48" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="48" r="4" fill="#c7a254" opacity="0.5"/><rect x="44" y="88" width="32" height="16" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="52" y1="104" x2="68" y2="104" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 7, name: 'DryPro Heat Pump Dryer', category: 'laundry', price: 1099, originalPrice: 1299, rating: 4.7, reviews: 143, badge: 'sale', featured: true, description: 'Heat pump tumble dryer with sensor drying, 15 programs, and anti-crease technology.', specs: ['8kg Capacity', 'Heat Pump', '15 Programs', 'Sensor Dry', 'Anti-Crease'], image: 'images/drypro.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><circle cx="60" cy="55" r="32" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="55" r="20" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="55" r="8" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="22" y="30" width="76" height="50" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="38" y="14" width="10" height="18" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="72" y="14" width="10" height="18" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 8, name: 'SmartLock Entry Pro', category: 'smart', price: 249, originalPrice: null, rating: 4.3, reviews: 521, badge: 'hot', featured: true, description: 'Smart door lock with fingerprint, PIN, and app access. Real-time alerts and remote monitoring.', specs: ['Fingerprint', 'PIN Code', 'App Control', 'Encrypted', 'Tamper Alert'], image: 'images/smartlock.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="35" y="20" width="50" height="70" rx="8" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="3" fill="#c7a254"/><path d="M60 70v8" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><path d="M45 40V30a15 15 0 0 1 30 0v10" fill="none" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><rect x="50" y="88" width="20" height="8" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 9, name: 'BlendPro Quantum', category: 'kitchen', price: 399, originalPrice: 499, rating: 4.6, reviews: 312, badge: 'sale', featured: false, description: 'Professional blender with 2HP motor, smart presets, and self-cleaning cycle.', specs: ['2HP Motor', '2L Pitcher', '8 Speeds', 'Pulse Mode', 'Self-Clean'], image: 'images/blendpro.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><path d="M60 88L42 58V38h36v20L60 88z" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="24" width="32" height="10" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="94" r="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><path d="M52 30l2-8h12l2 8" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 10, name: 'AquaPure Filter Pro', category: 'kitchen', price: 199, originalPrice: null, rating: 4.4, reviews: 678, badge: 'hot', featured: false, description: 'Advanced water filtration system with 7-stage purification and smart filter life monitor.', specs: ['7-Stage Filter', 'Smart Monitor', 'Fast Flow', 'Mineral Add', 'LED Display'], image: 'images/aquaprofilter.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="35" y="16" width="50" height="80" rx="8" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="44" r="16" fill="none" stroke="#c7a254" stroke-width="1.5"/><path d="M50 44h20M60 34v20" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><rect x="48" y="72" width="24" height="8" rx="3" fill="#c7a254" opacity="0.3"/><line x1="35" y1="84" x2="85" y2="84" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 11, name: 'SolarCharge 200W Panel', category: 'smart', price: 449, originalPrice: null, rating: 4.2, reviews: 89, badge: 'new', featured: false, description: 'High-efficiency solar panel with micro-inverter, app monitoring, and weather-resistant design.', specs: ['200W Output', 'Micro-Inverter', 'App Monitor', 'Weatherproof', '10yr Warranty'], image: 'images/solarpanel.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="20" y="30" width="80" height="50" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="40" y1="30" x2="40" y2="80" stroke="#c7a254" stroke-width="1.5"/><line x1="60" y1="30" x2="60" y2="80" stroke="#c7a254" stroke-width="1.5"/><line x1="80" y1="30" x2="80" y2="80" stroke="#c7a254" stroke-width="1.5"/><line x1="20" y1="47" x2="100" y2="47" stroke="#c7a254" stroke-width="1.5"/><line x1="20" y1="63" x2="100" y2="63" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="55" r="6" fill="#c7a254" opacity="0.3"/><rect x="46" y="84" width="28" height="10" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 12, name: 'SteamClean Floor Mop', category: 'smart', price: 179, originalPrice: 219, rating: 4.5, reviews: 445, badge: 'sale', featured: false, description: 'Smart steam mop with floor sensor, auto-steam adjustment, and app-controlled cleaning schedules.', specs: ['Smart Sensor', 'Auto Steam', 'App Control', 'Swivel Head', 'Cordless'], image: 'images/steamcleanmop.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="30" y="14" width="60" height="28" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="18" width="52" height="20" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="50" y1="42" x2="50" y2="88" stroke="#c7a254" stroke-width="1.5"/><line x1="70" y1="42" x2="70" y2="88" stroke="#c7a254" stroke-width="1.5"/><rect x="36" y="88" width="48" height="20" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="40" y="92" width="40" height="12" rx="2" fill="#c7a254" opacity="0.15"/><circle cx="60" cy="28" r="4" fill="#c7a254" opacity="0.4"/></svg>` },
  { id: 13, name: 'DishMaster Pro 8000', category: 'kitchen', price: 999, originalPrice: 1199, rating: 4.6, reviews: 178, badge: 'sale', featured: false, description: 'Smart dishwasher with 14 place settings, soil sensors, and quiet operation at 42dB.', specs: ['14 Settings', '42dB Quiet', 'Soil Sensors', 'Half Load', 'Energy Class A++'], image: 'images/dishmaster.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="24" y="20" width="72" height="80" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="30" y="28" width="60" height="40" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="30" y1="76" x2="90" y2="76" stroke="#c7a254" stroke-width="1.5"/><rect x="46" y="80" width="28" height="14" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="10" r="4" fill="#c7a254" opacity="0.5"/></svg>` },
  { id: 14, name: 'BaristaMatic Espresso Pro', category: 'kitchen', price: 649, originalPrice: null, rating: 4.7, reviews: 234, badge: 'new', featured: false, description: 'Automatic espresso machine with built-in grinder, milk frother, and 15-bar pressure pump.', specs: ['15 Bar Pump', 'Built-in Grinder', 'Milk Frother', '1.8L Tank', 'Self-Cleaning'], image: 'images/barista.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="28" y="22" width="64" height="50" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="36" y="30" width="48" height="34" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="48" y="38" width="24" height="18" rx="2" fill="#c7a254" opacity="0.15"/><rect x="42" y="72" width="36" height="6" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="46" y="78" width="28" height="16" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 15, name: 'SteamPress Iron Station', category: 'laundry', price: 249, originalPrice: 299, rating: 4.4, reviews: 123, badge: 'sale', featured: false, description: 'Professional steam iron station with continuous steam, ceramic soleplate, and anti-scale system.', specs: ['Continuous Steam', 'Ceramic Soleplate', 'Anti-Scale', 'Auto Shutoff', '3m Cord'], image: 'images/steampressure.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><path d="M36 68L30 88h60l-6-20H36z" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="40" y="30" width="40" height="38" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="52" y1="38" x2="68" y2="38" stroke="#c7a254" stroke-width="1.5"/><line x1="56" y1="44" x2="64" y2="44" stroke="#c7a254" stroke-width="1.5"/><rect x="48" y="88" width="24" height="10" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 16, name: 'FabricCare Steamer Pro', category: 'laundry', price: 179, originalPrice: null, rating: 4.3, reviews: 89, badge: 'new', featured: false, description: 'Handheld garment steamer with fast heat-up, dual voltage, and fabric brush attachment.', specs: ['Fast Heat-Up', 'Dual Voltage', 'Fabric Brush', '200ml Tank', 'Compact'], image: 'images/fabriccare.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="42" y="18" width="36" height="54" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><path d="M48 72l-8 16h40l-8-16H48z" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="36" r="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="50" r="3" fill="#c7a254" opacity="0.4"/><path d="M52 88h16" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: 17, name: 'ChillZone Wine Cooler', category: 'laundry', price: 549, originalPrice: 649, rating: 4.5, reviews: 67, badge: 'sale', featured: false, description: 'Dual-zone beverage cooler with precise temperature control and UV protection.', specs: ['Dual Zone', '24 Bottles', 'UV Protection', 'LED Lighting', 'Quiet Operation'], image: 'images/chillzone.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="30" y="16" width="60" height="88" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="20" width="52" height="36" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="62" width="52" height="36" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="48" cy="38" r="3" fill="#c7a254" opacity="0.3"/><circle cx="60" cy="38" r="3" fill="#c7a254" opacity="0.3"/><circle cx="72" cy="38" r="3" fill="#c7a254" opacity="0.3"/><circle cx="48" cy="80" r="3" fill="#c7a254" opacity="0.3"/><circle cx="60" cy="80" r="3" fill="#c7a254" opacity="0.3"/><circle cx="72" cy="80" r="3" fill="#c7a254" opacity="0.3"/></svg>` },
  { id: 18, name: 'ClothesShield Wardrobe Care', category: 'laundry', price: 399, originalPrice: null, rating: 4.6, reviews: 198, badge: 'new', featured: false, description: 'Smart wardrobe care system with steam refresh, dehumidifying, and aroma therapy.', specs: ['Steam Refresh', 'Dehumidify', 'Aroma Therapy', 'App Control', 'Auto Shutoff'], image: 'images/clothesshield.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="34" y="16" width="52" height="80" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="48" y1="24" x2="72" y2="24" stroke="#c7a254" stroke-width="1.5"/><line x1="48" y1="32" x2="72" y2="32" stroke="#c7a254" stroke-width="1.5"/><line x1="48" y1="40" x2="72" y2="40" stroke="#c7a254" stroke-width="1.5"/><rect x="48" y="68" width="24" height="18" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="77" r="3" fill="#c7a254" opacity="0.4"/></svg>` },
  { id: 21, name: 'ChillZone Wine Cooler', category: 'cooling', price: 799, originalPrice: 949, rating: 4.5, reviews: 67, badge: 'sale', featured: false, description: 'Dual-zone wine cooler with UV protection, vibration dampening, and precise temperature control.', specs: ['Dual Zone', '24 Bottles', 'UV Protection', 'Vibration Dampening', 'LED Lighting'],image: 'images/cooling2.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="30" y="16" width="60" height="88" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="20" width="52" height="36" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="62" width="52" height="36" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="48" cy="38" r="3" fill="#c7a254" opacity="0.3"/><circle cx="60" cy="38" r="3" fill="#c7a254" opacity="0.3"/><circle cx="72" cy="38" r="3" fill="#c7a254" opacity="0.3"/><circle cx="48" cy="80" r="3" fill="#c7a254" opacity="0.3"/><circle cx="60" cy="80" r="3" fill="#c7a254" opacity="0.3"/><circle cx="72" cy="80" r="3" fill="#c7a254" opacity="0.3"/></svg>` },
  { id: 22, name: 'DeepFreeze Chest 300', category: 'cooling', price: 599, originalPrice: null, rating: 4.6, reviews: 145, badge: 'new', featured: false, description: 'Large chest freezer with fast-freeze function, temperature alarm, and energy-efficient compressor.', specs: ['300L Capacity', 'Fast Freeze', 'Temp Alarm', 'Energy Class A++', 'Lockable'], image: 'images/chestfreezer.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="22" y="26" width="76" height="68" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="28" y="32" width="64" height="44" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="28" y="80" width="64" height="10" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="28" y1="58" x2="92" y2="58" stroke="#c7a254" stroke-width="1.5"/><rect x="52" y="82" width="16" height="6" rx="2" fill="#c7a254" opacity="0.4"/></svg>` },
  { id: 23, name: 'PureBreeze Air Purifier', category: 'cooling', price: 349, originalPrice: 399, rating: 4.7, reviews: 234, badge: 'sale', featured: false, description: 'HEPA air purifier with smart air quality monitoring, auto mode, and whisper-quiet operation.', specs: ['HEPA Filter', 'Air Quality Monitor', 'Auto Mode', '22dB Quiet', 'Smart WiFi'],  image: 'images/airpurifier.webp',svg: `<svg viewBox="0 0 120 120" width="90" height="90"><circle cx="60" cy="60" r="34" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="22" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="3" fill="#c7a254"/><path d="M30 60h8M82 60h8M60 30v8M60 82v8" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: 24, name: 'CoolTower Pedestal Fan', category: 'cooling', price: 149, originalPrice: null, rating: 4.3, reviews: 456, badge: 'hot', featured: false, description: 'Tower fan with 90-degree oscillation, 12 speeds, remote control, and sleep mode.', specs: ['90° Oscillation', '12 Speeds', 'Remote Control', 'Sleep Mode', 'Timer'],  image: 'images/cooltower.webp',svg: `<svg viewBox="0 0 120 120" width="90" height="90"><rect x="44" y="14" width="32" height="68" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="36" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="36" r="3" fill="#c7a254" opacity="0.5"/><rect x="38" y="82" width="44" height="8" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="38" y="92" width="44" height="6" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 19, name: 'ThermoSmart Thermostat', category: 'smart', price: 199, originalPrice: 249, rating: 4.5, reviews: 312, badge: 'sale', featured: false, description: 'Smart thermostat with learning algorithms, geofencing, and energy usage reports.', specs: ['Learning AI', 'Geofencing', 'Energy Reports', 'Voice Control', 'Remote Sensors'], image: 'images/thermosmart.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><circle cx="60" cy="60" r="34" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="22" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="3" fill="#c7a254"/><line x1="60" y1="26" x2="60" y2="38" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><line x1="60" y1="82" x2="60" y2="94" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><line x1="26" y1="60" x2="38" y2="60" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><line x1="82" y1="60" x2="94" y2="60" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: 20, name: 'RoboVac CleanSweep X1', category: 'smart', price: 449, originalPrice: null, rating: 4.7, reviews: 567, badge: 'hot', featured: false, description: 'Robot vacuum with LiDAR navigation, 2500Pa suction, self-emptying dock, and pet-friendly brush.', specs: ['LiDAR Nav', '2500Pa Suction', 'Self-Emptying', 'Pet Brush', '2hr Battery'], image: 'images/cleansweep.webp', svg: `<svg viewBox="0 0 120 120" width="90" height="90"><circle cx="60" cy="60" r="34" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="14" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="4" fill="#c7a254" opacity="0.5"/><line x1="60" y1="26" x2="60" y2="34" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><rect x="52" y="14" width="16" height="6" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="94" width="32" height="8" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
];

// ========== CART ==========
let cart = JSON.parse(localStorage.getItem('Stackly_cart')) || [];

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) { existing.quantity += 1; }
  else { cart.push({ ...product, quantity: 1 }); }
  updateCart();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) { removeFromCart(id); return; }
  updateCart();
}

function updateCart() {
  localStorage.setItem('Stackly_cart', JSON.stringify(cart));
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalItems);
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

// ========== BLOG POSTS DATA ==========
const blogPosts = [
  { id: 1, title: '10 Essential Kitchen Appliances Every Home Chef Needs', category: 'kitchen', author: 'Sarah Mitchell', date: 'Jun 28, 2026', readTime: '5 min read', excerpt: 'From smart ovens to induction cooktops, discover the must-have kitchen appliances that will transform your cooking experience.', content: 'Full article content here...', image: 'images/kitchen.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><rect x="20" y="25" width="80" height="70" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="28" y="33" width="64" height="44" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="55" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="60" y1="45" x2="60" y2="65" stroke="#c7a254" stroke-width="1.5"/><line x1="50" y1="55" x2="70" y2="55" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 2, title: 'Energy-Saving Tips: How to Reduce Your Electricity Bill', category: 'tips', author: 'James Delaney', date: 'Jun 22, 2026', readTime: '4 min read', excerpt: 'Learn how modern energy-efficient appliances can significantly reduce your monthly electricity bills while helping the environment.', image: 'images/solarpanel.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><circle cx="60" cy="60" r="35" fill="none" stroke="#c7a254" stroke-width="1.5"/><path d="M60 30v8M60 82v8M30 60h8M82 60h8" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/><circle cx="60" cy="60" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="4" fill="#c7a254"/></svg>` },
  { id: 3, title: 'The Ultimate Guide to Smart Home Automation in 2026', category: 'smart', author: 'David Chen', date: 'Jun 15, 2026', readTime: '7 min read', excerpt: 'Everything you need to know about building a connected smart home ecosystem with the latest IoT devices and hubs.', image: 'images/smarthome.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><rect x="30" y="16" width="60" height="72" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="20" width="52" height="56" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="38" y="24" width="44" height="48" rx="2" fill="#c7a254" opacity="0.1"/><circle cx="60" cy="48" r="10" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 4, title: 'Washing Machine Buying Guide: What to Look For', category: 'laundry', author: 'Emily Lewis', date: 'Jun 8, 2026', readTime: '6 min read', excerpt: 'Confused about which washing machine to buy? Our comprehensive guide breaks down capacity, efficiency, and smart features.', image: 'images/washingmachine.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><rect x="22" y="30" width="76" height="54" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="26" y="14" width="14" height="22" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="80" y="14" width="14" height="22" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="57" r="14" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 5, title: 'Summer Essentials: Choosing the Perfect Air Conditioner', category: 'cooling', author: 'Robert Johnson', date: 'Jun 1, 2026', readTime: '5 min read', excerpt: 'Stay cool this summer with our expert guide to choosing the right air conditioner for your space and budget.', image: 'images/cooling.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><rect x="30" y="20" width="60" height="80" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="28" width="52" height="36" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="34" width="32" height="24" rx="2" fill="#c7a254" opacity="0.15"/></svg>` },
  { id: 6, title: '5 Smart Home Devices That Will Change Your Life', category: 'smart', author: 'Sarah Mitchell', date: 'May 25, 2026', readTime: '4 min read', excerpt: 'These innovative smart home devices will simplify your daily routines and make your home more efficient than ever.', image: 'images/homehubsmart.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><circle cx="60" cy="60" r="20" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="6" fill="#c7a254" opacity="0.5"/><line x1="60" y1="40" x2="60" y2="28" stroke="#c7a254" stroke-width="1.5"/><line x1="60" y1="80" x2="60" y2="92" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 7, title: 'Refrigerator Organization: Maximize Space & Freshness', category: 'tips', author: 'Anna Lopez', date: 'May 18, 2026', readTime: '3 min read', excerpt: 'Transform your refrigerator organization with these expert tips to keep food fresher longer and reduce waste.', image: 'images/fridge.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><rect x="28" y="18" width="64" height="84" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="32" y="24" width="56" height="44" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="32" y="74" width="56" height="22" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
  { id: 8, title: 'Induction vs Gas Cooktops: Which Is Right for You?', category: 'kitchen', author: 'Michael Ross', date: 'May 10, 2026', readTime: '5 min read', excerpt: 'We compare induction and gas cooktops across efficiency, safety, cooking performance, and cost to help you decide.', image: 'images/chefmastercooktop.webp', svg: `<svg viewBox="0 0 120 120" width="80" height="80"><rect x="16" y="20" width="88" height="80" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="22" y="28" width="76" height="28" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="42" cy="42" r="7" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="78" cy="42" r="7" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>` },
];

// ========== DEALS HELPERS ==========
function getDealProducts() {
  return products.filter(p => p.originalPrice !== null)
    .map(p => ({ ...p, discount: Math.round((1 - p.price / p.originalPrice) * 100) }))
    .sort((a, b) => b.discount - a.discount);
}

function getDealCategories() {
  return [...new Set(getDealProducts().map(p => p.category))];
}

// ========== TOAST ==========
function isValidEmail(email) {
  return /^[a-zA-Z0-9][a-zA-Z0-9.]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password);
}

let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== RENDER HEADER ==========
function renderHeader(currentPage) {
  const navItems = [
    { label: 'Home', href: 'index.html', id: 'home' },
    { label: 'Products', href: 'products.html', id: 'products' },
    { label: 'Deals', href: 'deals.html', id: 'deals' },
    { label: 'Blog', href: 'blog.html', id: 'blog' },
    { label: 'About', href: 'about.html', id: 'about' },
    { label: 'Contact', href: 'contact.html', id: 'contact' },
  ];

  const linksHTML = navItems.map(item => `
    <li><a href="${item.href}" class="${currentPage === item.id ? 'active' : ''}">${item.label}</a></li>
  `).join('');

  return `
  <header id="header">
    <nav class="navbar">
      <div class="nav-container">
        <a href="index.html" class="logo">
          <img src="images/logo.webp" alt="Stackly" class="logo-img" height="36">
        </a>
        <ul class="nav-links" id="navLinks">${linksHTML}</ul>
        <div class="nav-actions">
          <button class="icon-btn search-toggle" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          ${(() => {
            const loggedIn = typeof isLoggedIn === 'function' && isLoggedIn();
            const user = loggedIn && typeof getCurrentUser === 'function' ? getCurrentUser() : null;
            if (loggedIn && user) {
              const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
              const link = user.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
              return `<a href="${link}" class="icon-btn" aria-label="Account"><span class="user-avatar-initial">${initial}</span></a>`;
            }
            return `<a href="login.html" class="icon-btn" aria-label="Account"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>`;
          })()}
          <a href="cart.html" class="icon-btn cart-btn" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span class="cart-count">0</span>
          </a>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="search-overlay">
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search appliances..." autofocus>
        <button class="search-close">&times;</button>
      </div>
      <div class="search-suggestions"></div>
    </div>
  </header>`;
}

// ========== RENDER FOOTER ==========
function renderFooter() {
  return `
  <footer id="contact" class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <img src="images/logo.webp" alt="Stackly" class="logo-img" height="32">
        </a>
        <p>Premium home appliances for modern living. Quality, innovation, and style since 2015.</p>
        <div class="social-links">
          <a href="404.html" aria-label="Facebook"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor"/></svg></a>
          <a href="404.html" aria-label="Instagram"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg></a>
          <a href="404.html" aria-label="X / Twitter"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="404.html" aria-label="YouTube"><svg viewBox="0 0 24 24" width="20" height="20"><polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="currentColor"/><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="deals.html">Deals</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Categories</h4>
        <ul>
          <li><a href="products.html?category=kitchen">Kitchen</a></li>
          <li><a href="products.html?category=laundry">Laundry</a></li>
          <li><a href="products.html?category=cooling">Cooling</a></li>
          <li><a href="products.html?category=smart">Smart Home</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="contact.html">FAQ</a></li>
          <li><a href="404.html">Shipping</a></li>
          <li><a href="404.html">Returns</a></li>
          <li><a href="404.html">Warranty</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <ul class="contact-list">
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>123 Appliance St, NY 10001</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+1 (555) 123-4567</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>hello@stackly.com</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Stackly. All rights reserved.</p>
      <div class="payment-methods"><span>Visa</span><span>MC</span><span>Amex</span><span>PayPal</span></div>
    </div>
  </footer>`;
}

// ========== COMMON INIT ==========
function initCommon() {
  
  // Particles
  const pc = document.getElementById('particles');
  if (pc) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
      p.style.animationDuration = (10 + Math.random() * 20) + 's';
      p.style.animationDelay = Math.random() * 15 + 's';
      pc.appendChild(p);
    }
  }

  // Scroll progress
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / h) * 100;
    const sp = document.getElementById('scroll-progress');
    if (sp) sp.style.width = pct + '%';

    const header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);

    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('visible', window.scrollY > 500);
  });

  // Hamburger
  document.addEventListener('click', e => {
    const ham = document.getElementById('hamburger');
    const nav = document.getElementById('navLinks');
    if (ham && e.target.closest('#hamburger')) {
      ham.classList.toggle('active');
      nav.classList.toggle('open');
    } else if (nav && e.target.closest('.nav-links a')) {
      ham && ham.classList.remove('active');
      nav && nav.classList.remove('open');
    }
  });

  // Search toggle
  document.addEventListener('click', e => {
    const toggle = e.target.closest('.search-toggle');
    const overlay = document.querySelector('.search-overlay');
    const close = e.target.closest('.search-close');
    if (toggle && overlay) {
      overlay.classList.toggle('open');
      if (overlay.classList.contains('open')) {
        setTimeout(() => { const inp = overlay.querySelector('.search-input'); if (inp) inp.focus(); }, 100);
      }
    }
    if (close && overlay) overlay.classList.remove('open');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlay = document.querySelector('.search-overlay');
      if (overlay) overlay.classList.remove('open');
    }
  });

  // Back to top
  document.addEventListener('click', e => {
    if (e.target.closest('#backToTop')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Cart count init
  updateCart();

  // Reveal observer
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .category-card, .product-card, .feature-card, .blog-card, .deal-product-card, .timeline-item').forEach(el => obs.observe(el));
}

// ========== PRODUCT CARD HTML ==========
function getProductCardHTML(p, index) {
  const stars = '\u2605'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '\u00BD' : '');
  const hasSale = p.originalPrice !== null;
  const discount = hasSale ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  let badgeHTML = '';
  if (p.badge === 'new') badgeHTML = '<span class="product-badge badge-new">New</span>';
  else if (p.badge === 'sale') badgeHTML = `<span class="product-badge badge-sale">-${discount}%</span>`;
  else if (p.badge === 'hot') badgeHTML = '<span class="product-badge badge-hot">Hot</span>';

  return `
    <div class="product-card" style="transition-delay: ${(index||0) * 0.05}s">
      <a href="product-detail.html?id=${p.id}" class="product-image">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : p.svg}
        ${badgeHTML}
      </a>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span>(${p.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${p.price.toLocaleString()}</span>
          ${hasSale ? `<span class="price-original">$${p.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-to-cart" data-id="${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
      </div>
    </div>`;
}
