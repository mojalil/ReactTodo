var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };

            var res = reducers.searchTextReducer(df(''), df(action));
            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle show completed', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);

        });
    });

    describe('todoReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: '123',
                    text: 'Walk the dog',
                    completed: false,
                    createdAt: 12345
                }
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should update todo', () => {
            var todos = [
                {
                    id: '123',
                    text: 'Something',
                    completed: true,
                    createdAt: 123,
                    completedAt: 125
                }
            ];

            var updates = {
                completed: false,
                completedAt: null
            };

            var action = {
                type: 'UPDATE_TODO',
                id: '123',
                updates
            };
            var res = reducers.todosReducer(df(todos), df(action));

            expect(res[0].completed).toEqual(false);
            expect(res[0].completedAt).toEqual(null);
            expect(res[0].text).toEqual(todos[0].text);
        });

        it('should add existing todos', () => {

            var todos = [
                {
                    id: '111',
                    text: 'anything',
                    completed: false,
                    completedAt: undefined,
                    createdAt: 33000
                }
            ];

            var action = {
                type: 'ADD_TODOS',
                todos
            }

            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);

        });
    });

    describe('authReducer', () => {
      it('should call login', () => {
        var uid = '123';
        var action = {
          type: 'LOGIN',
          uid,
        };

        var res = reducers.authReducer(df({}), df(action));
        expect(res).toEqual({uid,});
      });

      it('should call logout', () => {
          var state = {
            uid: '123',
          };
          var action = {
            type: 'LOGOUT',
          };

          var res = reducers.authReducer(df(state), df(action));
          expect(res).toEqual({});
        });
    });



    // });

});
