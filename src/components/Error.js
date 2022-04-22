export default function ErrorMessage({ error }) {
	return (
		<div>
			<h1>Error</h1>
			<p>{error.message}</p>
		</div>
	);
}
