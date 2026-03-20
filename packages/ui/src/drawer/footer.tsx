import { mergeProps, useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from '@wordpress/element';
import styles from './style.module.css';
import type { FooterProps } from './types';

/**
 * A layout component for the drawer footer area.
 */
const Footer = forwardRef< HTMLDivElement, FooterProps >( function DrawerFooter(
	{ className, render, ...props },
	ref
) {
	const element = useRender( {
		render,
		ref,
		props: mergeProps< 'div' >( props, {
			className: clsx( styles.footer, className ),
		} ),
	} );

	return element;
} );

export { Footer };
