export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          major: string
          lang: string
          status: 'new' | 'contacted' | 'enrolled' | 'cancelled'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          major: string
          lang?: string
          status?: 'new' | 'contacted' | 'enrolled' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      students: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          nationality: string | null
          passport_no: string | null
          date_of_birth: string | null
          major: string | null
          university_id: string | null
          enrollment_year: number | null
          status: 'prospect' | 'applied' | 'accepted' | 'enrolled' | 'graduated'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['students']['Insert']>
      }
      universities: {
        Row: {
          id: string
          name_ar: string
          name_en: string
          city: string
          logo_url: string | null
          website: string | null
          discount: number
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['universities']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['universities']['Insert']>
      }
      documents: {
        Row: {
          id: string
          student_id: string
          doc_type: 'passport' | 'transcript' | 'photo' | 'other'
          file_url: string
          file_name: string | null
          status: 'pending' | 'approved' | 'rejected'
          uploaded_at: string
        }
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id' | 'uploaded_at'> & {
          id?: string
          uploaded_at?: string
        }
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
    }
  }
}

// Convenience types
export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type Student = Database['public']['Tables']['students']['Row']
export type University = Database['public']['Tables']['universities']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
