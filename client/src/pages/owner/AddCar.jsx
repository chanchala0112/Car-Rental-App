import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        brand: "",
        bodyType: "Sedan",
        transmission: "Automatic",
        fuelType: "Petrol",
        seats: "5",
        odometer: "",
        rentPrice: "",
        salePrice: "",
        description: "",
        city: "Colombo",
        address: ""
    });

    // Image Handling
    const [previews, setPreviews] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Use FileReader to get base64 for local persistence simulation
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare car object
        const newCar = {
            _id: Date.now().toString(),
            title: formData.title,
            bodyType: formData.bodyType,
            images: previews.length > 0 ? previews : ["https://via.placeholder.com/600x400?text=No+Image"],
            brand: formData.brand,
            price: {
                rent: parseInt(formData.rentPrice),
                sale: formData.salePrice ? parseInt(formData.salePrice) : null
            },
            specs: {
                transmission: formData.transmission,
                fuelType: formData.fuelType,
                seats: formData.seats
            },
            odometer: formData.odometer,
            description: formData.description,
            city: formData.city,
            address: formData.address || `${formData.city}, Sri Lanka`,
            country: "Sri Lanka",
            ownerEmail: "owner@gmail.com"
        };

        // Simulate API call
        setTimeout(() => {
            // Save to LocalStorage
            const storedCars = JSON.parse(localStorage.getItem("ownerCars") || "[]");
            localStorage.setItem("ownerCars", JSON.stringify([...storedCars, newCar]));

            setIsSubmitting(false);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigate("/owner/list-car");
            }, 500);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Add New Car</h1>
                <p className="text-slate-500 mt-2">Fill in the details below to list a new vehicle in your fleet.</p>
            </div>

            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 sticky top-6 z-50 shadow-lg">
                    <span className="text-xl">✅</span>
                    <p className="font-semibold">Successfully listed new car! Redirecting to fleet...</p>
                </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                    {/* Basic Info */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">1</span>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700">Listing Title <span className="text-red-500">*</span></label>
                                <input name="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="e.g. 2023 Toyota Camry SE" required className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full transition-all" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Brand / Make</label>
                                <input name="brand" value={formData.brand} onChange={handleInputChange} type="text" placeholder="Toyota" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full transition-all" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Body Type</label>
                                <select name="bodyType" value={formData.bodyType} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full cursor-pointer">
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Hatchback</option>
                                    <option>Coupe</option>
                                    <option>Truck</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">City / Location</label>
                                <select name="city" value={formData.city} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full cursor-pointer">
                                    <option>Colombo</option>
                                    <option>Kandy</option>
                                    <option>Galle</option>
                                    <option>Matale</option>
                                    <option>Ratnapura</option>
                                    <option>Matara</option>
                                    <option>Kurunegala</option>
                                    <option>Gampaha</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Specifications */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">2</span>
                            Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Transmission</label>
                                <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full cursor-pointer">
                                    <option>Automatic</option>
                                    <option>Manual</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Fuel Type</label>
                                <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full cursor-pointer">
                                    <option>Petrol</option>
                                    <option>Diesel</option>
                                    <option>Hybrid</option>
                                    <option>Electric</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Seats</label>
                                <input name="seats" value={formData.seats} onChange={handleInputChange} type="number" placeholder="5" min="2" max="15" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full transition-all" />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-3">
                                <label className="text-sm font-semibold text-slate-700">Odometer / Mileage</label>
                                <input name="odometer" value={formData.odometer} onChange={handleInputChange} type="text" placeholder="25,000 km" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full transition-all" />
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">3</span>
                            Pricing Setup
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Rent Price (Per Day) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">Rs.</span>
                                    <input name="rentPrice" value={formData.rentPrice} onChange={handleInputChange} type="number" placeholder="5000" required className="bg-slate-50 pl-11 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full transition-all" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Sale Price (Optional)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">Rs.</span>
                                    <input name="salePrice" value={formData.salePrice} onChange={handleInputChange} type="number" placeholder="10,000,000" className="bg-slate-50 pl-11 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full transition-all" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Description & Images */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">4</span>
                            Extra Details
                        </h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Describe the condition, special features, etc..." className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full resize-none transition-all"></textarea>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Upload Images</label>

                                {/* Image Previews */}
                                {previews.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                        {previews.map((src, index) => (
                                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <label className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 hover:border-amber-500 transition-all cursor-pointer group">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform font-bold">📸</div>
                                    <span className="font-bold text-slate-700">Click to upload or drag and drop</span>
                                    <span className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF</span>
                                </label>
                            </div>
                        </div>
                    </section>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-slate-900 border border-slate-900 text-white rounded-xl py-4 px-10 text-lg font-bold flex items-center justify-center gap-3 hover:bg-slate-800 hover:shadow-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Publishing Listing...
                                </>
                            ) : (
                                "Publish Car Listing"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCar;
