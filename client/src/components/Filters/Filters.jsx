// import React from 'react';
import style from './Filters.module.css';

const Filters = ({
  handleFilterByOrigin,
  handleFilterByType,
  handleSort,
  order,
  allTypes,
}) => {
  return (
    <div className={style.filtersContainer}>
      <div className={style.originFilter}>
        <select defaultValue={'default'} onChange={(e) => handleFilterByOrigin(e)}>
          <option value={'default'} hidden>
            Origin
          </option>
          <option value="All">All</option>
          <option value="PokeAPI">PokeAPI</option>
          <option value="Created">Created</option>
        </select>
      </div>

      <div className={style.typeFilter}>
        <select defaultValue={'default'} onChange={(e) => handleFilterByType(e)}>
          <option value={'default'} hidden>
            Type
          </option>
          <option value="All">All</option>
          {allTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className={style.sortFilter}>
        <select defaultValue={'default'} onChange={(e) => handleSort(e)}>
          <option value={'default'} hidden>
            Order
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Ʌ Attack">+ Attack</option>
          <option value="V Attack">- Attack</option>
          <option value="id">ID</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
