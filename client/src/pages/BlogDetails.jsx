import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogs } from '../assets/data';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const postIndex = parseInt(id, 10);
    const post = blogs[postIndex];

    useEffect(() => {
        // Scroll to top when loading a new blog post
        window.scrollTo(0, 0);

        // If ID is invalid or out of bounds, redirect back to blog page
        if (isNaN(postIndex) || !post) {
            navigate('/blog');
        }
    }, [id, post, navigate, postIndex]);

    if (!post) return null; // Prevent rendering errors while redirecting

    return (
        <section className="pt-24 pb-16 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="max-padd-container relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-3xl overflow-hidden mb-12">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Header Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start text-white">
                    <span className="px-4 py-1.5 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                        <span className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-white/20 flexCenter">👤</span>
                            Admin
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span>May 15, 2025</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span>5 Min Read</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-6 lg:px-0">
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-black font-semibold mb-8 transition-colors">
                    <span className="text-xl">←</span> Back to all articles
                </Link>

                <div className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 border-l-4 border-amber-500 pl-6">
                        {post.description}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-6">Introduction</h2>
                    <p className="mb-6 text-slate-700 leading-relaxed">
                        Renting a car can be an incredibly liberating experience, offering the flexibility to explore at your own pace. Whether you're planning a cross-country road trip, a weekend getaway, or simply need a temporary vehicle while yours is in the shop, understanding the nuances of car rental is crucial. {post.description}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-6">Key Considerations</h2>
                    <p className="mb-6 text-slate-700 leading-relaxed">
                        Before signing any rental agreement, there are several key factors to consider to ensure you get the best deal and avoid unexpected headaches.
                    </p>
                    <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-3">
                        <li><strong>Insurance Coverage:</strong> Always verify what your personal auto insurance or credit card covers before purchasing expensive agency waivers.</li>
                        <li><strong>Hidden Fees:</strong> Watch out for sneaky charges like airport surcharges, additional driver fees, or toll processing fees.</li>
                        <li><strong>Fuel Policy:</strong> The "full-to-full" policy is almost always the most economical choice. Avoid pre-purchasing fuel unless you are entirely sure you will return the tank empty.</li>
                        <li><strong>Vehicle Inspection:</strong> Take photos or a video of the car's exterior and interior before you drive off the lot to document pre-existing damage.</li>
                    </ul>

                    <div className="bg-slate-50 p-8 rounded-2xl my-10 border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Pro Tip</h3>
                        <p className="text-slate-700 m-0">
                            Booking your rental car at least two weeks in advance, especially during peak travel seasons, can save you up to 30% compared to last-minute bookings at the counter.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-6">Conclusion</h2>
                    <p className="mb-6 text-slate-700 leading-relaxed">
                        By keeping these principles in mind, your next car rental experience can be smooth, cost-effective, and perfectly suited to your travel needs. Safe travels and enjoy the open road!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;
