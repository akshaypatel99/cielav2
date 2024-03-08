import { useEffect, useState } from 'react';

const VisuallyHidden = ({ children, ...delegated }) => {
	const [forceShow, setForceShow] = useState(false);
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			const handleKeyDown = (ev) => {
				if (ev.key === 'Alt') {
					setForceShow(true);
				}
			};
			const handleKeyUp = (ev) => {
				if (ev.key === 'Alt') {
					setForceShow(false);
				}
			};
			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
				window.removeEventListener('keyup', handleKeyUp);
			};
		}
	}, []);
	if (forceShow) {
		return children;
	}
	return (
		<span
			className='visually-hidden'
			{...delegated}>
			{children}
		</span>
	);
};
export default VisuallyHidden;
