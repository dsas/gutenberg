import { Drawer as _Drawer } from '@base-ui/react/drawer';
import { DrawerModalProvider } from './context';
import type { RootProps } from './types';

/**
 * A panel that slides in from the edge of the screen. It extends the Dialog
 * pattern with slide-in behavior and swipe-to-dismiss gestures.
 *
 * Every drawer must include a `Drawer.Title` component for accessibility — it
 * serves as both the visible heading and the accessible label for the drawer.
 *
 * Always include a visible close button, either `Drawer.CloseIcon` or a clear
 * dismissing action button.
 */
function Root( { modal, children, ...props }: RootProps ) {
	return (
		<_Drawer.Root modal={ modal } { ...props }>
			<DrawerModalProvider modal={ modal }>
				{ children }
			</DrawerModalProvider>
		</_Drawer.Root>
	);
}

export { Root };
