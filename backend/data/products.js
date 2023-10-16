const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.9,
  },
  {
    name: 'iPhone 13 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 4.9,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 4.9,
  },
  {
    name: 'Sony Playstation 5',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    rating: 4,
  },
  {
    name: 'Dell XPS 13 Laptop',
    image: '/images/laptop1.jpg',
    description:
        'A high-performance laptop with a sleek design, featuring the latest Intel processor and a stunning InfinityEdge display.',
    brand: 'Dell',
    category: 'Electronics',
    price: 1199.99,
    countInStock: 8,
    rating: 4.7,
  },
  {
    name: 'HP Spectre x360 Laptop',
    image: '/images/laptop2.jpg',
    description:
        'A versatile 2-in-1 laptop with a 4K OLED display, powerful performance, and long battery life.',
    brand: 'HP',
    category: 'Electronics',
    price: 1399.99,
    countInStock: 6,
    rating: 4.6,
  },
  {
    name: 'Apple MacBook Air',
    image: '/images/laptop3.jpg',
    description:
        'The MacBook Air, powered by  M1 chip, offers incredible performance and a stunning Retina display.',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    countInStock: 12,
    rating: 4.2,
  },

  {
    name: 'Zojirushi NS-ZCC10 Rice Cooker',
    image: '/images/ricecooker1.jpg',
    description:
        'A versatile rice cooker with fuzzy logic technology and multiple cooking settings for perfect rice every time.',
    brand: 'Zojirushi',
    category: 'Appliances',
    price: 149.99,
    countInStock: 5,
    rating: 4.8,
  },
  {
    name: 'Instant Pot Duo Mini Rice Cooker',
    image: '/images/ricecooker2.jpg',
    description:
        'A compact and efficient rice cooker with multiple functions, including pressure cooking, steaming, and more.',
    brand: 'Instant Pot',
    category: 'Appliances',
    price: 89.99,
    countInStock: 9,
    rating: 4.4,
  },

  {
    name: 'Ray-Ban Classic Aviator Sunglasses',
    image: '/images/sunglasses1.jpg',
    description:
        'Timeless and iconic aviator sunglasses from Ray-Ban, offering both style and UV protection.',
    brand: 'Ray-Ban',
    category: 'Fashion',
    price: 129.99,
    countInStock: 15,
    rating: 4.7,
  },
  {
    name: 'Oakley Holbrook Sport Sunglasses',
    image: '/images/sunglasses2.jpg',
    description:
        'Durable sport sunglasses from Oakley with High Definition Optics for enhanced clarity and protection.',
    brand: 'Oakley',
    category: 'Fashion',
    price: 99.99,
    countInStock: 10,
    rating: 4.6,
  },

  {
    name: 'Steel Push-Up Bars',
    image: '/images/pushupbar.jpg',
    description:
        'Enhance your workout with these sturdy steel push-up bars that reduce strain on your wrists and help you perform push-ups with better form.',
    brand: 'FitnessGear',
    category: 'Fitness',
    price: 19.99,
    countInStock: 15,
    rating: 4.5,
  },

  // Add 2 toy trucks
  {
    name: 'Remote Control Monster Truck',
    image: '/images/toytruck1.jpg',
    description:
        'A rugged and powerful remote control monster truck for off-road adventures, complete with responsive controls and all-terrain tires.',
    brand: 'RC Toys',
    category: 'Toys',
    price: 39.99,
    countInStock: 10,
    rating: 4.2,
  },
  {
    name: 'Construction Toy Dump Truck',
    image: '/images/toytruck2.jpg',
    description:
        'A construction-themed toy dump truck for kids to enjoy imaginative play, built with durable materials for long-lasting fun.',
    brand: 'PlayTime',
    category: 'Toys',
    price: 14.99,
    countInStock: 20,
    rating: 4.1,
  },

  // Add 2 toy Lamborghini cars
  {
    name: 'Remote Control Lamborghini Aventador',
    image: '/images/toylambo1.jpg',
    description:
        'A stunning remote control Lamborghini Aventador replica with detailed design and fast speed for exciting races.',
    brand: 'SpeedRacers',
    category: 'Toys',
    price: 49.99,
    countInStock: 12,
    rating: 4.4,
  },
  {
    name: 'Lamborghini Huracan Diecast Model Car',
    image: '/images/toylambo2.jpg',
    description:
        'A high-quality diecast model of the Lamborghini Huracan, perfect for collectors and enthusiasts of exotic cars.',
    brand: 'DiecastMasters',
    category: 'Collectibles',
    price: 29.99,
    countInStock: 7,
    rating: 4.7,
  },


];

export default products;
