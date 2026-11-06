/**
 * Modelos del contrato docs/api/afinia-openapi-v1.yaml (v1.0.0-draft).
 * Solo reflejan los esquemas definidos allí; no añadir campos que el contrato no tenga.
 * Los valores enum son identificadores técnicos; las etiquetas en español viven en core/utils/labels.ts.
 */

export type Gender = 'masculino' | 'femenino' | 'no_binario' | 'otro' | 'prefiero_no_indicar';
export type RelationshipGoal = 'seria' | 'casual' | 'amistad' | 'sin_definir';
export type UserStatus = 'pending_profile' | 'active' | 'suspended' | 'deactivated';

/** components/schemas/Photo */
export interface Photo {
  id: string;
  url: string;
  is_primary: boolean;
}

/** components/schemas/UserBrief */
export interface UserBrief {
  id: string;
  email: string;
  onboarding_complete: boolean;
  email_verified: boolean;
  status: UserStatus;
}

/** components/schemas/PublicProfile */
export interface PublicProfile {
  user_id: string;
  first_name: string;
  age: number;
  gender: Gender;
  city?: string | null;
  bio?: string | null;
  photos: Photo[];
  relationship_goal?: RelationshipGoal | null;
}

/** components/schemas/OwnProfile */
export interface OwnProfile {
  user_id: string;
  first_name: string;
  birth_date: string;
  age: number;
  gender: Gender;
  city?: string | null;
  bio?: string | null;
  photos: Photo[];
  onboarding_complete: boolean;
}

/** components/schemas/Preferences */
export interface DiscoveryPreferences {
  interested_in_genders: Gender[];
  min_age: number;
  max_age: number;
  target_relationship_type?: RelationshipGoal | null;
}

/** components/schemas/Message */
export interface Message {
  id: string;
  match_id: string;
  sender_user_id: string;
  text: string;
  sent_at: string;
  read_at: string | null;
}

/** components/schemas/Match */
export interface Match {
  id: string;
  other_user: PublicProfile;
  created_at: string;
  last_message?: Message | null;
  unread_count: number;
}

/* ───────── Envolturas de respuesta (README-INTEGRACION.md, «Contrato de respuestas») ───────── */

export interface ApiResponse<T> {
  data: T;
}

export interface ApiPage<T> {
  data: { items: T[] };
  meta: { next_cursor: string | null; has_more: boolean };
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    request_id?: string;
  };
}

/** POST /api/v1/match/{matchId}/read */
export interface UnreadResult {
  unread_count: number;
}

/** POST /api/v1/auth/resend-verification (202) */
export interface ResendVerificationResult {
  status: 'accepted';
}
