import React, { useState } from 'react';
import Header from '../Header'; // Asegúrate de importar correctamente
import Home from '../../Home'; // Asegúrate de importar correctamente

const ParentComponent: React.FC = () => {
  const [photo, setPhoto] = useState<string>("/img/FOTO.jpg");

  const handleUpdatePhoto = (formData: { photo: string }) => {
    setPhoto(formData.photo); // Actualiza el estado de la foto
  };

  return (
    <div>
      {/* Asegúrate de pasar la función handleUpdatePhoto correctamente */}
      <Header handleUpdatePhoto={handleUpdatePhoto} photo={photo} />
      <Home handleUpdatePhoto={handleUpdatePhoto} photo={photo} />
    </div>
  );
};

export default ParentComponent;
