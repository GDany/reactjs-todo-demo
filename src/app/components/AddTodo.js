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
import {render, findDOMNode} from "react-dom";

export class AddTodo extends React.Component {

    addTodo(content) {
        // add the new atodo to the atodo list and save.
        let newTodo = {
            content: content,
            done: false
        };
        this.props.addTodo(newTodo);
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            let value = event.target.value;
            if (!value) return false;
            this.addTodo(value);
            event.target.value = "";
        }
    }

    onAddClick() {
        let newTodoContent = findDOMNode(this.refs.newTodoContent).value;
        if (newTodoContent.trim() === "") {
            return false;
        }
        this.addTodo(newTodoContent);
        findDOMNode(this.refs.newTodoContent).value = "";
    }

    render() {
        return (
            <div className="input-group">
                <input onKeyUp={(event) => this.handleKeyUp(event)} ref="newTodoContent" type="text"
                       className="form-control" placeholder="What's your todo ?"/>
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={ () => this.onAddClick()}>add</button>
                </span>
            </div>
        );
    }
}