import $ from 'jquery';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const node = document.getElementById('inpReact');

function Example() {
  return (
    <div>Вывод для примера</div>
  )
}

ReactDOM.render(
  <Example />,
  node
)