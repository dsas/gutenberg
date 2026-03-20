import { Drawer as _Drawer } from '@base-ui/react/drawer';
import { useMergeRefs } from '@wordpress/compose';
import { forwardRef, useLayoutEffect, useRef } from '@wordpress/element';
import { Text } from '../text';
import { useDrawerValidationContext } from './context';
import type { TitleProps } from './types';

/**
 * Renders the drawer title. Serves as both the visible heading and the
 * accessible label for the drawer.
 */
const Title = forwardRef< HTMLHeadingElement, TitleProps >(
	function DrawerTitle( { className, render, ...props }, forwardedRef ) {
		const validationContext = useDrawerValidationContext();
		const internalRef = useRef< HTMLHeadingElement >( null );
		const mergedRef = useMergeRefs( [ internalRef, forwardedRef ] );

		useLayoutEffect( () => {
			validationContext?.registerTitle( internalRef.current );
		}, [ validationContext ] );

		return (
			<_Drawer.Title
				ref={ mergedRef }
				render={
					<Text
						variant="heading-xl"
						// eslint-disable-next-line jsx-a11y/heading-has-content -- Content is injected by Base UI's render composition.
						render={ render ?? <h2 /> }
					/>
				}
				className={ className }
				{ ...props }
			/>
		);
	}
);

export { Title };
