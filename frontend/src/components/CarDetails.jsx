import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "../api/index";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (!token) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
          return;
        }
        const fetchedCar = await api.getCar(id, token);
        if (!fetchedCar.success) {
          toast.error(fetchedCar.message);
          navigate("/dashboard");
          return;
        }
        setCar(fetchedCar.car);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
        toast.error("Failed to load car details. Please try again.");
        navigate("/dashboard");
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        if (!token) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
          return;
        }
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const response = await api.deleteCar(id, token, userId);
        if (response.error) {
          toast.error(response.error);
          return;
        }
        toast.success("Car deleted successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to delete car:", error);
        toast.error("Failed to delete car. Please try again.");
      }
    }
  };

  if (!car) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items"></div>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex-1" />
          <button
            onClick={() => navigate(`/car/edit/${id}`, { state: { car } })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            {/* Image Container */}
            <div className="relative w-full h-0 pb-[56.25%]">
              {" "}
              {/* Aspect ratio 16:9 */}
              <img
                src={car.images[currentImageIndex]}
                alt={car.title}
                className="absolute top-0 left-0 object-cover w-full h-full"
              />
            </div>

            {/* Navigation Buttons */}
            {car.images.length > 1 && (
              <>
                {/* Left Button */}
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? car.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 w-8 h-8 flex justify-center items-center"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Right Button */}
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === car.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 w-8 h-8 flex justify-center items-center"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Car Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {car.title}
            </h1>
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">
              {car.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
