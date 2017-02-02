/*
 * Copyright (c) 2017 naiyu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 *     The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
"use strict";
import React from "react";
import {render} from "react-dom";

import {TodoTitle} from "./components/TodoTitle"
import {AddTodo} from "./components/AddTodo"
import {TodoList} from "./components/TodoList"

import "../main.scss"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: this.getLocalTodos() || []
        };
    }

    // add new _todo
    addTodo(newTodo) {
        this.state.todos.push(newTodo);
        this.setState({
            todos: this.state.todos
        });
        this.updateLocalTodos(this.state.todos);
    }

    // update _todo checked state
    onTodoCheckedChange(index, done) {
        if (this.state.todos[index].done == done) {
            return false;
        }
        this.state.todos[index].done = done;
        this.setState({
            todos: this.state.todos
        });
        this.updateLocalTodos(this.state.todos)
    }

    deleteTodo(index) {
        this.state.todos.splice(index, 1);
        this.setState({
            todos: this.state.todos
        });
        this.updateLocalTodos(this.state.todos)
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6 todo-container">
                    <TodoTitle/>
                    <AddTodo addTodo={(newTodo) => this.addTodo(newTodo)}/>
                    <hr/>
                    <TodoList todos={this.state.todos}
                              onDelete={(index) => this.deleteTodo(index)}
                              onTodoCheckedChange={(index, done) => this.onTodoCheckedChange(index, done)}/>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }

    /*** todo 以下数据操作的处理，要放到一个模块中 ***/
    /**
     * 获取本地保存的数据
     * @returns {*}
     */
    getLocalTodos() {
        if (!window.localStorage) {
            console.log("Your browser dose NOT support localStorage!");
            return "";
        }
        if (localStorage["React-Todo-Demo"]) {
            console.log(JSON.parse(localStorage["React-Todo-Demo"]));
            return JSON.parse(localStorage["React-Todo-Demo"]);
        } else {
            return "";
        }
    }

    /**
     * 更新本地缓存
     * @param todos
     * @returns {*}
     */
    updateLocalTodos(todos) {
        if (!window.localStorage) {
            console.log("Your browser dose NOT support localStorage!");
            return;
        }
        localStorage["React-Todo-Demo"] = JSON.stringify(todos);
    }
}

render(<App/>, window.document.getElementById("app"));