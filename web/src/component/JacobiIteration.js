import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'

window.$arr_iteration = []
window.$arr_x1 = []
window.$arr_x2 = []
window.$arr_x3 = []
window.$arr_x4 = []
window.$arr_errorX1 = []
window.$arr_errorX2 = []
window.$arr_errorX3 = []
window.$arr_errorX4 = []
window.$A4=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
window.$B4=[0,0,0,0]
window.$xold4=[]
window.$xnew4=[]

class JacobiIteration extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            update: 0
        };
      }

    JacobiIteration = () => {
        var size = parseInt(window.$size)
        var checkerror = true
        window.$arr_iteration = []
        window.$arr_x = [...Array(size)].map(e => Array(0))
        // window.$arr_x2 = []
        // window.$arr_x3 = []
        // window.$arr_x4 = []
        window.$arr_error = [...Array(size)].map(e => Array(0))
        // window.$arr_errorX2 = []
        // window.$arr_errorX3 = []
        // window.$arr_errorX4 = []
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new)
        var iteration = 0
        while(iteration<1 || checkerror == true){
            if(iteration>0){
                window.$xold4=window.$xnew4.slice()
            }
            for(var i=0;i<window.$A4.length;i++){
                window.$xnew4[i]= parseInt(window.$B4[i]).toFixed(6)
                for(var j=0;j<window.$A4.length;j++){
                    if(i!=j){
                        window.$xnew4[i]-=(window.$A4[i][j]*window.$xold4[j])
                        window.$xnew4[i] = window.$xnew4[i] .toFixed(6)
                    }
                }
                window.$xnew4[i]=window.$xnew4[i]/window.$A4[i][i]
                console.log("x"+(i+1)+"="+window.$xnew4[i].toFixed(6))
                window.$arr_x[i].push(window.$xnew4[i].toFixed(6))
                console.log("xold : " + window.$xold4[i])
                console.log("error : " + error(window.$xnew4[i],window.$xold4[i]).toFixed(6))
                window.$arr_error[i].push(error(window.$xnew4[i],window.$xold4[i]).toFixed(6))
                if(error(window.$xnew4[i],window.$xold4[i])<0.00001) checkerror = false
            }
            // window.$arr_errorX1.push(error(window.$xnew4[0],window.$xold4[0]).toFixed(6))
            // window.$arr_errorX2.push(error(window.$xnew4[1],window.$xold4[1]).toFixed(6))
            // window.$arr_errorX3.push(error(window.$xnew4[2],window.$xold4[2]).toFixed(6))
            // window.$arr_errorX4.push(error(window.$xnew4[3],window.$xold4[3]).toFixed(6))
            window.$arr_iteration.push(iteration)
            iteration++
        }
        this.setState({update: this.state.update++});
      }

      createTH = () => {
        if(this.state.update == 0) return 
        let TH = []
        for (let i = 1; i <= window.$size*2; i++) {
          if(i != window.$size*2 && i <= window.$size ){
            TH.push(<th>x{i}</th>,)
          }else if(i != window.$size*2 && i > window.$size){
            TH.push(<th>errorX{i-(window.$size)}</th>,)
          }else if(i == window.$size*2 ) TH.push(<th>errorX{i-(window.$size)}</th>)
        }
        return TH
      }

      createTD = (j) => {
        if(this.state.update == 0) return 
        let TD = []
        for (let i = 0; i < window.$size*2; i++) {
          if(i != (window.$size*2)-1 && i < window.$size ){
            TD.push(<td>{window.$arr_x[i][j]}</td>,)
          }else if(i != (window.$size*2)-1 && i >= window.$size){
            TD.push(<td>{window.$arr_error[i-(window.$size)][j]}</td>,)
          }else if(i == (window.$size*2)-1 ) {
            TD.push(<td>{window.$arr_error[i-(window.$size)][j]}</td>)
          }
        }
        return TD
      }

      createTable = () => {
        let table = []
        for (let i = -1; i < window.$arr_iteration.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>iteration</th>,
                this.createTH()
                )
          }else{
            children.push(
                <td>{window.$arr_iteration[i]}</td>,
                this.createTD(i)
                )
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      }

      createHA = (i) => {
        var size = window.$A4.length
        var H =[]
        for(let j=0 ; j<size ; j++){
          H.push(<h1>{window.$A4[i][j]} </h1>)
        }
        return H
      }

      createShowA = () => {
        if(this.state.update == 0) return 
        var size = window.$A4.length
        var show = []
        for(var i=0 ; i<size ; i++ ){
          var h = this.createHA(i)
          show.push(<div>{h}</div>)
          var h = []
        }
        return show
      }

      createShowB = () => {
        if(this.state.update == 0) return 
        var size = window.$B4.length
        var show = []
        for(var i=0 ; i<size ; i++ ){
            show.push(<h1>{window.$B4[i]} </h1>)
        }
        return <div>{show}</div>
      }

      createShowX = () => {
        if(this.state.update == 0) return 
        var size = window.$xold4.length
        var show = []
        for(var i=0 ; i<size ; i++ ) show.push(<h1>{window.$xold4[i]} </h1>)
        return <div>{show}</div>
      }

      handleChangeA(i,j,e) {
        window.$A4[i][j] = e.target.value
        if(window.$A4[i][j] == []) window.$A4[i][j] = 0
        this.setState({update: 1});
      }

    createInputA = () => {
        if(window.$size == []) window.$size = 0
        var size = parseInt(window.$size)
        if(this.state.update == 0){
          var value = 0
          window.$A4 = [...Array(size)].map(e => Array(size).fill(value))
        }
        let input = []
        for(var i=0 ; i<size ; i++){
            for(var j=0 ; j<size ; j++){
                input.push(<input onChange={this.handleChangeA.bind(this, i ,j)}/>)
            }
            input.push(<br/>)
        }
        return input
    }

    handleChangeB(i,e) {
      if(window.$B4[i] == []) window.$B4[i] = 0
      window.$B4[i] = e.target.value
      if(window.$B4[i] == []) window.$B4[i] = 0
      this.setState({update: 1});
    }

  createInputB = () => {
      if(window.$size == []) window.$size = 0
      var size = parseInt(window.$size)
      if(this.state.update == 0){
        var value = 0
        window.$B4 = Array(size).fill(value)
      }
      let input = []
      for(var i=0 ; i<size ; i++){ 
        input.push(<input onChange={this.handleChangeB.bind(this, i)}/>)
      }
      return input
  }

  handleChangeX(i,e) {
    if(window.$xold4[i] == []) window.$xold4[i] = 0
    window.$xold4[i] = e.target.value
    this.setState({update: 1});
  }

createInputX = () => {
    if(window.$size == []) window.$size = 0
    var size = parseInt(window.$size)
    if(this.state.update == 0) {
      window.$xold4 = Array(size).fill(0)
      window.$xnew4 = Array(size).fill(0)
    }
    let input = []
    for(var i=0 ; i<size ; i++) input.push(<input onChange={this.handleChangeX.bind(this, i)}/>)
    return input
}
    
    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showJacobiiteration").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$arr_iteration = []
            window.$arr_x = []
            window.$arr_errorX = []
            window.$A4=[]
            window.$B4=[]
            window.$xold4=[]
            window.$xnew4=[]
    }

    re = (event) => {
      this.setState({update: 1});
    }

    render()
    {
        var graphX = []
        var graphError = []

        for(var i=0; i<window.$arr_x.length; i++){
          var X = {
            x: window.$arr_iteration,
            y: window.$arr_x[i],
            mode: 'lines+markers',
            name: 'X'+(i+1)
          }
          var error = {
            x: window.$arr_iteration,
            y: window.$arr_error[i],
            mode: 'lines+markers',
            name: 'errorX'+(i+1)
          }
        graphX.push(X)
        graphError.push(error)
        }

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>JacobiIteration</p>
                </div>

                <div className="info1">
                    <div className="info1div">
                        <div><h1>A</h1></div>
                        {this.createShowA()}
                        <div><h1>B</h1></div>
                        {this.createShowB()}
                        <div><h1>X</h1></div>
                        {this.createShowX()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                        <div><h1>size</h1></div>
                        <div><input onChange={(event) => {
                                this.setState({update: 0})
                                window.$size = event.target.value;
                        }}/></div><br/>
                        <div><h1>A</h1></div>
                        {this.createInputA()}
                        <div><h1>B</h1></div>
                        {this.createInputB()}
                        <div><h1>X</h1></div>
                        {this.createInputX()}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.JacobiIteration}>submit</button></div>
                    <div><button onClick={this.re.bind(this)}>refresh</button></div>   
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph x</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data = {graphX}
                        />
                    </div>
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph error</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data = {graphError}
                        />
                    </div>
                </div>

                <div className = "T">
                    <div className="Head">   
                        <h1>Table</h1>
                    </div>
                    <div class="container">
                        <table id="customers">
                            {this.createTable()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default JacobiIteration;

