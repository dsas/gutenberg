import type { Drawer as _Drawer } from '@base-ui/react/drawer';
import type { ReactNode } from 'react';
import type { Button } from '../button';
import type { IconButton } from '../icon-button';
import type { ComponentProps } from '../utils/types';

export interface RootProps
	extends Pick<
		_Drawer.Root.Props,
		| 'open'
		| 'onOpenChange'
		| 'onOpenChangeComplete'
		| 'defaultOpen'
		| 'modal'
		| 'swipeDirection'
		| 'disablePointerDismissal'
	> {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface TriggerProps extends ComponentProps< 'button' > {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface PopupProps
	extends ComponentProps< 'div' >,
		Pick< _Drawer.Popup.Props, 'initialFocus' | 'finalFocus' > {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;

	/**
	 * Controls the size of the drawer along its relevant axis (width for
	 * left/right drawers, height for up/down drawers).
	 *
	 * When not specified, left/right drawers use a default medium width
	 * and up/down drawers fit their content.
	 *
	 * - `'small'` — narrow/short.
	 * - `'medium'` — moderate.
	 * - `'large'` — wide/tall.
	 * - `'stretch'` — fills available space, respecting the viewport inset.
	 */
	size?: 'small' | 'medium' | 'large' | 'stretch';
}

export interface ActionProps extends ComponentProps< typeof Button > {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface HeaderProps extends ComponentProps< 'div' > {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface TitleProps extends ComponentProps< 'h2' > {
	/**
	 * The title content to be rendered. This serves as both the visible
	 * heading and the accessible label for the drawer.
	 */
	children: ReactNode;
}

export interface DescriptionProps extends ComponentProps< 'p' > {
	/**
	 * The description content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface CloseIconProps
	extends Omit<
		ComponentProps< typeof IconButton >,
		'label' | 'icon' | 'loading' | 'loadingAnnouncement'
	> {
	label?: ComponentProps< typeof IconButton >[ 'label' ];
	icon?: ComponentProps< typeof IconButton >[ 'icon' ];
}
