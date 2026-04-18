import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Seed 10 Remittance Providers
  const remittances = [
    { name: 'Western Union', send_fee_usd: 5.0, exchange_rate: 131.50, transfer_speed: 'instant', payout_methods: ['bank', 'cash_pickup'], min_amount: 10, max_amount: 2999 },
    { name: 'CAM Transfer', send_fee_usd: 4.0, exchange_rate: 132.00, transfer_speed: 'instant', payout_methods: ['cash_pickup', 'home_delivery'], min_amount: 20, max_amount: 1500 },
    { name: 'Unitransfer', send_fee_usd: 4.5, exchange_rate: 131.75, transfer_speed: '1-2 days', payout_methods: ['cash_pickup', 'bank'], min_amount: 20, max_amount: 2000 },
    { name: 'Remitly', send_fee_usd: 1.99, exchange_rate: 130.00, transfer_speed: 'instant', payout_methods: ['bank', 'cash_pickup', 'mobile_wallet'], min_amount: 10, max_amount: 2999 },
    { name: 'Boss Revolution', send_fee_usd: 3.99, exchange_rate: 130.50, transfer_speed: 'instant', payout_methods: ['cash_pickup'], min_amount: 10, max_amount: 1000 },
    { name: 'WorldRemit', send_fee_usd: 2.99, exchange_rate: 129.50, transfer_speed: 'instant', payout_methods: ['mobile_wallet', 'cash_pickup'], min_amount: 1, max_amount: 5000 },
    { name: 'Sendwave', send_fee_usd: 0.0, exchange_rate: 128.00, transfer_speed: 'instant', payout_methods: ['mobile_wallet'], min_amount: 1, max_amount: 999 },
    { name: 'Xoom', send_fee_usd: 4.99, exchange_rate: 127.50, transfer_speed: '1-2 days', payout_methods: ['bank', 'cash_pickup'], min_amount: 10, max_amount: 2999 },
    { name: 'Zelle (P2P Workaround)', send_fee_usd: 0.0, exchange_rate: 132.00, transfer_speed: 'instant', payout_methods: ['bank'], min_amount: 1, max_amount: 2000 },
    { name: 'CashApp (P2P Workaround)', send_fee_usd: 0.0, exchange_rate: 131.00, transfer_speed: 'instant', payout_methods: ['mobile_wallet'], min_amount: 1, max_amount: 1000 }
  ];

  for (const provider of remittances) {
    await prisma.remittanceProvider.create({ data: provider });
  }

  // 2. Seed 15 Lawyers
  const cities = ['Miami', 'New York City', 'Boston', 'Philadelphia', 'Springfield'];
  for (let i = 0; i < 15; i++) {
    await prisma.lawyer.create({
      data: {
        full_name: `Avoka ${['Jean', 'Pierre', 'Marie', 'Francois', 'Jacques'][i % 5]} ${i}`,
        firm_name: `Haitian Legal Aid Partners ${i}`,
        specialties: ['TPS', i % 2 === 0 ? 'asylum' : 'deportation defense'],
        speaks_creole: true,
        city: cities[i % 5],
        state: i % 5 === 0 ? 'FL' : i % 5 === 1 ? 'NY' : i % 5 === 2 ? 'MA' : i % 5 === 3 ? 'PA' : 'OH',
        phone: `555-010${i}`,
        email: `lawyer${i}@example.com`,
        consultation_fee: i % 3 === 0 ? 0 : 100,
        free_consultation: i % 3 === 0,
        rating: 4.5 + (i % 5) * 0.1,
        review_count: 10 + i * 2,
        verified: true
      }
    });
  }

  // 3. Seed 50 Resources (10 per 5 cities)
  const categories = ['legal', 'housing', 'food', 'health', 'employment'];
  for (let c = 0; c < 5; c++) {
    for (let r = 0; r < 10; r++) {
      const isCreole = r % 2 === 0;
      await prisma.resource.create({
        data: {
          category: categories[r % 5],
          name: `${cities[c]} Community Support Center ${r}`,
          name_ht: `Sant Sipò Kominotè ${cities[c]} ${r}`,
          description_en: `Providing essential ${categories[r % 5]} services for immigrants in ${cities[c]}.`,
          description_ht: `Bay sèvis esansyèl nan ${categories[r % 5]} pou imigran nan ${cities[c]}.`,
          city: cities[c],
          state: cities[c] === 'Miami' ? 'FL' : 'NY', // Simplified for seeding mapping
          serves_haitian_creole: isCreole,
          is_free: true,
          phone: `555-100-${c}${r}`
        }
      });
    }
  }

  // 4. Seed 20 Guides
  const guideTopics = [
    { slug: 'tps-basics', category: 'tps', en: 'How to apply for TPS', ht: 'Kijan pou aplike pou TPS' },
    { slug: 'ead-renewal', category: 'ead', en: 'Renewing your Work Permit (EAD)', ht: 'Renouvle Pèmi Travay ou (EAD)' },
    { slug: 'asylum-process', category: 'asylum', en: 'The Asylum Application Process', ht: 'Pwosesis aplikasyon pou Azil la' },
    { slug: 'tps-expiration', category: 'tps', en: 'What to do if TPS expires', ht: 'Kisa pou fè si TPS ekspire' },
    { slug: 'know-rights-police', category: 'rights', en: 'Rights during a Police Stop', ht: 'Dwa w lè Lapolis kanpe w' }
  ];
  // Replicate and vary to hit 20
  for (let i = 0; i < 20; i++) {
    const base = guideTopics[i % 5];
    await prisma.guide.create({
      data: {
        slug: `${base.slug}-${i}`,
        category: base.category,
        title_en: `${base.en} - Part ${i + 1}`,
        title_ht: `${base.ht} - Pati ${i + 1}`,
        content_en: `This is the official guide covering ${base.en}. Step 1: Consult an attorney. Step 2: Fill out the necessary forms.`,
        content_ht: `Sa se gid ofisyèl ki kouvri ${base.ht}. Etap 1: Konsilte yon avoka. Etap 2: Ranpli fòm nesesè yo.`,
        difficulty: i % 2 === 0 ? 'beginner' : 'intermediate',
        estimated_read_mins: 5 + (i % 5),
        is_premium: i % 4 === 0
      }
    });
  }

  console.log('Database Seeding Complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
