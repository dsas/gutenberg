import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component, createRef } from '@wordpress/element';
import type { ReactNode } from 'react';
import * as Drawer from '../index';

class TestErrorBoundary extends Component<
	{ children: ReactNode; onError: ( error: Error ) => void },
	{ hasError: boolean }
> {
	constructor( props: {
		children: ReactNode;
		onError: ( error: Error ) => void;
	} ) {
		super( props );
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch( error: Error ) {
		this.props.onError( error );
	}

	render() {
		if ( this.state.hasError ) {
			return null;
		}

		return this.props.children;
	}
}

describe( 'Drawer', () => {
	it( 'forwards ref', async () => {
		const user = userEvent.setup();
		const triggerRef = createRef< HTMLButtonElement >();
		const popupRef = createRef< HTMLDivElement >();
		const actionRef = createRef< HTMLButtonElement >();
		const headerRef = createRef< HTMLDivElement >();
		const titleRef = createRef< HTMLHeadingElement >();
		const descriptionRef = createRef< HTMLParagraphElement >();
		const closeIconRef = createRef< HTMLButtonElement >();

		render(
			<Drawer.Root>
				<Drawer.Trigger ref={ triggerRef }>Open Drawer</Drawer.Trigger>
				<Drawer.Popup ref={ popupRef }>
					<Drawer.Header ref={ headerRef }>
						<Drawer.Title ref={ titleRef }>
							Test Drawer
						</Drawer.Title>
						<Drawer.CloseIcon ref={ closeIconRef } />
					</Drawer.Header>
					<Drawer.Description ref={ descriptionRef }>
						A test description
					</Drawer.Description>
					<Drawer.Action ref={ actionRef }>Close</Drawer.Action>
				</Drawer.Popup>
			</Drawer.Root>
		);

		expect( triggerRef.current ).toBeInstanceOf( HTMLButtonElement );

		await user.click( triggerRef.current! );

		await waitFor( () => {
			expect( popupRef.current ).toBeInstanceOf( HTMLDivElement );
		} );

		expect( headerRef.current ).toBeInstanceOf( HTMLDivElement );
		expect( titleRef.current ).toBeInstanceOf( HTMLHeadingElement );
		expect( descriptionRef.current ).toBeInstanceOf( HTMLParagraphElement );
		expect( closeIconRef.current ).toBeInstanceOf( HTMLButtonElement );
		expect( actionRef.current ).toBeInstanceOf( HTMLButtonElement );
	} );

	describe( 'Development mode validation', () => {
		let originalConsoleError: typeof console.error;

		beforeEach( () => {
			// eslint-disable-next-line no-console
			originalConsoleError = console.error;
			// eslint-disable-next-line no-console
			console.error = jest.fn();
		} );

		afterEach( () => {
			// eslint-disable-next-line no-console
			console.error = originalConsoleError;
		} );

		it( 'should throw when Drawer.Title is missing', async () => {
			const user = userEvent.setup();
			const onError = jest.fn();

			render(
				<TestErrorBoundary onError={ onError }>
					<Drawer.Root>
						<Drawer.Trigger>Open Drawer</Drawer.Trigger>
						<Drawer.Popup>
							<Drawer.Header>
								{ /* Missing Drawer.Title */ }
							</Drawer.Header>
							<p>Content without a title</p>
							<Drawer.Action>Close</Drawer.Action>
						</Drawer.Popup>
					</Drawer.Root>
				</TestErrorBoundary>
			);

			await user.click(
				screen.getByRole( 'button', { name: 'Open Drawer' } )
			);

			await waitFor( () => {
				expect( onError ).toHaveBeenCalled();
			} );

			expect( onError.mock.calls[ 0 ][ 0 ] ).toBeInstanceOf( Error );
			expect( ( onError.mock.calls[ 0 ][ 0 ] as Error ).message ).toBe(
				'Drawer: Missing <Drawer.Title>. ' +
					'For accessibility, every drawer requires a title. ' +
					'If needed, the title can be visually hidden but must not be omitted.'
			);
		} );

		it( 'should not throw before opening the drawer', async () => {
			const onError = jest.fn();

			render(
				<TestErrorBoundary onError={ onError }>
					<Drawer.Root>
						<Drawer.Trigger>Open Drawer</Drawer.Trigger>
						<Drawer.Popup>
							<Drawer.Header>
								<Drawer.Title>My Title</Drawer.Title>
							</Drawer.Header>
							<p>Content with a title</p>
							<Drawer.Action>Close</Drawer.Action>
						</Drawer.Popup>
					</Drawer.Root>
				</TestErrorBoundary>
			);

			await expect( screen.findByRole( 'dialog' ) ).rejects.toThrow();

			expect( onError ).not.toHaveBeenCalled();
		} );

		it( 'should not throw when Drawer.Title is present', async () => {
			const user = userEvent.setup();
			const onError = jest.fn();

			render(
				<TestErrorBoundary onError={ onError }>
					<Drawer.Root>
						<Drawer.Trigger>Open Drawer</Drawer.Trigger>
						<Drawer.Popup>
							<Drawer.Header>
								<Drawer.Title>My Title</Drawer.Title>
							</Drawer.Header>
							<p>Content with a title</p>
							<Drawer.Action>Close</Drawer.Action>
						</Drawer.Popup>
					</Drawer.Root>
				</TestErrorBoundary>
			);

			await user.click(
				screen.getByRole( 'button', { name: 'Open Drawer' } )
			);

			await waitFor( () => {
				expect( screen.getByRole( 'dialog' ) ).toBeInTheDocument();
			} );
			expect( onError ).not.toHaveBeenCalled();
		} );

		it( 'should throw when Drawer.Title is empty', async () => {
			const user = userEvent.setup();
			const onError = jest.fn();

			render(
				<TestErrorBoundary onError={ onError }>
					<Drawer.Root>
						<Drawer.Trigger>Open Drawer</Drawer.Trigger>
						<Drawer.Popup>
							<Drawer.Header>
								{ /* @ts-expect-error this is just for test purposes */ }
								<Drawer.Title>
									{ /* Empty title */ }
								</Drawer.Title>
							</Drawer.Header>
							<p>Content with empty title</p>
							<Drawer.Action>Close</Drawer.Action>
						</Drawer.Popup>
					</Drawer.Root>
				</TestErrorBoundary>
			);

			await user.click(
				screen.getByRole( 'button', { name: 'Open Drawer' } )
			);

			await waitFor( () => {
				expect( onError ).toHaveBeenCalled();
			} );

			expect( onError.mock.calls[ 0 ][ 0 ] ).toBeInstanceOf( Error );
			expect( ( onError.mock.calls[ 0 ][ 0 ] as Error ).message ).toBe(
				'Drawer: <Drawer.Title> cannot be empty. ' +
					'Provide meaningful text content for the drawer title.'
			);
		} );

		it( 'should throw when Drawer.Title contains only whitespace', async () => {
			const user = userEvent.setup();
			const onError = jest.fn();

			render(
				<TestErrorBoundary onError={ onError }>
					<Drawer.Root>
						<Drawer.Trigger>Open Drawer</Drawer.Trigger>
						<Drawer.Popup>
							<Drawer.Header>
								<Drawer.Title> </Drawer.Title>
							</Drawer.Header>
							<p>Content with whitespace-only title</p>
							<Drawer.Action>Close</Drawer.Action>
						</Drawer.Popup>
					</Drawer.Root>
				</TestErrorBoundary>
			);

			await user.click(
				screen.getByRole( 'button', { name: 'Open Drawer' } )
			);

			await waitFor( () => {
				expect( onError ).toHaveBeenCalled();
			} );

			expect( onError.mock.calls[ 0 ][ 0 ] ).toBeInstanceOf( Error );
			expect( ( onError.mock.calls[ 0 ][ 0 ] as Error ).message ).toBe(
				'Drawer: <Drawer.Title> cannot be empty. ' +
					'Provide meaningful text content for the drawer title.'
			);
		} );

		it( 'should not throw when Drawer.Title contains mixed content with text', async () => {
			const user = userEvent.setup();
			const onError = jest.fn();

			render(
				<TestErrorBoundary onError={ onError }>
					<Drawer.Root>
						<Drawer.Trigger>Open Drawer</Drawer.Trigger>
						<Drawer.Popup>
							<Drawer.Header>
								<Drawer.Title>
									<span aria-hidden="true">☰</span>
									Navigation
								</Drawer.Title>
							</Drawer.Header>
							<p>Content with icon and text title</p>
							<Drawer.Action>Close</Drawer.Action>
						</Drawer.Popup>
					</Drawer.Root>
				</TestErrorBoundary>
			);

			await user.click(
				screen.getByRole( 'button', { name: 'Open Drawer' } )
			);

			await waitFor( () => {
				expect( screen.getByRole( 'dialog' ) ).toBeInTheDocument();
			} );
			expect( onError ).not.toHaveBeenCalled();
		} );
	} );
} );
