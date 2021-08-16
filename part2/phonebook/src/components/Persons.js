import React from 'react';

export default function Persons({ persons, search, onDeletePerson }) {
  return (
    <div>
      {persons &&
        persons
          .filter((x) => x.name?.toLowerCase().includes(search?.toLowerCase()))
          .map((item) => (
            <p key={item.id}>
              {item.name} {item.number} &nbsp;
              <button onClick={() => onDeletePerson(item)}>Delete</button>
            </p>
          ))}
    </div>
  );
}
