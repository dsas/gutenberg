import { Drawer as _Drawer } from '@base-ui/react/drawer';
import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';
import { IconButton } from '../icon-button';
import type { CloseIconProps } from './types';

/**
 * An icon button that closes the drawer when clicked.
 * Defaults to a close (×) icon with an accessible "Close" label.
 */
const CloseIcon = forwardRef< HTMLButtonElement, CloseIconProps >(
	function DrawerCloseIcon( { icon, label, ...props }, ref ) {
		return (
			<_Drawer.Close
				ref={ ref }
				render={
					<IconButton
						variant="minimal"
						size="compact"
						tone="neutral"
						{ ...props }
						icon={ icon ?? close }
						label={ label ?? __( 'Close' ) }
					/>
				}
			/>
		);
	}
);

export { CloseIcon };
