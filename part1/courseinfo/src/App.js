import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({
  part1,
  exercises1,
  part2,
  exercises2,
  part3,
  exercises3,
}) => (
  <>
    <Part part={part1} exercises={exercises1} />
    <Part part={part2} exercises={exercises2} />
    <Part part={part3} exercises={exercises3} />
  </>
);

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  const sum = course.parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((item, index) => (
        <Part key={index} part={item} />
      ))}
      <Total sum={sum} />
    </div>
  );
};

export default App;
