export interface ConversationMemory {
  sessionId: string;

  lastQuery?: string;

  parsedQuery?: any;

  toolResults?: any;

  lastAnswer?: string;

  updatedAt: Date;
}

/**
 * In-memory session store
 *
 * Phase 9:
 * Uses RAM
 *
 * Phase 15:
 * Replace with Redis / MongoDB
 */
const memoryStore = new Map<
  string,
  ConversationMemory
>();

/**
 * Get Memory
 */
export function getMemory(
  sessionId: string,
): ConversationMemory | null {

  return memoryStore.get(sessionId) ?? null;

}

/**
 * Save Memory
 */
export function saveMemory(
  sessionId: string,
  memory: Partial<ConversationMemory>,
) {

  const previous =
    memoryStore.get(sessionId);

  memoryStore.set(sessionId, {

    sessionId,

    ...previous,

    ...memory,

    updatedAt: new Date(),

  });

}

/**
 * Delete Memory
 */
export function clearMemory(
  sessionId: string,
) {

  memoryStore.delete(sessionId);

}

/**
 * Get All Sessions
 */
export function getAllSessions() {

  return [...memoryStore.values()];

}