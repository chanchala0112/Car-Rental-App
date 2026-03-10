import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Remove whitespace and check exact match
        if (email.trim() === 'owner@gmail.com' && password.trim() === 'owner@12') {
            localStorage.setItem('ownerToken', 'authenticated-owner-token');
            window.location.href = '/owner/dashboard';
        } else {
            setError('Invalid credentials. Please use owner@gmail.com / owner@12');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg shadow-amber-500/20">
                            CR
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Owner Panel Login</h1>
                        <p className="text-slate-500 mt-2 text-sm">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="owner@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 transition-all w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 transition-all w-full"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                        >
                            Sign In to Dashboard
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-slate-50">
                        <button
                            onClick={() => navigate('/')}
                            className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                        >
                            Back to public site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerLogin;
