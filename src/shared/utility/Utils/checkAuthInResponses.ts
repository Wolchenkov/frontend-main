export function checkAuthInResponse(response: any) {
	if (response.status === 401) {
		localStorage.removeItem('token');
		window.location.href = '/auth';
	}
	return response;
}
