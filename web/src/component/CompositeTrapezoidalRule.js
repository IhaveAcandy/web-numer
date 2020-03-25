import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,evaluate,math,range} from 'mathjs';
import {integral} from 'algebrite';

window.$start = 0
window.$stop = 0
window.$range = 0
window.$fx = ""
window.$l = 0
window.$error = 0
window.$real = 0
window.arr_range = []

class CompositeTrapezoidalRule extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            f:"",
            update: 0
        };
      }

    re = ()=>{
        this.setState({update: this.state.update++});
    }

    Trapezoidal = () => {
        this.setState({f: window.$fx});
        var next = window.$start
        var h = (window.$stop - window.$start)/window.$range
        window.$l = 0
        window.$error = 0
        var range = 0
        var sum = 0 
        var value = 0
        var size = parseInt(window.$range)+1
        console.log("size : " + size)
        window.$arr_range = [Array(size)].map(e => Array(size).fill(value))
        console.log("arrerror : " + window.$arr_range)
        for(var i=0 ; i<size ; i++){
            if(i==0){
                window.$arr_range[i] = next
            }else{
                next += h
                window.$arr_range[i] = next
            }
        }
        console.log("arrerror : " + window.$arr_range)
        const funtion = (fx, value) => parse(fx).evaluate({ x: value });
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new)
        for(var i=0 ; i<size ; i++){
            if(i==0 || i==size-1){
                sum += funtion(window.$fx, parseFloat(window.$arr_range[i]))
                console.log("f : " + window.$fx)
                console.log("arrrange : " + window.$arr_range[i])
                console.log("fx : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("sum : " + sum)
            }else{
                sum += 2*(funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("f : " + window.$fx)
                console.log("arrrange : " + parseFloat(window.$arr_range[i]))
                console.log("fx : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("sum : " + sum)
            }
        }
        window.$ans =  (((window.$stop - window.$start)/window.$range)/2)*sum
        console.log("l : " + window.$ans)
        var fx = integral(window.$fx).toString()
        var start = funtion(fx,window.$start)
        var stop = funtion(fx,window.$stop)
        window.$real = stop - start
        window.$error = error(window.$real,window.$ans).toFixed(6)
        this.setState({update: 1});
      }

      createTable = () => {
        let table = []
        for (let i = -1; i < 1; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>result</th>,
                <th>real</th>,
                <th>error</th>)
          }else{
            children.push(
                <td>{window.$ans}</td>,
                <td>{window.$real}</td>,
                <td>{window.$error}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      }
    
    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showCompositetrapezoidalrule").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            }) 
            window.$start = 0
            window.$stop = 0
            window.$range = 0
            window.$fx = ""
            window.$l = 0
            window.$error = 0
            window.arr_range = []
            // window.$start = 2
            // window.$stop = 8
            // window.$range = 2
            // window.$fx = "(4*(x^5))-(3*(x^4))+(x^3)-(6*x)+2"
            // window.$l = 0
            // window.$error = 0
            
    }

    render()
    {
        const fx = this.state.f
        console.log("FX : " + fx)
        const h = (window.$stop - window.$start)/window.$range
        const x1 = range(window.$start, window.$stop+0.5, 0.5).toArray()
        const y1 = x1.map(function (x) {
            return  parse(fx).evaluate({ x: x })
        }) 
        const x2 = range(window.$start, window.$stop+h, h).toArray()
        const y2 = x2.map(function (x) {
            return  parse(fx).evaluate({ x: x })
        })  
        const trace1 = {
            x: x1,
            y: y1,
            mode: 'lines+markers',
            name: 'function'
        }

        const trace2 = {
            x: x2,
            y: y2,
            mode: 'lines+markers',
            name: 'range'
        }

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>CompositeTrapezoidalRule</p>
                </div>

                <div className="info1">
                    <h1>ANS : {window.$ans}</h1>
                    <h1>ERROR : {window.$error}</h1>
                    <h1>FX : {window.$fx}</h1>
                    <h1>Range : {window.$range}</h1>
                    <h1>Start : {window.$start}</h1>
                    <h1>Stop : {window.$stop}</h1>
                </div>

                <div className="funtion">
                    <div><h1>function : </h1></div>
                    <div><input onChange={(event) => {window.$fx = event.target.value;this.setState({update: this.state.update++})}}/></div>
                </div>

                <div class="grid-container">
                    <div>
                        <div><h1>range :</h1></div>
                        <div><input onChange={(event) => {window.$range = event.target.value;this.setState({update: this.state.update++})}}/></div>
                        <div><h1>start :</h1></div>
                        <div><input onChange={(event) => {window.$start = parseInt(event.target.value);this.setState({update: this.state.update++})}}/></div>
                        <div><h1>stop :</h1></div>
                        <div><input onChange={(event) => {window.$stop = parseInt(event.target.value);this.setState({update: this.state.update++})}}/></div>
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.Trapezoidal}>submit</button></div> 
                    <div><button onClick={this.re}>refresh</button></div>  
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph function</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data = {[ trace1,trace2 ]}
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
export default CompositeTrapezoidalRule;
