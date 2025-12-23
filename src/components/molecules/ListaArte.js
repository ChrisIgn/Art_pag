import React from 'react';
import ItemLista from './ItemLista'; 

const ListaArte = ({ art }) => {
  return (
    <div>
      <h2>Artículos: </h2>
      <ul>
        {
          art.map((item, indice) => (
            <ItemLista key={indice} texto={item} />
          ))
        }
      </ul>
    </div>
  );
};

export default ListaArte;