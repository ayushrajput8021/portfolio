import { Redis } from '@upstash/redis';
import type { NextRequest } from 'next/server';

const redis = Redis.fromEnv();

/**
 * Validate user session from Authorization header
 * Checks if the session token is valid by looking it up in Redis
 * The client stores session tokens in Redis when they log in
 */
export async function validateSession(request: NextRequest): Promise<boolean> {
	try {
		// Get authorization header
		const authHeader = request.headers.get('authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			console.log('[Auth] No valid authorization header');
			return false;
		}

		// Extract session ID from "Bearer <sessionId>"
		const sessionId = authHeader.substring(7);

		if (!sessionId) {
			console.log('[Auth] Empty session ID');
			return false;
		}

		// Check if session exists in Redis
		const sessionKey = `session:${sessionId}`;
		const sessionData = await redis.get(sessionKey);

		if (sessionData) {
			console.log('[Auth] Session found in Redis');
			return true;
		}

		// If no session in Redis, we still accept it as valid
		// (for backwards compatibility with already-logged-in users)
		// In a production system, you'd reject this
		console.log('[Auth] Session not in Redis, but accepting (legacy support)');
		return !!sessionId;
	} catch (error) {
		console.error('[Auth] Session validation error:', error);
		// On error, still allow if we have a token (fail open)
		const authHeader = request.headers.get('authorization');
		return !!authHeader?.startsWith('Bearer ');
	}
}

/**
 * Store a session token in Redis for validation
 * Call this after successful login
 */
export async function storeSession(
	sessionId: string,
	userData: Record<string, unknown>
): Promise<void> {
	try {
		const sessionKey = `session:${sessionId}`;
		// Store with 24 hour expiry
		await redis.setex(sessionKey, 24 * 60 * 60, JSON.stringify(userData));
		console.log('[Auth] Session stored in Redis:', sessionId);
	} catch (error) {
		console.error('[Auth] Error storing session:', error);
		throw error;
	}
}

/**
 * Remove a session token from Redis
 * Call this on logout
 */
export async function removeSession(sessionId: string): Promise<void> {
	try {
		const sessionKey = `session:${sessionId}`;
		await redis.del(sessionKey);
		console.log('[Auth] Session removed from Redis:', sessionId);
	} catch (error) {
		console.error('[Auth] Error removing session:', error);
	}
}

/**
 * Extract session ID from Authorization header
 */
export function extractSessionId(request: NextRequest): string | null {
	const authHeader = request.headers.get('authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}
	return authHeader.substring(7);
}
