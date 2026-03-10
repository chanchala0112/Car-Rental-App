import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
    return (
        <div className="flexCenter min-h-[70vh] w-full pt-20">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
    );
};

export default SignUpPage;
