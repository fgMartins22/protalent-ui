// Tipos base que espelham a modelagem inicial do banco (db/schema.sql).
// Servem de contrato entre backend e frontend quando a integração começar.

export interface Profile {
  id: string
  auth_user_id: string | null
  first_name: string
  last_name: string
  title: string
  city: string
  state: string
  email: string
  phone: string
  linkedin: string
  github: string
  portfolio: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface ProfessionalExperience {
  id: string
  profile_id: string
  role: string
  company: string
  start_date: string | null
  end_date: string | null
  current: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  profile_id: string
  course: string
  institution: string
  start_date: string | null
  end_date: string | null
  current: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  profile_id: string
  name: string
  created_at: string
}

export type ResumeLayout = "standard" | "profile" | "modern"
export type ResumeOutputType = "text" | "bullets"
export type ResumeStatus = "draft" | "updated" | "published"

export interface Resume {
  id: string
  profile_id: string
  name: string
  layout: ResumeLayout
  job_description: string | null
  output_type: ResumeOutputType
  professional_summary: string | null
  experience_description: string | null
  education_description: string | null
  status: ResumeStatus
  created_at: string
  updated_at: string
}

export type PaymentMethod = "card" | "pix" | "boleto"
export type BillingType = "recurring" | "one_time"
export type PaymentStatus = "pending" | "paid" | "failed" | "canceled" | "expired"

export interface Payment {
  id: string
  profile_id: string
  provider: string
  provider_payment_id: string | null
  provider_subscription_id: string | null
  payment_method: PaymentMethod
  plan: string
  billing_type: BillingType
  status: PaymentStatus
  amount: number
  starts_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}
