import React, { Component, useState } from "react";
import { Button } from "antd";
import Bisection from '../Bisection.js';

class UserList extends Component {

  constructor(props)
    {
        super(props);
        this.state = { 
            a : 0,
            b : 0
        };
    }

  render() {
    console.log('userlist : ',this.props);
    let renderComponent
    const { status } = this.props;
    if(status==1)
    {
      renderComponent = <Bisec  p={this.props}/>;
    }
    if(status==2)
    {
      renderComponent = <Onepoint p={this.props}/>;
    }
    if(status==3)
    {
      renderComponent = <Secant p={this.props}/>;
    }
    if(status==4)
    {
      const { A,B } = this.props;
      renderComponent = <Cramerrule  p={this.props}/>;
    }
    if(status==5)
    {
      renderComponent = <Jacobiiteration p={this.props}/>;
    }
    if(status==6||status==12){
      const { X,FX,SIZE } = this.props;
      renderComponent = <Polynomialregression x={X} fx={FX} size={SIZE}/>;
    }
    if(status==7||status==8){
      const { X,FX } = this.props;
      renderComponent = <LinearregressionSpline x={X} fx={FX}/>;
    }
    if(status==9||status==10){
      renderComponent = <TrapezoidalsimpsonRule p={this.props}/>;
    }
    if(status==11){
      renderComponent = <Lagrange p={this.props}/>;
    }
    if(status==13){
      renderComponent = <Forward p={this.props}/>;
    }

    
    return (
      <div>
          {renderComponent}
      </div>
    );
  }
}

function Bisec(props) {
   var send = () => {
    window.$xr = parseFloat(props.p.XR);
    window.$xl = parseFloat(props.p.XL);
    window.$fx = props.p.fx;
  }
  return(
      <div>
        <button onClick={send}>XR : {props.p.XR} XL : {props.p.XL} <br/> FX : {props.p.fx}</button>
      </div>
  )
}

function Onepoint(props) {
  var send = () => {
    window.$xold = parseFloat(props.p.Xold);
    window.$fx = props.p.fx;
  }
  return(
      <div>
        <button onClick={send}>Xold : {props.p.Xold} <br/> FX : {props.p.fx}</button>
      </div>
  )
}

function Secant(props) {
  var send = () => {
   window.$xold = parseFloat(props.p.Xold);
   window.$xnew = parseFloat(props.p.Xnew);
   window.$fx = props.p.fx;
 }
 return(
     <div>
       <button onClick={send}>Xold : {props.p.Xold} Xnew : {props.p.Xnew} <br/> FX : {props.p.fx}</button>
     </div>
 )
}

function Cramerrule(props) {
  var send = () => {
  window.$A = props.p.A.slice();
  window.$B = props.p.B.slice();
 }
 return(
     <div>
       {/* <button onClick={send}>A : {props.a} B : {props.b}</button> */}
       <button onClick={send}><Showmetrix2 A={props.p.A} B={props.p.B}/></button>
     </div>
 )
}

function Jacobiiteration(props) {
  var send = () => {
  window.$A4 = props.p.A.slice();
  window.$B4 = props.p.B.slice();
  window.$xold4 = props.p.X.slice();
  window.$size = props.p.SIZE
 }
 return(
     <div>
       <button onClick={send}><Showmetrix3 A={props.p.A} B={props.p.B} X={props.p.X}/></button>
     </div>
 )
}

function Polynomialregression(props) {
  var send = () => {
  window.$sx = props.x
  window.$sfx = props.fx
  window.$size = props.size
 }
 return(
     <div>
       <button onClick={send}>X : {props.x} <br/>FX : {props.fx} <br/>SIZE : {props.size}</button>
     </div>
 )
}

function LinearregressionSpline(props) {
  var send = () => {
  window.$sx = props.x
  window.$sfx = props.fx
 }
 return(
     <div>
       <button onClick={send}>X : {props.x} <br/>FX : {props.fx}</button>
     </div>
 )
}

function TrapezoidalsimpsonRule(props) {
  var send = () => {
  window.$fx = props.p.fx
  window.$range = props.p.range
  window.$start = props.p.start
  window.$stop = props.p.stop
 }
 return(
     <div>
       <button onClick={send}>fx : {props.p.fx} <br/>range : {props.p.range} <br/>start : {props.p.start} stop : {props.p.stop}</button>
     </div>
 )
}

function Lagrange(props) {
  var send = () => {
  window.$sx = props.p.X
  window.$sfx = props.p.FX
  window.$size = props.p.POINT
  window.$x = props.p.x
 }
 return(
     <div>
       <button onClick={send}>X : {props.p.X} <br/>FX : {props.p.FX} <br/>POINT : {props.p.POINT} <br/>x : {props.p.x}</button>
     </div>
 )
}

function Forward(props) {
  var send = () => {
  window.$h = props.p.h
  window.$fx = props.p.fx
  window.$x = props.p.x
 }
 return(
     <div>
       <button onClick={send}>FX : {props.p.fx} <br/>X : {props.p.x} <br/>h : {props.p.h}</button>
     </div>
 )
}

function Showmetrix3(props) {

  var createHA = (i) => {
    console.log("in HA")
    var size = props.A.length
    var H =[]
    for(let j=0 ; j<size ; j++){
      console.log("A ca : " + props.A[i][j])
      H.push(<h1>{props.A[i][j]} </h1>)
    }
    return H
  }

  var createShowA = () => {
    console.log("in showA")
    var size = props.A.length
    var show = []
    for(var i=0 ; i<size ; i++ ){
      var h = createHA(i)
      show.push(<div>{h}</div>)
      var h = []
    }
    return show
  }

  var createShowB = () => {
    console.log("in showB")
    var size = props.B.length
    var show = []
    for(var i=0 ; i<size ; i++ ){
        show.push(<h1>{props.B[i]} </h1>)
    }
    return <div>{show}</div>
  }

  var createShowX = () => {
    console.log("in showB")
    var size = props.X.length
    var show = []
    for(var i=0 ; i<size ; i++ ){
        show.push(<h1>{props.X[i]} </h1>)
    }
    return <div>{show}</div>
  }

  return(
    <div className="divbutton">
      <h1>A</h1>
      {createShowA()}
      <h1>B</h1>
      {createShowB()}
      <h1>X</h1>
      {createShowX()}
    </div>
  )
}

function Showmetrix2(props) {

  var createHA = (i) => {
    console.log("in HA")
    var size = props.A.length
    var H =[]
    for(let j=0 ; j<size ; j++){
      console.log("A ca : " + props.A[i][j])
      H.push(<h1>{props.A[i][j]} </h1>)
    }
    return H
  }

  var createShowA = () => {
    console.log("in showA")
    var size = props.A.length
    var show = []
    for(var i=0 ; i<size ; i++ ){
      var h = createHA(i)
      show.push(<div>{h}</div>)
      var h = []
    }
    return show
  }

  var createShowB = () => {
    console.log("in showB")
    var size = props.B.length
    var show = []
    for(var i=0 ; i<size ; i++ ){
        show.push(<h1>{props.B[i]} </h1>)
    }
    return <div>{show}</div>
  }

  return(
    <div className="divbutton">
      <h1>A</h1>
      {createShowA()}
      <h1>B</h1>
      {createShowB()}
    </div>
  )
}

export default UserList;
