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

export type WorkSize = "square" | "tall" | "wide";

export type WorkRow = {
  id: string;
  title: string;
  image_url: string | null;
  artist_id: string;
  category: WorkCategory;
  size: WorkSize;
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
        Relationships: [];
      };
      services: {
        Row: ServiceRow;
        Insert: Partial<ServiceRow> &
          Pick<ServiceRow, "slug" | "name_en" | "name_ru">;
        Update: Partial<ServiceRow>;
        Relationships: [];
      };
      works: {
        Row: WorkRow;
        Insert: Partial<WorkRow> &
          Pick<WorkRow, "title" | "artist_id" | "category">;
        Update: Partial<WorkRow>;
        Relationships: [
          {
            foreignKeyName: "works_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews: {
        Row: ReviewRow;
        Insert: Partial<ReviewRow> &
          Pick<ReviewRow, "name" | "text_en" | "text_ru" | "rating">;
        Update: Partial<ReviewRow>;
        Relationships: [
          {
            foreignKeyName: "reviews_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
        ];
      };
      bookings: {
        Row: BookingRow;
        Insert: Partial<BookingRow> &
          Pick<
            BookingRow,
            "client_name" | "artist_id" | "service_id" | "booking_date" | "booking_time"
          >;
        Update: Partial<BookingRow>;
        Relationships: [
          {
            foreignKeyName: "bookings_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_booked_times: {
        Args: { p_artist_id: string; p_date: string };
        Returns: { booking_time: string }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
