export const updateProfile = async (profileData, token) => {
    const url = import.meta.env.VITE_API_BASE_URL
    const response = await fetch(`${url}/user/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    })

    if (!response.ok) {
        throw new Error('Update profile failed')
    }

    return await response.json()
}
