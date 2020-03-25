import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,range } from 'mathjs'
import {integral} from 'algebrite';

window.$arr_iteration = []
window.$arr_x = []
window.$arr_y = []
window.$arr_error = []
window.$xr = 0
window.$xl = 0 
window.$ans = 0
class CompositeSimpsonRule extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users: "",
            f: "",
            update: 0
        };
      }

    re = ()=>{
        this.setState({update: this.state.update++});
        // var model = {
        //     x: [1,2],
        //     y: [3,4],
        //     mode: "abc"
        // }
        // var m = Array(3).fill(model)
        // console.log("model : " + m[0].x)
        // console.log("model : " + m[1].y)
        // console.log("model : " + m[2].mode)
    }

    Simpson = () => {
        this.setState({f: window.$fx});
        var next = window.$start
        var h = (window.$stop - window.$start)/(window.$range)
        window.$l = 0
        window.$error = 0
        var range = 0
        var sum = 0 
        var value = 0
        var size = parseInt(window.$range)+1
        window.$arr_range = [Array(size)].map(e => Array(size).fill(value))
        for(var i=0 ; i<size ; i++){
            if(i==0){
                window.$arr_range[i] = next
                console.log("h : " + h)
                console.log("next : " + next)
            }else{
                next += h
                console.log("h : " + h)
                console.log("next : " + next)
                window.$arr_range[i] = next
            }
        }
        console.log("arrerror : " + window.$arr_range)
        const funtion = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new)
        for(var i=0 ; i<size ; i++){
            if(i==0 || i==size-1){
                console.log("f : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                sum += funtion(window.$fx, parseFloat(window.$arr_range[i]))
                console.log("f0 : " + window.$fx)
                console.log("sum : " + sum)
            }else if(i%2 == 0){
                console.log("f : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                sum += 2*(funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("f2 : " + window.$fx)
                console.log("sum : " + sum)
            }else if(i%2 == 1){
                console.log("f : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                sum += 4*(funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("f4 : " + window.$fx)
                console.log("sum : " + sum)
            }
        }
        window.$ans =  (((window.$stop - window.$start)/window.$range)/3)*sum
        console.log("l : " + window.$ans)
        var fx = integral(window.$fx).toString()
        var start = funtion(fx,window.$start)
        var stop = funtion(fx,window.$stop)
        window.$real  = stop - start
        console.log("xnew : " + window.$real )
        window.$error = error(window.$real ,window.$ans).toFixed(6)
        this.setState({update: this.state.update++});
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
            axios.get("http://192.168.99.100:8080/api/users/showCompositesimpsonrule").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$start = 0
            window.$stop = 0
            window.$range = 0
            window.$fx = ""
            window.$l = 0
            window.$error = 0
            // window.$start = -1
            // window.$stop = 2
            // window.$range = 1
            // window.$fx = "(x^7)+(2*x^3)-1"
            // window.$l = 0
            // window.$error = 0
            window.arr_range = []
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
                    <p>CompositeSimpsonRule</p>
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
                    <div><button onClick={this.Simpson}>submit</button></div>  
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
export default CompositeSimpsonRule;
