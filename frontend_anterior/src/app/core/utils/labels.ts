import { Gender, RelationshipGoal } from '../models/afinia.models';

/** Etiquetas en español para los enums técnicos del contrato. */
const GENDER_LABELS: Record<Gender, string> = {
  masculino: 'Masculino',
  femenino: 'Femenino',
  no_binario: 'No binario',
  otro: 'Otro',
  prefiero_no_indicar: 'Prefiero no indicar'
};

const GOAL_LABELS: Record<RelationshipGoal, string> = {
  seria: 'Relación seria',
  casual: 'Algo casual',
  amistad: 'Amistad primero',
  sin_definir: 'Sin definir'
};

export function genderLabel(gender: Gender): string {
  return GENDER_LABELS[gender];
}

export function goalLabel(goal: RelationshipGoal | null | undefined): string {
  return goal ? GOAL_LABELS[goal] : '';
}
