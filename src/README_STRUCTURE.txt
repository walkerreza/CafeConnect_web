===========================================
STRUKTUR FOLDER FRONTEND - ATOMIC DESIGN
===========================================

src/
├── components/              # Komponen UI dengan Atomic Design
│   ├── atoms/              # Komponen terkecil (Button, Input, Card)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   └── Card/
│   │       ├── Card.tsx
│   │       └── index.ts
│   │
│   ├── molecules/          # Kombinasi atoms (SearchBar, CafeCard)
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.ts
│   │   └── CafeCard/
│   │       ├── CafeCard.tsx
│   │       └── index.ts
│   │
│   ├── organisms/          # Kombinasi molecules (Header, Footer, CafeList)
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   └── CafeList/
│   │       ├── CafeList.tsx
│   │       └── index.ts
│   │
│   └── templates/          # Layout template (MainLayout)
│       └── MainLayout/
│           ├── MainLayout.tsx
│           └── index.ts
│
├── pages/                  # Halaman aplikasi
│   ├── HomePage.tsx
│   ├── CafesPage.tsx
│   └── CafeDetailPage.tsx
│
├── services/               # API services
│   └── api.ts
│
├── hooks/                  # Custom React hooks
│   └── useCafes.ts
│
├── types/                  # TypeScript types & interfaces
│   └── index.ts
│
├── utils/                  # Helper functions
│   └── helpers.ts
│
├── assets/                 # Static assets (images, icons)
│
├── App.tsx                 # Main App component dengan routing
├── main.tsx               # Entry point
└── index.css              # Global styles (TailwindCSS)

===========================================
PENJELASAN ATOMIC DESIGN
===========================================

1. ATOMS (Komponen Terkecil)
   - Button, Input, Card, Badge, Icon
   - Tidak bisa dipecah lagi
   - Reusable di seluruh aplikasi
   - Contoh: Button.tsx, Input.tsx

2. MOLECULES (Kombinasi Atoms)
   - SearchBar (Input + Button)
   - CafeCard (Card + Button + Text)
   - FormField (Label + Input + Error)
   - Contoh: SearchBar.tsx, CafeCard.tsx

3. ORGANISMS (Kombinasi Molecules)
   - Header (Logo + Navigation + Buttons)
   - Footer (Links + Info)
   - CafeList (Multiple CafeCards)
   - Contoh: Header.tsx, CafeList.tsx

4. TEMPLATES (Layout)
   - MainLayout (Header + Content + Footer)
   - AuthLayout, DashboardLayout
   - Contoh: MainLayout.tsx

5. PAGES (Halaman Lengkap)
   - HomePage, CafesPage, CafeDetailPage
   - Menggunakan Templates + Organisms
   - Contoh: HomePage.tsx

===========================================
BEST PRACTICES
===========================================

✅ Setiap komponen punya folder sendiri
✅ Export melalui index.ts untuk clean import
✅ TypeScript untuk type safety
✅ Props interface untuk setiap komponen
✅ TailwindCSS untuk styling
✅ Custom hooks untuk logic reusable
✅ Services terpisah untuk API calls
✅ Types terpusat di folder types/

===========================================
CARA PAKAI
===========================================

// Import komponen
import Button from '@/components/atoms/Button';
import CafeCard from '@/components/molecules/CafeCard';
import Header from '@/components/organisms/Header';
import MainLayout from '@/components/templates/MainLayout';

// Import hooks
import { useCafes } from '@/hooks/useCafes';

// Import services
import { getCafes, createCafe } from '@/services/api';

// Import types
import type { Cafe, User } from '@/types';
