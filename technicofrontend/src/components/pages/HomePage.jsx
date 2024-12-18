import React from "react";
import { Link } from "react-router-dom";
import PropertiesLogo from "../../assets/management.png";
import RepairsLogo from "../../assets/tools.png";
import ProfileLogo from "../../assets/user_my.png";
import "./HomePage.css";

function HomePage() {
  const userId = localStorage.getItem("userId");

  return (
    <div className="homepage-container">
      <h1>Τι ψάχνετε σήμερα;</h1>
      <div className="section">
        <div className="card">
          <img src={ProfileLogo} alt="Προφίλ Χρήστη" className="logo" />
          <Link to="/profile" className="button">
            Προφίλ Χρήστη
          </Link>
          <p className="description">
            Δείτε τα τρέχοντα repairs, properties και τα στοιχεία του προφίλ
            σας.
          </p>
        </div>
        <div className="card">
          <img
            src={PropertiesLogo}
            alt="Προσθήκη Ιδιοκτησίας"
            className="logo"
          />
          <Link to={`/properties/${userId}`} className="button">
            Προσθήκη Ιδιοκτησίας
          </Link>
          <p className="description">
            Εδώ μπορείτε να δείτε, να προσθέσετε και να διαχειριστείτε τις
            ιδιοκτησίες σας εύκολα, όλα σε ένα μέρος.
          </p>
        </div>
        <div className="card">
          <img src={RepairsLogo} alt="Προσθήκη Επισκευής" className="logo" />
          <Link to={`/repairs/${userId}`} className="button">
            Προσθήκη Επισκευής
          </Link>
          <p className="description">
            Παρακολουθήστε και οργανώστε τις επισκευές των ιδιοκτησιών σας με
            λεπτομερή εργαλεία διαχείρισης.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
