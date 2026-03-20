import { mergeProps, useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from '@wordpress/element';
import styles from './style.module.css';
import type { HeaderProps } from './types';

/**
 * A layout component for the drawer header area.
 */
const Header = forwardRef< HTMLDivElement, HeaderProps >( function DrawerHeader(
	{ className, render, ...props },
	ref
) {
	const element = useRender( {
		render,
		ref,
		props: mergeProps< 'div' >( props, {
			className: clsx( styles.header, className ),
		} ),
	} );

	return element;
} );

export { Header };
