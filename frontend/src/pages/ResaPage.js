import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de react-toastify
import Navbar from '../components/Navbar';

const HomePage = () => {

  const notify = () => toast("Wow so easy!");

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    notify(); // Affiche la notification
  };



  return (

    <div className={"bg-white h-screen w-screen"}>
       <Navbar />
      <div className={" justify-center p-8 mx-auto bg-white card bg-base-100 w-96 shadow-xl flex gap-2"}>
        <h1 className="text-2xl text-black ">Page de réservation :</h1>
        <h1 className="text-xl text-black underline">Burger Express</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>



          <label htmlFor="address" className={"text-black text-xl"}>Adresse email SDV :</label>
          <label className="input input-bordered flex items-center gap-2 bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" id='email' />
          </label>
          <label htmlFor="address" className={"text-black text-xl"}>Date de réservation :</label>

          <label className="input input-bordered flex items-center gap-2 bg-gray-100">

            <input type="date" className="grow" placeholder="Date" />
          </label>
          <label htmlFor="address" className={"text-black text-xl"}>Heure de réservation :</label>

          <label className="input input-bordered flex items-center gap-2 bg-gray-100">

            <input type="time" className="grow" placeholder="Date" />
          </label>
          <label htmlFor="address" className={"text-black text-xl"}>Choix du foodtruck :</label>


          {/*drop down menu */}
          <label className="input input-bordered flex bg-gray-100">

            <select className="grow w-full bg-gray-100">
              <option value="foodtruck 1">Foodtruck 1</option>
              <option value="foodtruck 2">Foodtruck 2</option>
              <option value="foodtruck 3">Foodtruck 3</option>
              <option value="foodtruck 4">Foodtruck 4</option>
              <option value="foodtruck 5">Foodtruck 5</option>
              <option value="foodtruck 6">Foodtruck 6</option>
              <option value="foodtruck 7">Foodtruck 7</option>
            </select>


          </label>





          <button className="btn btn-primary mt-4" type="submit">Réserver</button>
        </form>
      </div>
    </div>

  );
};

export default HomePage;
