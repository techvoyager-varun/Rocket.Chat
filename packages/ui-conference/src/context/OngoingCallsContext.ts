import type { JoinableVideoConference } from '@rocket.chat/core-typings';
import { createContext, useContext } from 'react';

/**
 * The calls this user could walk into right now, already bucketed by what each of them is doing.
 *
 * Bucketing happens outside this package because "still ringing" is an answer with a clock in it, and the clock
 * belongs with whoever is watching the list rather than with each row that draws one.
 */
export type OngoingCallsContextValue = {
	/** Rung and not yet answered for. */
	ringing: JoinableVideoConference[];
	/** Running, or already joined — either way, there to be walked into. */
	ongoing: JoinableVideoConference[];
	/** Turned down, and keeping a place in the list as the way back in. */
	declined: JoinableVideoConference[];
	/** Which of them this client has been asked to stop making noise about. */
	silencedCalls: string[];
	joinCall: (callId: string) => void;
	declineCall: (callId: string) => void;
	silenceCall: (callId: string) => void;
	/**
	 * Where a call lives, so a row can be a real link — openable in a tab of its own, and nameable. Routes are the
	 * application's to know.
	 */
	callHref: (callId: string) => string;
	/**
	 * When a call happened, said the way the rest of the product says it. How a workspace writes a time is a
	 * setting and a preference, neither of which a row has any business reading.
	 */
	formatTime: (date: Date) => string;
};

export const defaultOngoingCallsContextValue: OngoingCallsContextValue = {
	ringing: [],
	ongoing: [],
	declined: [],
	silencedCalls: [],
	joinCall: () => undefined,
	declineCall: () => undefined,
	silenceCall: () => undefined,
	callHref: (callId) => `/conference/${callId}`,
	formatTime: (date) => date.toISOString(),
};

export const OngoingCallsContext = createContext<OngoingCallsContextValue>(defaultOngoingCallsContextValue);

export const useOngoingCalls = (): OngoingCallsContextValue => useContext(OngoingCallsContext);
