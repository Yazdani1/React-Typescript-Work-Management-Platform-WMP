import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
//Custom
import style from './HomeRental.module.scss';
import CardLayout from '../../components/CardLayout';
import { HomeRentalItems } from '../../Dataprovider';

interface HomeRentalCardProps {
  homerental: HomeRentalItems;
}

const HomeRentalCard: FC<HomeRentalCardProps> = ({ homerental }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleNext = () => {
    setCurrentImage((currentImage + 1) % homerental.photo.length);
  };

  return (
    <CardLayout backgroun_color="white">
      <div>
        <Link to={'/home-rental-details/' + homerental._id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h4>{homerental.title}</h4>
          <p>{homerental.des}</p>
          <h3>{homerental.price}</h3>
          <p>{homerental.room}</p>
        </Link>

        <img src={homerental.photo[currentImage]} height="250px" width="350px" />
        <div className={style.dots}>
          {homerental.photo.map((_, index) => (
            <span key={index} className={index === currentImage ? style.active : style.dot} onClick={handleNext}></span>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </CardLayout>
  );
};

export default HomeRentalCard;
