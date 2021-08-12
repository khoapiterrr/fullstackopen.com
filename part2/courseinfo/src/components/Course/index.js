import React from 'react';
import Content from './Content';
import Header from './Header';
export default function Course({ course }) {
  const sum = course.parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <b>Number of exercises {sum}</b>
    </div>
  );
}
