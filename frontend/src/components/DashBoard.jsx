// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search } from 'lucide-react';

// const Dashboard = () => {
//   const [cars, setCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   useEffect(() => {
//     // Fetch cars data
//     // setCars(fetchedCars);
//   }, []);

//   const filteredCars = cars.filter(car =>
//     car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">My Cars</h1>
//           <Link
//             to="/car/new"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Add New Car
//           </Link>
//         </div>
        
//         <div className="relative mb-6">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search cars..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCars.map(car => (
//             <Link
//               key={car.id}
//               to={`/car/${car.id}`}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
//             >
//               <div className="aspect-w-16 aspect-h-9">
//                 <img
//                   src={car.images[0]}
//                   alt={car.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.title}</h3>
//                 <p className="text-gray-600 line-clamp-2 mb-2">{car.description}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {car.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserCircle, LogOut, Plus, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cars data
    // setCars(fetchedCars);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" >
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                CarManager<span className="text-blue-600">Pro</span>
              </h1>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <UserCircle className="h-8 w-8 text-gray-600" />
                <div className="text-sm text-right">
                  {/* <p className="font-medium text-gray-900">{user?.username}</p> */}
                  <p className="text-gray-500 truncate max-w-[150px]">{user?.username}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500 break-all">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12" onClick={() => setShowUserMenu(false)}>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Cars</h2>
            <p className="text-gray-500 mt-1">Manage and track your vehicle collection</p>
          </div>
          <Link
            to="/car/new"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Car</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition duration-200">
                  {car.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{car.description}</p>
                <div className="flex flex-wrap gap-2">
                  {car.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {filteredCars.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first car'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;