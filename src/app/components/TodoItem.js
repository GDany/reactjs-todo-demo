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

export class TodoItem extends React.Component {

    handlerChange() {
        let isDone = !this.props.todo.done;
        this.props.onTodoCheckedChange(this.props.index, isDone);
    }

    handleMouseOver() {
        findDOMNode(this.refs.btnDel).style.display = "inline";
    }

    onDeleteClick() {
        this.props.onDelete(this.props.index);
    }

    handleMouseOut() {
        findDOMNode(this.refs.btnDel).style.display = "none";
    }

    render() {
        let doneSytle = this.props.todo.done ? {textDecoration: "line-through"} : {textDecoration: "none"};
        return (
            <li className="list-group-item"
                onMouseOver={() => this.handleMouseOver()}
                onMouseOut={() => this.handleMouseOut()}>
                <div className="todo-checkbox-item checkbox">
                    <label>
                        <input type="checkbox"
                               checked={this.props.todo.done}
                               onChange={() => this.handlerChange()}/>
                        <span style={doneSytle}>{this.props.todo.content}</span>
                    </label>
                    <button ref="btnDel" onClick={() => this.onDeleteClick()} className="todo-delete btn btn-primary"
                            style={{"display": "none"}}>delete
                    </button>
                </div>
            </li>
        );
    }
}