/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { speak } from '@wordpress/a11y';
import { __, sprintf } from '@wordpress/i18n';
import { store as uploadMediaStore } from '@wordpress/upload-media';

/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';

/**
 * Hook that announces upload status changes for screen readers.
 *
 * Uses wp.a11y.speak to make announcements when:
 * - Upload starts (polite)
 * - Upload completes successfully (polite)
 * - Upload fails with an error (assertive)
 *
 * @param {string}  url        The blob URL of the uploading image.
 * @param {boolean} isComplete Whether the upload is complete (no temporaryURL).
 * @param {string}  filename   Optional filename for more descriptive announcements.
 */
export default function useUploadAnnouncer( url, isComplete, filename = '' ) {
	const hasAnnouncedStart = useRef( false );
	const hasAnnouncedComplete = useRef( false );
	const previousErrorRef = useRef( null );

	const { itemError, batchSize, batchIndex } = useSelect(
		( select ) => {
			if ( ! url ) {
				return {
					itemError: undefined,
					batchSize: undefined,
					batchIndex: undefined,
				};
			}

			const { getItemByBlobUrl } = unlock( select( uploadMediaStore ) );
			const item = getItemByBlobUrl( url );

			return {
				itemError: item?.error,
				batchSize: item?.batchSize,
				batchIndex: item?.batchIndex,
			};
		},
		[ url ]
	);

	// Announce upload start.
	// For batches, only the first item announces (with total count).
	useEffect( () => {
		if ( url && ! hasAnnouncedStart.current ) {
			// Disable reason: Updating a ref is a standard React pattern for
			// tracking state across renders without causing re-renders.
			// eslint-disable-next-line react-compiler/react-compiler
			hasAnnouncedStart.current = true;

			// For batch uploads, only announce once from the first item.
			if ( batchSize > 1 && batchIndex > 1 ) {
				return;
			}

			let message;
			if ( batchSize > 1 ) {
				message = sprintf(
					/* translators: %d: number of images being uploaded */
					__( 'Uploading %d images…' ),
					batchSize
				);
			} else if ( filename ) {
				message = sprintf(
					/* translators: %s: filename */
					__( 'Uploading %s…' ),
					filename
				);
			} else {
				message = __( 'Uploading image…' );
			}
			speak( message, 'polite' );
		}
	}, [ url, filename, batchSize, batchIndex ] );

	// Announce upload completion.
	// For batches, only announce when the batch is fully uploaded.
	useEffect( () => {
		if (
			isComplete &&
			hasAnnouncedStart.current &&
			! hasAnnouncedComplete.current
		) {
			// For batch uploads, skip per-item completion announcements
			// for non-lead items. The lead item (batchIndex === 1) will
			// announce when the entire batch is done via isBatchUploaded.
			if ( batchSize > 1 && batchIndex > 1 ) {
				return;
			}

			hasAnnouncedComplete.current = true;
			let message;
			if ( batchSize > 1 ) {
				message = sprintf(
					/* translators: %d: number of images uploaded */
					__( '%d images uploaded successfully.' ),
					batchSize
				);
			} else if ( filename ) {
				message = sprintf(
					/* translators: %s: filename */
					__( '%s uploaded successfully.' ),
					filename
				);
			} else {
				message = __( 'Image uploaded successfully.' );
			}
			speak( message, 'polite' );
		}
	}, [ isComplete, filename, batchSize, batchIndex ] );

	// Announce errors
	useEffect( () => {
		if ( itemError && previousErrorRef.current !== itemError ) {
			previousErrorRef.current = itemError;
			const message = itemError.message
				? sprintf(
						/* translators: %s: error message */
						__( 'Upload failed: %s' ),
						itemError.message
				  )
				: __( 'Upload failed.' );
			speak( message, 'assertive' );
		}
	}, [ itemError ] );

	// Reset announcements when URL changes (new upload)
	useEffect( () => {
		hasAnnouncedStart.current = false;
		hasAnnouncedComplete.current = false;
		previousErrorRef.current = null;
	}, [ url ] );
}
