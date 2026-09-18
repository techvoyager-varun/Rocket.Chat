import { useToggle, useOutsideClick } from '@rocket.chat/fuselage-hooks';
import type { RefObject } from 'react';
import { useCallback } from 'react';

/**
 * Whether a dropdown attached to a control is open, and how to say otherwise.
 *
 * A click anywhere else closes it — but not a click on the control it hangs from, which has its own answer to
 * being clicked and would otherwise close and reopen it in one gesture.
 */
export const useDropdownVisibility = <T extends HTMLElement>({
	reference,
	target,
}: {
	reference: RefObject<T | null>;
	target: RefObject<T | null>;
}): {
	isVisible: boolean;
	toggle: (state?: boolean) => void;
} => {
	const [isVisible, toggle] = useToggle(false);

	useOutsideClick(
		[target, reference],
		useCallback(() => toggle(false), [toggle]),
	);

	return {
		isVisible,
		toggle,
	};
};
