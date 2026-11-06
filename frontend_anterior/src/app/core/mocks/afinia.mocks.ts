import { DiscoveryPreferences, Match, Message, OwnProfile, PublicProfile, UserBrief } from '../models/afinia.models';
import { clone } from '../utils/api-url';

/**
 * DATOS FICTICIOS solo para desarrollo de UI (environment.useMocks = true).
 * Siguen la forma de docs/api/afinia-mock-scenarios.json. Los servicios de core/services
 * dejan de usarlos cuando useMocks pasa a false.
 */

export const MOCK_ME_ID = '11111111-1111-4111-8111-111111111111';

export const MOCK_USER: UserBrief = {
  id: MOCK_ME_ID,
  email: 'ana@example.test',
  onboarding_complete: true,
  email_verified: false,
  status: 'active'
};

export const MOCK_OWN_PROFILE: OwnProfile = {
  user_id: MOCK_ME_ID,
  first_name: 'Ana',
  birth_date: '2002-04-10',
  age: 24,
  gender: 'femenino',
  city: 'Villavicencio',
  bio: 'Me gusta la música, el café de la mañana y descubrir lugares nuevos.',
  photos: [],
  onboarding_complete: true
};

export const MOCK_PREFERENCES: DiscoveryPreferences = {
  interested_in_genders: ['masculino', 'no_binario'],
  min_age: 21,
  max_age: 35,
  target_relationship_type: 'seria'
};

const LUIS: PublicProfile = {
  user_id: '22222222-2222-4222-8222-222222222222',
  first_name: 'Luis',
  age: 24,
  gender: 'masculino',
  city: 'Villavicencio',
  bio: 'Me gusta caminar y conocer lugares nuevos.',
  photos: [],
  relationship_goal: 'seria'
};

const CAMILA: PublicProfile = {
  user_id: '33333333-3333-4333-8333-333333333333',
  first_name: 'Camila',
  age: 25,
  gender: 'femenino',
  city: 'Bogotá',
  bio: 'Café, libros y planes al aire libre.',
  photos: [],
  relationship_goal: 'seria'
};

const MATEO: PublicProfile = {
  user_id: '88888888-8888-4888-8888-888888888888',
  first_name: 'Mateo',
  age: 27,
  gender: 'masculino',
  city: 'Medellín',
  bio: 'Fotografía, ciclismo y buena música.',
  photos: [],
  relationship_goal: 'amistad'
};

export const MATCH_LUIS = '44444444-4444-4444-8444-444444444444';
export const MATCH_CAMILA = '44444444-4444-4444-8444-444444444445';
export const MATCH_MATEO = '44444444-4444-4444-8444-444444444446';

export const MOCK_MESSAGES: Record<string, Message[]> = {
  [MATCH_LUIS]: [
    {
      id: '55555555-5555-4555-8555-555555555551',
      match_id: MATCH_LUIS,
      sender_user_id: MOCK_ME_ID,
      text: '¡Hola! ¿Cómo estás?',
      sent_at: '2026-10-27T16:20:00Z',
      read_at: null
    }
  ],
  [MATCH_CAMILA]: [
    {
      id: '55555555-5555-4555-8555-555555555552',
      match_id: MATCH_CAMILA,
      sender_user_id: MOCK_ME_ID,
      text: 'Vi que también te gustan los libros. ¿Qué estás leyendo?',
      sent_at: '2026-11-04T14:02:00Z',
      read_at: '2026-11-04T14:10:00Z'
    },
    {
      id: '55555555-5555-4555-8555-555555555553',
      match_id: MATCH_CAMILA,
      sender_user_id: CAMILA.user_id,
      text: 'Ahora mismo una novela de García Márquez, ¿y tú?',
      sent_at: '2026-11-05T09:30:00Z',
      read_at: null
    },
    {
      id: '55555555-5555-4555-8555-555555555554',
      match_id: MATCH_CAMILA,
      sender_user_id: CAMILA.user_id,
      text: 'Podríamos tomar un café y hablar de libros.',
      sent_at: '2026-11-05T09:31:00Z',
      read_at: null
    }
  ],
  [MATCH_MATEO]: []
};

function lastOf(matchId: string): Message | null {
  const list = MOCK_MESSAGES[matchId] ?? [];
  return list.length ? list[list.length - 1] : null;
}

export const MOCK_MATCHES: Match[] = [
  {
    id: MATCH_CAMILA,
    other_user: CAMILA,
    created_at: '2026-11-04T13:50:00Z',
    last_message: lastOf(MATCH_CAMILA),
    unread_count: 2
  },
  {
    id: MATCH_LUIS,
    other_user: LUIS,
    created_at: '2026-10-27T16:10:00Z',
    last_message: lastOf(MATCH_LUIS),
    unread_count: 0
  },
  {
    id: MATCH_MATEO,
    other_user: MATEO,
    created_at: '2026-11-05T18:00:00Z',
    last_message: null,
    unread_count: 0
  }
];

/**
 * Base de datos en memoria para el modo mock: permite que enviar un mensaje o abrir un chat
 * se refleje en la lista de matches durante la sesión. Se reinicia al recargar la app.
 */
export const mockDb = {
  matches: clone(MOCK_MATCHES),
  messages: clone(MOCK_MESSAGES)
};
