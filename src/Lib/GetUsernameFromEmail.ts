export default function GetUsernameFromEmail(email: string) {
	let root = email.split("@")[0];
	let cleanRoot = root.replace(/[\.\#\$\[\]]/g,'');
	return cleanRoot;
}