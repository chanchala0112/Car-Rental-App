import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full pt-20 gap-8">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />

            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Are you a fleet owner?</p>
                <Link to="/owner/login" className="text-amber-600 font-bold hover:text-amber-700 transition-all text-sm flex items-center gap-2 group">
                    Sign in as Owner
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;
