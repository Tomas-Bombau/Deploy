//assets
import scotch from "../../assets/scotch.png";
//Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//Components and Functions
import { getDogById } from "../../Redux/Actions/actions";

//CSS
import css from "./Detail.module.css";
import Errors from "../../Components/Errors/Errors";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const detailId = params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [errorID, setErrorId] = useState("");

  useEffect(() => {
    dispatch(getDogById(detailId))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setErrorId(error.message);
        setLoading(false);
      });
  }, [detailId, dispatch]);

  const dogId = useSelector((state) => state?.dogId);

  const goBack = () => {
    navigate(-1);
  };

  if (detailId.length === 36) {
    dogId.id = "Nueva Raza";
  }

  if (loading) {
    return <div> </div>;
  }

  if (errorID) {
    return <Errors error={errorID} />;
  }

  return (
    <section className={css.background}>
      <div className={css.dogDetail}>
        <img src={scotch} className={css.scotch} alt="scotch" />
        <div className={css.img}>
          <img src={dogId.reference_image_id} alt="dog" />
        </div>
        <div className={css.dogInformation}>
          <div className={css.dogInfo}>
            <h2>
              {dogId?.id} - {dogId?.name}
            </h2>
            <p className={css.esperanzaDeVida}>
              {" "}
              <span>Esperanza de vida promedio: </span>
              {dogId?.life_span}
            </p>
            <div className={css.hywInformation}>
              <p>
                <span>Altura min:</span> {dogId?.heightMin} cm -{" "}
                <span>Altura max:</span> {dogId?.heightMax} cm
              </p>
              <p>
                <span>Peso min:</span> {dogId?.weightMin} kg -{" "}
                <span>Peso max:</span> {dogId?.weightMax} kg
              </p>
            </div>
            <p className={css.temperamentsInformation}>
              {dogId.temperaments?.map((temperament, index) => (
                <span key={index}> {temperament} </span>
              ))}
            </p>
            <button onClick={goBack}> Volver atrás </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
