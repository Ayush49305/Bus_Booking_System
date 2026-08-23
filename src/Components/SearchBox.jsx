// import React from 'react'

// const SearchBar = () => {
//   return (
//     <div className='realtive bg-white rounded-lg p-7'>
//         <div className='grid grid-cols-2 gap-4'>

//             <div>
//                 <label className='block text-sm text-gray-500 mb-2'>
//                     From
//                 </label>

//                 <select className="">
//                     <option>Delhi</option>
//                     <option>Mumbai</option>
//                     <option>Kolkata</option>
//                     <option>Banglore</option>
//                 </select>
//             </div>

//         </div>
      
//     </div>
//   )
// }

// export default SearchBar

import React from "react";

const SearchBox = () => {
  return (
    
    <div className="absolute z-10 top-1/2 left-[1%] -translate-y-1/2 w-[80%] max-w-xl border border-gray-500 p-5 rounded-lg">

      {/* From and To */}
      <div className="grid grid-cols-2 gap-4">

        {/* From */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">
            From
          </label>

          <select className="w-full border border-gray-500 rounded-md px-4 py-3 outline-none focus:border-green-500">
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Bangalore</option>
          </select>
        </div>


        {/* To */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">
            To
          </label>

          <select className="w-full border border-gray-500 rounded-md px-4 py-3 outline-none focus:border-green-500">
            <option>Jaipur</option>
            <option>Pune</option>
            <option>Agra</option>
            <option>Hyderabad</option>
          </select>
        </div>

      </div>


      {/* Date */}
      <div className="mt-5">

        <label className="block text-sm text-gray-500 mb-2">
          Journey Date
        </label>

        <input
          type="date"
          className="w-full border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-green-500"
        />

      </div>


      {/* Button */}
      <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold">
        SEARCH BUSES
      </button>

    </div>
    
  );
};

export default SearchBox;
