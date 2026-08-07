export type ArtistRow = {
  id: string;
  name: string;
  slug: string;
  bio_en: string | null;
  bio_ru: string | null;
  specialization_en: string | null;
  specialization_ru: string | null;
  experience_years: number | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type ServiceRow = {
  id: string;
  slug: string;
  name_en: string;
  name_ru: string;
  description_en: string | null;
  description_ru: string | null;
  duration_display_en: string | null;
  duration_display_ru: string | null;
  price_from: number | null;
  duration_minutes: number | null;
  created_at: string;
};

export type WorkCategory =
  | "blackwork"
  | "fine-line"
  | "realism"
  | "minimal"
  | "color";

export type WorkRow = {
  id: string;
  title: string;
  image_url: string | null;
  artist_id: string;
  category: WorkCategory;
  description_en: string | null;
  description_ru: string | null;
  created_at: string;
};

export type ReviewRow = {
  id: string;
  name: string;
  text_en: string;
  text_ru: string;
  rating: number;
  avatar_url: string | null;
  artist_id: string | null;
  created_at: string;
};

export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

export type BookingRow = {
  id: string;
  client_name: string;
  phone: string | null;
  telegram: string | null;
  artist_id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  comment: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      artists: {
        Row: ArtistRow;
        Insert: Partial<ArtistRow> & Pick<ArtistRow, "name" | "slug">;
        Update: Partial<ArtistRow>;
      };
      services: {
        Row: ServiceRow;
        Insert: Partial<ServiceRow> &
          Pick<ServiceRow, "slug" | "name_en" | "name_ru">;
        Update: Partial<ServiceRow>;
      };
      works: {
        Row: WorkRow;
        Insert: Partial<WorkRow> &
          Pick<WorkRow, "title" | "artist_id" | "category">;
        Update: Partial<WorkRow>;
      };
      reviews: {
        Row: ReviewRow;
        Insert: Partial<ReviewRow> &
          Pick<ReviewRow, "name" | "text_en" | "text_ru" | "rating">;
        Update: Partial<ReviewRow>;
      };
      bookings: {
        Row: BookingRow;
        Insert: Partial<BookingRow> &
          Pick<
            BookingRow,
            "client_name" | "artist_id" | "service_id" | "booking_date" | "booking_time"
          >;
        Update: Partial<BookingRow>;
      };
    };
  };
};
