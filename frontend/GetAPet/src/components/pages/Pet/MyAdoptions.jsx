import styles from "./Dashboard.module.css";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import RoundedImage from "../../layout/RoundedImage/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas adocoes</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImage
                src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p><span className="bold">Ligue para: </span>{pet.user.phone}</p>
                <p><span className="bold">Fale com: </span>{pet.user.name}</p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adocao em processo</p>
                ) : (
                  <p>Parabens por concluir a adocao</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda nao ha adocoes de Pets.</p>}
      </div>
    </section>
  );
}

export default MyAdoptions;
