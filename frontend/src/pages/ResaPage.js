import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de react-toastify
import '../styles/ResaPage.css';

const HomePage = () => { 

  const notify = () => toast("Wow so easy!");

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    notify(); // Affiche la notification
  };

  

  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <h3>Page de réservation : Burger Express</h3>

                          <form onSubmit={handleSubmit}>
                            <label htmlFor="address">Adresse email SDV :</label>
                            <input type="email" id="address" name="address" required />

                            <label htmlFor="date">Date de réservation :</label>
                            <input type="date" id="date" name="date" required />

                            <label htmlFor="time">Heure de réservation :</label>
                            <input type="time" id="time" name="time" required />

                            <label htmlFor="food_truck">Food truck :</label>
                            <select id="food_truck" name="food_truck" required>
                              <option value="food_truck1">Food truck 1</option>
                              <option value="food_truck2">Food truck 2</option>
                              <option value="food_truck3">Food truck 3</option>
                              <option value="food_truck4">Food truck 4</option>
                              <option value="food_truck5">Food truck 5</option>
                            </select>
                            
                            <button type="submit" style={{
                                backgroundColor: 'blue',
                            }}>Réserver</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
