import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const UserTracker = () => {
    const { user, isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Check if user already exists in the list
            const userExists = registeredUsers.some(u => u.id === user.id);

            if (!userExists) {
                const newUser = {
                    id: user.id,
                    name: user.fullName || user.username || 'Anonymous User',
                    email: user.primaryEmailAddress?.emailAddress || 'No Email',
                    joined: new Date().toISOString().split('T')[0],
                    status: 'Active',
                    phone: 'N/A',
                    isClerkUser: true
                };

                localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
            }
        }
    }, [isLoaded, isSignedIn, user]);

    return null; // Invisible component
};

export default UserTracker;
