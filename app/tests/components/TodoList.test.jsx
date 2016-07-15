var React = require('react');
var ReactDom = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var ConnectedTodoList, {TodoList} from 'TodoList';
var Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one todo component for each todo item', () => {
    var todos = [
    {
      id: 1,
      text: 'Do something',
    },
    {
      id: 2,
      text: 'Check now',
    },
  ];

  var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}></TodoList>)
  var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

  expect(todosComponents.length).toBe(todos.length);

  })

  it('should render empty message if no todos', () => {
    var todos = [];

  var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}></TodoList>)
  var $el =$(ReactDom.findDOMNode(todoList));
  expect($el.find('.container__message').length).toBe(1);

  })

});
