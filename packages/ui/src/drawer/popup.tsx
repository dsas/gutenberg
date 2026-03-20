import { Drawer as _Drawer } from '@base-ui/react/drawer';
import clsx from 'clsx';
import { forwardRef } from '@wordpress/element';
import {
	type ThemeProvider as ThemeProviderType,
	privateApis as themePrivateApis,
} from '@wordpress/theme';
import { unlock } from '../lock-unlock';
import { DrawerValidationProvider, useDrawerModal } from './context';
import styles from './style.module.css';
import type { PopupProps } from './types';

const ThemeProvider: typeof ThemeProviderType =
	unlock( themePrivateApis ).ThemeProvider;

/**
 * Renders the drawer popup element that contains the drawer content.
 * Uses a portal to render outside the DOM hierarchy.
 */
const Popup = forwardRef< HTMLDivElement, PopupProps >( function DrawerPopup(
	{ className, children, size, initialFocus, finalFocus, ...props },
	ref
) {
	const modal = useDrawerModal();

	return (
		<_Drawer.Portal>
			{ modal === true && (
				<_Drawer.Backdrop className={ styles.backdrop } />
			) }
			<ThemeProvider>
				<_Drawer.Viewport className={ styles.viewport }>
					<_Drawer.Popup
						ref={ ref }
						className={ clsx(
							styles.popup,
							size && styles[ `is-${ size }` ],
							className
						) }
						initialFocus={ initialFocus }
						finalFocus={ finalFocus }
						{ ...props }
					>
						<_Drawer.Content className={ styles.content }>
							<DrawerValidationProvider>
								{ children }
							</DrawerValidationProvider>
						</_Drawer.Content>
					</_Drawer.Popup>
				</_Drawer.Viewport>
			</ThemeProvider>
		</_Drawer.Portal>
	);
} );

export { Popup };
