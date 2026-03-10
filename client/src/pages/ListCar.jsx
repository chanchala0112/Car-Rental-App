import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dummyCars } from "../assets/data";

const ListCar = () => {
    const navigate = useNavigate();
    const [localCars, setLocalCars] = useState(JSON.parse(localStorage.getItem("ownerCars") || "[]"));

    const allCars = [...dummyCars, ...localCars];

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            const updatedLocal = localCars.filter(car => car._id !== id);
            setLocalCars(updatedLocal);
            localStorage.setItem("ownerCars", JSON.stringify(updatedLocal));

            // If it's a dummy car, we can't really "delete" it from the static file, 
            // but we could track deleted dummy IDs in localStorage too if needed.
            // For now, let's just handle local ones.
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Your Fleet</h1>
                    <p className="text-slate-500 mt-2">Manage your current active vehicle listings ({allCars.length} total).</p>
                </div>
                <Link to="/owner/add-car" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2">
                    <span>➕</span> Add New Car
                </Link>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allCars.map((car) => (
                    <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow h-full">
                        <div className="h-48 bg-slate-100 relative overflow-hidden">
                            <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm uppercase">
                                {car.bodyType}
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1 gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{car.title}</h3>
                                <p className="text-sm font-semibold text-amber-600 mt-1">Rs.{(car.price.rent).toLocaleString()}/day</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 mt-auto pt-4 border-t border-slate-100 uppercase font-bold tracking-tight">
                                <div className="flex items-center gap-1">🚥 {car.specs.transmission}</div>
                                <div className="flex items-center gap-1">⛽ {car.specs.fuelType}</div>
                                <div className="flex items-center gap-1">💺 {car.specs.seats} Seats</div>
                                <div className="flex items-center gap-1">⏱️ {car.odometer}</div>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => navigate(`/owner/edit-car/${car._id}`)}
                                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(car._id)}
                                    className="flex-1 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 py-2.5 rounded-xl text-xs font-bold transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCar;
