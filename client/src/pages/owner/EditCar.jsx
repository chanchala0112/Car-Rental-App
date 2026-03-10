import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyCars } from "../../assets/data";

const EditCar = () => {
    const { id } = useParams();
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
        city: "Colombo"
    });

    const [previews, setPreviews] = useState([]);

    // Load car data on mount
    useEffect(() => {
        const localCars = JSON.parse(localStorage.getItem("ownerCars") || "[]");
        const car = [...dummyCars, ...localCars].find(c => c._id === id);

        if (car) {
            setFormData({
                title: car.title,
                brand: car.brand || "",
                bodyType: car.bodyType || "Sedan",
                transmission: car.specs?.transmission || "Automatic",
                fuelType: car.specs?.fuelType || "Petrol",
                seats: car.specs?.seats || "5",
                odometer: car.odometer || "",
                rentPrice: car.price?.rent || "",
                salePrice: car.price?.sale || "",
                description: car.description || "",
                city: car.city || "Colombo"
            });
            setPreviews(car.images || []);
        } else {
            navigate("/owner/list-car");
        }
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

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

        const updatedCar = {
            _id: id,
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

        setTimeout(() => {
            const localCars = JSON.parse(localStorage.getItem("ownerCars") || "[]");
            // If it's a local car, update it. If it was a dummy car, it becomes a "local" override now.
            const filteredLocal = localCars.filter(c => c._id !== id);
            localStorage.setItem("ownerCars", JSON.stringify([...filteredLocal, updatedCar]));

            setIsSubmitting(false);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigate("/owner/list-car");
            }, 1000);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-20">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Edit Car Listing</h1>
                <p className="text-slate-500 mt-2">Update the details for this vehicle in your fleet.</p>
            </div>

            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg">
                    <span className="text-xl">✅</span>
                    <p className="font-semibold">Successfully updated car listing!</p>
                </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">1</span>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700">Listing Title</label>
                                <input name="title" value={formData.title} onChange={handleInputChange} type="text" required className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Brand / Make</label>
                                <input name="brand" value={formData.brand} onChange={handleInputChange} type="text" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Body Type</label>
                                <select name="bodyType" value={formData.bodyType} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full">
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Hatchback</option>
                                    <option>Coupe</option>
                                    <option>Truck</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">City / Location</label>
                                <select name="city" value={formData.city} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full">
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

                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">2</span>
                            Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Transmission</label>
                                <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full">
                                    <option>Automatic</option>
                                    <option>Manual</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Fuel Type</label>
                                <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full">
                                    <option>Petrol</option>
                                    <option>Diesel</option>
                                    <option>Hybrid</option>
                                    <option>Electric</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Seats</label>
                                <input name="seats" value={formData.seats} onChange={handleInputChange} type="number" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">3</span>
                            Pricing Setup
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Rent Price (Per Day)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">Rs.</span>
                                    <input name="rentPrice" value={formData.rentPrice} onChange={handleInputChange} type="number" required className="bg-slate-50 pl-11 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 w-full" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold">4</span>
                            Media
                        </h3>
                        <div className="flex flex-col gap-5">
                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                    {previews.map((src, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flexCenter text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <label className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all">
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                                <span className="font-bold text-slate-700">Add More Photos</span>
                            </label>
                        </div>
                    </section>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" onClick={() => navigate("/owner/list-car")} className="px-8 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white rounded-xl py-3 px-10 font-bold hover:bg-slate-800 transition-all flexCenter gap-2">
                            {isSubmitting ? "Updating..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditCar;
