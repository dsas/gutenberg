import type { Drawer as _Drawer } from '@base-ui/react/drawer';
import type { ReactNode } from 'react';
import type { Button } from '../button';
import type { IconButton } from '../icon-button';
import type { ComponentProps } from '../utils/types';

export interface RootProps
	extends Pick<
		_Drawer.Root.Props,
		'open' | 'onOpenChange' | 'defaultOpen' | 'modal' | 'swipeDirection'
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

export interface PopupProps extends ComponentProps< 'div' > {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface ActionProps extends ComponentProps< typeof Button > {
	/**
	 * The content to be rendered inside the component.
	 */
	children?: ReactNode;
}

export interface FooterProps extends ComponentProps< 'div' > {
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
