import React from 'react';

export default (props) => {
	const { label, className, loading, isLoading, ...rest } = props;
	const buttonIsLoading = loading || isLoading || false;
	return (
		<button disabled={buttonIsLoading} className={className || 'btn blue-btn'}>
			{buttonIsLoading && (
				<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
			)}
			{label || 'submit'}
		</button>
	);
};
