import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de react-toastify
import Navbar from '../components/Navbar';
import { fetchFoodTrucks } from '../services/foodTruckService';

const ResaPage = () => {

  const notify = () => toast("Wow so easy!");

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    notify(); // Affiche la notification
  };

  const [foodTrucks, setFoodTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoodTrucks = async () => {
      try {
        const data = await fetchFoodTrucks();
        setFoodTrucks(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };
    getFoodTrucks();   
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }
  if (!foodTrucks) {
    return <p>Aucun food truck disponible pour le moment.</p>;
  }

  const currentDay = new Date().toLocaleString('fr-FR', { weekday: 'long' });
  let today = null;

  foodTrucks.forEach((truck) => {
    if(truck.day_of_week == currentDay){
      today = truck;
    }
  })
  const results = [];

  {today.menu_items.forEach((menu) => {
    results.push(
      <option value={menu.item_name}>{menu.item_name}</option>
    )
  })}
  
  return (
    <div>
      <Navbar />
      <div className={" justify-center p-8 mx-auto bg-white card w-96 shadow-xl flex gap-2 my-8"}>
        <h1 className="text-2xl text-black ">Page de réservation :</h1>
        <h2 className="text-xl text-black font-extrabold">- {today.name} - </h2>
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
            <input type="text" className="grow text-black" placeholder="Email" id='email' />
          </label>
          <label htmlFor="address" className={"text-black text-xl"}>Date de réservation :</label>

          <label className="input input-bordered flex items-center gap-2 bg-gray-100">

            <input type="date" className="grow text-black"  placeholder="Date" />
          </label>
          <label htmlFor="address" className={"text-black text-xl"}>Heure de réservation :</label>

          <label className="input input-bordered flex items-center gap-2 bg-gray-100">

            <input type="time" className="grow text-black"  placeholder="Date" />
          </label>
          <label htmlFor="address" className={"text-black text-xl"}>Choix du menu :</label>

          {/*drop down menu */}
          <label className="input input-bordered flex bg-gray-100">
            <select className="grow w-full bg-gray-100 text-black">
              {results}
            </select>
          </label>
          <button className="btn btn-primary mt-4 text-white" type="submit">Réserver</button>
        </form>
      </div>
    </div>

  );
};

export default ResaPage;
