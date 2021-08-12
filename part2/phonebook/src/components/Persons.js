import React from 'react';

export default function Persons({ persons, search }) {
  return (
    <div>
      {persons &&
        persons
          .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <p>
              {item.name} {item.number}
            </p>
          ))}
    </div>
  );
}
