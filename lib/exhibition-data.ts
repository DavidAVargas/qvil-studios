export type Exhibition = {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  year: number;
  venue: {
    name: string;
    address: string;
    city: string;
    description: string;
    link?: string;
  };
  description: string;
  coverImage: string;
  isUpcoming: boolean;
  relatedRunwayShowSlug?: string;
};

export const exhibitions: Exhibition[] = [
  // Upcoming Event
  {
    id: "1",
    slug: "nyc-fashion-week-2025",
    title: "NYC FASHION WEEK",
    date: "February 14, 2025",
    time: "8:00 PM EST",
    year: 2025,
    venue: {
      name: "The Glasshouse",
      address: "660 12th Avenue",
      city: "New York, NY",
      description: "A stunning 60,000 sq ft event space with floor-to-ceiling windows overlooking the Hudson River. The Glasshouse offers panoramic views of Manhattan's skyline, creating an unforgettable backdrop for fashion presentations.",
    },
    description: "QVIL Studios presents an exclusive runway showcase at NYC Fashion Week. Witness the unveiling of our latest collection in an intimate setting that blurs the line between art installation and fashion presentation.",
    coverImage: "/images/mock-runway-1.jpg",
    isUpcoming: true,
  },
  // Past Events
  {
    id: "2",
    slug: "la-emerge-2024",
    title: "LA EMERGE",
    date: "November 8, 2024",
    time: "7:30 PM PST",
    year: 2024,
    venue: {
      name: "ROW DTLA",
      address: "777 S Alameda Street",
      city: "Los Angeles, CA",
      description: "A reimagined industrial campus spanning 32 acres in the Arts District. The venue's raw concrete columns and exposed brick create a perfect canvas for avant-garde fashion presentations.",
    },
    description: "An exploration of emerging silhouettes and deconstructed forms. This presentation marked QVIL Studios' West Coast debut, featuring live musical accompaniment and immersive lighting design.",
    coverImage: "/images/mock-runway-2.jpg",
    isUpcoming: false,
  },
  {
    id: "3",
    slug: "paris-atelier-2024",
    title: "PARIS ATELIER",
    date: "September 22, 2024",
    time: "9:00 PM CET",
    year: 2024,
    venue: {
      name: "Palais de Tokyo",
      address: "13 Avenue du Président Wilson",
      city: "Paris, France",
      description: "One of Europe's largest contemporary art centers, the Palais de Tokyo offers vast exhibition halls with modernist architecture. Its raw, industrial aesthetic perfectly complements experimental fashion.",
    },
    description: "A collaboration with Parisian artisans exploring the intersection of haute couture technique and streetwear sensibility. The show featured exclusive pieces crafted during a month-long residency.",
    coverImage: "/images/mock-data-1.jpg",
    isUpcoming: false,
  },
  {
    id: "4",
    slug: "tokyo-noir-2024",
    title: "TOKYO NOIR",
    date: "June 15, 2024",
    time: "8:00 PM JST",
    year: 2024,
    venue: {
      name: "teamLab Borderless",
      address: "Azabudai Hills Garden Plaza B",
      city: "Tokyo, Japan",
      description: "An immersive digital art museum where boundaries between artworks dissolve. The venue's flowing digital installations create an ever-changing backdrop that transforms fashion presentation into performance art.",
    },
    description: "A nocturnal collection inspired by Tokyo's neon-lit streets and shadow play. Models moved through interactive digital projections, creating a seamless fusion of fashion and technology.",
    coverImage: "/images/mock-data-2.jpg",
    isUpcoming: false,
  },
  {
    id: "5",
    slug: "miami-heat-2024",
    title: "MIAMI HEAT",
    date: "March 3, 2024",
    time: "9:00 PM EST",
    year: 2024,
    venue: {
      name: "Faena Forum",
      address: "3300 Collins Avenue",
      city: "Miami Beach, FL",
      description: "A striking cylindrical auditorium designed by Rem Koolhaas. The Forum's dramatic curved walls and natural light create an intimate yet grand atmosphere for fashion presentations.",
    },
    description: "A vibrant collection celebrating color and movement. The presentation incorporated elements of dance and performance, with choreography developed specifically for the circular venue.",
    coverImage: "/images/mock-runway-1.jpg",
    isUpcoming: false,
  },
];

export function getUpcomingExhibition(): Exhibition | undefined {
  return exhibitions.find((exhibition) => exhibition.isUpcoming);
}

export function getPastExhibitions(): Exhibition[] {
  return exhibitions.filter((exhibition) => !exhibition.isUpcoming);
}

export function getExhibition(slug: string): Exhibition | undefined {
  return exhibitions.find((exhibition) => exhibition.slug === slug);
}
