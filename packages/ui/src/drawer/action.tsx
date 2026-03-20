import { Drawer as _Drawer } from '@base-ui/react/drawer';
import { forwardRef } from '@wordpress/element';
import { Button } from '../button';
import type { ActionProps } from './types';

/**
 * A button that closes the drawer when clicked.
 * Wraps the design system `Button` component.
 */
const Action = forwardRef< HTMLButtonElement, ActionProps >(
	function DrawerAction( { render, ...props }, ref ) {
		return (
			<_Drawer.Close
				ref={ ref }
				render={ <Button render={ render } /> }
				{ ...props }
			/>
		);
	}
);

export { Action };
