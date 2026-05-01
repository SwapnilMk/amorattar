const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const specificUsers = [
  'Swapnil Mahadik',
  'Samiyaah Kazi',
  'Meena Arsan',
  'Anees Kazi',
  'Lokesh Singh'
];

const indianNames = [
  'Aarav Sharma',
  'Ishani Patel',
  'Arjun Singh',
  'Ananya Reddy',
  'Vihaan Gupta',
  'Saanvi Malhotra',
  'Rohan Verma',
  'Aavya Iyer',
  'Kabir Joshi',
  'Zara Khan',
  'Aditya Das',
  'Myra Kulkarni',
  'Reyansh Bose',
  'Kiara Nair',
  'Krishna Mehta',
  'Diya Saxena',
  'Aryan Chauhan',
  'Anika Choudhury',
  'Shaurya Pandey',
  'Riya Bhatt',
  'Ishaan Mishra',
  'Prisha Kapoor',
  'Atharv Trivedi',
  'Navya Singhal',
  'Vivaan Aggarwal',
  'Amara Deshmukh',
  'Advait Rao',
  'Kavya Hegde',
  'Aaryan Gokhale',
  'Tanvi Shinde',
  'Devansh Patil',
  'Avni More',
  'Ayaan Sawant',
  'Inaya Jadhav',
  'Yuvraj Thorat',
  'Sia Gaikwad',
  'Ranveer Kadam',
  'Aira Deshpande'
];

const allUsers = [...specificUsers];

const reviewContents = [
  'Absolutely amazing fragrance! The scent is deep and long-lasting. Highly recommended. ✨',
  'The packaging was premium and the attar itself is purely divine. Best buy so far. 💎',
  'I was skeptical about buying perfume online, but Amor Perfumes exceeded my expectations. 💖',
  'Such a unique scent. I get compliments everywhere I go. Will definitely buy again. 🌸',
  'Fast delivery and great quality. The fragrance stays on for the whole day. 🚀',
  'The signature attar is a masterpiece. Truly a royal experience. 👑',
  'Lovely collection! Each fragrance has its own character. Very impressed with the quality. 🌿',
  'Affordable yet luxurious. This is now my go-to shop for all my fragrance needs. 🛍️',
  'Excellent customer service and even better products. The scent is very authentic. 💯',
  'A must-try for perfume lovers. The notes are perfectly balanced and elegant. 🥂',
  "Amor Perfumes has the best selection of attars I've ever seen. The depth is unmatched. 🌌",
  'The delivery was incredibly fast and the packaging was so elegant. Perfect for gifting! 🎁',
  "I've been using their signature scent for a month now and I still get compliments every day. 😊",
  'The quality of the oils is exceptional. You can tell they use natural ingredients. 🍃',
  'Finally found a place that sells authentic attars at reasonable prices. Highly recommended! ⭐',
  'The customer support was very helpful in choosing the right fragrance for my skin type. 🤝',
  'I love how long these perfumes last. Even after a long day, the scent is still there. 🕰️',
  "This is my third purchase and I'm never disappointed. The consistency is great. ✔️",
  'The discovery set is a great way to try different scents. Found my favorite! 🧪',
  'Simply the best. The richness of the oud and rose blends is fantastic. 🌹',
  'Refreshing and sophisticated. This fragrance is perfect for office wear. 💼',
  'The woody notes in this attar are so grounding and beautiful. Pure craftsmanship. 🪵',
  "I'm in love with the floral undertones. It's subtle yet makes a statement. 🌺",
  'Brought this as a gift for my husband and he absolutely loves it. Great longevity. 👨‍💼',
  "The best customer experience I've had with an online perfume store. 5 stars! ⭐⭐⭐⭐⭐",
  'Unique and intoxicating. This scent has become my daily signature. ✍️',
  'The attention to detail in the packaging shows how much they care about quality. 📦',
  'Incredible value for money. These smell like high-end designer fragrances. 💰',
  'Smooth and creamy textures in the scent profile. Very high quality oils used. 🧴',
  'A true gem of a find. Amor Perfumes is now my only source for attars. 💎',
  "I was surprised by how well the scent projects. It's strong but not overwhelming. 🌬️",
  'Elegant, timeless, and classic. Everything you want in a premium perfume. 🏛️',
  'The citrus notes are so vibrant and fresh. Perfect for the summer heat. 🍋',
  'I appreciate the natural ingredients. No chemical smell at all. Very pure. 🌿',
  'Prompt responses from the team and very helpful advice on fragrance notes. 💬',
  'The bottle design is also very beautiful. Looks great on my vanity. 🏺',
  'Exceptional longevity. I can still smell it on my clothes the next day. 👕',
  "A very well-curated selection. It's hard to pick just one favorite! 🌈",
  "Top-tier quality. This rivals any international luxury brand I've used. 🏆",
  'Highly impressed with the complexity of the scent. It evolves beautifully over hours. ⏳'
];

function getRandomDate(daysBack) {
  const date = new Date();
  const randomDays = Math.floor(Math.random() * daysBack);
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  date.setDate(date.getDate() - randomDays);
  date.setHours(randomHours);
  date.setMinutes(randomMinutes);
  return date;
}

async function seed() {
  console.log('Starting natural review seeding...');

  // 1. Delete all existing reviews first
  await prisma.review.deleteMany({});
  console.log('Deleted all existing reviews.');

  // 2. Add EXACTLY ONE review for each unique name to avoid repetition
  const reviewData = allUsers.map((userName, index) => {
    const content =
      reviewContents[Math.floor(Math.random() * reviewContents.length)];
    const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
    const createdAt = getRandomDate(90); // Random date within the last 90 days

    return {
      name: userName,
      content,
      rating,
      createdAt,
      updatedAt: createdAt
    };
  });

  // 3. Create all reviews
  // Note: createMany might not support setting createdAt in some Prisma/DB combinations if it's auto-generated,
  // but for MongoDB it usually works if defined in schema.
  // We'll do it in a loop to be safe and ensure dates are set correctly.
  for (const review of reviewData) {
    await prisma.review.create({
      data: review
    });
    console.log(
      `Added review for ${review.name} dated ${review.createdAt.toDateString()}`
    );
  }

  console.log(
    `Seeding completed! Total unique reviews added: ${allUsers.length}`
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
